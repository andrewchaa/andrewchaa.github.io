---
title: Handle Jest’s precision failure
date: 2022-04-17T13:29:00.000Z
tags:
  - jest
---

```javascript
function convertWeight(weight) {
  return weight / 2.2
}

it('should convert weight', () => {
  expect(convertWeight(100)).toBe(45.45)
})
```

I was writing a simple test and received this error.

```javascript
expect(received).toBe(expected) // Object.is equality

    Expected: 45.45
    Received: 45.45454545454545
```

JavaScript’s number has a weird quirkiness and `0.2 + 0.1` is not strictly equal to `0.3`

Jest recommends not to use `toBe` for floating number but [to use ](https://jestjs.io/docs/expect#tobevalue)[`toBeCloseTo`](https://jestjs.io/docs/expect#tobevalue). 

```javascript
it('should convert weight', () => {
  expect(convertWeight(100)).toBeCloseTo(45.45)
})

PASS  chapter-6/create-default-parameters.test.js
  ✓ should convert weight (2 ms)
```

