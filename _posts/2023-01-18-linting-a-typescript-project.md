---
title: Linting a Typescript project
date: 2023-01-18
tags:
  - typescript
---

### Linting with ESLint

Linting a TypeScript project with ESLint can provide several benefits, including:

- Consistency: ESLint can enforce a consistent code style across your project, making it easier to read and understand.

- Error prevention: ESLint can catch common mistakes and errors, such as unused variables, before they cause problems in production.

- Improved code quality: ESLint can help to improve the overall quality of your code by enforcing best practices and encouraging the use of modern JavaScript features.

- Integration: ESLint can integrate with other tools such as code editors and build systems, making it easy to catch errors and style issues as you work.

- Customisability: ESLint is highly configurable and allows you to create custom rules specific to your project, this way you can add your own custom rule

To run ESLint on a TypeScript project, you need to do the following:

Install ESLint and the necessary TypeScript parser and plugin by running the command

```bash
yarn add eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

Create a file named **`.eslintrc.cjs`** in the root of your project and configure it to use the TypeScript parser and plugin by adding the following code:

```javascript
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: '.',
    project: ['./tsconfig.json'],
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    // "airbnb",
    // "airbnb/hooks",
    "prettier"
  ],
};
```

Run the command **`npx eslint --ext .ts,.tsx path/to/files`** to lint your TypeScript files.

You can also add a script in your package.json file to run eslint in your typescript files:

```json
"scripts": {
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
  },
```

Then you can run the script by typing **`yarn lint`** in your command prompt.

### **Beautifying code with Prettier**

Prettier is an open-source code formatting library for JavaScript and describes itself as “an opinionated code formatter. It automatically formats your code according to a consistent style, eliminating the need for developers to manually format their code. Prettier takes the hassle out of maintaining a consistent coding style and makes it easy for teams to collaborate on a project by eliminating discussions about code formatting.

Since we’re using ESLint, we want the `prettier-eslint` command, which ensures that Prettier formats our code in a consistent manner with our ESLint config. To get that command, install the `prettier-eslint-cli` package

```bash
yarn add -D prettier-eslint-cli
```

### Rules

```javascript
// **.eslintrc.cjs**
rules: {
    quotes: ['error', 'single', { avoidEscape: true }],
    'comma-dangle': ['error', 'always-multiline'], 
  },
```

### How to fix lint errors

error when using async promise function inside useEffect()

Add `void` to change the return type to `void`

```javascript
useEffect(() => {
    void checkUser()
  }, [])
```

Promise-returning function provided to attribute where a void return was expected.eslint[@typescript-eslint/no-misused-promises](https://typescript-eslint.io/rules/no-misused-promises)

Add `void` in the arrow function

```bash
<CommonButton title='SIGN IN' onPress={() => void handleSignIn()} />
```

`response.json()` any type error

```bash
export type AppUser = {
  companyId: string
  companyName: string
  firstname: string
  lastname: string
  email: string
  gasSafetyNumber?: string
  oftecNumber?: string
}

if (response.status !== statusCodes.OK) {
  return {status: response.status, data: null}
}

return {
  status: response.status,
  data: (await response.json() as {data: AppUser})?.data
}

```

