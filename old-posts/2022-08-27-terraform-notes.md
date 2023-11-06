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

### Terraform functions and statements

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

**`for_each`**: used with resources and data sources to create multiple instances based on a set or a map. It allows you to iterate over a collection and create a separate instance of the resource or data source for each item in the collection.

In the example:

```bash
data "google_compute_subnetwork" "all_subnets" {
  for_each = toset(data.google_compute_network.ids_network.subnetworks_self_links)

  self_link = each.value
  project   = var.project_id
}
```

**`for_each`** is used with the **`google_compute_subnetwork`** data source to fetch information about all subnetworks in the given network. The **`toset()`** function is used to convert the list of subnetwork self-links to a set. The **`each.value`** reference represents the current item in the iteration.

**`dynamic`**: used within resource blocks to dynamically generate nested blocks based on a given set of data. It allows you to create a nested block for each item in a collection without having to write out each block manually.

In the example:

```bash
resource "google_compute_packet_mirroring" "ids_packet_mirroring" {
  ...
  mirrored_resources {
    dynamic "subnetworks" {
      for_each = data.google_compute_subnetwork.all_subnets
      content {
        url = subnetworks.value.id
      }
    }
  }
}
```

**`dynamic`** is used within the **`mirrored_resources`** block of the **`google_compute_packet_mirroring`** resource to create a **`subnetworks`** block for each subnetwork in the **`data.google_compute_subnetwork.all_subnets`** data source. The **`for_each`** statement iterates over the subnetworks, and the **`content`** block defines the structure of the generated **`subnetworks`** block. The **`subnetworks.value`** reference represents the current item in the iteration, in this case, a subnetwork object.

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

## Examples

### AWS Lambda

```bash
data "archive_file" "update_job" {
  type        = "zip"
  source_dir  = "../dist/update-job"
  output_path = "../dist/update-job.zip"
}

resource "aws_lambda_function" "update_job" {
  function_name = "${var.component}_${var.env}_update_job"
  filename      = data.archive_file.update_job.output_path

  runtime     = "nodejs18.x"
  memory_size = var.memory_size
  timeout     = var.timeout
  handler     = "index.handler"

  source_code_hash = data.archive_file.update_job.output_base64sha256
  role             = aws_iam_role.iam_lambda_role.arn

  environment {
    variables = {
      run_env = var.env
    }
  }
}
```

