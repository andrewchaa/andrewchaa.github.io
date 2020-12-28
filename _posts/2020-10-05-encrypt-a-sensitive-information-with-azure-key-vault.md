---
title: Encrypt a sensitive information with Azure Key Vault
date: 2020-10-05T16:01:32
categories:
  - technical
classes: wide
---


## Things Azure Key Vault protects

### Key

Cryptographic keys used in other Microsoft Azure services

### Secret

Any sensitive information such as connection strings to SQL Server, Redis, or Storage.

### Certificate

x509 certificates being used in HTTPS / SSL communications

## Provision key Vault with Terraform

```text
resource "azurerm_resource_group" "web-resource-group" {
  name     = "${var.organisation}-${var.system}-${var.environment}-web-${var.location}"
  location = var.location
  tags     = var.tags
}

resource "azurerm_key_vault" "web" {
  name                            = "${var.environment}-web"
  resource_group_name             = azurerm_resource_group.web-resource-group.name
  location                        = azurerm_resource_group.web-resource-group.location
  sku_name                        = "standard"
  tenant_id                       = data.azurerm_client_config.client_config.tenant_id
  enabled_for_deployment          = true
  enabled_for_template_deployment = true
  tags                            = var.tags
}

# Access to terraform SP
data "azurerm_client_config" "client_config" {}

resource "azurerm_key_vault_access_policy" "ci" {
  key_vault_id = azurerm_key_vault.web.id
  tenant_id    = data.azurerm_client_config.client_config.tenant_id
  object_id    = data.azurerm_client_config.client_config.object_id

  certificate_permissions = [
    "get",
    "list",
    "update",
    "create",
    "import",
    "delete",
    "managecontacts",
    "manageissuers",
    "getissuers",
    "listissuers",
    "setissuers",
    "deleteissuers",
    "backup",
    "purge",
    "recover",
    "restore",
  ]

  key_permissions = [
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
    "wrapKey",
  ]

  secret_permissions = [
    "delete",
    "get",
    "list",
    "set",
    "backup",
    "purge",
    "recover",
    "restore",
  ]

  storage_permissions = [
    "backup",
    "delete",
    "deletesas",
    "get",
    "getsas",
    "list",
    "listsas",
    "purge",
    "recover",
    "regeneratekey",
    "restore",
    "set",
    "setsas",
    "update",
  ]
}

resource "azurerm_key_vault_access_policy" "web-service-principle" {
  key_vault_id = azurerm_key_vault.web.id
  tenant_id    = data.azurerm_client_config.client_config.tenant_id
  object_id    = data.azurerm_client_config.client_config.object_id

  certificate_permissions = [
    "get"
  ]

  key_permissions = [
    "get"
  ]

  secret_permissions = [
    "get"
  ]
}

output "web_keyvault_url" {
  value = azurerm_key_vault.web.vault_uri
}
```

## Encrypt and decrypt your token

Use symmetric key if you need to encrypt the information and also to decrypt it. In this case, you need to store the encrypting key in Azure Key Vault secret. For asymmetric encryption, you can use Azure Key Vault key.

I'm using [Aes](https://docs.microsoft.com/en-us/dotnet/api/system.security.cryptography.aes?view=netcore-3.1) from [Cryptographic servieces](https://docs.microsoft.com/en-us/dotnet/standard/security/cryptographic-services) .NET provides. 

```csharp
// sample code. In real situation, the Key and IV will come from Azure Key Vault secrets
public class EncryptionService
{
    readonly byte[] _key = { 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16 };
    
    // Actually, the iv should be new on every encryption. You can save it as salt in the database
    readonly byte[] _iv = { 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16 };

    public string Encrypt(string token)
    {
        using (var aes = Aes.Create())
        {
            aes.Key = _key;
            aes.IV = _iv;

            using (var memoryStream = new MemoryStream())
            {
                using (var cryptoStream = new CryptoStream(memoryStream,
                    aes.CreateEncryptor(aes.Key, aes.IV),
                    CryptoStreamMode.Write))
                {
                    using (var streamWriter = new StreamWriter(cryptoStream))
                    {
                        streamWriter.Write(token);
                    }

                    return Convert.ToBase64String(memoryStream.ToArray());
                }
            }
        }
    }

    public string Decrypt(string encryptedToken)
    {
        var buffer = Convert.FromBase64String(encryptedToken);

        using (var aes = Aes.Create())
        {
            aes.Key = _key;
            aes.IV = _iv;

            using (var memoryStream = new MemoryStream(buffer))
            {
                using (var cryptoStream = new CryptoStream(memoryStream,
                    aes.CreateDecryptor(aes.Key, aes.IV),
                    CryptoStreamMode.Read))
                {
                    using (var streamReader = new StreamReader(cryptoStream))
                    {
                        return streamReader.ReadToEnd();
                    }
                }
            }
        }
    }
}

```



