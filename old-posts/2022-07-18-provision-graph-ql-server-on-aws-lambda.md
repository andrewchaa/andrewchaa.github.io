---
title: Provision GraphQL Server on AWS Lambda
date: 2022-07-18
tags:
  - terraform
---

It’s the same as to create a REST API. Provision API Gateway endpoint and connect the endpoint to a lambda that hosts GraphQL server.

### API Gateway

```bash
resource "aws_api_gateway_resource" "graphql" {
  rest_api_id = aws_api_gateway_rest_api.service_agent.id
  parent_id   = aws_api_gateway_rest_api.service_agent.root_resource_id
  path_part   = "graphql"
}

resource "aws_api_gateway_method" "graphql_options" {
  rest_api_id      = aws_api_gateway_rest_api.service_agent.id
  resource_id      = aws_api_gateway_resource.graphql.id
  http_method      = "OPTIONS"
  authorization    = "NONE"
  api_key_required = true
}

resource "aws_api_gateway_method_response" "graphql_options" {
  rest_api_id = aws_api_gateway_rest_api.service_agent.id
  resource_id = aws_api_gateway_resource.graphql.id
  http_method = aws_api_gateway_method.graphql_options.http_method
  status_code = 200

  # To support CORS for Apollo Studio
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true
    "method.response.header.Access-Control-Allow-Methods" = true
    "method.response.header.Access-Control-Allow-Origin"  = true
  }

  response_models = {
    "application/json" = "Empty"
  }
}

resource "aws_api_gateway_integration" "graphql_options" {
  rest_api_id = aws_api_gateway_rest_api.service_agent.id
  resource_id = aws_api_gateway_resource.graphql.id
  http_method = aws_api_gateway_method.graphql_options.http_method

  type = "MOCK"
}

resource "aws_api_gateway_integration_response" "graphql_options" {
  rest_api_id = aws_api_gateway_rest_api.service_agent.id
  resource_id = aws_api_gateway_resource.graphql.id
  http_method = aws_api_gateway_method.graphql_options.http_method
  status_code = 200

  # To support CORS for Apollo Studio
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = "'Authorization,Content-Type,X-Amz-Date,X-Amz-Security-Token,X-Api-Key'"
    "method.response.header.Access-Control-Allow-Methods" = "'*'"
    "method.response.header.Access-Control-Allow-Origin"  = "'*'"
  }

  # Witout this, it provisions integration response happenes before integraion
  # and fails
  depends_on = [
    aws_api_gateway_integration.graphql_options
  ]

}

resource "aws_api_gateway_method" "graphql" {
  rest_api_id      = aws_api_gateway_rest_api.service_agent.id
  resource_id      = aws_api_gateway_resource.graphql.id
  http_method      = "POST"
  authorization    = "NONE"
  api_key_required = true
}

resource "aws_api_gateway_method_response" "graphql" {
  rest_api_id = aws_api_gateway_rest_api.service_agent.id
  resource_id = aws_api_gateway_resource.graphql.id
  http_method = aws_api_gateway_method.graphql.http_method
  status_code = 200

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true
    "method.response.header.Access-Control-Allow-Methods" = true
    "method.response.header.Access-Control-Allow-Origin"  = true
  }

  response_models = {
    "application/json" = "Empty"
  }
}


resource "aws_api_gateway_integration" "graphql" {
  rest_api_id = aws_api_gateway_rest_api.service_agent.id
  resource_id = aws_api_gateway_resource.graphql.id
  http_method = aws_api_gateway_method.graphql.http_method

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.graphql.invoke_arn

  depends_on = [
    aws_api_gateway_method.graphql
  ]
}

resource "aws_api_gateway_integration_response" "graphql" {
  rest_api_id = aws_api_gateway_rest_api.service_agent.id
  resource_id = aws_api_gateway_resource.graphql.id
  http_method = aws_api_gateway_method.graphql.http_method
  status_code = 200

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = "'Authorization,Content-Type,X-Amz-Date,X-Amz-Security-Token,X-Api-Key'"
    "method.response.header.Access-Control-Allow-Methods" = "'*'"
    "method.response.header.Access-Control-Allow-Origin"  = "'*'"
  }

  depends_on = [
    aws_api_gateway_integration.graphql
  ]
}

resource "aws_lambda_permission" "graphql" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.graphql.arn
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.service_agent.execution_arn}/*/*/*"
}
```

### CloudWatch

```bash
resource "aws_cloudwatch_log_group" "graphql" {
  name = "/aws/lambda/${aws_lambda_function.graphql_server.function_name}"

  retention_in_days = 14
}
```

### Lambda

```bash
data "archive_file" "graphql" {
  type        = "zip"
  source_dir  = "../dist/graphql"
  output_path = "../dist/graphql.zip"
}

resource "aws_lambda_function" "graphql" {
  function_name = "${var.component}_${var.env}_graphql"
  filename      = data.archive_file.graphql.output_path

  runtime     = "nodejs18.x"
  memory_size = var.memory_size
  handler     = "index.handler"

  source_code_hash = data.archive_file.graphql.output_base64sha256
  role             = aws_iam_role.iam_lambda_role.arn

  environment {
    variables = {
      run_env = var.env
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
      "${aws_cloudwatch_log_group.graphql.arn}:*"
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

