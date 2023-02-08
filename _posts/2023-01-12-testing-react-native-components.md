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

When retrieving an element fails, use `screen.debug()` to inspect the rendered screen in code

```typescript
screen.debug()
screen.debug({ mapProps: ({ style, ...props }) => ({ props }) })
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
    ({ children }) => children
  )
```

### spyOn

**`spyOn`** is a method provided by Jest that allows you to create a mock function (i.e., a spy) that wraps the original function. A spy allows you to monitor the behaviour of the original function, including how many times it was called, what arguments it was called with, and what it returned.

```typescript
import React from 'react'
import {fireEvent, render, screen, waitFor} from '@testing-library/react-native'
import AddService from '../../src/screens/JobEdit/AddService'
import * as Navigation from '@react-navigation/native'
import  wrapper from '../helpers/wrapper'
import { mockJob } from '../helpers/apiMocks'
import { RouteNames } from '../../src/constants/RouteNames'
import { ServiceType } from '../../src/constants/ServiceType'

describe('AddService', () => {
  const mockNavigate = jest.fn()
  jest.spyOn(Navigation, 'useNavigation').mockReturnValue({
    navigate: mockNavigate,
  })

  it('should navigate to ServiceParentList', () => {
    render(<AddService />, {wrapper})

    fireEvent.press(screen.getByTestId('pressable-symptom'))

    expect(mockNavigate).toHaveBeenCalledWith(
      RouteNames.ServiceParentList,
      { job: mockJob, type: ServiceType.SYMPTOM }
    )
  })
})
```

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
import React from 'react'
import {fireEvent, render, screen} from '@testing-library/react-native'
import AddService from '../../src/screens/JobEdit/AddService'
import '@react-navigation/native'
import wrapper from '../helpers/wrapper'
import { mockJob } from '../helpers/apiMocks'
import { RouteNames } from '../../src/constants/RouteNames'

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

