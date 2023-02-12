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

