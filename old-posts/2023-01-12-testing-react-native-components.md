---
title: Testing React Native Components
date: 2023-01-12
tags:
  - jest
  - react native
  - react-testing-library
---

In order to test whether a button click works in a React Native app using Jest, you can use the **`fireEvent`** method from the **`@testing-library/react-native`** library.

## Debugging

### Debug()

When retrieving an element fails, use `screen.debug()` to inspect the rendered screen in code

```typescript
screen.debug()
await new Promise(r => setTimeout(r, 2000))
screen.debug({ mapProps: ({ style, ...props }) => ({ props }) })
screen.debug({ mapProps: ({ ...props }) => ({}) })
---

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

## Examples

You can find many good examples from [Testing Library Example page](https://testing-library.com/docs/react-testing-library/example-intro/).

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

## Mock and Verify

### KeyboardAwareScrollView Issue

`render()` doesn’t render `KeyboardAwareScrollView` very well. Mock it so that it just render the children.

```typescript
export const KeyboardAwareScrollView = ({ children }) => children
```

### Verify that a mocked api is called with the expected parameters

To verify that a mocked API is called with the expected parameters in Jest, you can use **`expect.toHaveBeenCalledWith(arg1, arg2, ...)`** method on the mock function.

```typescript
describe('SignIn', () => {
  const email = 'email'
  const password = 'password'

  apis.authSignIn = jest.fn()

  it('should sign in with given email and password', () => {
    render(<SignIn />, {wrapper})

    fireEvent.changeText(screen.getByTestId('email'), email)
    fireEvent.changeText(screen.getByTestId('password'), password)
    fireEvent.press(screen.getByTestId('sign-in-button'))

    expect(apis.authSignIn).toHaveBeenCalledWith({
      email: email,
      password: password,
    })
  })
})
```

### Capture the parameters that are passed to a mocked function

You can capture the parameters that are passed to a mocked function by accessing the **`.mock.calls`** property of the mock function.

```typescript
describe('JobDetails', () => {
  apis.updateJob = jest.fn()

  it('should complete job on confirm', async () => {
    render(<JobDetails />, {wrapper})

    fireEvent.press(await waitFor(() => screen.getByTestId('complete-button')))
    fireEvent.press(screen.getByTestId('alert-dialog-action-button'))

    const job = apis.updateJob.mock.calls[0][0] as Job
    expect(job.jobStatus).toBe('COMPLETED')
  })
```

### **The module factory of** **`jest.mock()`** **is not allowed to reference any out-of-scope variables**

I got this error when I use an object I imported from another module to return it as mocked response. You have to change the name of the variable to start with `mock`

```typescript
// apiMocks.ts
export const mockJob = {
  companyId: '0003100000',
  jobNo: '2023011700001',
  customerComment: 'Test- Jan.17,2023',
  engineer: {
    company: 'Newhaven',
    gasSafetyNumber: '145764',
    name: 'testsvc',
  },
  estimatedSymptom: 'A0100004',
  jobNotes: '2/1 test',
  jobStatus: 'IN_PROGRESS',
  photos: [],
  product: {
    fuel: 'LNG',
    id: 'PLCB0021SH001',
    name: 'LCB;0021,Kerosene,S,I,GB,CE',
    serialNumber: '1134234612123123',
  },
  reportDate: '2023-02-01T00:12:51.359Z',
  serviceRequestDate: '2023-01-17',
}
```

```typescript
// addService.test.tsx
describe('AddService', () => {
  jest.mock('@react-navigation/native', () => ({
      useNavigation: () => {
        return { navigate: jest.fn() }
      },
      useRoute: () => ({
        params: {
          job: mockJob,
        },
      }),
    })
  )

  it('should navigate to ServiceParentList', () => {
    const navigate = jest.fn()
    render(<AddService navigate={navigate} />, {wrapper})

    fireEvent.press(screen.getByText('Select a symptom (*)'))
    expect(navigate).toHaveBeenCalledWith(
      RouteNames.ServiceParentList,
      { job: mockJob }
    )
  })
})
```

### Verify that the element has the expected value

You can use `toHaveTextContent()`

```typescript
it('should render quantity', () => {
    const code = '000000000092000044'
    const name = 'Shipping Charge'

    jest.spyOn(Navigation, 'useRoute').mockReturnValue({
      params: {
        job: mockJob,
        item: { code: code, name: name },
        type: ServiceType.PART,
      },
      key: '',
      name: '',
    })

    render(<AddService />, { wrapper })

    fireEvent.press(screen.getByTestId('pressable-plus'))
    expect(screen.getByTestId('text-value')).toHaveTextContent('1')

    fireEvent.press(screen.getByTestId('pressable-plus'))
    expect(screen.getByTestId('text-value')).toHaveTextContent('2')

    fireEvent.press(screen.getByTestId('pressable-minus'))
    expect(screen.getByTestId('text-value')).toHaveTextContent('1')
  })
```

### Verify that the element doesn’t exist

Use `queryByText`

```typescript
describe('AddService', () => {
  const mockNavigate = jest.fn()
  jest.spyOn(Navigation, 'useNavigation').mockReturnValue({
    navigate: mockNavigate,
  })

  jest.spyOn(Navigation, 'useRoute').mockReturnValue({
    params: {
      job: mockJob,
      type: ServiceType.SYMPTOM,
    },
    key: '',
    name: ''
  })


  it('should filter the list by Gas', () => {
    render(<ServiceParentList />, { wrapper })

    const searchName = 'Gas Smell/Leak'
    fireEvent.changeText(screen.getByTestId('input-search'), searchName)

    expect(screen.getByText(searchName)).toBeTruthy()
    expect(screen.queryByText('Temperature Fluctuation')).toBeFalsy()
  })
})
```

### Verify that the input has the expected value

Use `screen.getByDisplayValue()`

```typescript
expect(screen.getByDisplayValue('test')).toBeTruthy()
```

