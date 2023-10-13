---
title: Nominal Typing vs. Structural Typing
date: 2023-10-12
tags:
  - programming
---

Nominal typing and structural typing are two different systems that programming languages use to determine if two types are compatible. Let's dive into each one:

### **Nominal Typing (Name-based Typing):**

In nominal typing, two variables are type-compatible if and only if their declarations name the same type. The focus is on the name of the type and not on the structure or content of the type.

**Example**: In a nominally-typed language, if you have a type `Dog` and another type `Canine`, even if they have the exact same properties and methods, they are considered different types because they have different names.

**Common in**: Languages like Java, C#, and Swift (for custom types).

### **Structural Typing (Structure-based Typing):**

In structural typing, two variables are type-compatible if their types have the same structure, regardless of what the types are named. This means that if two types have the same member variables and methods, they are considered to be the same type.

**Example**: In a structurally-typed language, if you have a type `Dog` with properties `name` and `age`, and another type `Person` with properties `name` and `age`, they can be considered the same type.

**Common in**: Languages like TypeScript and Go.

### **Comparison:**

**Flexibility**:

- **Nominal**: Tends to be less flexible. Even if two types have the same structure, they're distinct unless they're explicitly declared to have a relationship (like inheritance).

- **Structural**: More flexible in that it allows for more implicit type compatibility based on structure rather than name.

**Explicitness**:

- **Nominal**: More explicit, making it clear when two types are related by their naming and inheritance.

- **Structural**: Less explicit, as types might be considered the same just based on having the same structure, even if they represent completely different concepts.

**Safety**:

- **Nominal**: Can be considered safer in some scenarios since the programmer explicitly defines type relationships.

- **Structural**: While it can be safe, there's a risk of unintended type compatibility if two unrelated types coincidentally have the same structure.

**Use Cases**:

- **Nominal**: Good for situations where the relationship between types and their semantics is important.

- **Structural**: Useful for scenarios where the shape or structure of data matters more than its named type, e.g., in generic programming.

### JavaScript / TypeScript nominal typing

You can use a “brand”

```typescript
interface Vector2D {
  _brand: '2d';
  x: number;
  y: number;
}
function vec2D(x: number, y: number): Vector2D {
  return {x, y, _brand: '2d'};
}
function calculateNorm(p: Vector2D) {
  return Math.sqrt(p.x * p.x + p.y * p.y);  // Same as before
}

calculateNorm(vec2D(3, 4)); // OK, returns 5
const vec3D = {x: 3, y: 4, z: 1};
calculateNorm(vec3D);
           // ~~~~~ Property '_brand' is missing in type...
```

