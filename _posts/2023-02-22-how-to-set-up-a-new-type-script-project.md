---
title: How to Set Up a New TypeScript Project
date: 2023-02-22
tags:
  - typescript
---

This is based on the following resources

- [https://www.digitalocean.com/community/tutorials/typescript-new-project](https://www.digitalocean.com/community/tutorials/typescript-new-project) 

- [https://jestjs.io/docs/getting-started](https://jestjs.io/docs/getting-started)

### Initialise the project

Create a project directory

```bash
mkdir typescript-quizzes
cd typescript-project
yarn add -D typescript
```

Now initialise the project

```bash
npx tsc --init
```

Using the `--init` flag in the above command will initialize your project by creating a `tsconfig.json`
 file in your `typescript-project` project directory. This `tsconfig.json` file will allow you to configure further and customize how TypeScript and the `tsc` compiler interact. You can remove, add, and change configurations in this file to best meet your needs.

Uncomment `outDir` option and enable it

```json
"outDir": "./build",
```

Add `"type": "module",` to the `package.json` to enable `import` statement

### Compiling the TypeScript project

```typescript
const world = 'world';

export function hello(who: string = world): string {
  return `Hello ${who}! `;
}
```

`npx tsc` will compile it and generate a compiled javascript file in the `./build` directory. You can activate 

Add [`.gitignore`](https://github.com/microsoft/TypeScript-Node-Starter/blob/master/.gitignore)[ file for the source control](https://github.com/microsoft/TypeScript-Node-Starter/blob/master/.gitignore) to the root directory.

### **Using Google TypeScript Style to Lint and Correct Your Code**

Using a linter when coding will help you to quickly find inconsistencies, syntax errors, and omissions in your code. Additionally, a style guide will not only help you ensure that your code is well-formed and consistent but allows you to use additional tools to enforce that style. A common tool for these is [eslint](https://eslint.org/), which works well with many IDEs to help during the development process.

With your project now set up, you can use other tools in the TypeScript ecosystem to help and avoid having to set up linting and configuration in the `tsconfig.json` file by hand. [Google TypeScript Style](https://github.com/google/ts-style) is one such tool. Google TypeScript Style, known as GTS, is a style guide, linter, and automatic code corrector all in one. Using GTS will help you to quickly bootstrap a new TypeScript project and avoid focusing on small, organizational details to focus on designing your project. GTS also offers opinionated default configuration. This means that you won’t have to do much configuration customization.

```bash
yarn add -D gts
```

### Set up Jest

```bash
yarn add --dev jestAdd the test script to the `package.json`
```

Then Initialise Jest

```json
jest --init
```

