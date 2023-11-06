---
title: repositoryType parameter in Azure DevOps API
date: 2021-01-15T20:48:23
categories:
  - technical
tags:
  - azure-devops
---


```javascript
https://dev.azure.com/{organization}/{project}/_apis/build/definitions
  ?api-version=6.0
  &repositoryId=xxxxxxxx-e419-4a62-ae1a-ff6f5b6053b1
  &repositoryType=TfsGit
  &includeLatestBuilds=true
```

Yet the response of the api call was 400, Bad Request. 

![](/assets/image%20%2826%29.png)

I had to pass `repositoryType`

Yes, Azure DevOps was VSTS before and it had its own remoting-based source control, TFS. It supports multiple types of repository, including git and svn. So, it's not suprprising it requires repository type. Still, `repositoryId` is a unique identifier and DevOps should be able to locate it. Maybe `repositoryType` is an index in their database and it makes it much easier and cost-saving for them to have it in the query. 

I found out the values of `repositoryType` after a little bit of googling

| `repositoryType` | Description |
| :--- | :--- |
| TfsGit | Git on Azure DevOps. I had to use this. |
| TfsVersionControl | Team Foundation Server Version Control |
| GitHub | GitHub |
| GitHubEnterprise | GitHub Enterprise |
| svn | Subversion |
| Bitbucket | Bitbucket |
| Git | External Git. Still not sure what this meant, though ... |

