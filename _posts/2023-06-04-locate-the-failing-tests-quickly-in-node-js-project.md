---
title: Locate the failing tests quickly in Node.js project
date: 2023-06-04
tags:
  - node.js
  - jest
---

When I run tests for my Node.js API project, I often find that one or two tests fail due to changes I have made. However, there are many tests, and I have to scroll up a lot to find the failing test and run it again. Is there an easy way to see which test has failed?

Here are a few ways to see which test has failed:

- Fail fast. `npx jest --bail` This will stop the test run when there’s a single test failure.

- Run only failed tests again. For me, this was the easiest way to find out the failed test. `npx jest --onlyFailures` will do the charm.

