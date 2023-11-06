---
title: To run multiple commands in an NPM script
date: 2022-12-15
tags:
  - npm
  - node.js
---

To run multiple commands in an npm script, you can use the **`&&`** operator to chain the commands together. For example, if you want to run the **`build`** and **`test`** commands, you can use the following syntax:

```json
"scripts": {
  "build-and-test": "npm run build && npm run test"
}
```

This will run the **`build`** command, and if it completes successfully, it will then run the **`test`** command. You can chain together as many commands as you like using the **`&&`** operator.

Alternatively, you can use the **`&`** operator instead of **`&&`**. This operator will run the commands in parallel, rather than waiting for each command to complete before running the next one. For example, the following script will run the **`build`** and **`test`** commands in parallel:

```json
"scripts": {
  "build-and-test": "npm run build & npm run test"
}
```

Keep in mind that when using the **`&`** operator, the order in which the commands are run is not guaranteed, so you should not rely on any particular order for the execution of your commands.

In conclusion, running multiple commands in an npm script is a simple task that can be accomplished using the **`&&`** or **`&`** operators. This allows you to combine multiple commands into a single script, which can make it easier to manage and run your commands.

