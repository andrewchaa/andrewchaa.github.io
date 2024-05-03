---
title: Mocking ES6 Class Instances with Jest
date: 2024-05-03
tags:
  - jest
  - mock
---
Jest can be used to mock ES6 classes. ES6 classes are essentially constructor functions with some syntactic sugar. Therefore, any mock for an ES6 class must be a function. You can mock them using Jest's mock functions. 

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
You can see `MongoClient` constructor function returns a client object that has `db` property. The `db` property is another function that returns a database object containing `collection` property. This pattern continues recursively. So, let use mock functions to mock them.

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

Mocking class instances with Jest can be a bit confusing at first but it's not too different from mocking regular functions. In JavaScript, ES6 class is just a constructor function with some syntactic sugar.
In the mock code above, we're mocking the entire mongodb module using `jest.mock('mongodb')`. Inside the mock function, we return an object that mimics the structure of the `mongodb` module.
We mock the `MongoClient` class by creating a jest.fn that returns an object with the db method mocked. The `db` method is also mocked as a jest.fn that returns an object with the collection method mocked. The `collection` method is mocked as a jest.fn that returns an object with the find method mocked. The `find` method is mocked as a jest.fn that returns an object with the `toArray` method mocked. Finally, the `toArray` method is mocked as a jest.fn that returns an array containing your mock data.
When mocking class instances with Jest, it's important to understand the structure and interactions of the class methods and properties. By creating mock functions that mimic the behaviour of the real implementation, you can isolate your tests and ensure reliable and consistent results.