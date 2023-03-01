---
title: What I learned today about JavaScript / TypeScript Note
date: 2023-02-28
tags:
  - javascript
  - typescript
---

28 Feb. 2023

Sometimes, you want to replace multiple white spaces with just one. This regular expression will do that job

```typescript
sentence.replace(/\s+/g, ' ')
```

To reverse a sentence using two pointer pattern, you need to convert string into char[] and then vice versa. 

```typescript
const characters = [...sentence] // to convert string into char array
characters.join('')              // to convert char array into string
```

```typescript
export default function reverseWords(sentence: string): string {
  let low = 0
  let high = sentence.length - 1

  const characters = [...sentence]

  while (low < high) {
    const temp = characters[low]
    characters[low] = characters[high]
    characters[high] = temp
    low++
    high--
  }

  return characters.join('')
}
```

