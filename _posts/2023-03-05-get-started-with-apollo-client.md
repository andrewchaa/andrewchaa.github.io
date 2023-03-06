---
title: Get started with Apollo Client
date: 2023-03-05
tags:
  - graphql
  - apollo
---

Applications that use Apollo Client require two top-level dependencies:

- `@apollo/client`: This single package contains virtually everything you need to set up Apollo Client. It includes the in-memory cache, local state management, error handling, and a React-based view layer.

- `graphql`: This package provides logic for parsing GraphQL queries.

### Resources

- [https://www.apollographql.com/docs/react/get-started](https://www.apollographql.com/docs/react/get-started)

### Install the client and test run

```bash
npm install @apollo/client graphql
```

```typescript
import { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client'
import Add from './components/Add';
import List from './components/List';
import { items as groceryList } from './data';
import { GroceryItem } from './types';

function App() {
  const [items, setItems] = useState<GroceryItem[]>(groceryList);
  const addToItems = (item: GroceryItem) => {
    setItems([...items, item])
  }

  const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache()
  })

  client
    .query({
      query: gql`
        query GetItems {
          groceryItems {
            name
            done
          }
        }
      `
    })
    .then(result => console.log(result));

  const toggle = (name: string) => {
    const newItems = items.map(item => {
      if (item.name === name) {
        return {
          ...item,
          done: !item.done
        }
      }
      return item;
    })
    setItems(newItems);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Grocery List</h1>
      <div className="App">
        <div><List items={items} toggle={toggle} /></div>
        <div className="pt-10">
          <Add addToItems={addToItems} />
        </div>
      </div>
    </div>
  )
}

export default App;
```

### Connect the client to React

```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

