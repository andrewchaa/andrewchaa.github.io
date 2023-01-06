---
title: Jest assertions
date: 2023-01-05
tags:
  - jest
---

### A value is not undefined

To test that a string value is not undefined in a Jest test, you can use the `toBeDefined()` matcher.

Here is an example of how to use this matcher:

```javascript
test('string is not undefined', () => {
  const str = 'hello';
  expect(str).toBeDefined();
});
```

This test will pass if the value of **`str`** is not **`undefined`**.

You can also use the **`not`** modifier to test that a value is **`undefined`**. For example:

```javascript
test('string is not undefined', () => {
  const str = 'hello';
  expect(str).not.toBe(undefined);
});
```

I hope this helps. Let me know if you have any questions or need further assistance.

