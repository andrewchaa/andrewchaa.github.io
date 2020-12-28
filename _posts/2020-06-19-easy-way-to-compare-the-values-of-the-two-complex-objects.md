---
title: Easy way to compare the values of the two complex objects
date: 2020-06-19T15:56:56
categories:
  - technical
tags:
  
---


```csharp
public static bool ValueEqual<T1, T2>(T1 expected, T2 actual)
{
    var expectedValues = JsonConvert.SerializeObject(expected);
    var actualValues = JsonConvert.SerializeObject(actual);

    return expectedValues == actualValues;
}
```

