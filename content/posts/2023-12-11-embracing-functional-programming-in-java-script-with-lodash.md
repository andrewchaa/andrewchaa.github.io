---
title: Embracing Functional Programming in JavaScript with lodash
date: 2023-12-11
tags:
  - javascript
  - lodash
---

Whether you're working on the front-end, back-end, or both, adopting a functional programming style can lead to more readable, maintainable, and bug-resistant code.


## What is Functional Programming?


Functional Programming is a programming paradigm that treats computation as the evaluation of mathematical functions and avoids changing state and mutable data. In JavaScript, FP translates to using functions as first-class citizens, promoting immutability, and leveraging higher-order functions.


## Why Lodash?


Lodash is a fantastic utility library that makes JavaScript easier by taking the hassle out of working with arrays, numbers, objects, strings, etc. It's especially powerful when it comes to embracing a functional style of programming in JavaScript.


### Immutable Data Transformations


One of the core principles of FP is immutability. Mutating data can lead to hard-to-trace bugs and unpredictable code. Lodash provides a range of functions that help you manipulate data without mutating it.


**Example:**


```javascript
import _ from 'lodash';

const originalArray = [1, 2, 3];
const newArray = _.map(originalArray, (num) => num * 2);

console.log(originalArray); // [1, 2, 3]
console.log(newArray);      // [2, 4, 6]
```


### Chainability and Readability


Lodash's chainable wrappers make your transformations readable and expressive. This is particularly useful when you need to perform several consecutive operations on data.


**Example:**


```javascript
import _ from 'lodash';

const result = _.chain([1, 2, 3, 4])
  .filter(n => n % 2 == 0)
  .map(n => n * 2)
  .value();

console.log(result); // [4, 8]
```


### Function Composition with `_.flow`


Function composition is a powerful concept in FP, where you combine several functions to create a new one. Lodash's `_.flow` is a handy tool for this.


**Example:**


```javascript
const addFive = x => x + 5;
const multiplyByThree = x => x * 3;

const multiplyThenAdd = _.flow([multiplyByThree, addFive]);

console.log(multiplyThenAdd(2)); // 11
```


### Currying and Partial Application


Currying transforms a function with multiple arguments into a sequence of functions with a single argument. Similarly, partial application pre-fills some of the arguments to a function. Lodash provides `_.curry` and `_.partial`.


**Example of Currying:**


```javascript
const add = (a, b) => a + b;
const curriedAdd = _.curry(add);

console.log(curriedAdd(1)(2)); // 3
```


The followings are more detailed use-cases of `lodash` functions


## flatMap


Creates a flattened array of values by running each element in the collection through iteratee and flattening the mapped results.


```typescript
const nodes = flatMap(data, item => item.nodes)
```


## flow


`flow` accepts an argument and pass it through an array of functions, enabling [function composition](/bba93ba13857483c9dc63fed69f24c06)


### `filter` and `flatmap` an array of objects that contain an array


```typescript
import { flow, filter, flatMap } from 'lodash'

const nodes = flow([
	data => filter(data, item => item?.nodes.length > 0),
  data => flatMap(data, item => item.nodes)
])(data)
```


## uniqBy


Accepts iteratee which is invoked for each element in an array to generate the criterion by which uniqueness is computed. The order of result values is determined by the order they occur in the array.


```typescript
const nodes = uniqBy(cache.nodes, (node) => node.id)
```


