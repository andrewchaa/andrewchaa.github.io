---
title: Handle Variables and Dynamic Values with `jest.fn()`
date: 2024-03-14
tags:
  - javascript
  - mock
  - jest
---
When it comes to testing React applications with Jest, mocking dependencies is a common practice to ensure reliable and isolated tests. However, there are scenarios where you might need to mock dependencies that rely on variables or dynamic values. 
### The Challenge: Mocking Dependencies with Variables

Let's say you have a component that uses the `useParams` hook from the `react-router-dom` library to access route parameters. You want to mock this dependency in your tests, but you also need to provide a dynamic value for the `nodeId` parameter based on your test data. Here's an example:

```javascript
// nodeId is not available yet
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ nodeId })
}));
```

The issue with this approach is that `jest.mock()` is executed at the beginning of the test file, before any variables or constants are defined. As a result, `nodeId` is not available when the mocking function is executed, leading to potential undefined behaviour or errors.

### The Solution: Using `jest.fn()` and `mockReturnValue()`

To overcome this challenge, we can leverage the power of `jest.fn()` and `mockReturnValue()`. Instead of directly mocking the `useParams` hook with a specific value, we can create a mock function and set its return value dynamically within our tests. Here's how you can do it:

```javascript
import { useParams } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn()
}));

describe('ActivityReviewGraph', () => {
  useParams.mockReturnValue({ accountUid: nodesId });
  // ...
})
```

In this example, we first import the `useParams` hook from `react-router-dom`. Then, we mock the `react-router-dom` module using `jest.mock()`, but instead of providing a specific implementation for `useParams`, we assign `jest.fn()` to it. This creates a mock function that we can control later in our tests.

Within the `describe` block for our component, we use `useParams.mockReturnValue({ accountUid: nodesId })` to set the return value of the mocked `useParams` function based on the value of the `nodesId` variable.

By following this approach, we can easily mock dependencies that rely on dynamic values or variables without running into issues related to the execution order of `jest.mock()`.