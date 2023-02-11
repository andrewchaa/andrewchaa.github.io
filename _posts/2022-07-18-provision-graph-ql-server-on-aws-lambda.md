---
title: Provision GraphQL Server on AWS Lambda
date: 2022-07-18
tags:
  - terraform
---

It’s the same as to create a REST API. Provision API Gateway endpoint and connect the endpoint to a lambda that hosts GraphQL server.

Provision API Gateway resources

```bash
# API Gateway
resource "aws_api_gateway_rest_api" "graphql_server" {
  name        = "${var.component}-${var.environment}"
  description = "API Gateway for GraphQL Server"

  endpoint_configuration {
    types = ["REGIONAL"]
  }
}

resource "aws_api_gateway_resource" "graphql_server" {
  rest_api_id = aws_api_gateway_rest_api.graphql_server.id
  parent_id   = aws_api_gateway_rest_api.graphql_server.root_resource_id
  path_part   = "graphql"
}

resource "aws_api_gateway_method" "graphql_server" {
  rest_api_id      = aws_api_gateway_rest_api.service_agent.id
  resource_id      = aws_api_gateway_resource.graphql.id
  http_method      = "ANY"
  authorization    = "NONE"
  api_key_required = true
}

resource "aws_api_gateway_integration" "graphql_integration" {
  rest_api_id = aws_api_gateway_rest_api.graphql_server.id
  resource_id = aws_api_gateway_resource.graphql_server.id
  http_method = aws_api_gateway_method.graphql_method.http_method

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.graphql_server.invoke_arn

  depends_on = [
    aws_api_gateway_method.graphql_method
  ]
}

resource "aws_api_gateway_deployment" "graphql_server_stage_deployment" {
  rest_api_id = aws_api_gateway_rest_api.graphql_server.id
  stage_name  = "dev"

  depends_on = [
    aws_api_gateway_integration.graphql_integration,
    aws_api_gateway_method.graphql_method
  ]

  variables = {
    "timestamp" = timestamp()
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_lambda_permission" "graphql_server_invoke_permission" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.graphql_server.arn
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.graphql_server.execution_arn}/*/*/*"
}
```

Provision cloudwatch log group

```bash
resource "aws_cloudwatch_log_group" "graphql_server" {
  name = "/aws/lambda/${aws_lambda_function.graphql_server.function_name}"

  retention_in_days = 14
}
```

Provision lambda

```bash
data "archive_file" "graphql_server" {
  type        = "zip"
  source_dir  = "../dist/graphql-server"
  output_path = "../dist/graphql-server.zip"
}

resource "aws_lambda_function" "graphql_server" {
  function_name = "${var.component}_${var.environment}_graphql_server"
  filename      = data.archive_file.graphql_server.output_path

  runtime = "nodejs18.x"
  handler = "index.handler"

  source_code_hash = data.archive_file.graphql_server.output_base64sha256
  role             = aws_iam_role.iam_lambda_role.arn

  environment {
    variables = {
      run_env                 = var.environment
    }
  }
}
```

Provision lambda log policy

```bash
data "aws_iam_policy_document" "iam_lambda_log_policy_document" {
  statement {
    actions = [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents"
    ]
    resources = [
      "${aws_cloudwatch_log_group.graphql_server.arn}:*"
    ]
  }
}

resource "aws_iam_policy" "iam_lambda_log_policy" {
  name   = "${var.component}_${var.environment}_iam_lambda_log_policy"
  policy = data.aws_iam_policy_document.iam_lambda_log_policy_document.json
}

resource "aws_iam_role_policy_attachment" "lambda_logs" {
  role       = aws_iam_role.iam_lambda_role.name
  policy_arn = aws_iam_policy.iam_lambda_log_policy.arn
}
```

