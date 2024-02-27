---
title: Achieve Dynamic Return Values with Jest Mock
date: 2024-02-27
tags:
  - jest
  - mock
  - javascript
description: To simulate different behaviours for the mock function within a single test, you need to set the function as `mock` and then use  `mockReturnValue` and `mockReturnValueOnce` methods on the mocked function itself
---
## Achieve Dynamic Return Values with Jest Mock
`jest.mock` is a powerful tool in your Jest testing arsenal, allowing you to inject mock implementations and dependencies into your test cases. However, it's crucial to understand its behaviour regarding return values.

### Setting Up the Mock

When you call `jest.mock` at the beginning of your test file, you essentially define the **initial state** of the mocked module or function. This initial setup **cannot** be changed during the execution of your test case.

For example, consider the following code:

```javascript
jest.mock('./myModule', () => ({
  myFunction: jest.fn().mockReturnValueOnce(10), // Initial return value is 10
}));

it('should call the mock function', () => {
  const myModule = require('./myModule');

  // Calling myFunction multiple times will always return 10
  const result1 = myModule.myFunction();
  const result2 = myModule.myFunction();

  expect(result1).toBe(10);
  expect(result2).toBe(10); // Still returns 10, not 20
});
```

### Achieving Dynamic Return Values

To simulate different behaviours for the mock function within a single test, you need to set the function as `mock` and then use  `mockReturnValue` and `mockReturnValueOnce` methods on the mocked function itself. Here's how:

```javascript
jest.mock('featureFlags', () => {
  return {
    featureFlagEnabled: jest.fn(),
  };
});

it('renders a list of documents when feature flag is enabled', () => {
  featureFlagEnabled.mockReturnValue(true);

  wrapper = mount(
    <Provider store={store(initialState)}>
      <MemoryRouter initialEntries={['/']}>
        <OnboardingSimilarPeopleCheck similarPeople={similarPeopleMock} />
        </MemoryRouter>
      </Provider>
  );

  expect(wrapper.find('.document').length).toBeGreaterThan(2);
});

it('renders a loading message when feature flag is disabled', () => {
  featureFlagEnabled.mockReturnValue(false);

  wrapper = mount(
    <Provider store={store(initialState)}>
      <MemoryRouter initialEntries={['/']}>
        <OnboardingSimilarPeopleCheck similarPeople={similarPeopleMock} />
        </MemoryRouter>
      </Provider>
  );

  expect(wrapper.find('.thumbnails').length).toBeGreaterThan(2);
});
```

**Remember:**

- `jest.mock` sets the initial mock state, which you cannot alter within the test.
- Use `mockReturnValue` and `mockReturnValueOnce` **within** each test case to dynamically control the mock function's return values for that specific test.
