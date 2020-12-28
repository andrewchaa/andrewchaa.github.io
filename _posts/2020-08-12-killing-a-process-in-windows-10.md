---
title: Killing a Process in Windows 10
date: 2020-08-12T09:38:58
categories:
  - technical
tags:
  
---


* Open the powershell prompt. I use [Windows Terminal](https://devblogs.microsoft.com/commandline/introducing-windows-terminal/)
* Type tasklist to see the list of all running processes and their PIDs. You can use a pipe with the more command

![](.gitbook/assets/image%20%2815%29.png)

* To kill a process by its PID, type like the below

```text
taskkill /F /PID pid_number
```

* To kill a process by its name, type the command

```text
taskkill /IM "process name" /F
```

You can use PowerShell commands too

```text
Stop-Process -Name "Process Name" -Force
Stop-Process -ID PID -Force
```

