---
title: Scan with multiple filters in Dynamo DB
date: 2021-04-05T19:39:43
categories:
  - technical
tags:
  - dynamo-db
---


This is a basic example.

```bash
aws dynamodb scan \
     --table-name Thread \
     --filter-expression "LastPostedBy = :name" \
     --expression-attribute-values '{":name":{"S":"User A"}}'
```

If you need more extensive search, you would have to use Elastic Search or AWS CloudSearch, but if the search operation is intermittent, ths scan should be good enough. 

### Counting the Items in the Results <a id="Scan.Count"></a>

In addition to the items that match your criteria, the `Scan` response contains the following elements:

* `ScannedCount` — The number of items evaluated, before any `ScanFilter` is applied. A high `ScannedCount` value with few, or no, `Count` results indicates an inefficient `Scan` operation. If you did not use a filter in the request, `ScannedCount` is the same as `Count`.
* `Count` — The number of items that remain, _after_ a filter expression \(if present\) was applied.

### Multiple filters

In my case, I wanted multiple filters, `postcode` , `firstname`, and `lastname`. You can comebine filter expressions with `OR` and `AND` 

```bash
aws dynamodb scan --table-name test --select "COUNT" \
    --filter-expression "score = :s OR score = :s1" \
    --expression-attribute-values '{ ":s": { "N": "1" }, ":s1": { "N": "40" } }' \
    --limit 100
```

My C\# code is like this.

```csharp
public async Task<IEnumerable<Registration>> Search(string postcode, 
    string firstname, 
    string lastname)
{
    Console.WriteLine("Retrieving a registration by the given conditions: " +
                      $"postcode: {postcode}, firstname: {firstname}, lastname: {lastname}");

    var response = await _dynamoDbClient.ScanAsync(new ScanRequest()
    {
        TableName = TableNames.Registrations,
        FilterExpression = $"contains({KeyNames.Postcode}, :{KeyNames.Postcode}) AND " 
                           + $"contains({KeyNames.Firstname}, :{KeyNames.Firstname}) AND "
                           + $"contains({KeyNames.Lastname}, :{KeyNames.Lastname})",
        ExpressionAttributeValues = new Dictionary<string, AttributeValue>
        {
            {$":{KeyNames.Postcode}", postcode.ToAttributeValue()},
            {$":{KeyNames.Firstname}", firstname.ToAttributeValue()},
            {$":{KeyNames.Lastname}", lastname.ToAttributeValue()},
        }
    });

    if (response.Count == 0)
    {
        return new List<Registration>();
    }
    
    return response.Items.Select(x => x.ToRegistration());
}

```

