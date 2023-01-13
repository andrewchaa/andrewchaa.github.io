---
title: Structure my jest tests for AWS Lambda project
date: 2022-12-15
tags:
  - jest
---

Here is a possible way to structure your jest tests for an AWS lambda project:

- Create a **`__tests__`** folder in the root directory of your project, where you will put all your test files.

- Inside the **`__tests__`** folder, create one file per lambda function that you want to test, named after the function and suffixed with **`.test.js`**. For example, if you have a function named **`myFunction`**, create a file named **`myFunction.test.js`**.

- Inside each test file, import the function that you want to test and create a test case for it. You can use the **`test`** or **`it`** functions provided by jest to define the test case and its expected outcome.

- If you have helper functions or shared data that you want to use across multiple test files, you can put them in a **`helpers`** folder inside the **`__tests__`** folder. For example, you can create a **`helpers/testData.js`** file that exports some sample data that you can use in your tests.

- If you want to organize your tests into different groups or categories, you can create subfolders inside the **`__tests__`** folder and put the corresponding test files inside them. For example, you can create a **`__tests__/unit`** folder for unit tests and a **`__tests__/integration`** folder for integration tests.

Here is an example of how your directory structure could look like:

```bash
project
├── __tests__
│   ├── __mocks__
│   │   ├── fs.js
│   │   └── s3.js
│   ├── helpers
│   │   ├── testData.js
│   │   └── testUtils.js
│   ├── myFunction.test.js
│   ├── myOtherFunction.test.js
│   ├── unit
│   │   └── myFunction.unit.test.js
│   └── integration
│       └── myFunction.integration.test.js
└── src
    └── myFunction.js
```

This structure allows you to keep your tests organized and easily maintainable. You can also use jest's **`--testPathPattern`** option to run only specific tests or groups of tests.

By default, jest consider every file under `__tests__` as test. Add the following to ignore those helper functions.

```typescript
"jest": {
    ...
    "testPathIgnorePatterns": [
      "/__tests__/helpers/"
    ],
```

