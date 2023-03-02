---
title: My Jest Note
date: 2023-03-01
tags:
  - jest
  - javascript
  - typescript
---

Jest is a popular testing library for JavaScript applications that was developed by Facebook. It provides a simple and efficient way to write and run tests for JavaScript code, including React, Vue, and Angular applications. Jest is designed to be easy to use and has a minimal setup, making it a great choice for developers who want to quickly set up and run tests.

### Resources

- [https://dev.to/dstrekelj/how-to-mock-imported-functions-with-jest-3pfl](https://dev.to/dstrekelj/how-to-mock-imported-functions-with-jest-3pfl)

### CLI

Generate test coverage: `npm run test -- --coverage --coverageReporters=text`

```bash
npm test -- --coverage --coverageReporters=text

> test-driven-fizzbuzz@1.0.0 test
> jest --coverage --coverageReporters=text

 PASS  ./index.test.js
 PASS  ./greeting.test.js
----------|----------|----------|----------|----------|-------------------|
File      |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
----------|----------|----------|----------|----------|-------------------|
All files |       75 |       50 |      100 |       75 |                   |
 index.js |       75 |       50 |      100 |       75 |                 5 |
----------|----------|----------|----------|----------|-------------------|
```

Running jest tests automatically: `npx jest --watchAll`

```bash
PASS  ./greeting.test.js
 PASS  ./index.test.js

Test Suites: 2 passed, 2 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        0.562s, estimated 1s
Ran all test suites.

Watch Usage
 › Press f to run only failed tests.
 › Press o to only run tests related to changed files.
 › Press q to quit watch mode.
 › Press t to filter by a test name regex pattern.
```

### Mocking

Mock an imported function and get a handle to verify if it’s called

```typescript
// isAtLeast18.spec.js
const isAtLeast18 = require("./isAtLeast18");
const isInteger = require("./isInteger");

// The mock factory returns a mocked function
jest.mock("./isInteger", () => jest.fn());

describe("isAtLeast18", () => {
    it("fails if value is not recognised as integer", () => {
        // For this test we'll mock isInteger to return `false`
        isInteger.mockImplementation(() => false);

        expect(isAtLeast18(123)).toBe(false);
        expect(isAtLeast18("abc")).toBe(false);
    });

    it("passes if value is recognised as integer and is at least 18", () => {
        // For this test we'll mock isInteger to return `true`
        isInteger.mockImplementation(() => true);

        expect(isAtLeast18(123)).toBe(true);
        expect(isAtLeast18("abc")).toBe(false);
    });
});
```

Mock a node module function

```typescript
describe('AddService', () => {
  const mockNavigate = jest.fn()
  jest.spyOn(Navigation, 'useNavigation').mockReturnValue({
    navigate: mockNavigate,
  })

  it('should navigate to ServiceParentList with Symptom type', () => {
    render(<AddService />, { wrapper })

    fireEvent.press(screen.getByTestId('pressable-symptom'))

    expect(mockNavigate).toHaveBeenCalledWith(
      RouteNames.ServiceParentList,
      { job: mockJob, type: ServiceType.SYMPTOM }
    )
  })
```

