---
title: Terraform - Cognito Policy
date: 2022-07-19
tags:
  - terraform
---

This is the policy I created to enable a lambda to delete a user from Coginto UserPool.

```bash
data "aws_iam_policy_document" "iam_lambda_cognito_policy_document" {
  statement {
    actions = [
      "cognito-idp:*"
    ]
    resources = [
      "arn:aws:cognito-idp:${data.aws_region.current.name}:${data.aws_caller_identity.current.account_id}:userpool/${var.userpool_id}"
    ]
  }
}

resource "aws_iam_policy" "iam_lambda_cognito_policy" {
  name   = "${var.component}_${var.environment}_iam_lambda_cognito_policy"
  policy = data.aws_iam_policy_document.iam_lambda_cognito_policy_document.json
}

resource "aws_iam_role_policy_attachment" "lambda_cognitos" {
  role       = aws_iam_role.iam_lambda_role.name
  policy_arn = aws_iam_policy.iam_lambda_cognito_policy.arn
}
```

