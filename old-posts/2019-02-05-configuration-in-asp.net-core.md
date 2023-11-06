---
title: Configuration in ASP.NET Core
date: 2019-02-05
categories: [programming]
tags: WILT
---

When you create stateless service fabric asp.net core api, [the template doesn't add configuration builder by default.](https://marcinjuraszek.com/2018/10/asp-net-core-configuration-when-running-as-service-fabric-service.html)
I've spent about an hour pulling my hair why it doesn't load appsettings.json on start up. So, Add it first.

```csharp
// from CreateServiceInstanceListeners()
return new WebHostBuilder()
            .UseKestrel()
            .ConfigureAppConfiguration(
                (context, config) => config.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true))
            .ConfigureServices(
                services => services
                    .AddSingleton<StatelessServiceContext>(serviceContext))
            .UseContentRoot(Directory.GetCurrentDirectory())
            .UseStartup<Startup>()
            .UseServiceFabricIntegration(listener, ServiceFabricIntegrationOptions.None)
            .UseUrls(url)
            .Build();

```

If you want typed config setting, create a settings class

```csharp
public class SfUris
{
    public string QueryService { get; set; }
    public string CommandService { get; set; }
}

```

This class will be newed up by Services collection in startup.

```csharp

services.Configure<SfUris>(Configuration.GetSection("SfUris"));
services.AddSingleton(r => r.GetRequiredService<IOptions<SfUris>>().Value);
```

By returning the type with IOptions<T>().Value, you can get the object populated from the config.

Then you can use the typed config setting.

```csharp
services.AddTransient(x => x.GetService<IProxyFactory>()
                    .Create<ICommandService>(x.GetService<SfUris>().CommandService));
```
