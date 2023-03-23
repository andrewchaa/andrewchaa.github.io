---
title: What I learned today about JavaScript / TypeScript Note
date: 2023-02-28
tags:
  - javascript
  - typescript
---

### Stripping out special characters and normalising diacritic characters

22 Mar 2023

```typescript
const slugify = (s: string) => s
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-zA-Z0-9]/g, '')
  .replace(/\s+/g, '-').toLowerCase();
```

**cf. NFD**

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

