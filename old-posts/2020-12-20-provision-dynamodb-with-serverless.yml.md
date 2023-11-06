---
title: Provision DynamoDb with serverless.yml
date: 2020-12-20T19:42:20
categories:
  - technical
tags:
  - serverless
---


More details to here: [https://www.serverless.com/dynamodb](https://www.serverless.com/dynamodb) 

```yaml
resources:
  Resources:
    companies:
      Type: AWS::DynamoDB::Table
      Properties:
        TableName: companies
        AttributeDefinitions:
          - AttributeName: gasSafeNumber
            AttributeType: S
        KeySchema:
          - AttributeName: gasSafeNumber
            KeyType: HASH
        ProvisionedThroughput:
          ReadCapacityUnits: 3
          WriteCapacityUnits: 3
```



