---
title: Any CPU settings in Visual Studio sln content for Service Fabric service
date: 2020-06-19T15:47:36
categories:
  - technical
tags:
  
---


* Any CPU.ActiveCfg = Debug\|Any CPU
* Any CPU.ActiveCfg = Debug\|x64
* Any CPU.ActiveCfg = Release\|x64
* x64.ActiveCfg = Debug\|x64
* x64.Build.0 = Debug\|x64
* x64.Deploy.0 = Debug\|x64

```text
{27F34332-1E6A-4228-9D54-F79324D9011B}.Debug|Any CPU.ActiveCfg = Debug|x64
{27F34332-1E6A-4228-9D54-F79324D9011B}.Debug|x64.ActiveCfg = Debug|x64
{27F34332-1E6A-4228-9D54-F79324D9011B}.Debug|x64.Build.0 = Debug|x64
{27F34332-1E6A-4228-9D54-F79324D9011B}.Debug|x64.Deploy.0 = Debug|x64
{27F34332-1E6A-4228-9D54-F79324D9011B}.Release|Any CPU.ActiveCfg = Release|x64
{27F34332-1E6A-4228-9D54-F79324D9011B}.Release|x64.ActiveCfg = Release|x64
{27F34332-1E6A-4228-9D54-F79324D9011B}.Release|x64.Build.0 = Release|x64
{27F34332-1E6A-4228-9D54-F79324D9011B}.Release|x64.Deploy.0 = Release|x64
```

#### Remove Any CPU from GlobalSection preSolution

```bash
	GlobalSection(SolutionConfigurationPlatforms) = preSolution
		Debug|x64 = Debug|x64
		Release|x64 = Release|x64
	EndGlobalSection
```

#### Only 4 settings in GlobalSection postSolution

You don't need all of them. Especially those with Any CPU. Each project have 8 different settings. What you need is just 4 settings for each project. 

```text
{27F34332-1E6A-4228-9D54-F79324D9011B}.Debug|x64.ActiveCfg = Debug|x64
{27F34332-1E6A-4228-9D54-F79324D9011B}.Debug|x64.Build.0 = Debug|x64
{27F34332-1E6A-4228-9D54-F79324D9011B}.Release|x64.ActiveCfg = Release|x64
{27F34332-1E6A-4228-9D54-F79324D9011B}.Release|x64.Build.0 = Release|x64

# the below two are only for service fabric
{27F34332-1E6A-4228-9D54-F79324D9011B}.Debug|x64.Deploy.0 = Debug|x64
{27F34332-1E6A-4228-9D54-F79324D9011B}.Release|x64.Deploy.0 = Release|x64
```



