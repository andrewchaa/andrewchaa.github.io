---
title: NET Core Service Registrations
date: 2020-10-23T14:12:17
categories:
  - technical
---


To do it, you would need to

* Install relevant packages
* Register services
* Build the provider

### Install NuGet packages

```bash
Microsoft.Extensions.Configuration.EnvironmentVariables
Microsoft.Extensions.Configuration.Json
Microsoft.Extensions.DependencyInjection
Microsoft.Extensions.Hosting
Microsoft.Extensions.Logging
Microsoft.Extensions.Logging.Abstractions
Microsoft.Extensions.Logging.ApplicationInsights
Microsoft.Extensions.Logging.Console
Microsoft.Extensions.Logging.Debug
```

### Register services

```csharp
internal class Startup
{
    private static IServiceCollection _services = new ServiceCollection();

    public static ServiceProvider ConfigureServices()
    {
        var clientHandler = new HeaderClientHandler("xxxx");
        _services.AddSingleton(x => 
            RestService.For<IDevOpsApi>(new HttpClient(clientHandler){ BaseAddress = new Uri("https://dev.azure.com")})
        );

        return _services.BuildServiceProvider();
    }
}

```

### User the service now

```csharp
var services = Startup.ConfigureServices();
var api = services.GetService<IDevOpsApi>();

await Parser.Default.ParseArguments<CliCommand>(args)
    .WithParsedAsync(async x =>
    {
        if (string.IsNullOrEmpty(x.Command))
        {
            Console.WriteLine("Examples:\n");
            Console.WriteLine($"dotnet run --c {Download}");
        }

        if (x.Command == Download)
        {
            var response = await api.ListArtifacts(10000);
            Console.WriteLine(response);
        }

    });

```

