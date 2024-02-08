---
title: Debugging Checkbox State Updates by 
date: 2024-02-07
tags:
  - react native
  - jest
  - immer
---

`immer`, while offers numerous benefits, its inner workings can sometimes present unexpected challenges.


I was building a React Native app with a feature where users can complete a logbook for specific jobs. To mark completion, you implement a checkbox that updates the `job.boilerReadings.logBook` property. However, things take a turn when you encounter a seemingly straightforward error: "cannot set logBook of null."


### **My Debugging Journey**


**Understanding the Error**


The error stems from attempting to assign a value to a non-existent property (`logBook`) within the nested `boilerReadings` object. This happens because, initially, `boilerReadings` is undefined.


**Immer's Hidden Gem**


While working with Immer, remember that it returns a function instead of the directly updated state. This function encapsulates the state updates you've defined.


**Unit Test Revelation**


My initial unit test below failed because it simply checked the returned function from `setJob`, which wasn't the actual updated state object.


```typescript
const newJobState = setJob.mock.calls[0][0]
expect(newJobState.boilerReadings!.logBook).toBe(true)
```


Because I used `immer`, `setJob` received an anonymous function, the the object.


### **The Fix**


**Conditional Initialization**


To prevent the null property error, we add a conditional check:


This ensures that `boilerReadings` exists before assigning `logBook`.


```typescript
onChange={checked => setJob(currentJob => produce(currentJob, draft => {
    if (!draft.boilerReadings) {
        draft.boilerReadings = {};
    }
    draft.boilerReadings.logBook = checked;
}))}
```


**Correct Unit Test**


We modify the unit test to call the returned function with the initial state:


```typescript
const newJobState = setJob.mock.calls[0][0](testJob);
expect(newJobState.boilerReadings!.logBook).toBe(true);
```


My key takeaway was that `immer` returns a function to calculate the final state.


