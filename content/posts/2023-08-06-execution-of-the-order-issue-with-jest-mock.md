---
title: Execution of the order issue with jest Mock
date: 2023-08-06
tags:
  - jest
  - javascript
  - typescript
---

Recently, in my react native app, I was testing an icon button in the heading if it navigate the screen to the previous by executing `navigation.goBack()`. As usual, I mocked `navigation` and expected the mock to be called. The code is like the following.


```typescript
const mockGoBack = jest.fn()
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn().mockReturnValue({
    goBack: mockGoBack,
  })
}))
```


This didn’t work. I got an error from the component, “navigation.goBack() is not a function”. Why?


The issue I was experiencing was related to the execution order of the mock and the actual test code. The **`jest.mock()`** call is always hoisted to the top of the code block. Therefore, it's being called before **`mockGoBack`** is initialised, which causes problems.


How can you fix it? `jest.sypOn()` comes for the rescue. 


What’s the difference then?


**`jest.mock`** is used to replace an entire module with a mock implementation. When you use **`jest.mock`**, every function or variable exported from that module will be replaced with a mock version.


**`jest.mock`** calls are hoisted to the top of the code block, meaning they are run before any import statements. This ensures that the mocked module is used throughout the entire test file. You use **`jest.mock`** when you want to replace a whole module with mock implementations, or when you want to mock the behavior of third-party libraries.


**`jest.spyOn`** is used to replace a specific method on an object with a mock function, while keeping the rest of the object intact. This allows you to spy on calls to that method, record its usage, or replace its implementation for certain test cases. Unlike **`jest.mock`**, **`jest.spyOn`** is not hoisted. It's executed in the order it appears in the code. Because of this, you can use **`jest.spyOn`** to conditionally spy on methods in individual test cases. You use **`jest.spyOn`** when you want to mock or track a specific method without affecting other parts of the object.


```typescript
const mockGoBack = jest.fn()
const mockNavigate = jest.fn()
jest.spyOn(Navigation, 'useNavigation').mockReturnValue({
  goBack: mockGoBack,
  navigate: mockNavigate,
})

it('should render Back Button', () => {

  render(<SignIn />, {wrapper})

  expect(screen.getByTestId('back-button')).toBeTruthy()
  fireEvent.press(screen.getByTestId('back-button'))

  expect(mockGoBack).toHaveBeenCalled()

})
```


By using **`jest.spyOn`**, you can target the specific method (**`goBack`**) that you want to spy on or mock, without affecting the rest of the object or other parts of the module. This provides more control and can be more suitable for your test case


