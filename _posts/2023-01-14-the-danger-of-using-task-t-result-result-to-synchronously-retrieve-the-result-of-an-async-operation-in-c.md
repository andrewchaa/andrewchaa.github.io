---
title: The danger of using Task<TResult>.Result to synchronously retrieve the result of an async operation in C#
date: 2023-01-14
tags:
  - C#
  - async
---

Pretty long title ;-) I was aware that a deadlock could occur when using **`Task<TResult>.Result`**
, but I did not fully understand the reason for it until today

It is generally considered dangerous to use **`Task<TResult>.Result`** to synchronously retrieve the result of an asynchronous operation in C# because it can cause a deadlock.

When you call **`Task<TResult>.Result`**, the calling thread is blocked until the **`Task`** completes. If the **`Task`** is not already completed, the calling thread will wait indefinitely until the task completes.

The problem arises when the **`Task`** is running on the same thread as the calling thread. If the **`Task`** is running on the same thread as the calling thread, and the **`Task`** is blocked waiting for a resource that is being used by the calling thread, a deadlock occurs.

Additionally, when you use **`Task<TResult>.Result`**, the exception thrown by the task is wrapped in an **`AggregateException`** and re-thrown.

Instead of using **`Task<TResult>.Result`**, it is recommended to use **`await`** keyword which will not block the calling thread and also handle the exception in a more elegant way

