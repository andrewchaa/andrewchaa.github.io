---
title: Integration Testing GraphQL Queries with Apollo Server
date: 2023-05-10
tags:
  - graphql
  - apollo
  - integration test
---

Integration testing is a crucial part of ensuring the reliability and stability of your application. When working with GraphQL, Apollo Server provides a convenient way to perform integration tests on your queries. In this blog post, we'll walk through the process of setting up and executing an integration test for a GraphQL query using Apollo Server's **`executeOperation`** function.
For reference, you can consult this documentation on testing with Apollo Server: [**https://www.apollographql.com/docs/apollo-server/testing/testing/**](https://www.apollographql.com/docs/apollo-server/testing/testing/)

### Show me code!

Here's an example of how I wrote an integration test for a GraphQL query using Apollo Server:

```typescript
import { ApolloServer } from '@apollo/server'
import typeDefs from '../../src/graphql/schema'
import resolvers from '../../src/graphql/resolvers'
import assert from 'assert'

const testServer = new ApolloServer({
  typeDefs,
  resolvers,
})

describe('graphql users query', () => {
  it('should fetch users for a specific company', async () => {
    const response = await testServer.executeOperation({
      query: `
        query getUsers($companyId: String!) {
          users(companyId: $companyId) {
            companyId
            companyName
            firstname
            lastname
            email
            gasSafetyNumber
            oftecNumber
          }
        }
      `,
      variables: { companyId: 'CT01' },
    })

    assert(response.body.kind === 'single')
    expect(response.body.singleResult.errors).toBeUndefined()
    expect(response.body.singleResult.data!.users).toBeDefined()
  })
})
```

### Using **`executeOperation`** for Testing:

The **`executeOperation`** function allows you to run operations through the request pipeline without sending an HTTP request. This simplifies the testing process and enables you to focus on the behaviour of your queries.
In this example, we use Node's **`assert`** to narrow the type of **`body`** in our **`expect`** statements. To use **`assert`**, you'll need to import it like so:

```typescript
import assert from 'assert'
```

### Jest Configuration with Environment Variables:

In the backend repository code, I used an environment variable called **`run-env`**. So, if the variable is not populated, the repository code wouldn’t work. To incorporate this into our Jest setup, we can use **`dotenv/config`** as shown in the code snippet below:

```javascript
module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  setupFiles: ['dotenv/config'],
}
```

Testing your GraphQL queries is essential to ensure the reliability of your application. By using Apollo Server's **`executeOperation`** function and following the guidelines provided here, I hope you can effectively set up and execute integration tests for your GraphQL queries

