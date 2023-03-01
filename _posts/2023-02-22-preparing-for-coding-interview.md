---
title: Preparing for Coding Interview
date: 2023-02-22
tags:
  - interview
---

Preparing for a coding interview is important for a number of reasons:

- Demonstrating your technical skills: In a coding interview, you will be asked to solve programming problems and demonstrate your technical skills. Preparing for the interview will help you hone your programming skills and increase your chances of performing well.

- Familiarizing yourself with the interview process: Knowing what to expect in a coding interview can help you feel more confident and less anxious during the actual interview. Preparing for the interview will give you a better understanding of what types of questions you might be asked and how to approach them.

- Time management: Coding interviews are typically timed, and you will be expected to solve the problem within a certain timeframe. Preparing for the interview will help you manage your time more effectively and increase your chances of completing the task within the allotted time.

- Increasing your chances of getting the job: The purpose of a coding interview is to evaluate your technical skills and determine whether you are a good fit for the job. Preparing for the interview will help you showcase your abilities and increase your chances of getting hired.

Overall, preparing for a coding interview is crucial if you want to succeed in the highly competitive tech industry. By investing time and effort into your preparation, you can demonstrate your technical skills, feel more confident during the interview, and increase your chances of getting hired.

## Coding Interview Patterns

### Two Pointers

The **two pointers** pattern uses two pointers to iterate over an array or list until the conditions of the problem are satisfied. This is useful because it allows us to keep track of the values of two different indexes in a single iteration. Whenever there’s a requirement to find two data elements in an array that satisfy a certain condition, the two pointers pattern should be the first strategy to come to mind

```typescript
// palindrome
import isPalindrome from '../src/isPalindrome';

describe('isPalindrome', () => {
  it('should return true for kayak', () => {
    expect(isPalindrome('kayak')).toBe(true);
  });

  it('should return true for abba', () => {
    expect(isPalindrome('abba')).toBe(true);
  });
})

export default function isPalindrome(s: string) {
  let start = 0;
  let end = s.length - 1;

  while (s[start] === s[end]) {
    if (Math.abs(start - end) <= 1) {
      return true;
    }
    start++;
    end--;
  }

  return false;
}
```

```typescript
// sum of three valuels
import {findSumOfThree} from '../src/findSumOfThree';

describe('findSumOfThree', () => {
  it('should return true for [3, 2, 1, 4, 5] and 9', () => {
    expect(findSumOfThree([3, 2, 1, 4, 5], 9)).toBe(true);
  });
});

export function findSumOfThree(nums: number[], target: number) {
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length; i++) {
    let low = i + 1;
    let high = nums.length - 1;
    while (low < high) {
      const triple = nums[i] + nums[low] + nums[high];
      if (triple === target) {
        return true;
      }

      if (triple > target) {
        high--;
      } else {
        low++;
      }
    }
  }

  return false;
}
```

```typescript
// reverse words
// Hello World -> World Hello
export default function reverseWords(sentence: string): string {
  return reverse(sentence.replace(/\s+/g, ' '))
    .split(' ')
    .map(word => reverse(word))
    .join(' ')
}

function reverse(sentence: string): string {
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

### Sliding Window

The **sliding window** pattern is used to efficiently solve problems involving arrays or lists by creating a window of elements and moving it over the array. This is useful for problems that require finding a contiguous sequence of elements that satisfy a certain condition. The window starts at the beginning and moves until the end of the array is reached, while keeping track of the elements contained within the window.

```plain text
export function maxSubArray(nums: number[]): number {
  let maxSum = -Infinity;
  let currentSum = 0;

  for (let i = 0; i < nums.length; i++) {
    currentSum += nums[i];
    maxSum = Math.max(maxSum, currentSum);
    if (currentSum < 0) {
      currentSum = 0;
    }
  }

  return maxSum;
}

```

### 

