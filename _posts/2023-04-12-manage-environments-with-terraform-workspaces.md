---
title: Manage environments with Terraform Workspaces
date: 2023-04-12
tags:
  - terraform
---

Terraform workspaces are a built-in feature that allows you to maintain multiple distinct states within a single Terraform configuration. Workspaces can be used to manage multiple environments, such as development, staging, and production, while sharing the same infrastructure code. This makes it easier to manage infrastructure changes across different environments while keeping your code DRY (Don't Repeat Yourself).

Benefits of using Terraform workspaces:

- Environment separation: Workspaces allow you to manage separate environments (e.g., development, staging, production) without duplicating your Terraform configuration files, which simplifies maintenance and reduces the chance of errors.

- State isolation: Each workspace has its own separate state file, which ensures that changes in one environment do not accidentally impact other environments.

- Variable customization: Workspaces make it easy to use different variable values for each environment, allowing you to customize your infrastructure as needed.

Examples:

### Create a new workspace:

To create a new workspace, use the **`terraform workspace new`** command:

```bash
terraform workspace new development
```

This command creates a new workspace named **`development`**.

### List workspaces:

To list all available workspaces, use the **`terraform workspace list`** command:

```bash
terraform workspace list
```

### Switch between workspaces:

To switch between workspaces, use the **`terraform workspace select`** command:

```bash
terraform workspace select development
```

This command selects the **`development`** workspace.

### Using workspace-specific variables:

To customize your infrastructure configuration for each workspace, you can use the **`terraform.workspace`** interpolation in your configuration files:

```bash
locals {
  environment_settings = {
    development = {
      instance_count = 1
      instance_type  = "t2.micro"
    }
    production = {
      instance_count = 5
      instance_type  = "t2.small"
    }
  }
}

module "app" {
  source = "./modules/app"

  instance_count = lookup(local.environment_settings[terraform.workspace], "instance_count")
  instance_type  = lookup(local.environment_settings[terraform.workspace], "instance_type")
}
```

In this example, we use a local variable **`environment_settings`** to store environment-specific settings for the **`development`** and **`production`** workspaces. The **`lookup`** function is then used to retrieve the appropriate values based on the current workspace.

Using Terraform workspaces, you can manage multiple environments within the same Terraform configuration, simplify maintenance, and reduce the risk of errors. Keep in mind that workspaces are not always the best solution for every use case, especially when dealing with complex infrastructure with many differences between environments. In such cases, it might be more appropriate to use separate Terraform configurations or modules

