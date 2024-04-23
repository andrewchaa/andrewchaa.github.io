---
title: Simplifying API Mocking with Mock Service Worker (msw)
date: 2024-03-12
tags:
  - javascript
  - mock
  - msw
---
Often we need to test our code's interactions with APIs. However, relying on live APIs can be problematic, especially during the development and testing phases. That's where mock APIs come into play, and one powerful tool for mocking API calls is Mock Service Worker (msw).

### What is Mock Service Worker (msw)?

Mock Service Worker (msw) is a library that helps you mock API requests and responses in your web applications. It intercepts outgoing requests and returns mocked responses, allowing you to test your code without relying on actual APIs. This approach ensures that your tests are predictable, reliable, and fast.

## Why Use msw?

Using msw offers several benefits:

1. **Consistent Testing Environment**: By mocking API calls, you can create a consistent testing environment that eliminates external dependencies and ensures reliable test results.

2. **Improved Test Performance**: Mocking API calls can significantly improve the performance of your tests, as you don't have to wait for actual API responses.

3. **Edge Case Testing**: msw allows you to simulate various scenarios, including edge cases, that may be difficult to reproduce with live APIs.

### Using msw to Mock API Calls

To get started with msw, you'll need to install it in your project:

```bash
npm install msw --save-dev
```

Once installed, you can start mocking API calls in your tests. Here's an example of how you use msw to mock API calls:

```javascript
import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, waitFor } from '@testing-library/react';
import MyComponent from '../components/MyComponent';

// Mock API data
const mockData = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' },
];

// Set up the Mock Service Worker server
const server = setupServer(
  rest.get('/api/users', (req, res, ctx) => {
    return res(ctx.json(mockData));
  })
);
server.listen({ onUnhandledRequest: (req) => console.error(`No handler for ${req.url.href}`), });

// Enable API mocking before tests
beforeAll(() => server.listen());

// Disable API mocking after tests
afterAll(() => server.close());

// Reset handlers after each test
afterEach(() => server.resetHandlers());

test('renders user names', async () => {
  render(<MyComponent />);

  // Wait for the component to fetch and render data
  await waitFor(() => {
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
  });
});
```

In this example, we first import the necessary functions from msw. Then, we create a server instance using `setupServer` and set up an `onUnhandledRequest` handler to log any unhandled requests during testing.

## Detecting Missing API Calls with `onUnhandledRequest`

Sometimes, you might miss mocking an API call in your tests, which can lead to errors. To help detect these missing API calls, msw provides the `onUnhandledRequest` option when setting up the server.

```javascript
server.listen({
  onUnhandledRequest: (req) => console.error(`No handler for ${req.url.href}`),
});
```

This option logs any unhandled requests during testing, allowing you to identify and mock the missing API calls.

Embrace msw in your development workflow and experience the benefits of efficient API mocking for your web applications.

### delay
Tue. 23/4/24
The `delay()` function in the Mock Service Worker (MSW) library is used to simulate network delays and latency when responding to requests. It allows you to introduce artificial delays in the response time of your mocked API endpoints, helping you to test and mimic real-world network conditions.

I came across this `delay()` function. I'm developing a web UI for LLM chat and wanted to display `Thinking ...` message while the UI waits for the LLM response. To test the feature, I needed to slow down the API response to verify that the text existed. 

```javascript
it('shows "thinking ..." message while waiting for the prompt API response', async () => {
  server.use(
    rest.post(`/conversations/*/messages`, (req, res, ctx) =>
      res(
        ctx.delay(5000),
        ctx.json({
          conversationUid: 'conversationUid',
          messages: [...oldMessages, ...newMessages]
        })
      )
    )
  );

  const { user } = renderWithProviders(<LlmChat {...props} />, {});

  await user.type(await screen.findByLabelText('Prompt'), newMessages[0].content);
  await user.click(await screen.findByRole('button', { name: 'Submit' }));

  expect(await screen.findByText('Thinking ...')).toBeInTheDocument();
});
```