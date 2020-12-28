---
title: Service Fabric app health check
date: 2020-06-22T08:41:39
categories:
  - technical
---


Add health check libraries

```bash
AspNetCore.HealthChecks.CosmosDb
```

Register the service against IHealthCheck interface

```csharp
// Startup.cs
public void ConfigureServices(IServiceCollection services)
{
    ....
    services.AddHealthChecks().AddCosmosDb(cosmosDbOptions.ConnectionString);
    services.AddTransient<IEnumerable<IHealthCheck>>(x =>
    {
        var cosmosDbOptions = x.GetService<IOptions<CosmosDbOptions>>().Value;

        return new List<IHealthCheck>{new CosmosDbHealthCheck(cosmosDbOptions.ConnectionString)};
    });

}

```

Add an healthcheck endpoint

```csharp
// Startup.cs
public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    ...
    app.UseEndpoints(x => x.MapHealthChecks("/health"));
```

As we registered CosmosDb healthcheck in the services collection, the cosmos db healtcheck will be carried out when this endpoint gets called.

```csharp
// ConfigureServices
services.AddHealthChecks().AddCosmosDb(cosmosDbOptions.ConnectionString);
```

Also we want to carry out a regular health check and report the status back to Service Fabric cluster. So override RunAsync from Api class

```csharp
// Api.cs
protected override async Task RunAsync(CancellationToken cancellationToken)
{
    var configBuilder = new ConfigurationBuilder();

    configBuilder.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
#if DEBUG
    configBuilder.AddJsonFile($"appsettings.Development.json", true);
#endif
    var config = configBuilder.Build();

    var results = new List<HealthCheckResult>();
    var healthchecks = new List<IHealthCheck>
    {
        new CosmosDbHealthCheck(config.GetSection("CosmosDb:ConnectionString").Value)
    };


    var intervalSuccess = TimeSpan.FromMinutes(30);
    var intervalFailure = TimeSpan.FromMinutes(1);

    while (!cancellationToken.IsCancellationRequested)
    {
        foreach (var healthcheck in healthchecks)
        {
            var name = healthcheck.GetType().Name;
            var context = new HealthCheckContext()
            {
                Registration = new HealthCheckRegistration(name,
                    healthcheck,
                    HealthStatus.Unhealthy,
                    new string[] { }
                )
            };
            var result = await healthcheck.CheckHealthAsync(context);
            Partition.ReportInstanceHealth(new HealthInformation("ServiceHealthCheck", 
                name, 
                Convert(result.Status))
            {
                Description = result.Exception != null
                    ? $"{result.Exception.GetType().Name} : {result.Exception.Message}"
                    : result.Description ?? string.Empty
            });

            results.Add(result);
        }


        var interval = results.Any(x => x.Status != HealthStatus.Healthy) 
            ? intervalFailure 
            : intervalSuccess;

        await Task.Delay(interval);

    }
}

public static HealthState Convert(HealthStatus status)
{
    switch (status)
    {
        case HealthStatus.Degraded:
            return HealthState.Warning;
        case HealthStatus.Healthy:
            return HealthState.Ok;
        case HealthStatus.Unhealthy:
            return HealthState.Error;
        default:
            return HealthState.Unknown;
    }
}

```

