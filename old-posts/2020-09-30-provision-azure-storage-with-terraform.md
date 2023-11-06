---
title: Provision Azure Storage with Terraform
date: 2020-09-30T09:55:40
categories:
  - technical
tags:
  
---


```bash
resource "azurerm_resource_group" "events_rg" {
  name     = "${var.organisation}-${var.system}-${var.environment}-events-${var.location}"
  location = var.location
  tags     = var.tags
}

resource "azurerm_storage_account" "events_ac" {
  name                     = lower("${var.environment}events")
  resource_group_name      = azurerm_resource_group.events_rg.name
  location                 = var.location
  account_tier             = "Standard"
  account_replication_type = "GRS"
}

resource "azurerm_storage_container" "events_container" {
  name                  = "events"
  storage_account_name  = azurerm_storage_account.events_ac.name
  container_access_type = "private"
}

output "storage_blob_endpoint" {
  value       = "${azurerm_storage_account.events_ac.primary_blob_endpoint}"
  description = "blob_endpoint"
}

output "storage_blob_connection_string" {
  value       = "${azurerm_storage_account.events_ac.primary_blob_connection_string}"
  sensitive   = false
  description = "connection string"
}

```

