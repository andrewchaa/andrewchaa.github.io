---
title: Linting Typescript project
date: 2023-01-18
tags:
  - typescript
---

To run ESLint on a TypeScript project, you will need to do the following:

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

