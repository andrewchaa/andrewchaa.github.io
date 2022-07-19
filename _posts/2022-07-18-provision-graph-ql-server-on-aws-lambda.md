---
title: Provision GraphQL Server on AWS Lambda
date: 2022-07-18
tags:
  - terraform
---

It’s the same as to create a REST API. Provision API Gateway endpoint and connect the endpoint to a lambda that hosts GraphQL server.

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

resource "aws_api_gateway_method" "graphql_method" {
  rest_api_id   = aws_api_gateway_rest_api.graphql_server.id
  resource_id   = aws_api_gateway_resource.graphql_server.id
  http_method   = "ANY"
  authorization = "NONE"
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

