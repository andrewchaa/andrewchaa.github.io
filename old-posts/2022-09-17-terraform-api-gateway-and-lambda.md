---
title: Terraform - API Gateway and Lambda
date: 2022-09-17
tags:
  - terraform
---

The followings are example scripts I used to provision API Gateway and Lambdas

```bash
# config.tf
terraform {
  backend "s3" {
    bucket = "terraform-resources"
    key    = "service-agent-dev"
    region = "eu-west-1"
  }
  required_version = "~>1.1"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

# data.tf
data "aws_region" "current" {}
data "aws_caller_identity" "current" {}

# apigateway.tf
resource "aws_api_gateway_rest_api" "service_agent" {
  name        = "${var.component}-${var.env}"
  description = "API Gateway for Navien Service Agent"

  endpoint_configuration {
    types = ["REGIONAL"]
  }
}

resource "aws_api_gateway_api_key" "service_agent" {
  name = "${var.component}_${var.env}"
}

resource "aws_api_gateway_usage_plan" "service_agent" {
  name = "${var.component}_${var.env}"

  api_stages {
    api_id = aws_api_gateway_rest_api.service_agent.id
    stage  = aws_api_gateway_stage.service_agent.stage_name
  }
}

resource "aws_api_gateway_usage_plan_key" "service_agent" {
  key_id        = aws_api_gateway_api_key.service_agent.id
  key_type      = "API_KEY"
  usage_plan_id = aws_api_gateway_usage_plan.service_agent.id
}

resource "aws_api_gateway_deployment" "service_agent" {
  rest_api_id = aws_api_gateway_rest_api.service_agent.id

  triggers = {
    redeployment = sha1(jsonencode([
      aws_api_gateway_resource.jobs.id,
      aws_api_gateway_method.jobs_options.id,
      aws_api_gateway_integration.jobs_options.id,
      aws_api_gateway_method.create_job.id,
      aws_api_gateway_integration.create_job.id
    ]))
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_api_gateway_stage" "service_agent" {
  deployment_id = aws_api_gateway_deployment.service_agent.id
  rest_api_id   = aws_api_gateway_rest_api.service_agent.id
  stage_name    = var.env
}

# jobs.tf
resource "aws_api_gateway_resource" "jobs" {
  rest_api_id = aws_api_gateway_rest_api.service_agent.id
  parent_id   = aws_api_gateway_rest_api.service_agent.root_resource_id
  path_part   = "jobs"
}

resource "aws_api_gateway_method" "jobs_options" {
  rest_api_id      = aws_api_gateway_rest_api.service_agent.id
  resource_id      = aws_api_gateway_resource.jobs.id
  http_method      = "OPTIONS"
  authorization    = "NONE"
  api_key_required = true
}

resource "aws_api_gateway_integration" "jobs_options" {
  rest_api_id = aws_api_gateway_rest_api.service_agent.id
  resource_id = aws_api_gateway_resource.jobs.id
  http_method = aws_api_gateway_method.jobs_options.http_method

  type = "MOCK"
}

# create.tf
resource "aws_api_gateway_method" "create_job" {
  rest_api_id      = aws_api_gateway_rest_api.service_agent.id
  resource_id      = aws_api_gateway_resource.jobs.id
  http_method      = "POST"
  authorization    = "NONE"
  api_key_required = true
}

resource "aws_api_gateway_integration" "create_job" {
  rest_api_id = aws_api_gateway_rest_api.service_agent.id
  resource_id = aws_api_gateway_resource.jobs.id
  http_method = aws_api_gateway_method.create_job.http_method

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.create_job.invoke_arn
}

resource "aws_lambda_permission" "create_job" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.create_job.arn
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.service_agent.execution_arn}/*/*/*"
}

# lambda.tf
data "archive_file" "create_job" {
  type        = "zip"
  source_dir  = "../dist/create-job"
  output_path = "../dist/create-job.zip"
}

resource "aws_lambda_function" "create_job" {
  function_name = "${var.component}_${var.env}_create_job"
  filename      = data.archive_file.create_job.output_path

  runtime = "nodejs16.x"
  handler = "index.handler"

  source_code_hash = data.archive_file.create_job.output_base64sha256
  role             = aws_iam_role.iam_lambda_role.arn

  environment {
    variables = {
      run_env = var.env
    }
  }
}

# cloudwatch.tf
resource "aws_cloudwatch_log_group" "create_job" {
  name = "/aws/lambda/${aws_lambda_function.create_job.function_name}"

  retention_in_days = 14
}

# lambda-log-policy.tf
data "aws_iam_policy_document" "iam_lambda_log_policy_document" {
  statement {
    actions = [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents"
    ]
    resources = [
      "${aws_cloudwatch_log_group.create_job.arn}:*"
    ]
  }
}

resource "aws_iam_policy" "iam_lambda_log_policy" {
  name   = "${var.component}_${var.env}_iam_lambda_log_policy"
  policy = data.aws_iam_policy_document.iam_lambda_log_policy_document.json
}

resource "aws_iam_role_policy_attachment" "lambda_logs" {
  role       = aws_iam_role.iam_lambda_role.name
  policy_arn = aws_iam_policy.iam_lambda_log_policy.arn
}

# lambda-role.tf
data "aws_iam_policy_document" "iam_lambda_role_document" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "iam_lambda_role" {
  name               = "${var.component}_${var.env}_iam_lambda_role"
  assume_role_policy = data.aws_iam_policy_document.iam_lambda_role_document.json
}
```

