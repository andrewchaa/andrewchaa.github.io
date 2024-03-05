---
title: Dealing with Multi-Word Text in React Unit Tests with Jest
date: 2024-03-05
tags:
  - jest
  - javascript
  - react
---
When writing unit tests for React components, especially with Jest and the `@testing-library/react` library, you might encounter challenges when testing elements containing multi-word text. The `screen.getByText()` function, commonly used for finding elements by their text content, might not work as expected if the text is split across multiple nodes in the DOM.

### Understanding the Issue

The `screen.getByText()` function searches for an element that **exactly matches** the provided text. If the text you're searching for is split across multiple DOM nodes, this function will fail to find it.

**Using Regular Expressions**

To overcome this limitation, you can utilise regular expressions with the `i` flag (case-insensitive) in your search. This allows `screen.getByText()` to match any element containing the text, regardless of case or if it's spread across nodes.

```javascript
expect(screen.getByText(/date of birth/i)).toBeInTheDocument();
```

This code snippet will search for any element containing the text "Date of Birth" (case-insensitive) and ensure it exists in the document.

**Employing `findByText` for Asynchronous Rendering**

If the multi-word text isn't immediately available when the test runs (due to asynchronous rendering), using `screen.findByText()` becomes necessary. This function returns a Promise that resolves when the text is found in the DOM.

```javascript
await screen.findByText(/date of birth/i);
```

This code snippet waits for the text "Date of Birth" to appear before proceeding with the test, ensuring the element is present before assertions are made.

By understanding how `screen.getByText()` works and implementing these solutions, you can effectively test elements containing multi-word text in your React applications using Jest and `@testing-library/react`. Remember to choose the appropriate solution based on whether the text is static or dynamically rendered