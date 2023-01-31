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

