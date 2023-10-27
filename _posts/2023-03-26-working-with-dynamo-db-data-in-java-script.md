---
title: Working with DynamoDB data in JavaScript
date: 2023-03-26
tags:
  - dynamodb
  - typescript
  - javascript
---

AWS DynamoDB is a fully managed NoSQL database service provided by Amazon Web Services (AWS). It is designed to deliver fast and predictable performance with seamless scalability, making it suitable for various use cases, such as gaming, mobile applications, Internet of Things (IoT), web applications, and more.

## Query

### Query all items in the partition by the partition key

```typescript
export async function getUsers(
  companyId: string
): Promise<[User[], string, string]> {
  console.info(
    `usersRepository - getting users by the companyId: ${companyId} - ${tableName}`
  )

  const params = {
    TableName: tableName,
    KeyConditionExpression: 'companyId = :companyId',
    ExpressionAttributeValues: {
      ':companyId': {
        S: companyId,
      },
    },
  }

  try {
    const result = await ddbDocClient.send(new QueryCommand(params))
    if (!result.Items) {
      return [[] as User[], statusCodes.NOT_FOUND, 'users not found']
    }

    return [
      result.Items.map(item => unmarshall(item) as User),
      statusCodes.OK,
      '',
    ]
  } catch (error) {
    return [
      [] as User[],
      error.$metadata.httpStatusCode,
      (error as Error).message,
    ]
  }
}
```

`QueryCommand` return items as `Recode<string, AttributeValue>`. `AttributeValue` is an object that has the type of the data and the value of the data in this way

```typescript
name: {
	'S': 'Jean'
}
```

To map it to a javascript object, we can use `unmarshall` function, which belongs to @aws-sdk/util-dynamodb. You need to install the package. For more information, refer to [AWS SDK for JavaScript v3 unmarshall](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/functions/_aws_sdk_util_dynamodb.unmarshall.html).

```typescript
yarn add @aws-sdk/util-dynamodb
```

### Query an item by GSI (Global Secondary Index)

Unfortunately, you can’t use `GetItemCommand` if the key is GSI. Only `QueryCommand` supports index.

```typescript
export async function getUser(email: string): Promise<[User, string, string]> {
  console.info(
    `usersRepository - getting a user by email: ${email} - ${tableName}`
  )

  const params = {
    TableName: tableName,
    IndexName: 'emailIndex',
    KeyConditionExpression: 'email = :email',
    ExpressionAttributeValues: {
      ':email': {
        S: email,
      },
    },
  }

  try {
    const result = await ddbDocClient.send(new QueryCommand(params))
    if (!result.Items) {
      return [{} as User, statusCodes.NOT_FOUND, 'user not found']
    }

    return [unmarshall(result.Items[0]) as User, statusCodes.OK, '']
  } catch (error) {
    return [
      {} as User,
      error.$metadata.httpStatusCode,
      (error as Error).message,
    ]
  }
}
```

## Scan

`scan` let you go through all items in the collection. Of course, you pay more for scanning the data.

### Scan through all items

Use `LastEvaluatedKey` and `ExclusiveStartKey`

```typescript
const dynamoDbClient = new DynamoDBClient({ region: config.region });

let registrations: Registration[] = [];
let params = {
  TableName: "registrations-dev",
  ExclusiveStartKey: undefined as any
};

async function run() {
  do {
    const result = await dynamoDbClient.send(
      new ScanCommand(params)
    );

    params.ExclusiveStartKey = result.LastEvaluatedKey
    registrations = registrations.concat(result.Items?.map((x) => unmarshall(x)) as Registration[])
  }
  while (params.ExclusiveStartKey !== undefined)

  // csv
  const csv = Papa.unparse(registrations, {})

  fs.writeFileSync("registrations.csv", csv);
}
```

