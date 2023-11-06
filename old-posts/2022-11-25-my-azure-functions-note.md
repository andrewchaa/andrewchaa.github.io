---
title: My Azure Functions Note
date: 2022-11-25
tags:
  - azure function
---

My note on Azure Functions

### 3 Hosting Plans

Consumption Plan

- an ideal serverless plan but you may encounter a cold-start phenomenon

- You can’t use Virtual Network

Premium Plan

- Execute the code as soon as the function is triggered

- Virtual network support. Often the lack of this VNet support is the hurdle in adopting the function in corporate environment

Dedicated Plan

- The same as the App Service Plan in Azure WebApp

### Running functions locally

- Start Storage Emulator

- Start Cosmos DB Emulator, if your function uses Cosmos DB

```javascript
AzureStorageEmulator.exe start
func start
```

### Calling HTTP trigger function endpoint

You can get “Function Url” from Azure Portal. Go to function app > Functions. Select the function you are testing and then you can see a link, “Get Function Url” on the top of the page. The function url will be something like this

```javascript
https://<your-function-resource-name>.azurewebsites.net/api/v1/<function-name>?clientId=blobs_extension
```

You can call the endpoint from Postman. If the resource is protected, you would need an Access Token to call the endpoint. Otherwise, you will get 401 Unauthorized. To get the token, use Azure CLI command, 

```bash
az account get-access-token --resource=api://<your-tennant-id>/<function-resource-name>
```

Then you can call the endpoint.

```bash
curl --location --request POST 'https://<function-resource-name>.azurewebsites.net/api/v1/<function-name>' \
--header 'Authorization: Bearer <your-access-token>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "applicationIds": "33b19e41-3d0c-433a-8f24-f39ce44c5adb"
}'
```

