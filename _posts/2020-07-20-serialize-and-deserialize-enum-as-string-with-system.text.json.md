---
title: Serialize and deserialize enum as string with System.Text.Json
date: 2020-07-20T09:15:10
categories:
  - technical
---


A few different wasy to achive the same goal. For more comprehensive documentation, refer to [JSON in .NET](https://docs.microsoft.com/en-us/dotnet/standard/serialization/system-text-json-how-to). 

## Deserialize string value into enum

### Attribute

use [JsonConverter](https://docs.microsoft.com/en-us/dotnet/api/system.text.json.serialization.jsonconverterattribute?view=netcore-3.0) and [JsonStringEnumConverter](https://docs.microsoft.com/en-us/dotnet/api/system.text.json.serialization.jsonstringenumconverter?view=netcore-3.0).

```csharp
[JsonConverter(typeof(JsonStringEnumConverter))]
public enum AccountIdKind
{
    Iban = 1,
    Bban = 2
}
```

### Configure in Startup

```csharp
public void ConfigureServices(IServiceCollection services)
{
    ...
    services.AddControllers()
        .AddJsonOptions(x =>
        {
            x.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
        });

```

## Serialize enum as string in [Refit](https://github.com/reactiveui/refit)

```csharp
services.AddSingleton(x =>
{
    var hostUrl = new Uri(configuration["Api:BaseUrl"]);
    var subscriptionKey = configuration["Api:SubscriptionKey"];
    var headerClientHandler = new HeaderClientHandler(subscriptionKey);

    var jsonSerializerOptions = new JsonSerializerOptions();
    jsonSerializerOptions.Converters.Add(new JsonStringEnumConverter(JsonNamingPolicy.CamelCase));
    return RestService.For<ILedgerApi>(
        new HttpClient(headerClientHandler) { BaseAddress = hostUrl },
        new RefitSettings(new SystemTextJsonContentSerializer(jsonSerializerOptions))
    );
});

```

