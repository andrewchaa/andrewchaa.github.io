---
title: Access HttpContext inside a service
date: 2020-08-11T14:15:33
categories:
  - technical
tags:
  
---


Controllers expose the ControllerBase.HttpContext property

```csharp
public class HomeController : Controller
{
    public IActionResult About()
    {
        var pathBase = HttpContext.Request.PathBase;

        ...

        return View();
    }
}
```

When workign with custom middleware components, `HttpContext` is passed into the `Invoke / InvokeAsync` method.

```csharp
public class MyCustomMiddleware
{
    public Task InvokeAsync(HttpContext context)
    {
        ...
    }
}
```

In another other cases, you have to inject `IHttpContextAccessor` to access `HttpContext`.

```csharp
public void ConfigureServices(IServiceCollection services)
{
     services.AddControllersWithViews();
     services.AddHttpContextAccessor();
     services.AddTransient<IUserRepository, UserRepository>();
}
```

I had to access HttpContext to retrieve a header that I can use as correlationId in the logging. I added the default implementation, `HttpContextAccessor` like the above.

```csharp
public class ContextInitializer : ITelemetryInitializer
{
    const string ContextKey = "context-key";
    const string ContextDimension = "ContextDimension";

    private readonly IHttpContextAccessor _httpContextAccessor;

    public ContextInitializer(IHttpContextAccessor _httpContextAccessor)
    {
        this._httpContextAccessor = _httpContextAccessor;
    }

    public void Initialize(ITelemetry telemetry)
    {
        var requestTelemetry = telemetry as RequestTelemetry;
        if (requestTelemetry == null)
            return;
        
        if (!_httpContextAccessor.HttpContext.Request.Headers.ContainsKey(ContextKey)) 
            return;

        requestTelemetry.Properties[ContextDimension] = _httpContextAccessor.HttpContext.Request
            .Headers[ContextKey].ToString();

    }
}
```

