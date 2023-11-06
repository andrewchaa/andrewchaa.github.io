---
title: Why the concept of closure in programming language is called 'closure'?
date: 2022-12-23
tags:
  - programming
---

The term "closure" in programming comes from the concept of a "lexical closure" in computer science. A lexical closure is a function that is defined inside another function and has access to the outer function's variables, as well as its own variables. The term "closure" is used to describe this concept because the inner function "closes over" the variables from the outer function, meaning that it captures or encloses them in its own scope.

In programming languages, closures are often implemented as anonymous functions that are returned from another function. The inner function has access to the variables in the outer function's scope, even after the outer function has finished executing. This allows the inner function to maintain its own state, which can be useful for creating functions that have a specific context or state that needs to be preserved.

The concept of a closure is used in many programming languages, including JavaScript, Python, and Ruby, among others. It is a powerful and widely used programming construct that allows developers to create functions with a specific context or state that can be preserved and used later on.

