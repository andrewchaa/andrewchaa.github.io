---
title: Creating a test Subscription to Azure Service Bus Topic
date: 2020-09-04T06:48:36
categories:
  - technical
tags:
  
---


To solve the issue, I create another subscription, "\*-test". It'll be only created when the service runs in Debug mode on a local development machine. 

```csharp
public static void ConfigureServices(HostBuilderContext context, IServiceCollection services)
{
    ....
#if DEBUG
    var client = new ManagementClient(serviceBusOptions.ConnectionString);
    foreach (var topic in new[]
    {
        EventNames.TransactionCreated,
    })
    {
        if (!client.SubscriptionExistsAsync(topic, EventNames.Subscripton).GetAwaiter().GetResult())
        {
            client.CreateSubscriptionAsync(new SubscriptionDescription(topic,
                EventNames.Subscripton));
        }
    }
#endif
    ....    

```

