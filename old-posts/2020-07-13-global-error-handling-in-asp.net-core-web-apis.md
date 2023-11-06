---
title: Global error handling in ASP.NET Core web APIs
date: 2020-07-13T08:32:15
categories:
  - technical
tags:
  
---


```csharp
public async Task<OperationResult> Create(LedgerTransaction transaction)
{
    _logger.LogInformation($"Saving a transaction: {transaction.TransactionId}");

    var transactionData = new TransactionData(transaction);

    try
    {
        var response = await _container.CreateItemAsync(transactionData,
            new PartitionKey(transactionData.TransactionId.ToString()), 
            new ItemRequestOptions {EnableContentResponseOnWrite = false});
        return new OperationResult(response.StatusCode);
    }
    catch (CosmosException e)
    {
        _logger.LogError(e, $"Error in creating the transaction: {transaction.TransactionId}");
        return new OperationResult(e.StatusCode);
    }
}
```

In this way, if any exception is thrown, I can notice immediately that something wrong has happened. But the other day, I noticed again that those exceptions were not logged in our Application Insights log. An API call was coming back as 500 but I couldn't see any occurrence of the exception and the details. 

It turned out that the error wasn't handled. So the API returned 500 but there wasn't any code that logged the details. This is exactly why we need [global error handling](https://docs.microsoft.com/en-us/aspnet/core/web-api/handle-errors?view=aspnetcore-3.1).

```csharp
// Startup.cs
public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILogger<Startup> logger)
{
    if (env.IsDevelopment())
    {
        app.UseDeveloperExceptionPage();
    }
    else
    {
        app.UseExceptionHandler(errorApp =>
        {
            errorApp.Run(async context =>
            {
                var exceptionHandlerPathFeature =
                    context.Features.Get<IExceptionHandlerPathFeature>();

                logger.LogError(exceptionHandlerPathFeature.Error, 
                    $"Unexpected error in processing {exceptionHandlerPathFeature.Path}");

                context.Response.StatusCode = 500;
                context.Response.ContentType = "application/json";

                await context.Response.WriteAsync(JsonSerializer.Serialize(new
                {
                    type = "https://tools.ietf.org/html/rfc7231#section-6.5.8",
                    title = HttpStatusCode.InternalServerError.ToString(),
                    status = (int)HttpStatusCode.InternalServerError,
                    message = exceptionHandlerPathFeature?.Error.Message,
                }));
            });
        });
    }

    app.UseRouting();
    app.UseAuthorization();
    app.UseEndpoints(endpoints =>
    {
        endpoints.MapControllers();
    });

    app.UseSwagger()
        .UseSwaggerUI(x => x.SwaggerEndpoint("/swagger/v1/swagger.json", "V1"));
}

```





