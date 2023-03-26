---
title: Provisioning DynamoDB with terraform
date: 2022-09-30
tags:
  - terraform
  - dynamodb
---

My Terraform scripts for Dynamo DB table and policies.

### Provision the table

```bash
# dynamodb: jobs
resource "aws_dynamodb_table" "jobs_table" {
  name           = "${var.component}-jobs-${var.env}"
  billing_mode   = "PROVISIONED"
  read_capacity  = 5
  write_capacity = 5
  hash_key       = "companyId"
  range_key      = "jobNo"

  attribute {
    name = "companyId"
    type = "S"
  }

  attribute {
    name = "jobNo"
    type = "S"
  }

  tags = {
    Name        = var.component
    Environment = var.env
  }
}
```

### Policy for lambda to access the database

```typescript
data "aws_iam_policy_document" "iam_lambda_dynamodb_policy_document" {
  statement {
    effect = "Allow"
    actions = [
      "dynamodb:PutItem",
      "dynamodb:DeleteItem",
      "dynamodb:UpdateItem",
      "dynamodb:Get*",
      "dynamodb:Query",
      "dynamodb:DescribeTable"
    ]
    resources = [
      "arn:aws:dynamodb:${data.aws_region.current.name}:${data.aws_caller_identity.current.account_id}:table/${aws_dynamodb_table.jobs_table.name}",
      "arn:aws:dynamodb:${data.aws_region.current.name}:${data.aws_caller_identity.current.account_id}:table/${aws_dynamodb_table.users_table.name}"
    ]
  }
}

resource "aws_iam_policy" "iam_lambda_dynamodb_policy" {
  name   = "${var.component}_${var.env}_iam_lambda_dynamodb_policy"
  policy = data.aws_iam_policy_document.iam_lambda_dynamodb_policy_document.json
}

resource "aws_iam_role_policy_attachment" "lambda_dynamodb_policy_attachment" {
  role       = aws_iam_role.iam_lambda_role.name
  policy_arn = aws_iam_policy.iam_lambda_dynamodb_policy.arn
}
```

### Create a table with GSI

```typescript
resource "aws_dynamodb_table" "users_table" {
  name           = "${var.component}-users-${var.env}"
  billing_mode   = "PROVISIONED"
  read_capacity  = 5
  write_capacity = 5
  hash_key       = "companyId"
  range_key      = "email"

  attribute {
    name = "companyId"
    type = "S"
  }

  attribute {
    name = "email"
    type = "S"
  }

  point_in_time_recovery {
    enabled = true
  }

  global_secondary_index {
    name            = "emailIndex"
    hash_key        = "email"
    write_capacity  = 5
    read_capacity   = 5
    projection_type = "ALL"
  }


  tags = {
    Name        = var.component
    Environment = var.env
  }
}
```

