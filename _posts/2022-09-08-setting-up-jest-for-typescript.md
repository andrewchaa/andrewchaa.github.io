---
title: Setting up Jest for Typescript
date: 2022-09-08
tags:
  - typescript
  - jest
---

It takes a few steps to [run typescript jest tests](https://jestjs.io/docs/getting-started#using-typescript).

```bash
npm init # to create package.json. also create an empty yarn.lock file

yarn add -D jest ts-jest

jest --init # to initialise jest

yarn add -D babel-jest @babel/core @babel/preset-env
yarn add -D @babel/preset-typescript
yarn add -D ts-node
yarn add -D @types/jest
```

The `jest.config.ts` would be like this

```javascript
export default {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: [
    "/node_modules/"
  ],
  coverageProvider: "v8",
	preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    "^.+\\.(js|jsx)$": "babel-jest",
  }};
```

`babel` needs config file too

```javascript
module.exports = {
  presets: [
    ['@babel/preset-env', {targets: {node: 'current'}}],
    '@babel/preset-typescript',
  ],

};
```

Finally “test” to `npm script`

```json
"scripts": {
  "test": "jest"
},
```


A sample test file, `/src/reduce.test.ts`

```typescript
it('should calculate average', () => {
  const results = [
    { id: 1, result: 64 },
    { id: 2, result: 87 },
    { id: 3, result: 89 },
  ]

  const average = results.map(x => x.result).reduce((prev, curr) => prev + curr, 0) / results.length
  expect(average).toBe(80)
})
```

Often you have an error, `Cannot use import statement outside a module`

Make sure you have `babel.config.ts` and `jest.config.ts`

[https://stackoverflow.com/questions/58613492/how-to-resolve-cannot-use-import-statement-outside-a-module-in-jest](https://stackoverflow.com/questions/58613492/how-to-resolve-cannot-use-import-statement-outside-a-module-in-jest)

