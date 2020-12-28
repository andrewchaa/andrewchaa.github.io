---
title: Typed Configuration in ASP.NET Core
date: 2020-09-10T10:18:45
categories:
  - technical
classes: wide
---


```csharp
public class KeyVaultOptions
{
    public string TenantId { get; set; }
    public string ClientId { get; set; }
    public string ClientSecret { get; set; }
}

```

Then bind the DTO class to the config section.

```csharp
private static IServiceCollection AddConfigurations(this IServiceCollection services,
    IConfiguration configuration)
{
    services.Configure<KeyVaultOptions>(configuration.GetSection("KeyVault"));
    return services;
}

```

