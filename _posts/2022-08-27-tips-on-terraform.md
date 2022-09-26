---
title: Tips on Terraform
date: 2022-08-27
tags:
  - terraform
  - tips
---

### Functions

`replace`: replace string

```bash
resource "aws_s3_bucket" "photo_storage" {
  bucket = replace("${var.component}-${var.env}-photo-storage", "_", "-")

  tags = {
    Name        = "Photo Storage"
    Environment = var.env
  }
}
```

### AWS Lambda Integration

The integration method is always `POST` even though your incoming request http method is `GET`

```bash
resource "aws_api_gateway_method" "get_job" {
  rest_api_id      = aws_api_gateway_rest_api.service_agent.id
  resource_id      = aws_api_gateway_resource.jobs.id
  http_method      = "GET"
  authorization    = "NONE"
  api_key_required = true
}

resource "aws_api_gateway_integration" "get_job" {
  rest_api_id = aws_api_gateway_rest_api.service_agent.id
  resource_id = aws_api_gateway_resource.jobs.id
  http_method = aws_api_gateway_method.get_job.http_method

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.get_job.invoke_arn
}

resource "aws_lambda_permission" "get_job" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.get_job.arn
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.service_agent.execution_arn}/*/*/*"
}
```

### TF_VAR_

Environment variables can be used to set terraform variables. The environment variable must be in the format of `TF_VAR_name`

```bash
export TF_VAR_region=eu-west-1
export TF_VAR_ami=ami-049d8641
export TF_VAR_list='[1,2,3]'
export TF_VAR_map='{ foo = "bar", baz = "qux" }'
```

