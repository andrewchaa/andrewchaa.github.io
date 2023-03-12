---
title: Interesting JavaScript / TypeScript snippets
date: 2023-03-07
tags:
  - javascript
  - typescript
---

### Split Number into individual digits

```typescript
// functional
const digits = n.toString().split('').map(Number)

// procedural. better for algorithm test
function getNext(n: number): number {
  let sum = 0
  while (n > 0) {
    const d = n % 10
    sum += d ** 2
    n = Math.floor(n / 10)
  }
  return sum
}
```

### Empty object of an interface

Use `<>{}` to create an empty object of a type

```typescript
it('should return the list of jobs given companyId', async () => {
    const event = <APIGatewayProxyEvent>{}
    Object.assign(event, getJobGraphQlEvent)

    const result = (await graphqlJobs(
      event,
      <Context>{},
      () => {}
    )) as APIGatewayProxyResult

    expect(JSON.parse(result.body)).toEqual({
      data: { job },
    })
  })
```

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

### Object.assign()

A static method that copies all enumerable own properties from one or more source objects to a target object.

```typescript
it('should return the list of jobs given companyId', async () => {
  const event = <APIGatewayProxyEvent>{}
  Object.assign(event, getJobGraphQlEvent)

  const result = (await graphqlJobs(
    event,
    context,
    () => {}
  )) as APIGatewayProxyResult

  expect(JSON.parse(result.body)).toEqual({
    data: { job },
  })
})
```

