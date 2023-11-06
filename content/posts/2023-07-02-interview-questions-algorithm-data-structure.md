---
title: Interview Questions - Algorithm, Data Structure
date: 2023-07-02
tags:
  - algorithm
  - interview
---

### Disclaimer


These are my revision notes for my job interviews. As a contractor, I have job interviews more often than a permanent employee. Writing down the revision notes does not imply that I am incapable of answering these questions naturally. During interviews, I naturally get nervous, and due to my introversion, I often struggle to clearly articulate what I already know and understand. I simply want to avoid those situations and prepare myself to present myself in the best possible way.


### What is big O?

- Mathematical notation
- Describe the time complexity or space complexity of an algorithm.
- Time complexity of O(n) will have its execution time grow linearly as the input size increases.
- Time complexity is O(1), the algorithm executes in constant time, regardless of input size.
- O(n²) means the time taken will be proportional to the square of the size of input, and so on.

### What is recurrence?


In the context of computer science and algorithm analysis, recurrence is a way of defining a problem in terms of one or more smaller instances of the same problem.


A good example of this is the Fibonacci sequence, where each number is the sum of the two preceding ones. In terms of a recurrence relation, it could be defined as:


```scss
F(n) = F(n-1) + F(n-2)
```


with base cases:


```scss
F(0) = 0, F(1) = 1
```


