---
title: The Trouble of Implicitly Installed NuGet Packages
date: 2023-03-09
tags:
  - .NET
  - NuGet
---

Recently, I was given what seemed like a simple task: to replace an old, decommissioned package with a new one that offers the same functionality, plus some additional features. However, due to the unique way in which the old package was registered in the dependency graph, it had to be completely removed from the project. I uninstalled the old package and added a new one, but that wasn’t the end of it. It was actually the beginning of a not-so-pleasant adventure. 


The old package was implicitly referenced by so many other shared libraries, and the project still held it. I had to find a way to track down all possible ways the package was referenced.


First, [ASM Spy](https://github.com/mikehadlow/AsmSpy) was really handy. It outputs a list of all explicit and implicit assembly references like the below.


```bash
Reference: Newtonsoft.Json, Version=11.0.0.0, Culture=neutral, PublicKeyToken=30ad4fe6b2a6aeed
  Newtonsoft.Json, Version=11.0.0.0, Culture=neutral, PublicKeyToken=30ad4fe6b2a6aeed
Source: NotFound
    11.0.0.0 by DomainModel, Version=1.0.1432.0, Culture=neutral, PublicKeyToken=null
    11.0.0.0 by DomainModel.Helper, Version=1.0.1432.0, Culture=neutral, PublicKeyToken=null
    11.0.0.0 by Product, Version=1.0.155.0, Culture=neutral, PublicKeyToken=null
    11.0.0.0 by FirstData.AccountMaintenance, Version=3.0.148.0, Culture=neutral, PublicKeyToken=null
    11.0.0.0 by Provenir, Version=1.0.183.0, Culture=neutral, PublicKeyToken=null
    11.0.0.0 by Azure.Function, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
    11.0.0.0 by Http, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
    11.0.0.0 by Security, Version=1.0.113.0, Culture=neutral, PublicKeyToken=null
    11.0.0.0 by IdentityModel, Version=4.4.0.0, Culture=neutral, PublicKeyToken=e7877f4675df049f
    11.0.0.0 by Utils, Version=1.0.112.0, Culture=neutral, PublicKeyToken=null
```


Secondly, NuGet dependencies. I use Rider but it should be the same in Visual Studio.

1. Open the Solution Explorer in Rider and locate your project.
2. Right-click on your project and select "Manage NuGet Packages."
3. In the NuGet Package Manager, click on the "Installed" tab.
4. You will see a list of all the packages installed in your project, including the implicitly installed ones.
5. Look for the package that you suspect may have installed the implicit package and select it.
6. In the right-hand panel, you will see a tab labeled "Dependencies".
7. Click on the "Dependencies" tab to see all the packages that this package depends on, including the implicitly installed ones.
8. You can repeat this process for all the packages that you suspect may have installed the implicit package until you find the one that actually installed it.

