---
title: Using DynamoDB JavaScript AWS SDK
date: 2022-09-01
tags:
  - javascript
  - AWS SDK
---

The full documentation is here, [https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/index.html](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/index.html)

### To read and write an item in DynamoDB

```javascript
// dynamodbClient.ts
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb"
import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import 'dotenv/config'

export const ddbClient = new DynamoDBClient({ region: 'eu-west-1' })
export const ddbDocClient = DynamoDBDocumentClient.from(ddbClient)
```

```javascript
import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb"
import config from "../config"
import { ddbDocClient } from "./dynamodbClient"
import { Job } from "./types"

const tableName = `${config.component}-jobs-${config.run_env}`

export async function upsertJob(job: Job) : Promise<[Job, string]> {
  const params = {
    TableName: tableName,
    Item: job
  }

  try {
    await ddbDocClient.send(new PutCommand(params))
    return [job, '']
  } catch (error) {
    console.log(error)
    return [job, (error as Error).message]
  }
}

export async function getJob(email: string, jobId: string)
  : Promise<[Job, string]> {

  const params = {
    TableName: tableName,
    Key: {
      email,
      jobId
    }
  }

  try {
    const result = await ddbDocClient.send(new GetCommand(params))
    return [result.Item as Job, '']
  } catch (error) {
    console.log(error)
    return [{} as Job, (error as Error).message]
  }
}
```

