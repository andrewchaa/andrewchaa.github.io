---
title: Provision Azure Key Vault with Terraform
date: 2020-09-10T17:45:19
categories:
  - technical
tags:
  
---


### Azure Key Vault

```bash
data "azurerm_client_config" "current" {}

resource "azurerm_key_vault" "key-vault" {
  # Name has a 24 character limit.
  name                            = "token-kv"
  resource_group_name             = azurerm_resource_group.token.name
  location                        = azurerm_resource_group.token.location
  sku_name                        = "standard"
  tenant_id                       = data.azurerm_client_config.current.tenant_id
  enabled_for_deployment          = true
  enabled_for_template_deployment = true
}

resource "azurerm_key_vault_access_policy" "deployment" {
  key_vault_id = azurerm_key_vault.key-vault.id
  tenant_id    = data.azurerm_client_config.current.tenant_id
  object_id    = data.azurerm_client_config.current.object_id

  key_permissions = [
    "create",
    ...
  ]

  certificate_permissions = [
    "get",
    ...
  ]

  secret_permissions = [
    "backup",
    ...
  ]
  
  storage_permissions = [
    "backup",
    ...
  ]  

}

resource "azurerm_key_vault_access_policy" "service_principal" {
  key_vault_id  = azurerm_key_vault.key-vault.id
  tenant_id     = data.azurerm_client_config.current.tenant_id
  object_id     = azuread_service_principal.tokenapp.object_id

  key_permissions = [
    "backup",
    "create",
    "decrypt",
    "delete",
    "encrypt",
    "get",
    "import",
    "list",
    "purge",
    "recover",
    "restore",
    "sign",
    "unwrapKey",
    "update",
    "verify",
    "wrapKey"
  ]

  secret_permissions = [
    "backup",
    "delete",
    "get",
    "list",
    "purge",
    "recover",
    "restore",
    "set"
  ]

  certificate_permissions = [
    "create",
    "delete",
    "deleteissuers",
    "get",
    "getissuers",
    "import",
    "list",
    "listissuers",
    "managecontacts",
    "manageissuers",
    "setissuers",
    "update"
  ]
}

output "keyvault_uri" {
  value = azurerm_key_vault.key-vault.vault_uri
}

output "keyvault_tenant_id" {
  value = azurerm_key_vault.key-vault.tenant_id
}

output "tokenapp_client_id" {
  value = azuread_application.tokenapp.application_id
}

output "tokenapp_client_secret" {
  value = random_password.fitokenapp.result
}

```

### Azure AD Application

For your application to access the key vault, you need to register it on the access policy

```bash
resource "azuread_application" "tokenapp" {
  name                       = lower("tokenapp-${var.location}")
  homepage                   = "http://localhost"
  identifier_uris            = []
  reply_urls                 = ["http://localhost"]
  available_to_other_tenants = false
  oauth2_allow_implicit_flow = false
  type                       = "webapp/api"
}

resource "azuread_service_principal" "tokenapp" {
  application_id = azuread_application.tokenapp.application_id
}

resource "azuread_application_password" "tokenapp" {
  application_object_id = azuread_application.tokenapp.id
  value                 = random_password.tokenapp.result
  end_date_relative     = "26280h" #3y
}

resource "random_password" "tokenapp" {
  length           = 33
  special          = true
  override_special = "._-"
}
```

`random_password` is a terraform resource that generates a random password

### Provision secrets

Finally, let's provision key and iv in the secret.

```bash
resource "random_password" "key" {
  length           = 16
  special          = true
  override_special = "._-"
}

resource "random_password" "iv" {
  length           = 16
  special          = true
  override_special = "._-"
}

resource "azurerm_key_vault_secret" "key" {
  name         = "encryption-key"
  value        = random_password.key.result
  key_vault_id = azurerm_key_vault.key-vault.id
  depends_on = [azurerm_key_vault_access_policy.deployment]  
}

resource "azurerm_key_vault_secret" "iv" {
  name         = "encryption-iv"
  value        = random_password.iv.result
  key_vault_id = azurerm_key_vault.key-vault.id

  depends_on = [azurerm_key_vault_access_policy.deployment]
}
```

