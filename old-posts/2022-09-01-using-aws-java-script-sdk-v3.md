---
title: Using AWS JavaScript SDK v3
date: 2022-09-01
tags:
  - javascript
  - AWS SDK
---

This is how I use JavaScript SDK for my mobile app and backend APIs

## Cognito Identity Provider Client

Using the Amazon Cognito user pools API, you can [create a user pool to manage directories and users](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/dynamodb-example-dynamodb-utilities.html).

To install: `yarn add @aws-sdk/client-cognito-identity-provider`

```typescript
import config from "../config"
import {
  CognitoIdentityProviderClient,
  AdminDeleteUserCommand
} from "@aws-sdk/client-cognito-identity-provider"

const client = new CognitoIdentityProviderClient({
  region: 'eu-west-1'
});

export async function deleteCognitoUser(username: string) : Promise<string> {
  const command = new AdminDeleteUserCommand({
    UserPoolId: config.userPoolId,
    Username: username
  });

  try {
    const response = await client.send(command);
    return ''
  } catch (error) {
    console.error(error)
    return (error as Error).message
  }
}
```

## DynamoDB Client

The full documentation of dynamodb client is here, [https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/index.html](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/index.html)

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

### Query

You have to [convert DynamoDB Record to JavaScript](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/modules/_aws_sdk_util_dynamodb.html) object with `unmarshall`

```javascript
export async function getJobs(email: string)
  : Promise<[Job[], string, string]> {

  const params = {
    TableName: tableName,
    KeyConditionExpression: "email = :email",
    ExpressionAttributeValues: {
      ":email": { S: email },
    }
  }

  try {
    const result = await ddbDocClient.send(new QueryCommand(params))

    return [
      result.Items?.map(x => unmarshall(x)) as Job[],
      result.$metadata.httpStatusCode.toString(),
      ''
    ]
  } catch (error) {
    console.log(error)
    return [
      {} as Job[],
      error.$metadata.httpStatusCode,
      (error as Error).message
    ]
  }
}
```

