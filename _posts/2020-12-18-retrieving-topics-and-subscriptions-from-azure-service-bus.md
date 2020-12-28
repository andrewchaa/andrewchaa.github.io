---
title: Retrieving Topics and Subscriptions from Azure Service Bus
date: 2020-12-18T15:40:45
categories:
  - technical
tags:
  - azure-service-bus
---


```csharp
var managementClient = new ManagementClient(_configs.ServiceBusConnectionString);
var topics = new List<TopicDescription>();

for (int i = 0; i < 1000; i += 100)
{
    var ts = await managementClient.GetTopicsAsync(100, i);
    if (!ts.Any())
        break;

    topics.AddRange(ts);
}

await Populate(topics.Select(x => new DomainEventTopic(x.Path, 0)));

```

