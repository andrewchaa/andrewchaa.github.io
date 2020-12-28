---
title: List active \(pending\) Pull Requests on Microsoft Teams chat room
date: 2020-07-31T15:11:38
categories:
  - technical
tags:
  
---


## My Acceptance Criteria

* List down all Pull Requests
* Send the message once a day, at 9 AM
* Send the message only from Monday to Friday, not in the weekend
* The message has the list of all pending Pull Requests and associated link to the page where you can review the PR
* Each team can have their own customised list of Pull Requests

## Azure Function

My chosen app service was Azure Function. I used webjobs before but it seemed not relevant any more in .NET Core era. Azure Function supports [CRON](https://en.wikipedia.org/wiki/Cron) expression, so it's easy to execute the function daily. I'm not very familiar with CRON expression, so used this [cheatsheet](https://arminreiter.com/2017/02/azure-functions-time-trigger-cron-cheat-sheet/). 

```csharp
[FunctionName("RetrievePullRequests")]
public static async Task Run([TimerTrigger("0 0 9 * * MON,TUE,WED,THU,FRI")]TimerInfo myTimer, ILogger log)
{
    log.LogInformation($"Monring News function executed at: {DateTime.Now}");

    var pat = "<your personal access token>";
    var credentials = new VssBasicCredential(string.Empty, pat);
    var connection = new VssConnection(new Uri("https://dev.azure.com/<your organization>"), credentials);

    var gitClient = await connection.GetClientAsync<GitHttpClient>();
    var project = "<your project>";
    var repositoryIds = new[] {"your_repository_1",
        "your_repository_2"
    };

    var pullRequests = new List<GitPullRequest>();
    foreach (var repositoryId in repositoryIds)
    {
        pullRequests.AddRange(await gitClient.GetPullRequestsAsync(project, repositoryId, new GitPullRequestSearchCriteria
        {
            Status = PullRequestStatus.Active
        }));
    }


    var facts = "";
    foreach (var pullRequest in pullRequests)
    {
        var repositoryName = pullRequest.Repository.Name;
        var title = pullRequest.Title;
        var repositoryUri =
            $"https://dev.azure.com/<your_organization>/<your_project>/_git/{repositoryName}/pullrequest/{pullRequest.PullRequestId}";
        var prSubmitter = pullRequest.CreatedBy.DisplayName;

        facts +=
            "      {\n"
            + $"      \"name\": \"{repositoryName}\",\n"
            + $"      \"value\": \"[{title}]({repositoryUri}) by {prSubmitter}\"\n"
            + "    },\n";
    }

    var generalChatRoom =
        "https://outlook.office.com/webhook/<your_teams_webhook_uri>";

    var card = GetBody(facts);
    Console.WriteLine(card);

    var client = new HttpClient();
    var response = await client.PostAsync(
        generalChatRoom,
        new StringContent(card));
}

private static string GetBody(string facts)
{
    return
        "{\n"
        + "  \"@type\": \"MessageCard\",\n"
        + "  \"@context\": \"http://schema.org/extensions\",\n"
        + "  \"themeColor\": \"0076D7\",\n"
        + "  \"summary\": \"Morning News\",\n"
        + "  \"sections\": [{\n"
        + "    \"markdown\": true,\n"
        + "    \"facts\": [\n"
        + $"{facts}"
        + "      ]\n"
        + "  }]\n"
        + "}";
}

```

## Continuous delivery by using [Azure DevOps](https://docs.microsoft.com/en-us/azure/azure-functions/functions-how-to-azure-devops?tabs=csharp)

Create a file, .azure-pipelines-ci.yaml, in the root directory of your solution / project. 

### Build  your app

```yaml
pool:
      vmImage: 'VS2017-Win2016'
steps:
- task: DotNetCoreCLI@2
  displayName: NuGet Restore
  inputs:
    command: restore
    projects: '**/*.csproj'
    noCache: true
- task: DotNetCoreCLI@2
  inputs:
    command: 'build'    
- task: DotNetCoreCLI@2
  inputs:
    command: publish
    arguments: '--configuration Release --output publish_output'
    projects: '**/*.csproj'
    publishWebProjects: false
    modifyOutputPath: false
    zipAfterPublish: false
- task: ArchiveFiles@2
  displayName: "Archive files"
  inputs:
    rootFolderOrFile: "$(System.DefaultWorkingDirectory)/publish_output"
    includeRootFolder: false
    archiveFile: "$(System.DefaultWorkingDirectory)/build$(Build.BuildId).zip"
- task: PublishBuildArtifacts@1
  inputs:
    PathtoPublish: '$(System.DefaultWorkingDirectory)/build$(Build.BuildId).zip'
    artifactName: 'drop'
```

### Deoloy your app

```yaml
- task: AzureFunctionApp@1
  inputs:
    azureSubscription: '<your subscription>'
    appType: functionApp
    appName: '<your app name>'
```

