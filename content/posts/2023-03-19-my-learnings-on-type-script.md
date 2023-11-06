---
title: My learnings on TypeScript
date: 2023-03-19
tags:
  - typescript
---

### never

- won’t allow the code to return `undefined`
- `void` function can return `undefined`

```typescript
function functionThrow(): never {
    throw new Error("This function return never");
}
```


```typescript
function outputMessage(message: string) {
    if (typeof message === "string") {
        console.log(message);
    } else {
        let invalid = message; // never type
        console.error(invalid);
    }
}
```


### unknown

- better `any`
- `any` will compile successfully
- force you to use the type or type assertion

```typescript
let variable2: unknown;
variable2 = "It is a string";
console.log(variable2.substr(0,2)) // Does not compile here
```


### string literal


```typescript
type Direction = "north" | "south" | "east" | "west";
let myDirection:Direction = "north";
// let yourDirection:Direction = "no-where"; // Does not compile
```


### casting


```typescript
const unknownType: unknown = "123"
    const cast1: number = <number>unknownType;
    const cast2: number = unknownType as number;
```


