---
title: Installing Ubuntu on Windows 10
date: 2019-03-01T00:00:00.000Z
comments: true
categories:
  - programming
tags: WILT
---

It's really nice that I can use linux shell on windows. One of big part of me using MacBook was to have linux / unix-like shell and development environment.

ubuntu terminal is available on [Microsoft Store](https://www.microsoft.com/en-gb/p/ubuntu/9nblggh4msv6?activetab=pivot:overviewtab). Windows 10 S does not support running it, so check your Windows version.

Before installing it on Windows, you have to turn on "Windows Subsystem for LInux", so visit Programs and Features on Control Panel and do it. Another option, if you like terminal, you can do it with powershell.

```powershell
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
```

Unfortunately, it will ask  you to restart the system. After reboot, install Ubuntu on the store. It will download the app first then you need to launch it to actually install it. Launch will open a terminal window and install it.
