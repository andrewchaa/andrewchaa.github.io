---
title: How to Pass Parameters to NPM Scripts
date: 2023-06-09
tags:
  - node.js
---

NPM scripts are a great way to automate tasks in your development workflow. But what if you need to pass parameters to your scripts? For example, you might want to run a script against a different environment, or with different settings.

This is what I figured out while working on the Cypress tests.

## **Passing Parameters to NPM Scripts**

To pass a parameter to an NPM script, you use the `--` character. For example, the following command will run the `test:cypress` script, and pass the `baseUrl` parameter with the value `http://localhost:8080`:

**Code snippet**

```bash
npm run test:cypress -- --config baseUrl=http://localhost:8080
```

The `--` character tells NPM that the following arguments are for the script, not for NPM itself. The `-config` parameter is a Cypress parameter, and the `baseUrl` value is the URL of the local environment.

