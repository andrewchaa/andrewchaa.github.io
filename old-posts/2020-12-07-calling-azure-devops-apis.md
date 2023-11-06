---
title: Calling Azure DevOps APIs
date: 2020-12-07T11:43:32
categories:
  - technical
tags:
  - azure-devops
---


### .NET Client libraries

* Microsoft.VisualStudio.Services.Release.Client
* Microsoft.VisualStudio.Services.Client

[https://docs.microsoft.com/en-us/azure/devops/integrate/concepts/dotnet-client-libraries?view=azure-devops](https://docs.microsoft.com/en-us/azure/devops/integrate/concepts/dotnet-client-libraries?view=azure-devops)

### API documentation

This is one of the APIs I recently start using.

[https://docs.microsoft.com/en-us/rest/api/azure/devops/build/artifacts/list?view=azure-devops-rest-4.1\#buildartifact](https://docs.microsoft.com/en-us/rest/api/azure/devops/build/artifacts/list?view=azure-devops-rest-4.1\#buildartifact)

### Authorization

To call those APIs successfully, you have to be authorized. Create a PAT \(Personal Access Token\) and use it. By default, it uses [Basic Auth Scheme](https://en.wikipedia.org/wiki/Basic_access_authentication). Basic Auth scheme doesn't provide any security, so it's used together with HTTPS to secure the traffic

As you use PAT, you wouldn't have user name when the Basic Auth scheme asks for user name. So, Base64 encode your token like this.

```csharp
var token = "Basic " + Convert.ToBase64String(Encoding.UTF8.GetBytes($":{_accessToken}"));
request.Headers.Add("Authorization", token);

```

Then you are good to go and the api request will be successful.

