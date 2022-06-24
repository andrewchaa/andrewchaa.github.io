---
title: Getting started with terraform / terragrunt module
date: 2022-05-30
tags:
  - terraform
  - terragrunt
---

### Creating a module. 

A module requires the following files typically

- `terragrunt.hcl`: specify the terraform script location and the location of the `state.hcl`

- `config.tf`: specify terraform s3 backend and required providers

- `provider.tf`: specify “aws” provider, region, the role to assume

- `variables.tf`: variables you use in the script. 

- `data.tf`: if you need to reference any existing resource or to use `terraform_remote_state`

- `outputs.tf`: to output the value to the console and for other terraform to use it

```json
terraform {
  source = "."
}

include {
    path = "${find_in_parent_folders("state.hcl")}"
}
```

```json
terraform {
  # The configuration for this backend will be filled in by Terragrunt
  backend "s3" {}
  required_version = "~>1.1"
}
```

```json
provider "aws" {
  region = "eu-west-1"
  assume_role {
    role_arn = var.assume_role_arn
  }
}
```

```json
variable "account_id" {}
variable "environment_name" {}
variable "environment_type" {}
variable "project_name" {}
```

```json
data "aws_region" "current" {}
data "aws_caller_identity" "current" {}

data "terraform_remote_state" "customers_api" {
  backend = "s3"
  config = {
    bucket = "customers-api-terraform-state"
    key    = "${var.account_id}/${var.environment_name}/${var.environment_type}/regional/api/eu-west-1/terraform.tfstate"
    region = "eu-west-1"
  }
}
```

```json
output "api_auth_key" {
  value       = random_password.api_auth_key.result
  description = "Header value for accessing the API"
  sensitive   = true
}
```

