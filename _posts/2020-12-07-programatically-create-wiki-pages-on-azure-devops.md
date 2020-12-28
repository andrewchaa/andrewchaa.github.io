---
title: Programatically create wiki pages on Azure DevOps
date: 2020-12-07T11:43:32
categories:
  - technical
tags:
  - azure-devops
---


It has a handy client library: [https://docs.microsoft.com/en-us/azure/devops/integrate/get-started/client-libraries/samples?view=azure-devops](https://docs.microsoft.com/en-us/azure/devops/integrate/get-started/client-libraries/samples?view=azure-devops)

For me, using the client library was much easier. The library has several client HTTP client and I used WikiHttpClient. If you register it in your ServiceCollection, you can use it by getting it from IServiceProvider.

```csharp
public class Startup
{
    private static readonly IServiceCollection Services = new ServiceCollection();

    public static IServiceProvider ConfigureServices()
    {
        var devopsWikiToken = Environment.GetEnvironmentVariable("devops-wiki-token");
        var vssConnection = new VssConnection(new Uri("https://dev.azure.com/<your org>"), 
            new VssBasicCredential(string.Empty, devopsWikiToken));

        Services.AddSingleton(x => vssConnection.GetClient<WikiHttpClient>());

        return Services.BuildServiceProvider();
    }
}

```

Then get the service from ServiceProvider and publish your page. If you want to update the existing page, you have to send etags in the request.

```csharp
public async Task Publish(string page, string markdown)
{
    var etags = await GetEtag(page);
    await _client.CreateOrUpdatePageAsync(new WikiPageCreateOrUpdateParameters { Content = markdown },
        Project,
        WikiIdentifier,
        page,
        string.Join(", ", etags)
    );

    Console.WriteLine($"Published the page: {page}.");
}

private async Task<IEnumerable<string>> GetEtag(string page)
{
    try
    {
        var pageResponse = await _client.GetPageAsync(Project,
            WikiIdentifier,
            page,
            includeContent: false);

        return pageResponse.ETag;
    }
    catch (Exception)
    {
        Console.WriteLine($"The wiki page: {page} doesn't exist.");
        return new List<string>();
    }
}
```

