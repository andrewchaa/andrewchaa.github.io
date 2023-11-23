---
title: Testing React and React Native Components with React Testing Library
date: 2023-03-04
tags:
  - jest
  - react-testing-library
  - react
---

React Testing Library is a renowned library that empowers developers to write tests for React components. Its primary goal is to enable component testing in a manner that mirrors actual user interactions.


### **Resources**

- [**User Event Introduction**](https://testing-library.com/docs/user-event/intro)

### **Set Up**

1. Begin by setting up [**Jest for TypeScript**](https://www.notion.so/Setting-up-Jest-for-Typescript-a47f33b2d33845ebb9ca3685ee9b28c5).
2. Install the **`jest-dom`** package to gain access to supplementary test helper functions.
3. Use the **`import '@testing-library/jest-dom/extend-expect'`** to utilize functions like **`toBeInTheDocument()`**.

```bash
yarn add -D @testing-library/jest-dom
```


Incorporate the import into your Jest configuration:


```typescript
// jest.config.js
module.exports = {
  // ... other configurations ...
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // ... other configurations ...
}
```


```javascript
// jest.setup.js
import '@testing-library/jest-dom/extend-expect'
```


A sample test can be written as:


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


## **User Interactions**


[https://github.com/testing-library/user-event](https://github.com/testing-library/user-event) is a complementary library for the React Testing Library. It simulates user events by dispatching browser-like interactions. Remember that these functions return promises; thus, always use **`await`**.


```shell
yarn add -D @testing-library/user-event
```


Interactions include:

- type
- click
- `clear`: select the text and delete it

And a sample usage:


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

    await user.clear(screen.getByRole('textbox')
    await user.type(screen.getByRole('textbox'), item)
    await user.click(screen.getByRole('button'))

    expect(addToItems).toHaveBeenCalledWith({ name: item, done: false })
  })
})
```


```javascript
await userEvent.click(screen.getByRole('radio', { name: 'Yes' }));
await userEvent.selectOptions(
  screen.getByRole('combobox'),
  'Indication or potential indication of significant harm'
);
await userEvent.type(
  screen.getByRole('textbox', { name: 'Agreed action' }),
  agreedActionDescription
);
await userEvent.click(screen.getByRole('checkbox'));
await userEvent.click(screen.getByRole('button', { name: /next/i }));
```


## **Selectors**


### **getByRole**

- **`textbox`**: For input, textarea elements.
- **`checkbox`**: Specifically for checkboxes.
- **`radio`**: For radio buttons.
- **`button`**: For buttons.
- **`combobox`**: For **`<select />`** elements.

Do note that **`name`** doesn't refer to the element's name attribute but rather the associated label text.


```javascript
// select a button with the label
const submitButton = screen.getByRole('button', { name: /ACTION/i })

it('save button should be enabled when all required inputs are done', async () => {
  await act(async () => {
    renderWithKompass(<AdminNoteForm formMode={FORM.CREATE} onSubmit={jest.fn()} />);
    await userEvent.type(
      screen.getByRole('textbox', { name: 'Note description' }),
      'Note description'
    );

    expect(screen.getByRole('button', { name: 'SAVE' })).toHaveProperty('disabled', false);
  });
});
```


```javascript
[expect(screen.getByRole('textbox', { name: 'Concern' })).toHaveValue('Concern description')](/b574656a518e4d608780613bb9cee7a0)
expect(screen.getByRole('textbox', { name: 'Agreed action' })).toHaveValue(
  'Agreed action description'
);
expect(screen.getByRole('radio', { name: 'Yes' })).toBeInTheDocument();
expect(screen.getByRole('radio', { name: 'Yes' })).toBeChecked();
expect(screen.getByRole('combobox', { name: 'Primary reason for review' })).toHaveValue(
  'Indication or potential indication of significant harm'
);
```


### within


```shell
it('should display the name of estimated symptom field', async () => {
    render(<JobDetails />, {wrapper})

    await waitFor(() => {
      screen.getByText('Job Details')
      const { getByText } = within(screen.getByTestId('estimated-symptom'))
      expect(getByText('Error Code')).toBeTruthy()
    })
  })
```


### getByTestId


A shortcut to `container.querySelector(`[data-testid="test-id"]`)`


```typescript
<div data-testid="custom-element" />

import {screen} from '@testing-library/dom'
const element = screen.getByTestId('custom-element')
```


## **Assertions**


Various assertions can be used to validate test conditions. Some examples include:

- **`toBeDefined()`**: Ensures a variable isn't undefined.

```javascript
it('should render the label text', () => {
  renderWithTheme(<ConfirmationBox {...props} />);
  expect(screen.getByText('I confirm that I have followed the')).toBeDefined();
});
```

- **`toBeInTheDocument()`**: Confirms an element is in the document.

```javascript
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

- **`toHaveBeenCalledWith()`**: Checks if a mocked function was invoked with specific arguments.

```javascript
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

- **`toBeChecked()`**: Validates if a radio button or checkbox is checked.

```javascript
<input 
  type="radio" 
  name="requireReview" 
  value="true"
>
  <label>Yes</label>
</input>

expect(screen.getByRole('radio', { name: 'Yes' })).toBeChecked();
```

- **`waitFor()`**: A utility to await certain conditions or events.

```javascript
await waitFor(() => expect(screen.getByRole('textbox', { name: 'Concern' }))
				.toHaveValue('Concern description')
	      );
```


### **Appearance and Disappearance**


If you need to wait for an element to appear, the [async wait utilities](https://testing-library.com/docs/dom-testing-library/api-async) allow you to wait for an assertion to be satisfied before proceeding. The wait utilities retry until the query passes or times out. _The async methods return a Promise, so you must always use_ _`await`_ _or_ _`.then(done)`_ _when calling them._


**Using** **`findBy`** **Queries**[](https://testing-library.com/docs/guide-disappearance/#1-using-findby-queries)


```javascript
test('movie title appears',async () => {
// element is initially not present...
// wait for appearance and return the element
const movie =await findByText('the lion king')
})

```


**Using** **`waitFor`**[](https://testing-library.com/docs/guide-disappearance/#2-using-waitfor)


```javascript
test('movie title appears',async () => {
// element is initially not present...

// wait for appearance inside an assertion
await waitFor(() => {
    expect(getByText('the lion king')).toBeInTheDocument()
  })
})

```


[**Waiting for disappearance**](/65b0f85a518e4c959ac4d7117a21780d)[](https://testing-library.com/docs/guide-disappearance/#waiting-for-disappearance)


The `waitForElementToBeRemoved` [async helper](https://testing-library.com/docs/dom-testing-library/api-async) function uses a callback to query for the element on each DOM mutation and resolves to `true` when the element is removed.


```javascript
test('movie title no longer present in DOM',async () => {
// element is removed
await waitForElementToBeRemoved(() => queryByText('the mummy'))
})

```


Using [`MutationObserver`](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) is more efficient than polling the DOM at regular intervals with `waitFor`.


The `waitFor` [async helper](https://testing-library.com/docs/dom-testing-library/api-async) function retries until the wrapped function stops throwing an error. This can be used to assert that an element disappears from the page.


```javascript
test('movie title goes away',async () => {
// element is initially present...
// note use of queryBy instead of getBy to return null
// instead of throwing in the query itself
await waitFor(() => {
    expect(queryByText('i, robot')).not.toBeInTheDocument()
  })
})

```


## Set up Github actions


```yaml
name: Run Tests

on:
  push:
  workflow_dispatch:

jobs:
  test:
    name: Run Test
    runs-on: ubuntu-latest
    steps:
    - name: Checkout
      uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: 18
    - name: test
      run: |
        yarn
        yarn test
```


## **Common Issues**


### react-script test cannot detect any tests


Ensure your test files have the **`.test.(j|t)s`** or **`.spec.(j|t)s`** extensions and are within the **`src`** directory or its subdirectories.


### Input Element Value Doesn't Update:


Always re-query the input element instead of relying on a previously stored reference, as the input value might not be updated in the reference


```javascript
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


### `unstable_batchedUpdates` error with expo, react native, jest, and react query


This is due to the 5 minute default timeout of react query. use `jest.fakeTimers()`


```java
jest.useFakeTimers()

it('should display the scheduled date', async () => {

    render(<JobEdit />, { wrapper })

    await waitFor(() => {
      expect(screen.getByText('Scheduled Visit Date')).toBeTruthy()
    })

    const inputElement = screen.getByTestId('scheduled-visit-date')
    expect(inputElement.props.value).toBe('28/09/2023')
    fireEvent.changeText(screen.getByTestId('scheduled-visit-date'), '30/09/2023')
    fireEvent.press(screen.getByTestId('job-save-button'))

    await waitFor(() => expect(apis.updateJob).toHaveBeenCalledWith({
      ...mockJob,
      scheduledVisit: {
        date: '2023-09-28',
        time: 'AM',
      },
    } as Job))
  })
```


### [RNC] Async Storage is null


Async Storage module is tightly coupled with its `NativeModule` part. [In order to use it in tests](https://react-native-async-storage.github.io/async-storage/docs/advanced/jest/), you have to provide its separate implementation.


With **mocks** directory[](https://react-native-async-storage.github.io/async-storage/docs/advanced/jest/#with-mocks-directory)

1. In your project root directory, create `__mocks__/@react-native-async-storage` directory.
2. Inside that folder, create `async-storage.js` file.
3. Inside that file, export `Async Storage` mock.

```shell
export * from '@react-native-async-storage/async-storage/jest/async-storage-mock';
```


### "ResizeObserver is not defined” error


[link_preview](https://github.com/ZeeCoder/use-resize-observer/issues/40)


Use polypill to handle the event in `jest` tests


```shell
yarn add -D resize-observer-polyfill
```


```typescript
global.ResizeObserver = require('resize-observer-polyfill')
```


