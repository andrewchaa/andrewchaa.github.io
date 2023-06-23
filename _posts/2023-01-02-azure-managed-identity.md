---
title: Azure Managed Identity
date: 2023-01-02
tags:
  - azure
  - managed identity
  - security
---

### What is Managed Identity

Azure Managed Identity (formerly MSI) is a feature of Azure Active Directory that allows Azure resources, such as virtual machines, to be authenticated to other Azure resources. This means that you can give an Azure resource access to another resource, without having to store any secrets or credentials in your code or configuration files.

### Managed Identity vs. Service Principal

Managed Identity is different from a Service Principal in that it is tied to a specific Azure resource, such as a virtual machine or an app service. A Service Principal is a standalone identity that you can use to authenticate to Azure resources, and it is not tied to a specific resource.

### The benefits of Managed Identity

One of the main benefits of Azure Managed Identity is that it simplifies the process of authenticating to Azure resources. With Managed Identity, you don't have to worry about managing secrets or rotating them when they expire. This can be a major advantage when it comes to security, as it reduces the risk of secrets being leaked or compromised.

### Using managed identity to connect to an Azure SQL database

To use Managed Identity to connect to an Azure SQL database from an ASP.NET app, you will first need to enable Managed Identity for your app service or virtual machine. You can do this through the Azure portal or by using the Azure CLI.

- Under Settings, go to “Identity”

- Under System assigned tab, enable Status to be on and then Save.

- Wait for the identity to be created. It should display “Object ID”. Copy the value of the Object ID.

- Associate the Object ID with a user in the Azure SQL database. The azure cli command should be like this

```bash
az sql server ad-admin create --resource-group <resoure group> \
  --server-name <server name> --display-name <your chosen user> \
  --object-id <object id>
```

Now the object id is associated with the chosen login id.

Once Managed Identity is enabled, add `Microsoft.Azure.Services.AppAuthentication` package to your [ASP.NET](http://asp.net/) app. Then you can use the following code to connect to the Azure SQL database from your ASP.NET app:

```c#
var connectionString = "Server=tcp:<server>.database.windows.net,1433;Initial Catalog=<database>;Persist Security Info=False;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";

using (var connection = new SqlConnection(connectionString))
{
    connection.AccessToken = await new AzureServiceTokenProvider()
			.GetAccessTokenAsync("https://database.windows.net/");
    connection.Open();
    // Use connection to execute queries
}
```

The `AzureServiceTokenProvider` class will handle getting an access token from Azure Active Directory on behalf of the Managed Identity, and the `GetAccessTokenAsync` method will return the token as a string. You can then use this token to authenticate to the Azure SQL database.

Overall, Azure Managed Identity is a convenient and secure way to authenticate to Azure resources from your ASP.NET app. It eliminates the need to store secrets in your code or configuration files, and it makes it easy to manage access to Azure resources

