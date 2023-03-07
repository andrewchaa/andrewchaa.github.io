---
title: Testing React Components
date: 2023-03-04
tags:
  - jest
  - react-testing-library
  - react
---

React Testing Library is a popular testing library that allows developers to write tests for React components. It aims to provide a way to test components in a way that more closely resembles how they are used by real users.

### Resources

- [https://testing-library.com/docs/user-event/intro](https://testing-library.com/docs/user-event/intro)

### Set Up

First, set up [Jest for TypeScript](/a47f33b2d33845ebb9ca3685ee9b28c5). 

Add `jest-dom` package for additional test helper functions

```bash
yarn add -D @testing-library/jest-dom
```

Then add an import to your jest setup file

```typescript
// jest.config.js
module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/'],
  coverageProvider: 'v8',
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
}
```

```typescript
// jest.setup.js
import '@testing-library/jest-dom/extend-expect'
```

An example test is like this

```typescript
import * as React from 'react'
import { render, screen } from '@testing-library/react'
import List from '../src/components/List'
import '@testing-library/jest-dom/extend-expect'

describe('List', () => {
  const milk = 'Milk'
  const eggs = 'Eggs'
  const items = [
    { name: milk, done: false },
    { name: eggs, done: true },
  ]

  it('renders a list of items', () => {
    render(<List items={items} toggle={jest.fn()} />)

    expect(screen.getByText(milk)).toBeTruthy()
    expect(screen.getByRole('checkbox', { name: milk })).not.toBeChecked()

    expect(screen.getByText(eggs)).toBeTruthy()
  })
})
```

### User Interactions

[`user-event`](https://github.com/testing-library/user-event) is a companion library for Testing Library that simulates user interactions by dispatching the events that would happen if the interaction took place in a browser. Take note that all the functions return `promise` so use it with `await` 

```typescript
yarn add -D @testing-library/user-event
```

```typescript
import * as React from 'react'
import { render, screen } from "@testing-library/react"
import Add from '../src/components/Add'
import userEvent from '@testing-library/user-event'

describe('Add', () => {
  const user = userEvent.setup()
  const addToItems = jest.fn()
  const item = 'Milk'

  it('calls addToItems when the button is clicked', async () => {
    render(<Add addToItems={addToItems} />)

    await user.type(screen.getByRole('textbox'), item)
    await user.click(screen.getByRole('button'))

    expect(addToItems).toHaveBeenCalledWith({ name: item, done: false })
  })
})
```

## Assertions

### toBeInTheDocument()

Check if an element is in the document

```typescript
import * as React from 'react'
import { render, screen } from "@testing-library/react"
import Add from '../src/components/Add'
import userEvent from '@testing-library/user-event'

describe('Add', () => {
  const user = userEvent.setup()
  const addToItems = jest.fn()
  const item = 'Milk'

  it('renders an input and a button', () => {
    render(<Add addToItems={addToItems} />)

    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('displays an error message when the item is empty', async () => {
    render(<Add addToItems={addToItems} />)

    await user.click(screen.getByRole('button'))

    expect(screen.getByText('The item cannot be empty.')).toBeInTheDocument()
  })
})
```

### toHaveBeenCalledWith()

```typescript
import * as React from 'react'
import { render, screen } from "@testing-library/react"
import Add from '../src/components/Add'
import userEvent from '@testing-library/user-event'

describe('Add', () => {
  const user = userEvent.setup()
  const addToItems = jest.fn()
  const item = 'Milk'

  it('calls addToItems when the button is clicked', async () => {
    render(<Add addToItems={addToItems} />)

    await user.type(screen.getByRole('textbox'), item)
    await user.click(screen.getByRole('button'))

    expect(addToItems).toHaveBeenCalledWith({ name: item, done: false })
  })

  it('does not call addToItems when the button is clicked but the item is empty', async () => {
    render(<Add addToItems={addToItems} />)

    await user.click(screen.getByRole('button'))

    expect(addToItems).not.toHaveBeenCalled()
  })
})
```

## Gotchas

### react-script test is not finding any test

The **`react-scripts test`** command is used to run tests in a React project created with **`create-react-app`**. If you are running this command and it is not finding any tests, there could be a few possible reasons:

- Test files are not named correctly: By default, **`create-react-app`** looks for files with the **`.test.(j|t)s`** or **`.spec.(j|t)s`** file extension to run tests. Make sure your test files are named appropriately.

- Test files are not in the correct directory: By default, **`create-react-app`** looks for test files in the **`src`** directory. Make sure your test files are located in the **`src`** directory or a subdirectory of **`src`**.

### The input element doesn’t have the new value

Make sure you find the element again to check the new value. Don’t use a variable that holds the element as the value of the input is not updated.

```typescript
it('clears the input when the button is clicked', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Add />
      </MockedProvider>
    )

    await user.type(screen.getByRole('textbox'), item)
    await user.click(screen.getByRole('button'))

    await waitFor(() => expect(screen.getByRole('textbox')).toHaveValue(''))
		// do screen.getByRole('textbox') again.
  })
```

