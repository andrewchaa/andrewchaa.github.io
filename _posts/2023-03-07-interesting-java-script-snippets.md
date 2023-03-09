---
title: Interesting JavaScript snippets
date: 2023-03-07
tags:
  - javascript
  - typescript
---

### Array.prototype.some()

The **`some()`** method tests whether at least one element in the array passes the test implemented by the provided function. It returns true if, in the array, it finds an element for which the provided function returns true; otherwise it returns false. 

```javascript
const oneDomain = policyArr.some((item) => item === "block");
const allDomains = policyArr.every((item) => item === "block");
return { oneDomain, allDomains };

{ oneDomain: true, allDomains: false }
```

### **Object.keys()**

The **`Object.keys()`** static method returns an array of a given object's own enumerable string-keyed property names.

```javascript
const domains = {
 "one.com": { policy: "block" },
 "two.com": { policy: "none" },
 "three.com": { policy: "none" },
}

const numDomains = Object.keys(domains).length; // O(1)
```

