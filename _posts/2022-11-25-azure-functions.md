---
title: Azure Functions
date: 2022-11-25
tags:
  - azure function
---

My note on Azure Functions

### 3 Hosting Plans

Consumption Plan

- an ideal serverless plan but you may encounter a cold-start phenomenon

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

