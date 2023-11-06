---
title: Converting a TypeScript Schema File to GraphQL Schema File
date: 2023-04-28
tags:
  - node.js
  - typescript
---

In a recent project, I needed to convert a TypeScript schema file, **`schema.ts`**, to a GraphQL schema file, **`schema.graphql`**. In this blog post, I will share the steps I took to accomplish this task, including how to resolve a common issue related to TypeScript and the **`fs`** module.


My original TypeScript file, **`schema.ts`**, contained the following content:


```typescript
const typeDefs = `#graphql
  type Query {
    hello: String
    jobs(companyId: String!): [Job]
    job(companyId: String!, jobNo: String!): Job
    user(email: String!): User
  }
`

export default typeDefs
```


To convert **`schema.ts`** to **`schema.graphql`**, I used an npm script:


```json
"print:schema": "ts-node convertSchema.ts"
```


The **`convertSchema.ts`** file contained the following code:


```typescript
import * as fs from 'fs'
import typeDefs from './src/graphql/schema'

fs.writeFileSync('schema.graphql', typeDefs)
```


During my first run, the npm script failed with an error message:


```bash
Cannot find module 'fs' or its corresponding type declarations.
```


The error occurred because my project was a TypeScript project, and the required **`fs`** module was missing its type declarations. After some research, I found this helpful resource: [**https://bobbyhadz.com/blog/typescript-cannot-find-module-fs**](https://bobbyhadz.com/blog/typescript-cannot-find-module-fs)


Based on the recommendations in the resource, I added "node" to the "types" array in my **`tsconfig.json`** file:


```json
{
  "compilerOptions": {
    // ...
    "types": ["node"]
    // ...
  }
}
```


After updating the **`tsconfig.json`** file, I ran the npm script again:


```bash
yarn print:schema
```


This time, the script successfully converted **`schema.ts`** to **`schema.graphql`**.


Converting a TypeScript schema file to a GraphQL schema file can be a simple process, but you may encounter issues related to TypeScript and the **`fs`** module. By following the steps outlined in this blog post, you can successfully convert your schema files while resolving any errors related to TypeScript and the **`fs`** module


