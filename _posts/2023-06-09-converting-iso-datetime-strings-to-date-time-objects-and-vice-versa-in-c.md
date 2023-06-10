---
title: Converting ISO Datetime Strings to DateTime Objects and Vice Versa in C#
date: 2023-06-09
tags:
  - .NET
---

In C#, you can convert ISO datetime strings to DateTime objects and vice versa using the following methods:

**To parse an ISO datetime string, use the** **`DateTime.Parse()`** **method.** 

This method takes an ISO datetime string as its input and returns a `DateTime` object. For example, the following code will parse the ISO datetime string `2023-06-09T10:15:00Z` and return a `DateTime` object representing the date and time 2023-06-09T10:15:00Z:

```c#
var dateTime = DateTime.Parse("2023-06-09T10:15:00Z");
```

**To convert a** **`DateTime`** **object to an ISO datetime string, use the** **`ToString()`** **method with the** **`s`** **format specifier.** 

This method will return an ISO datetime string representing the date and time of the `DateTime` object. For example, the following code will convert the `DateTime` object `dateTime` to an ISO datetime string

```c#
var isoDateTimeString = $"{datetime:s}Z")
```

Unfortunately, `.ToString("s")` doesn’t add `Z` at the end, and you have to add it yourself.

