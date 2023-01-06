---
title: Setting up a GraphQL server in Javascript on AWS Lambda
date: 2023-01-02
tags:
  - graphql
  - lambda
---

Setting up a GraphQL server in JavaScript on AWS Lambda can be a powerful way to build scalable and flexible APIs for your web and mobile applications. In this blog post, we will walk through the steps of setting up a GraphQL server using Node.js and the express-graphql library, and deploying it to AWS Lambda.

## **Prerequisites**

Before we get started, you will need to have the following tools installed:

- Node.js and npm (or yarn)

- Terraform

## **Setting up your project**

First, create a new directory for your project and initialize a new Node.js project using npm or yarn. The folder structure is like this

```bash
src
- graql-server
  index.ts
babel.config.js
package.json
tsconfig.json
```

```bash
yarn add @apollo/server graphql @as-integrations/aws-lambda
```

`src/graphql-post/index.ts`

```typescript
import { ApolloServer } from '@apollo/server'
import { startServerAndCreateLambdaHandler } from '@as-integrations/aws-lambda'

const typeDefs = gql`
  type Query {
    hello: String
  }
`

const resolvers = {
  Query: {
    hello: () => {
      return 'Hello world!'
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
})

console.log('Starting graphql server')

export const handler = server.createHandler()
```

## **Provision AWS lambda function**

Please refer to the [lambda provision page](/70e8f289a3df45138d9c82b31c3b9672).

### Send hello query on GraphQL Playground

Make sure you have Homebrew installed on your machine and install GraphQL Playground using Homebrew.

```bash
brew install --cask graphql-playground
```

Open up Spotlight Search by pressing `cmd + space` and rRun GraphQL Playground by typing `graphql-playground`. This will start a local instance of GraphQL Playground 

In the GraphQL Playground, enter the following query in the left panel:

```graphql
query {
  hello
}
```

Click the "Play" button to send the query. You should see a response like:

```graphql
{
  "data": {
    "hello": "Hello world!"
  }
}
```

