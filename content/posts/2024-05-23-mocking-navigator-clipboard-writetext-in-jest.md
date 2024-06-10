---
title: Mocking navigator.clipboard.writeText in Jest
date: 2024-06-10
tags:
  - jest
  - react
  - javascript
---
If you're working on a web application that interacts with the clipboard API, you may need to write tests for functionality that calls `navigator.clipboard.writeText`. However, mocking this API can be tricky, especially when using Jest in ES6. In this post, I'll walk you through the issues I encountered and how I resolved them.

The first approach I tried was to overwrite the `clipboard` object directly. Unfortunately, this doesn't work in ES6 because the `clipboard` object has only a getter, making it read-only. Attempting to assign a new value to `clipboard` will result in an error.

```js
// This won't work
navigator.clipboard = {
  writeText: jest.fn()
};
```

The solution is to use `jest.spyOn` to create a mock implementation of the `writeText` method. Here's how you can do that:
```js
jest.spyOn(navigator.clipboard, 'writeText');
```

However, when I tried this approach, I ran into another issue: a `DOMException` with the message "Type text/plain does not match the blob's type". After some digging, I realized that this error was occurring because the Jest environment doesn't implement the Clipboard API.

To work around this, I had to mock the `writeText` method using `spyOn` and make it return a resolved Promise:
```js
const writeTextMock = jest.spyOn(navigator.clipboard, 'writeText').mockResolvedValue();
```

With this approach, my tests could call `navigator.clipboard.writeText` without throwing any errors, and I could use the `writeTextMock` to assert that the method was called with the expected arguments.

```js
describe('MessagePane', () => {
  it('should copy content to clipboard when button is clicked', async () => {
    const messages = [
      { author: 'USER', content: 'Hello' },
      { author: 'BOT', content: 'Hi' },
    ];

    const { user } = renderWithProviders(
      <MessagePane messages={messages} />, {}
    );

    const writeTextMock = jest.spyOn(navigator.clipboard, 'writeText').mockResolvedValue();
    const copyButtons = screen.getAllByRole('button');
    await user.click(copyButtons[1]);

    expect(writeTextMock).toHaveBeenCalledWith('Hi');
  });
});
```

In summary, mocking the `navigator.clipboard.writeText` method in Jest requires a few steps:

1. Use `jest.spyOn` to create a mock implementation of the `writeText` method.
2. Make the mock implementation return a resolved Promise to avoid `DOMException` errors.
3. Use the mock instance to assert that the method was called as expected in your tests.

I hope this blog post helps you navigate the intricacies of mocking the Clipboard API in Jest. Happy testing!