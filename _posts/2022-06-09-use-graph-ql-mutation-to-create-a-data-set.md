---
title: use GraphQL mutation to create a data set
date: 2022-06-09T17:30:00.000Z
tags:
  - graphql
---

I have developed a mobile app for one of my main side-hustle customers. Recently, they asked for a offline feature, in which their boiler engineers can enter the boiler information on their phone even though there isn’t any wifi or 4/5G network. 

As the backend of the mobile app is on AWS I gave it AppSync a try. Currently, the mobile app makes an API call to the API Gateway. I newly created AppSync GrpahQL endpoint and a [Mutation type in the schema](https://graphql.org/learn/schema/).

```graphql
schema {
  query: Query
  mutation: Mutation
}

type Registration {
  userId: ID!
  registrationId: ID!
  serialNumber: String!
  model: String!
  installationDate: String!
  firstName: String!
  lastName: String!
  contactNo: String!
  emailAddress: String
  door: String
  street: String
  city: String
  county: String
  postcode: String!
  warrantyDate: String
  warrantyYear: String
}

type Mutation {
  createRegistration(
    userId: ID!
    registrationId: ID!
    serialNumber: String!
    model: String!
    installationDate: String!
    firstName: String!
    lastName: String!
    contactNo: String!
    emailAddress: String
    door: String
    street: String
    city: String
    county: String
    postcode: String!
    warrantyDate: String
    warrantyYear: String
  ): Registration!
}

type Query {
  listRegistrations: [Registration]!
}
```

To design a GraphQL API, you need the followings

- Design your Schema

- Attach a data source

- [Configure Resolvers](https://docs.aws.amazon.com/appsync/latest/devguide/resolver-util-reference.html#aws-appsync-resolver-mapping-template-util-reference)

My data source is two lambdas that list the registrations and that insert the registration details to the DynamoDB.

```graphql
# request resolver
{
  "version": "2018-05-29",
  "operation": "Invoke",
  "payload": {
    "arguments": $utils.toJson($context.arguments)
  }
}

# response resolver
$util.toJson($context.result)
```

They are simple [lambda resolvers](https://docs.aws.amazon.com/appsync/latest/devguide/tutorial-lambda-resolvers.html) as most of the things are done in the lambdas.

`create-registration` is a simple lambda.

```javascript
import { Context } from 'aws-lambda'
import { PutCommand } from '@aws-sdk/lib-dynamodb'
import { DateTime } from 'luxon'
require('dotenv').config()

import { ddbDocClient } from '../services/dynamodbClient'
import { Registration } from '../types/types'
import { isSerialNumberUsed } from './serialNumberChecker'

export const handler = async (ev: any) => {
  const tableName = `registrations-${process.env.run_env}`

  const registration = ev.arguments as Registration

  if (await isSerialNumberUsed(registration.serialNumber)) {
    throw new Error(
      'The product serial number has already been already registered. ' +
      'Please contact the service team : service@company.com'
    )
  }

  if (!registration.warrantyYear) {
    registration.warrantyYear = -1
  }

  registration.postcode = registration.postcode.toUpperCase()
  registration.postCode = registration.postcode
  const today = DateTime.now()
  registration.registrationDate = today.toFormat('dd/MM/YYYY')
  registration.registrationDateIso = today.toISODate()
  registration.updateDateIso = today.toISODate()

  const params = {
    TableName: tableName,
    Item: {
      ...registration
    }
  }

  try {
    await ddbDocClient.send(new PutCommand(params))
    return registration
  } catch (error) {
    throw error
  }
}
```

I used the [AWS SDK v3](https://www.rwilinski.me/blog/migrating-to-aws-sdk-v3/). It has nicer async await support. I’m not a big fan of call back functions.

I’m new to typescript. I followed [AWS’s guide on typescript lambda](https://docs.aws.amazon.com/lambda/latest/dg/lambda-typescript.html) but it wasn’t still very clear how I can do it. Some examples use SAM. Others CDK. 

Initially, I used tsc compile to generate the javascript for the lambda handler and somehow it didn’t work when I uploaded it to the cloud. It worked fine on my local machine. I ended up using [esbuild](https://esbuild.github.io/). 

```json
{
  "scripts": {
    "build": "esbuild src/*/index.ts --bundle --sourcemap --platform=node --target=es2020 --outdir=dist",
    "locally": "yarn build && node -e \"require('./dist/create-registrations').handler(require('./event.json')).then(x => console.log(x));\"",
  },
}
```

