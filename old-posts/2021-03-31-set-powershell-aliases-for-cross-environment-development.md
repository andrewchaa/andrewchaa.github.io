---
title: Set Powershell Aliases for cross environment development
date: 2021-03-31T09:29:52
categories:
  - technical
tags:
  - powershell
---


You can check where the powershell profile is by doing `$profile`. 

```bash
PS C:\> $profile
C:\Users\andrew\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1
```

Open or create the profile file by doing `code $profile`. 

```bash
Set-Alias -Name ll -Value Get-ChildItem
Set-Alias -Name open -Value explorer
```

Then I can use `ll` and `open` instead of `dir` and `explorer`. 

