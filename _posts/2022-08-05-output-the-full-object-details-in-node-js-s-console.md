---
title: Output the full object details in Node.js’s Console
date: 2022-08-05
tags:
  - javascript
---

You have an object with deep hierarchy and want to see the values. The usual `console.log` will show only the values of the immediate children. Instead, use

```javascript
console.dir(response, { depth: null })
```

