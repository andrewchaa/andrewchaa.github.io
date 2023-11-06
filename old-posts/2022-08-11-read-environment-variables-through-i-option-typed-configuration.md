---
title: Read environment variables through IOption typed configuration
date: 2022-08-11
tags:
  - .NET
---

[The options pattern](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/configuration/options?view=aspnetcore-6.0) uses classes to provide strongly typed access to configuration values, including environment variables. 

Environment variables can be hierarchical. They use __ as separator.

```bash
CoreConfig__GlobalId
ServiceBusConfig__ConnectionString
GrpcConfig__RemoteHostAddress
```

We can use map section.

```c#
services.Configure<CoreConfig>(config.GetSection(nameof(CoreConfig)))
```

Or access it directly. You can see that you have to use `:` as separator.

```c#
config.GetValue<string>("ServiceBusConfig:ConnectionString")
```

