---
title: Terraform Notes
date: 2022-08-27
tags:
  - terraform
  - tips
---

My notes on Terraform

### What is Terraform

Terraform is an open-source infrastructure as code software tool that enables users to define and provision infrastructure resources through code. It allows users to write, plan, and create infrastructure resources in a safe and efficient manner.

With Terraform, users can manage infrastructure for a variety of cloud providers, such as AWS, Azure, and Google Cloud.

One of the key benefits of using Terraform is that it provides a common language for users to describe their infrastructure resources, making it easier to understand and collaborate on projects. It also has a wide range of built-in integrations with different infrastructure providers, which makes it easy to get started with Terraform and start managing resources quickly.

In addition, Terraform has a number of features that make it a powerful tool for managing infrastructure resources, including:

- Version control: Terraform enables users to version control their infrastructure and roll back changes if necessary. This makes it easier to manage and track changes to infrastructure resources.

- Resource graph: Terraform generates a visual representation of the resources it manages, which makes it easier to understand the relationships between resources and how they depend on each other.

- Resource provisioning: Terraform can create, update, and delete resources in a safe and predictable manner, ensuring that resources are created in the correct order and that dependencies are taken into account.

Overall, Terraform is a powerful and flexible tool for managing infrastructure resources that is well-suited for a wide range of use cases. Whether you are managing a small infrastructure for a personal project or a large, complex infrastructure for a business, Terraform can help you manage your resources in a safe, efficient, and predictable manner

### Installing Terraform

The easiest way to install Terraform on a Mac is through [Homebrew](https://brew.sh/). If you don't have Homebrew installed, you can install it by running the following command in your terminal:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Once Homebrew is installed, you can install Terraform by running the following command:

```bash
brew install terraform
```

This will install the latest version of Terraform. To confirm that Terraform was installed successfully, run the following command:

```bash
terraform -v
```

You should see the version number of Terraform displayed in your terminal.

### Terraform Functions

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

