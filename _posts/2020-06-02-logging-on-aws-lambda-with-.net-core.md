---
title: Logging on AWS Lambda with .NET Core
date: 2020-06-02T21:56:17
categories:
  - technical
---


The easiest way to output logs from the function code is using the [Console class](https://docs.microsoft.com/en-us/dotnet/api/system.console?view=netcore-3.1) or [LambdaLogger](https://docs.aws.amazon.com/lambda/latest/dg/lambda-csharp.html) clas that writes to stdout / stderr. 

```csharp
LambdaLogger.Log("ENVIRONMENT VARIABLES: " + JsonConvert.SerializeObject(System.Environment.GetEnvironmentVariables()));
LambdaLogger.Log("CONTEXT: " + JsonConvert.SerializeObject(context));
LambdaLogger.Log("EVENT: " + JsonConvert.SerializeObject(invocationEvent));
```

If you want to use ILogger, which is the standard logging interface, use Microsoft.Extensions.Logging.Console

```csharp
Services.AddLogging(x => x
    .AddFilter("", LogLevel.Information)
    .AddConsole());
```

In .NET Core 3.1, you can use ILoggerFactory to set up the logging. Please refer to "[Non-host console app](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/logging/?view=aspnetcore-3.1#non-host-console-app)"

