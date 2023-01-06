---
title: What I learned in June 2022
date: 2022-06-13
tags:
  - til
---

Mon. 27 June

You can [run Cisco AnyConnect command from the terminal](https://superuser.com/questions/649614/connect-using-anyconnect-from-command-line)

```bash
printf 'USERNAME\nPASSWORD\ny' | /opt/cisco/anyconnect/bin/vpn -s connect HOST
```

It’s the same as you type your user id and password but you can script it so that you don’t have to type in the same details

26 June

In typescript, `interface` and `type` are almost the same, except `interface` has merge capability. I’m not sure if I would ever use interface merge, though.

[https://stackoverflow.com/questions/37233735/interfaces-vs-types-in-typescript](https://stackoverflow.com/questions/37233735/interfaces-vs-types-in-typescript)

```typescript
interface Point {
    x: number;
    y: number;
}

// could be written as the type alias

type Point = {
    x: number;
    y: number;
};
```

24 June

A [GraphQL Playground](https://github.com/graphql/graphql-playground) Config file. It’s a JSON file that you can store all your endpoints.

```json
{
  "schemaPath": "schema.graphql",
  "extensions": {
    "endpoints": {
      "orders_uat": {
        "url": "https://orders.uat.api.com/graphql"
      }
    }
  }
}
```

22 June

A handy [UK postcode npm package](https://github.com/ideal-postcodes/postcode)

```javascript
import { parse } from 'postcode'

const parsedPostcode = parse(postcode)
if (!parsedPostcode.valid) {
  setValidation({...validation, postcode: 'The postcode is invalid'})
}
setPostcode(parsedPostcode.postcode || '')
```

21 June

### Network Link Coordinator

This is a handy tool to test the network connectivity of your mobile application. To use it, download AdditionalTools from [apple developer website](https://developer.apple.com/download). 

Once it’s downloaded, open the `.dmg` file and install `Network Link Condition.prefPane` by double-clicking it in `Hardware` folder. It’ll be installed in the system preference, so you can search it there from next time. 

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/ee064a04-3de4-43d4-b868-5dd4a811ff24/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230106%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230106T002554Z&X-Amz-Expires=3600&X-Amz-Signature=4140acccb5cb3a9c91daa1647183eb7da59f586df983e018023242ea92c87158&X-Amz-SignedHeaders=host&x-id=GetObject)

Querying DynamoDB data with javascript SDK v3

[DynamoDBDocumentClient](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#query-property) has [different syntax](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/LegacyConditionalParameters.KeyConditions.html). Use `KeyConditionExpression` instead of `KeyConditions`

```javascript
import { Context } from 'aws-lambda'
import { QueryCommand } from '@aws-sdk/lib-dynamodb'

import { ddbDocClient } from '../services/dynamodbClient'

export const handler = async (ev: any, context: Context) => {
  console.log(ev)
  const params = {
    TableName: `table-${process.env.run_env}`,
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': ev.arguments.userId
    }
  }

  try {
    const data = await ddbDocClient.send(new QueryCommand(params))
    return data.Items
  } catch (error) {
    throw error
  }
}
```

You can run the code locally with `yarn` command.

```json
"run-list-registrations-by-userid": 
  "yarn build && node -e \"require('./dist/list-by-userid').handler(require('./list-by-userid-event.json')).then(x => console.log(x));\"",
```

### PBXResourcesBuildPhase unknown UUID

I did `pod install` and had an error saying “PBXResourcesBuildPhase attempted to initialize an object with an unknown UUID”

There seem to be a merge issue when I installed a couple of react-native pod packages. [A stackoverflow answer](https://stackoverflow.com/questions/36597286/pbxresourcesbuildphase-uuid-attempted-to-initialize-an-object-with-an-unkno) helped me out. 

```bash
pod deintegrate app.xcodeproj
pod install
```

