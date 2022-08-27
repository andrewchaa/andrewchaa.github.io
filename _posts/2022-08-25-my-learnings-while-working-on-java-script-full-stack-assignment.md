---
title: My learnings while working on JavaScript Full Stack assignment
date: 2022-08-25
tags:
  - react
  - node.js
---

### Refetch after mutation in apollo client

```javascript
const [addGrocery] = useMutation(ADD_GROCERY, {
  refetchQueries: [
    {query: GET_GROCERIES}
  ]
})
```

### Kill all node processes

`killall -9 node`

### Return JSON

```javascript
app.get('/usages', (req: Request, res: Response) => {
  res.send(res.json({
    usages: [{

    }]
  }))
})
```

### tsconfig.json in Express.js

```javascript
{
  "compilerOptions": {
    "target": "es2016",                                  /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */
    "moduleResolution": "node",                       /* Specify how TypeScript looks up a file from a given module specifier. */
    "outDir": "./dist",
    "module": "commonjs",
    "resolveJsonModule": true,
    "esModuleInterop": true,                             /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */
    "forceConsistentCasingInFileNames": true,            /* Ensure that casing is correct in imports. */
    "strict": true,                                      /* Enable all strict type-checking options. */
    "skipLibCheck": true                                 /* Skip type checking all .d.ts files. */
  }
}
```

Also remove the `type` attribute if set to `module` in your `package.json` file

### Express.js

```javascript
import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import getUsages from './getUsages'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
```

### Set up Jest

`jest.config.js`

```javascript
module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  modulePathIgnorePatterns: ["<rootDir>/dist/"]
}
```

`babel.config.js`

```javascript
module.exports = {presets: ['@babel/preset-env']}
```

packages

```javascript
"devDependencies": {
  "@babel/preset-env": "^7.18.10",
  "@types/jest": "^28.1.8",
  "babel-jest": "^28.1.3",
  "jest": "^28.1.3",
  "ts-jest": "^28.0.8",
  ...
}
```

### Convert string to number

```javascript
Number((dailyUsage * currentDateTime.daysInMonth).toFixed(2))
```

