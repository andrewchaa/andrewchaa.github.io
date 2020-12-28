---
title: Using TimeSpan configuration values in .NET Core
date: 2020-06-30T10:44:03
categories:
  - technical
tags:
  
---


```javascript
"CosmosDb": {
  "ConnectionString": "AccountEndpoint=#{cosmos_db_endpoint}#;AccountKey=#{cosmos_db_primary_master_key}#;",
  "MaxRetryAttemptsOnRateLimitedRequests": 9,
  "MaxRetryWaitTimeOnRateLimitedRequests": "00:00:30" 
}
```

.NET Core support the conversion of the format to TimeSpan out of the box.

```csharp
// CosmosDbOptions.cs
public class CosmosDbOptions
{
    public string ConnectionString { get; set; }
    public int MaxRetryAttemptsOnRateLimitedRequests { get; set; }
    public TimeSpan MaxRetryWaitTimeOnRateLimitedRequests { get; set; }
}

// Startup.cs
public void ConfigureServices(IServiceCollection services)
{
    services.Configure<CosmosDbOptions>(Configuration.GetSection("CosmosDb"));
    var cosmosDbOptions = services.BuildServiceProvider().GetService<IOptions<CosmosDbOptions>>().Value;

    ....
    var client = new CosmosClient(cosmosDbOptions.ConnectionString, 
        new CosmosClientOptions
        {
            MaxRetryAttemptsOnRateLimitedRequests = cosmosDbOptions.MaxRetryAttemptsOnRateLimitedRequests,
            MaxRetryWaitTimeOnRateLimitedRequests = cosmosDbOptions.MaxRetryWaitTimeOnRateLimitedRequests
        });
    var container = client.GetContainer("xxxxx", "xxxxxxxxxxx");

```



