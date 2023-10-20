---
title: My JavaScript / TypeScript Note
date: 2023-10-19
tags:
  - javascript
  - typescript
---

### console.dir

You have an object with deep hierarchy and want to see the values. The usual `console.log` will show only the values of the immediate children. Instead, use

```javascript
console.dir(response, { depth: null })
```

### Unicode Normalisation

You can normalise diacritic characters and strip out special characters.

Unicode Normalization Form D (NFD) is one of the four Unicode normalization forms defined by the Unicode Standard. NFD stands for Normalization Form D (Canonical Decomposition). The purpose of Unicode normalization is to provide a unique and consistent representation of equivalent Unicode strings that might have different byte sequences but represent the same text.

In NFD, a Unicode string is transformed into a fully decomposed form, which means that it represents precomposed characters (characters with diacritic marks or other combining characters) as their base characters followed by the separate combining characters (such as accents or other diacritics). This decomposition is done based on canonical equivalence as defined by the Unicode Standard.

For example, consider the character "é" (U+00E9, LATIN SMALL LETTER E WITH ACUTE). In NFD, it would be decomposed into its base character "e" (U+0065, LATIN SMALL LETTER E) followed by the combining acute accent "´" (U+0301, COMBINING ACUTE ACCENT): "e´".

Using NFD can be helpful when performing text processing tasks such as sorting, searching, matching, or removing diacritics, as it allows for a more uniform representation of equivalent strings and easier manipulation of text

```typescript
const original = 'Café';
const decomposed = original.normalize('NFD');
console.log(decomposed); // Output: Café
```

**cf. u0300 - u036f**

The Unicode code points between U+0300 and U+036F belong to a block called "Combining Diacritical Marks." This block contains non-spacing combining characters (diacritics) that are used to modify the appearance of the base characters they are combined with. Combining characters do not have any spacing or width on their own, and they are visually combined with the preceding base character.

Some common examples of combining diacritical marks in this range include:

- U+0300: Combining Grave Accent (̀)

- U+0301: Combining Acute Accent (́)

- U+0302: Combining Circumflex Accent (̂)

- U+0303: Combining Tilde (̃)

- U+0304: Combining Macron (̄)

- U+0306: Combining Breve (̆)

- U+0307: Combining Dot Above (̇)

- U+0308: Combining Diaeresis (̈)

- U+030A: Combining Ring Above (̊)

- U+030B: Combining Double Acute Accent (̋)

- U+030C: Combining Caron (̌)

These combining diacritical marks are used in various languages and scripts to modify the base characters' pronunciation, meaning, or other aspects. In Unicode normalization, these combining

```typescript
const slugify = (s: string) => s
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-zA-Z0-9]/g, '')
  .replace(/\s+/g, '-').toLowerCase();
```

### Replace multiple white spaces with one

Sometimes, you want to replace multiple white spaces with just one. This regular expression will do that job

```typescript
sentence.replace(/\s+/g, ' ')
```

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

### import json 

[https://stackoverflow.com/questions/34944099/how-to-import-a-json-file-in-ecmascript-6](https://stackoverflow.com/questions/34944099/how-to-import-a-json-file-in-ecmascript-6)

```shell
import * as data from './example.json';
const word = data.name;
console.log(word); // output 'testing'
```

