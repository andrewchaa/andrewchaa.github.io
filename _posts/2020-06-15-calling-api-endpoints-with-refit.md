---
title: Calling api endpoints with Refit
date: 2020-06-15T13:56:08
categories:
  - technical
---


> The automatic type-safe REST library for .NET Core, Xamarin and .NET. Heavily inspired by Square's Retrofit library, Refit turns your REST API into a live interface

Refit turns your REST API into a live interface

```csharp
public interface IApi
{
    [Put("/v1/transactions/{transactionId}")]
    Task<HttpResponseMessage> CreateTransaction(Guid transactionId);
}
```

You can expose your test client with Fixture in xUnit. To populate headers, you can use a custom HttpMessageHandler.

```csharp
// TestClientFixture.cs
public TestClientFixture()
{
    var configuration = new ConfigurationBuilder()
        .SetBasePath(Directory.GetCurrentDirectory())
        .AddJsonFile("appsettings.json")
#if DEBUG
        .AddJsonFile("appsettings.Development.json", optional: true, reloadOnChange: true)
#endif
        .AddEnvironmentVariables().Build();
    var hostUrl = new Uri(configuration["BaseUrl"]);
    var subscriptionKey = configuration["SubscriptionKey"];
    var headerClientHandler = new HeaderClientHandler(subscriptionKey);
    LedgerApi = RestService.For<ILedgerApi>(new HttpClient(headerClientHandler)
    {
        BaseAddress = hostUrl
    });
}

// HeaderClientHandler
public class HeaderClientHandler : HttpClientHandler
{
    private readonly string _subscriptionKey;

    public HeaderClientHandler(string subscriptionKey)
    {
        _subscriptionKey = subscriptionKey;
    }

    protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, 
        CancellationToken cancellationToken)
    {
        request.Headers.Add("SubscriptionKey", _subscriptionKey);

        return await base.SendAsync(request, cancellationToken).ConfigureAwait(false);
    }
}
```

In the test file, you call the actual api

```csharp
public CreateTransactionTests(TestClientFixture clientFixture, 
    ITestOutputHelper output)
{
    _output = output;
    _api = clientFixture.Api;
    _fixture = new Fixture();
}

[Fact]
public async Task Should_return_200_Ok()
{
    var transactionId = Guid.NewGuid();
    var request = _fixture.Build<CreateTransactionRequest>()
        .With(x => x.Currency, "EUR")
        .Create();
    var response = await _api.CreateTransaction(transactionId, request);
    _output.WriteLine(await response.Content.ReadAsStringAsync());

    Assert.True(response.IsSuccessStatusCode);
}

```

