---
title: Handling files in c\#
date: 2020-12-15T15:11:19
categories:
  - technical
tags:
  
---


### search subdirectories  recursively

You can use `Directory.GetFiles` that searches subdirectories for  you.\([https://stackoverflow.com/questions/9830069/searching-for-file-in-directories-recursively/9830116](https://stackoverflow.com/questions/9830069/searching-for-file-in-directories-recursively/9830116)\)

```csharp
string[] files = Directory.GetFiles(sDir, 
  "*.xml", 
  SearchOption.AllDirectories);
```

### get full path from relative path

```csharp
Path.GetFullPath(".\\EventsData\\Events.dll")
```

