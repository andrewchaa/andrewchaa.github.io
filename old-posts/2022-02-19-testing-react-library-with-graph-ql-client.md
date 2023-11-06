---
title: Testing React Library with GraphQl client
date: 2022-02-19
tags:
  - graphql
  - react
---

### The `MockedProvider` component

The `MockedProvider` component enables you to define mock responses for individual queries that are executed in your test. This means your test _doesn't_
 need to communicate with a GraphQL server, which removes an external dependency and therefore improves the test's reliability.

```javascript
import React from 'react';
import { gql, useQuery } from '@apollo/client';

// Make sure that both the query and the component are exported
export const GET_DOG_QUERY = gql`
  query GetDog($name: String) {
    dog(name: $name) {
      id
      name
      breed
    }
  }
`;

export function Dog({ name }) {
  const { loading, error, data } = useQuery(
    GET_DOG_QUERY,
    { variables: { name } }
  );
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <p>
      {data.dog.name} is a {data.dog.breed}
    </p>
  );
}
```

```javascript
import TestRenderer from 'react-test-renderer';
import { MockedProvider } from '@apollo/client/testing';
import { GET_DOG_QUERY, Dog } from './dog';

const mocks = []; // We'll fill this in next

it('renders without error', () => {
  const component = TestRenderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Dog name="Buck" />
    </MockedProvider>,
  );

  const tree = component.toJSON();
  expect(tree.children).toContain('Loading...');
});
```

```javascript
const mocks = [
  {
    request: {
      query: GET_DOG_QUERY,
      variables: {
        name: 'Buck',
      },
    },
    result: {
      data: {
        dog: { id: '1', name: 'Buck', breed: 'bulldog' },
      },
    },
  },
];
```

### **Testing the "loading" state**

Don’t _explicitly_ wait for the `Promise`


### **Testing the "success" state**

`await` zero millisecond timeout before performing your checks. This delays the checks until the next “tick” of the event loop, which gives `MockedProvider` an opportunity to populate the mocked result

```javascript
it('should render dog', async () => {
  const dogMock = {
    request: {
      query: GET_DOG_QUERY,
      variables: { name: 'Buck' },
    },
    result: {
      data: { dog: { id: 1, name: 'Buck', breed: 'poodle' } },
    },
  };

  const component = TestRenderer.create(
    <MockedProvider mocks={[dogMock]} addTypename={false}>
      <Dog name="Buck" />
    </MockedProvider>,
  );


  await new Promise(resolve => setTimeout(resolve, 0));

  const p = component.root.findByType('p');
  expect(p.children.join('')).toContain('Buck is a poodle');
});
```

### Testing error states

- Network errors: errors that occur while your client attempts to communicate with your GraphQL server. 

- GraphQL errors: errors that occur while your GraphQL server attempts to resolve your client’s operation.

```javascript
it('should show error UI', async () => {
  const dogMock = {
    request: {
      query: GET_DOG_QUERY,
      variables: { name: 'Buck' },
    },
    error: new Error('An error occurred'),
  };

  const component = TestRenderer.create(
    <MockedProvider mocks={[dogMock]} addTypename={false}>
      <Dog name="Buck" />
    </MockedProvider>,
  );

  await new Promise(resolve => setTimeout(resolve, 0)); // wait for response

  const tree = component.toJSON();
  expect(tree.children).toContain('An error occurred');
});
```

```javascript
const dogMock = {
  // ...
  result: {
    errors: [new GraphQLError('Error!')],
  },
};
```

