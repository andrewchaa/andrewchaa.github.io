---
title: Testing React Native Components
date: 2023-01-12
tags:
  - jest
  - react native
  - react-testing-library
---

In order to test whether a button click works in a React Native app using Jest, you can use the **`fireEvent`** method from the **`@testing-library/react-native`** library.

### Debug()

When retrieving an element fails, use `debug()` to inspect the rendered screen in code

```typescript
<RNCSafeAreaProvider
      onInsetsChange={[Function anonymous]}
      style={
        Array [
          Object {
            "flex": 1,
          },
          undefined,
        ]
      }
    >
      <View
        style={
          Object {
            "backgroundColor": "background",
            "elevation": 1,
            ...
```

Sometimes, adding an intentional delay helps in debugging the issue.

```typescript
await new Promise((r) => setTimeout(r, 2000))
```

### Button

Here is an example of how you might test a button click:

```typescript
import React from "react"
import { fireEvent, render } from "@testing-library/react-native"
import CommonButton from "../../src/components/CommonButton"
import wrapper from "../wrapper.helper"

describe("CommonButton", () => {
  it('renders correctly', () => {
    expect(true).toBe(true)
    const { getByText } = render(
      <CommonButton title="Test Button" onPress={() => {}} />,
      {wrapper}
    )

    expect(getByText("Test Button")).toBeTruthy()
  })

  it('calls onPress when pressed', () => {
    const onPress = jest.fn()
    const { getByTestId } = render(
      <CommonButton title="Test Button" onPress={onPress} />,
      {wrapper}
    )

    fireEvent.press(getByTestId("common-button"))
    expect(onPress).toHaveBeenCalled()
  })
})

```

In this example, we first import the **`render`** and **`fireEvent`** methods from the **`@testing-library/react-native`** library. Next, we import the component we want to test, **`CommonButton`** in this case. Then we use the **`render`** method to render the component in a way that we can test.

After that, we use the **`getByTestId`** to fetch the button element from the render tree and store it in a variable named button, then we use **`fireEvent.press(button)`** to simulate the button click. Finally, we use **`expect(onPress).toHaveBeenCalled()`** to check if the **`onPress`** callback was called during the simulation.

## Mocking

### Manual mock

A manual mock in Jest is a custom implementation of a module that you want to use in place of the real module in your tests. The purpose of using a manual mock is to isolate your tests from the implementation details of the module and control its behavior in a way that is relevant to your test cases.

A manual mock is created by creating a mock file in a **`__mocks__`** directory and defining the mock implementation for the module. When you import the module in your test file, Jest will automatically use the mock implementation instead of the actual module.

Here's an example of how you can create a manual mock for a module named **`moduleA`**:

- Create a **`__mocks__`** directory in the same folder as your test file.

- In the **`__mocks__`** directory, create a file named **`moduleA.js`**

To mock a scoped module called `@scope/project-name`, create a file at `__mocks__/@scope/project-name.js`, creating the `@scope/` directory accordingly.

```bash
root
| -- node_modules
| -- __mocks__
    | -- react-native-keyboard-aware-scroll-view.ts

```

```typescript
export const KeyboardAwareScrollView = () =>
  jest.fn().mockImplementation(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    ({ children }) => children
  )
```

### KeyboardAwareScrollView Issue

`render()` doesn’t render `KeyboardAwareScrollView` very well. Mock it so that it just render the children.

```typescript
export const KeyboardAwareScrollView = ({ children }) => children
```

