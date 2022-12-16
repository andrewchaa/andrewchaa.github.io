---
title: Using .env file to keep sensitive information away from source control
date: 2022-12-15
tags:
  - node.js
---

As a software engineer, it is important to keep sensitive information such as API keys and database credentials out of your codebase. One way to do this is by using a .env file in your node.js development.

A `.env` file is a simple text file that contains environment variables, which are key-value pairs that are used to configure your application. The .env file is stored in the root directory of your project and is added to your `.gitignore` file so that it is not committed to version control.

To use a .env file in your node.js project, you first need to install the dotenv package using npm:

```bash
npm install dotenv
```

Next, create a .env file in the root directory of your project and add your environment variables in the following format:

```bash
VARIABLE_NAME=value
```

For example, if you have an API key for a third-party service, you could add it to your .env file like this:

```bash
API_KEY=1234567890
```

To access the values of your environment variables in your node.js code, you need to require the dotenv package and call the **`config()`** method:

```bash
require('dotenv').config()
```

You can then access the values of your environment variables using **`process.env`**:

```bash
const apiKey = process.env.API_KEY
```

It is important to note that the values of your environment variables are strings, so if you need to use them as a number or boolean, you will need to convert them using the appropriate JavaScript methods.

Using a .env file in your node.js development allows you to keep sensitive information out of your codebase and makes it easy to switch between different environments, such as development and production, without having to make changes to your code.

In summary, to use a .env file in your node.js development:

- Install the dotenv package using npm.

- Create a .env file in the root directory of your project and add your environment variables in the following format: **`VARIABLE_NAME=value`**

- Require the dotenv package and call the **`config()`** method in your node.js code.

- Access the values of your environment variables using **`process.env`**

