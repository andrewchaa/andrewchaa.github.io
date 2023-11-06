---
title: Deleting Terraform Resources
date: 2023-05-13
tags:
  - terraform
  - AWS
---

Terraform is a powerful tool for creating and managing infrastructure as code. It can be used to create a wide variety of resources, including EC2 instances, S3 buckets, and Cognito user pools.


Once you have created resources with Terraform, you can easily delete them using the `terraform destroy` command. This command will delete all of the resources that were created by the Terraform configuration file.


```bash
Do you really want to destroy all resources?
  Terraform will destroy all your managed infrastructure, as shown above.
  There is no undo. Only 'yes' will be accepted to confirm.

  Enter a value: yes

aws_iam_role_policy_attachment.lambda_cognitos: Destroying... [id=service_agent_test_iam_lambda_role-20220813162505523800000001]
aws_s3_bucket_policy.photo_storage_everyone: Destroying... [id=navien-service-agent-test-photo-storage]
aws_iam_role_policy_attachment.lambda_dynamodb_policy_attachment: Destroying... [id=service_agent_test_iam_lambda_role-20220813145920205400000001]
aws_api_gateway_method_response.graphql_options: Destroying... [id=agmr-65d7kjb0q8-uckkx4-OPTIONS-200]
aws_iam_role_policy_attachment.lambda_logs: Destroying... [id=service_agent_test_iam_lambda_role-20220813142715590200000001]
aws_api_gateway_integration_response.graphql: Destroying... [id=agir-65d7kjb0q8-uckkx4-POST-200]
aws_api_gateway_integration_response.graphql_options: Destroying... [id=agir-65d7kjb0q8-uckkx4-OPTIONS-200]
aws_lambda_permission.create_user: Destroying... [id=AllowExecutionFromAPIGateway]
aws_lambda_permission.update_job: Destroying... [id=AllowExecutionFromAPIGateway]
aws_s3_bucket_acl.photo_storage: Destroying... [id=navien-service-agent-test-photo-storage,public-read]
aws_s3_bucket_acl.photo_storage: Destruction complete after 0s
aws_lambda_permission.get_job: Destroying... [id=AllowExecutionFromAPIGateway]
aws_api_gateway_integration_response.graphql_options: Destruction complete after 0s
aws_lambda_permission.create_job: Destroying... [id=AllowExecutionFromAPIGateway]
aws_api_gateway_integration_response.graphql: Destruction complete after 0s
aws_cognito_user_pool_client.service_agent: Destroying... [id=71fb2i7idq6qgvlsuporndm3n6]
aws_api_gateway_method_response.graphql_options: Destruction complete after 0s
aws_api_gateway_usage_plan_key.service_agent: Destroying... [id=82kvujbqhd]
aws_lambda_permission.get_job: Destruction complete after 0s
aws_s3_bucket_acl.dynamodb_backup: Destroying...
```


In some cases, you may need to deactivate deletion protection before you can delete a resource. Deletion protection is a feature that prevents resources from being deleted accidentally. I had to deactivate deletion protection for Cognito User Pool. Once you have deactivated deletion protection, you can delete the resource using the `terraform destroy` command again.


Terraform is a powerful tool for creating and managing infrastructure as code. It can be used to create a wide variety of resources, including EC2 instances, S3 buckets, and Cognito user pools.


Deleting resources created with Terraform is easy. You can use the `terraform destroy` command to delete all of the resources that were created by the Terraform configuration file.


In some cases, you may need to deactivate deletion protection before you can delete a resource. Deletion protection is a feature that prevents resources from being deleted accidentally. To deactivate deletion protection, you can use the `terraform state rm` command.


I hope this blog post has been helpful. If you have any questions, please feel free to leave a comment below.


