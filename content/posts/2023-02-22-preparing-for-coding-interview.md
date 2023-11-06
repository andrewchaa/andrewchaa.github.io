---
title: Preparing for Coding Interview
date: 2023-02-22
tags:
  - interview
---

Preparing for a coding interview is important for a number of reasons:

1. Demonstrating your technical skills: In a coding interview, you will be asked to solve programming problems and demonstrate your technical skills. Preparing for the interview will help you hone your programming skills and increase your chances of performing well.
2. Familiarizing yourself with the interview process: Knowing what to expect in a coding interview can help you feel more confident and less anxious during the actual interview. Preparing for the interview will give you a better understanding of what types of questions you might be asked and how to approach them.
3. Time management: Coding interviews are typically timed, and you will be expected to solve the problem within a certain timeframe. Preparing for the interview will help you manage your time more effectively and increase your chances of completing the task within the allotted time.
4. Increasing your chances of getting the job: The purpose of a coding interview is to evaluate your technical skills and determine whether you are a good fit for the job. Preparing for the interview will help you showcase your abilities and increase your chances of getting hired.

Overall, preparing for a coding interview is crucial if you want to succeed in the highly competitive tech industry. By investing time and effort into your preparation, you can demonstrate your technical skills, feel more confident during the interview, and increase your chances of getting hired.


## Concepts to understand


### Runtime vs. Space Trade-Off


Runtime vs space trade-off refers to the balance between the amount of time a program takes to run (runtime) and the amount of memory space it requires to execute (space). In computer science, there is often a trade-off between the runtime and space complexity of an algorithm.


Runtime complexity refers to the amount of time it takes for an algorithm to complete, usually measured in terms of the number of operations performed by the algorithm as a function of the input size. Space complexity, on the other hand, refers to the amount of memory required by the algorithm to execute.


In general, there is often a trade-off between runtime and space complexity. Algorithms that are more efficient in terms of runtime may require more memory space to execute, while algorithms that are more efficient in terms of space may require more time to execute.


When designing algorithms, it is important to consider both the runtime and space complexity, and to strike an appropriate balance based on the specific requirements of the problem at hand. For example, if a program needs to process very large datasets, it may be necessary to use an algorithm with high space complexity in order to reduce the runtime. Conversely, if memory is limited, it may be necessary to use an algorithm with lower space complexity, even if it means sacrificing some runtime efficiency


## Coding Interview Problems


### Happy Number


Use the slow and fast pointer patter


```typescript
export default function isHappyNumber(n: number): Boolean {
  let slow = n
  let fast = getNext(n)

  console.log('slow', slow, 'fast', fast)

  while (slow !== fast && fast !== 1) {
    slow = getNext(slow)
    fast = getNext(getNext(fast))
    console.log('slow', slow, 'fast', fast)
  }

  return fast === 1
}

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


### First Recurring Character


```typescript
// Find the first recurring character of the following lists and analyze the runtime vs space trade-off of your solution

const task1 = [
 [2,5,1,2,3,5,1,2,4], // Should return 2
 [2,1,1,2,3,5,1,2,4], // Should return 1
 [2,3,4,5], // Should return undefined
 [2,5,5,2,3,5,1,2,4] // Should return 5
]

function firstRecurringCharacter(numbers) {
  const hashTable = {} // { '1':1, '5':1, '1':1 }
  for (let i = 0; i < numbers.length; i++) {
    if (hashTable[numbers[i]]) {
      return numbers[i]
    } else {
      hashTable[numbers[i]] = 1 // hashTable['1'] = 1
    }
  }
  return undefined
}

function logResult(result, expected, message) {
  console.log(result, expected, result === expected ? 'PASS' : 'FAIL')
}

logResult(firstRecurringCharacter(task1[0]), 2)
logResult(firstRecurringCharacter(task1[1]), 1)
logResult(firstRecurringCharacter(task1[2]), undefined)
logResult(firstRecurringCharacter(task1[3]), 5)
```


This approach has a time complexity of O(n) since we only need to iterate through the array once, and a space complexity of O(n) since we need to store each element in the hash table.


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


### Palindrome with 1 mismatch


Another two pointer patter


```bash
export default function isPalindrome(s: string) {
  let start = 0
  let end = s.length - 1
  let mismatchOccurrence = 0

  while (true) {
    console.log(
      'start',
      start,
      s[start],
      'end',
      end,
      s[end],
      'mismatchOccurrence',
      mismatchOccurrence
    )
    if (s[start] !== s[end]) {
      mismatchOccurrence++
      if (s[start + 1] === s[end]) {
        start++
      } else if (s[start] === s[end - 1]) {
        end--
      }
    }

    if (mismatchOccurrence > 1 || s[start] !== s[end]) {
      return false
    }

    if (Math.abs(start - end) <= 1) {
      return true
    }

    start++
    end--
  }
}
```


### Sliding Window


The **sliding window** pattern is used to efficiently solve problems involving arrays or lists by creating a window of elements and moving it over the array. This is useful for problems that require finding a contiguous sequence of elements that satisfy a certain condition. The window starts at the beginning and moves until the end of the array is reached, while keeping track of the elements contained within the window.


```text
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


