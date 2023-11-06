---
title: Copy all files in directory in C\#
date: 2020-12-29T17:45:56
categories:
  - technical
tags:
  - csharp
---


```csharp
void Copy(string sourceDir, string targetDir)
{
    Directory.CreateDirectory(targetDir);

    foreach(var file in Directory.GetFiles(sourceDir))
        File.Copy(file, Path.Combine(targetDir, Path.GetFileName(file)));

    foreach(var directory in Directory.GetDirectories(sourceDir))
        Copy(directory, Path.Combine(targetDir, Path.GetFileName(directory)));
}
```

