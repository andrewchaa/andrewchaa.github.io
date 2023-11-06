---
title: Set up a GraphQL server in express
date: 2023-03-05
tags:
  - graphql
---

### Resources

- [https://www.apollographql.com/docs/apollo-server/getting-started](https://www.apollographql.com/docs/apollo-server/getting-started)
- [https://stackoverflow.com/questions/44979976/how-to-resolve-node-js-es6-esm-modules-with-the-typescript-compiler-tsc-tsc](https://stackoverflow.com/questions/44979976/how-to-resolve-node-js-es6-esm-modules-with-the-typescript-compiler-tsc-tsc)
- [https://www.apollographql.com/tutorials/fullstack-quickstart](https://www.apollographql.com/tutorials/fullstack-quickstart)

### Create and set up a new project with dependencies


Create a new project and install dependencies


```bash
mkdir graphql-server-example
cd graphql-server-example

npm init --yes
yarn add @apollo/server graphql
```


Create a TypeScript file and install TypeScript dependencies


```bash
mkdir src
touch src/index.ts
yarn add -D typescript @types/node

touch tsconfig.json
```


```json
// tsconfig.json
{
  "compilerOptions": {
    "rootDirs": ["src"],
    "outDir": "dist",
    "lib": ["es2020"],
    "target": "es2020",
    "module": "esnext",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "types": ["node"]
  }
}
```


Update the `package.json` file with the following `type` and `scripts` entries


```json
  "type": "module",
  "scripts": {
    "compile": "tsc",
    "start": "yarn compile && node ./dist/index.js",
  },
```


### Define your schema, data set, and a resolver


```typescript
// index.ts
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import resolvers from './resolvers.js'
import typeDefs from './typeDefs.js'

const server = new ApolloServer({ typeDefs, resolvers })
const { url } = await startStandaloneServer(server, { listen: { port: 4000 }})
console.log(`🚀 Server ready at ${url}`)
```


```typescript
// data.ts
export const groceryItems = [
  { name: 'Milk', done: false },
  { name: 'Eggs', done: true },
  { name: 'Bread', done: false },
]
```


```typescript
// resolvers.ts
import { groceryItems } from "./data.js"

const resolvers = {
  Query: {
    groceryItems: () => groceryItems,
  },
}

export default resolvers
```


```typescript
const typeDefs = `#graphql
  type GroceryItem {
    name: String
    done: Boolean
  }

  type Query {
    groceryItems: [GroceryItem]
  }
`

export default typeDefs
```


Adding `#graphql` to the beginning of a [template literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) provides GraphQL syntax highlighting in supporting IDEs.


With ESNext module, TypeScript doesn’t resolve the module with partial name. You have to specify `.js` in the import statement. It’s annoying, though.


