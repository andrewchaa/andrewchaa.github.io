---
title: My GraphQL Note
date: 2023-02-10
tags:
  - graphql
---

GraphQL is a query language for APIs, and a runtime for executing these queries against your data. It was developed by Facebook and publicly released in 2015.

In traditional REST APIs, you would have to make multiple API calls to retrieve the desired data, but with GraphQL, you make a single call to retrieve exactly what you need. With GraphQL, the client specifies the structure of the data it needs, and the server returns only the requested data.

GraphQL also has a type system that allows you to describe the data in your API, so that the client knows what it can request and what the server can return. This type system provides a contract between the client and the server, and helps catch errors before they happen.

One of the main advantages of GraphQL is that it allows for more efficient and flexible communication between the client and the server. Clients can specify exactly what data they need, and the server will return only that data, reducing the amount of unnecessary data transfer.

### GraphQL IDE

- [Apollo Studio](https://studio.apollographql.com) 

- [Graphiql](https://github.com/graphql/graphiql)

To use Apollo Studio, follow the tutorial: 

[bookmark](https://www.apollographql.com/docs/federation/quickstart/setup/)

## Queries

Schema Definition Language, SDL, is the syntax for writing schemas.

```graphql
type Topping {
  id: Int!
  topping: String!
}

type Pizza {
  id: Int!
  pizza: String!
  toppings: [Topping!]!
}
```

```graphql
// operation, operation name
query getPizzas{
  pizzas{
    pizza
  }
}

{
  "data": {
    "pizzas": [
      {
        "pizza": "Neapolitan Pizza"
      },
      {
        "pizza": "Chicago Pizza"
      }
    ]
  }
}
```

### Server

Apollo Server is an [**open-source**](https://github.com/apollographql/apollo-server)**, spec-compliant GraphQL server** that's compatible with any GraphQL client, including [Apollo Client](https://www.apollographql.com/docs/react). 

With `@as-integrations/aws-lambda` package, you can easily set up and run Apollo Server on AWS lambda

```typescript
import { Context } from 'aws-lambda'
require('dotenv').config()

import { ApolloServer } from '@apollo/server'
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default'
import {
  startServerAndCreateLambdaHandler,
  handlers,
} from '@as-integrations/aws-lambda'

import config from '../config'
import resolvers from './resolvers'

const Sentry = require('@sentry/serverless')
Sentry.AWSLambda.init({
  dsn: config.sentryDsn,
  tracesSampleRate: 1.0,
})

const typeDefs = require('./schema.graphql')
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  csrfPrevention: true,
  cache: 'bounded',
  plugins: [
    process.env.NODE_ENV === 'production'
      ? ApolloServerPluginLandingPageProductionDefault()
      : ApolloServerPluginLandingPageLocalDefault({ embed: true }),
  ],
})

console.info('Starting graphql server')

export const handler = startServerAndCreateLambdaHandler(
  server,
  handlers.createAPIGatewayProxyEventRequestHandler()
)
```

I put all schema definitions in `schema.graphql` file. It’s handy to define schemas in a separate file with `.graphql` extension as VS Code will syntax-highlighting the content. To import the file, I use Webpack’s `asset/source` loader

```typescript
const path = require('path')

module.exports = {
  target: 'node',
  entry: {
    graphql: './src/graphql/index.ts',
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        type: 'asset/source',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    library: {
      type: 'commonjs2',
    },
    filename: '[name]/index.js',
    path: path.resolve(__dirname, 'dist'),
  },
}
```

