---
title: Terraform Azure Function App
date: 2020-10-12T17:00:17
categories:
  - technical
classes: wide
---


* providers.tf: put cloud provider and version constraint
* variables.tf: any passed variables
* &lt;resource&gt;.tf: any resource I want to create. In this post, it will be function.tf

#### providers.tf

```bash
provider "azurerm" {
  version = ">= 2.14.0"
  features {}
}

provider "azuread" {
  version = ">= 0.7.0"
}

terraform {
  required_version = ">= 0.12"
}
```

#### variables.tf

```bash
variable "organisation" {}
variable "system" {}
variable "environment" {}
variable "location" {}
```

#### function.tf

```bash
resource "azurerm_resource_group" "news" {
  name     = "${var.environment}-news-${var.location}"
  location = var.location
}

resource "azurerm_storage_account" "news" {
  name                     = "${var.environment}news"
  resource_group_name      = azurerm_resource_group.news.name
  location                 = azurerm_resource_group.news.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
}

resource "azurerm_app_service_plan" "news" {
  name                = "${var.environment}news"
  location            = azurerm_resource_group.news.location
  resource_group_name = azurerm_resource_group.news.name

  sku {
    tier = "Standard"
    size = "S1"
  }
}

resource "azurerm_function_app" "news" {
  name                       = "news"
  location                   = azurerm_resource_group.news.location
  resource_group_name        = azurerm_resource_group.news.name
  app_service_plan_id        = azurerm_app_service_plan.news.id
  storage_account_name       = azurerm_storage_account.news.name
  storage_account_access_key = azurerm_storage_account.news.primary_access_key
}

output "function_app_name" {
  value = azurerm_function_app.mnews.name
}
```

