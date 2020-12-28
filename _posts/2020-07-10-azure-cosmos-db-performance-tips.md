---
title: Azure Cosmos DB performance tips
date: 2020-07-10T19:19:02
categories:
  - technical
tags:
  
---


* For query-intensive workloads, [use Windows 64-bit](https://docs.microsoft.com/en-us/azure/cosmos-db/performance-tips-dotnet-sdk-v3-sql)

## Networking

If possible, user Direc mode, which is the default

Direct mode supports connectivity through TCP protocol and is the default connectivity mode if you're using the [Microsoft.Azure.Cosmos/.NET V3 SDK](https://github.com/Azure/azure-cosmos-dotnet-v3). This offers better performance and requires fewer network hops than Gateway mode.

Gateway mode is handy when your applications run withint a corporate network with strict firewall

## SDK

#### Install the most recent SDK. Not surprising

#### Use a singleton Cosmos DB Client for the lifetime of your application

Each `CosmosClient` instance is thread-safe and performs efficient connection management and address caching when operating in direct mode. To allow efficient connection management and better SDK client performance, we recommend that you use a single instance per `AppDomain` for the lifetime of the application.

#### Disable content response on write operations

For workloads that have heave create payloads set the EnableContentResponseOnWrite request option to false. The service will no longer return the created or updated resource to the SDK. Normally the application has the object being created so it does not need the service to return it. The header values are still accessible like request charge. This can improve performance because the SDK will no longer need to allocate memory or serialize the body of the response. This also reduces the network bandwidth usage to further help performance.C\#Copy

```csharp
var requestOptions = new ItemRequestOptions() { EnableContentResponseOnWrite = false };
var itemResponse = await this.container.CreateItemAsync<Book>(book, new PartitionKey(book.pk), requestOptions);
// Resource will be null
itemResponse.Resource
```



