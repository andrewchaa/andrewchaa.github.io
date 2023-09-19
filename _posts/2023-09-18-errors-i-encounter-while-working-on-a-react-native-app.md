---
title: Errors I encounter while working on a React Native app
date: 2023-09-18
tags:
  - react native
  - errors
---

### This package itself specifies a main module field that could not be resolved

18/9/2023

I updated `immer` to `10.0.2` and then this started. It turns out `immer` uses `main.js` in the `node_module` and  `MetroJS` bundler default doesn’t compile typescript `.ts`, `.tsx`, and `.mjs` file. Edit `metro.config.js` file in the root project folder to handle the file extension. 

```javascript
const { getDefaultConfig } = require('expo/metro-config');

let defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.sourceExts = [...defaultConfig.resolver.sourceExts, 'mjs']
module.exports = defaultConfig;
```

