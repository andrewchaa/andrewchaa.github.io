---
title: Deploy Service Fabric type when one of its services needs deletion
date: 2020-05-21T07:51:02
categories:
  - technical
tags:
  
---


> "Error Services must be explicitly deleted before removing their Service Types."

First, you don't understand why it tries to remove the type. It's because you renamed one of the services. The pipeline doesn't understand renaming and thinks the old service should go to install the new service.

You have 3 options

* In SF Explorer, navigate to the service and click Actions &gt; Delete Service
* In PowerShell

```bash
Connect-ServiceFabricCluster
Remove-ServiceFabricService -ServiceName fabric:/MyApp/MyService
```

* In Service Fabric Powershell

Here I use Service Fabric Powershell as I deploy my SF app / type via Azure Devops

#### Service Fabric PowerShell

* Display name: Remove fabric:/MyApp/MyService
* Clsuter Service Connection: &lt;&lt; your connection &gt;&gt;
* Script Type: Inline Script
* Inline Script

```bash
Remove-ServiceFabricService -ServiceName `
  fabric:/MyApp/MyService -Force
```



