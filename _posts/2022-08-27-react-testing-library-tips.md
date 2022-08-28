---
title: React Testing Library Tips
date: 2022-08-27
tags:
  - react
  - react-testing-library
  - unit test
---

### Installation

```bash
yarn add --dev @testing-library/react
```

### SyntaxError: Cannot use import statement outside a module

[https://stackoverflow.com/questions/58613492/how-to-resolve-cannot-use-import-statement-outside-a-module-in-jest](https://stackoverflow.com/questions/58613492/how-to-resolve-cannot-use-import-statement-outside-a-module-in-jest)

Install jest, ts-jest and babel-jest:

```bash
npm i jest ts-jest babel-jest
```

`babel.config.js` (only used by jest)

```javascript
module.exports = {presets: ['@babel/preset-env']}
```

`jest.config.js`

```javascript
module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    "^.+\\.(js|jsx)$": "babel-jest",
  }
};
```

