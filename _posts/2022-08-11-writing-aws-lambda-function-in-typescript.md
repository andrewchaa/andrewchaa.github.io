---
title: Writing AWS Lambda function in Typescript
date: 2022-08-11
tags:
  - typescript
  - static website
  - lambda
---

AWS Lambda doesn’t support Typescript out of the box. I have to convert typescript files into javascript and upload it to the lambda. I thought it must be a trivial job to do it, yet I couldn’t find any starter package like [create-react-app](https://reactjs.org/docs/create-a-new-react-app.html).

After a bit of googling-around, it seemed Webpack is the tool to bundle multiple javascript files into one. So I started [learning Webpack](https://www.youtube.com/watch?v=sOUhEJeJ-kI&list=PL4cUxeGkcC9hOkGbwzgYFmaxB0WiduYJC) by watching videos on YouTube. Before, I just used create-react-app and it did everything I need for me. 

### Webpack

Following the tutorial series, I’ve initialised the typescript project

```bash
tsc --init
```

I updated `tsconfig.json`, though. By default, it’s `es5` and `commonjs`

```json
"target": "es6",
"module": "ES2015",
```

Then I initialised the project with  `npm` to create `package.json`

```bash
npm init
```

I can install NPM packages now. I prefer `yarn`

```bash
yarn add typescript webpack webpack-cli ts-loader --dev
```

You may have typescript installed globally, yet you need to install it locally as well for the webpack to work properly. 

I’ve created `/src` and `/dist` in the root directory. Now my project folder looks like this.

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/51c30a94-770e-4bc6-8f2e-0289d1cf1e33/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230324T012910Z&X-Amz-Expires=3600&X-Amz-Signature=8d8f0d7b3ce6a6f0dc089ad80dafdc204a4fc79975f70ce542ecf6381f192e53&X-Amz-SignedHeaders=host&x-id=GetObject)

Let’s add `webpack.config` to transpile and bundle the typescripts. 

```javascript
const path = require('path')

module.exports = {
  entry: {
    'create-user': './src/create-user/index.ts',
    'create-job': './src/create-job/index.ts'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
		library: {
      type: 'commonjs2',
    },
    filename: '[name]/index.js',
    path: path.resolve(__dirname, 'dist')
  }
}
```

I’m going to create multiple functions in this project. So it has [multiple entry points](https://webpack.js.org/concepts/output/). Each function has its own directory. I have two directories, `create-user` and `create-job`.

`module`'s `rules` specifies `ts-loader` as transpiler. It will convert typescript files in `src` directory into javascript. `test` acts like a filter.

`output` tells the webpack where to store the bundled scripts. `path` accepts absolute path, so I used Nodejs’ `path` library. `[name]`refers to the name of the entry. Output directory will have sub-directories of `create-user` and `create-job`

Finally, add webpack script in the `package.json` file.

```json
"scripts": {
    "build": "webpack"
  },
```

When you do `yarn build` it will bundle up all typescript files into a single javascript file, `index.js` in each directory.

### Handling parameters

API Gateway will send parameters to lambda. The types of parameters are

- Path Parameter

- QueryString parameter

- Body

Lambda function accepts `event` parameter and you can get all those 3 parameters from it.

```javascript
// queryStringParameters
export const handler = Sentry.AWSLambda.wrapHandler(async (ev: any, context: Context) => {
  const companyId = ev.queryStringParameters.companyId
  const jobNo = ev.queryStringParameters.jobNo

  console.log('getting job details for job id: ', companyId, jobNo)

// pathParameters
export const handler = Sentry.AWSLambda.wrapHandler(
  async (ev: any, context: Context) => {

  const jobNo = ev.pathParameters.jobNo

// body
export const handler = Sentry.AWSLambda.wrapHandler(async (ev: any, context: Context) => {
  const { email } = JSON.parse(ev.body)
```

