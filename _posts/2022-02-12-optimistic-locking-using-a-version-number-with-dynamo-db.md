---
title: Optimistic Locking Using a Version Number with DynamoDB
date: 2022-02-12T09:51:00.000Z
tags:
  - dynamodb
---

Optimistic locking ensures that the item version in the application is the same as the item version on the server-side before updating or deleting the item. Suppose that you retrieve an item for update and before you send your updates back, some other application updates the same item. Now your update is based on the stale copy of the item. Without optimistic locking, any update you perform will overwrite the update made by the other application.

The optimistic locking feature provides `DynamoDBVersion` tag that you can mark a property of your persistent object. When you first save the object - make sure you pass `Null` for the first save - the `DynamoDBContext` assigns a version number and increments this value each time you update the item. 

```c#
[DynamoDBTable("order-deliveries")]
public class OrderDeliveriesData
{
    [DynamoDBHashKey("orderId")]
    public string OrderId { get; set; }
    
    [DynamoDBProperty("deliveries", typeof(DynamoDbJsonConverter<OrderDelivery[]>))]
    public OrderDelivery[] Deliveries { get; set; }
    
    [DynamoDBVersion]
    public int? VersionNumber { get; set; }
}
```

You can see the `VersionNumber` is nullable `int?` It’s because you have to set it to `Null` when you first save the object. Once it’s saved, the number will auto-increment by 1. Off the topic but I think I can use this feature for have auth-increment numbering.

```c#
public async Task Save(OrderDeliveries orderDeliveries)
{
    await _dynamoDbContext.SaveAsync(new OrderDeliveriesData
    {
        OrderId = orderDeliveries.OrderId.Value,
        Deliveries = orderDeliveries.Deliveries.ToArray(),
        VersionNumber = orderDeliveries.VersionNumber
    });
}
```

References

- [https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBContext.VersionSupport.html](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBContext.VersionSupport.html)

