---
title: Sorting a list of objects by date in JavaScript
date: 2023-07-04
tags:
  - typescript
  - javascript
---

I have an API endpoint running on AWS lambda, written in TypeScript. The endpoint returns a list of jobs, which are service tasks performed by Gas engineers to address issues with installed boilers. 


One of the main stakeholders has expressed a requirement to view the list of jobs sorted by the **`reportDate`** property. However, there is a challenge since **`reportDate`** is stored as a string, not a Date. To address this, we need to convert the string into a Date object before sorting the list properly.


In JavaScript, the **`Array.prototype.sort()`** function can be used to sort a list. Here is the code snippet to achieve this:


```typescript
export async function getAllJobsByCompanyId(companyId: string)
  : Promise<[Job[], string]> {
  const [jobs, errorMessage] = await jobsRepository.getJobs(companyId)
  const sortedJobs = jobs.sort((a, b) => {
    return new Date(b.reportDate).getTime() - new Date(a.reportDate).getTime()
  })

  return [sortedJobs, errorMessage]
}
```


In this code, we retrieve the jobs using the **`jobsRepository.getJobs()`** method. Then, we sort the jobs based on the **`reportDate`** property by converting the string into a Date object using **`new Date()`**. The **`sort()`** function compares the dates using the **`getTime()`** method, ensuring the list is sorted in descending order.


