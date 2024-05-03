---
title: Mocking Class Instance Using Jest
date: 2024-05-03
tags:
  - jest
  - mock
---
Jest can be used to mock ES6 classes. ES6 classes are just constructor functions with some syntactic sugar. Therefore, any mock for an ES6 class must be a function. You can mock them using mock functions. 

Let's start with the code we want to test:
```typescript
require('dotenv').config()
import { MongoClient, ServerApiVersion } from 'mongodb'

const client = new MongoClient(
  process.env.mongodb_connection_string, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
})
const database = client.db('service-agent')
const jobsCollection = database.collection('jobs')

```

This code creates a new instance of `MongoClient`, connects to a MongoDB database, and retrieves a collection name `jobs`.
You can see `MongoClient` constructor function returns a client object that has `db` property. The `db` property is another function that returns a database object that contains `collection` property. This keeps going on and on. So, let use mock function to mock them

```typescript
jest.mock('mongodb', () => {
  return {
    MongoClient: jest.fn(() => ({
      db: jest.fn(() => ({
        collection: jest.fn(() => ({
          find: jest.fn(() => ({
            toArray: jest.fn(() => [{ /* your mock data */ }])
          }))
        }))
      })),
    })),
    ServerApiVersion: {
      v1: 'v1',
    },
  }
})
```

Mocking class instances with Jest can be a bit confusing at first but it's not too different from mocking the usual functions. In JavaScript, ES6 class is just a constructor function with some syntactic sugar.