---
title: Component testing in ASP.NET Core
date: 2020-06-25T23:10:17
categories:
  - technical
classes: wide
---


```bash
               Component Test Coverage

         (mocked)  <---------------> (mocked)
       API Request -> API Service -> Cosmos DB

       <-------------------------------------->       
                Integration Test Coverage       
```

It gives many benefits. By not using any other mocks, you increase the test coverage of the code massively. The test follow the same path as the real requsts comes in. It's more realistic test without the performance issue.

Create a xUnit test project. 

## WebApplicationFactory

Then you need a WebApplicationFactory to create a host for the tests. Install this package first.

```text
Microsoft.AspNetCore.Mvc.Testing
```

```csharp
public class TestApplicationFactory<TStartup> : WebApplicationFactory<TStartup> where TStartup : class
{
    public Mock<Container> MockContainer;
    public TestApplicationFactory() { }

    protected override IWebHostBuilder CreateWebHostBuilder() => new WebHostBuilder();

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder
            .UseKestrel()
            .UseEnvironment(Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Development")
            .UseContentRoot(Directory.GetCurrentDirectory())
            .ConfigureAppConfiguration((context, configBuilder) =>
            {
                configBuilder.SetBasePath(context.HostingEnvironment.ContentRootPath);
                configBuilder.AddJsonFile("appsettings.json", true);
                configBuilder.AddJsonFile("appsettings.Development.json", optional: true, reloadOnChange: true);
            })
            .UseStartup<Startup>();

        builder.ConfigureTestServices(services =>
        {
            services.AddSingleton<ITransactionRepository>(x => 
                new TransactionRepository(MockContainer.Object, new NullLogger<TransactionRepository>()));
        });
    }
}

```

## Tests

You can get HttpClient from the test application factory. The client will call to the local in-memory http host. I used AutoFixture to populate the request object

```csharp
public class CreateTransactionTests : IClassFixture<TestApplicationFactory<Startup>>
{
    private HttpClient _client;
    private Fixture _fixture;

    public CreateTransactionTests(TestApplicationFactory<Startup> factory)
    {
        _client = factory.CreateClient();
        _fixture = new Fixture();
    }

    [Fact]
    public async Task Should_return_200_Ok()
    {
        var transactionId = Guid.NewGuid();
        var request = _fixture.Build<CreateTransactionRequest>()
            .Create();
        var response = await _client.PutAsync($"/v1/transactions/{transactionId}", GetContent(request));

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }

    private static HttpContent GetContent<T>(T body)
    {
        var stringContent = JsonConvert.SerializeObject(body);
        return new StringContent(stringContent, Encoding.UTF8, "application/json");
    }

}

```

What is IClassFixture? It's "used to decorate xUnit.net test classes and collections to indicate a test which has per-test-class fixture data". An instance of the fixture data is initialized just before the first test in the class is run, and if it implements IDisposable, is disposed after the last test in the class is run

### Verify that the right date are stored in the database

To save a data, you use Cosmos' Container class to push the data. So, in theory, if you pass the right data to the Container as parameters, it would verify that our API works correct. 

```csharp
public class CreateTransactionTests : IClassFixture<TestApplicationFactory<Startup>>
{
    private readonly TestApplicationFactory<Startup> _factory;
    private readonly ITestOutputHelper _output;
    private readonly HttpClient _client;
    private readonly Fixture _fixture;

    public CreateTransactionTests(TestApplicationFactory<Startup> factory, 
        ITestOutputHelper output)
    {
        _factory = factory;
        _output = output;
        _client = factory.CreateClient();
        _fixture = new Fixture();
    }

    [Fact]
    public async Task Should_return_200_Ok()
    {
        var transactionId = Guid.NewGuid();
        var request = _fixture.Build<CreateTransactionRequest>()
            .With(x => x.Currency, "EUR")
            .Create();

        TransactionData transactionData = null;

        var mockItemResponse = new Mock<ItemResponse<TransactionData>>();

        mockItemResponse.Setup(x => x.StatusCode)
            .Returns(HttpStatusCode.OK);

        _factory.MockContainer.Setup(x => x.UpsertItemAsync(It.IsAny<TransactionData>(),
                It.IsAny<PartitionKey>(),
                null,
                default(CancellationToken)))
            .ReturnsAsync(mockItemResponse.Object)                
            .Callback<TransactionData, PartitionKey?, RequestOptions, CancellationToken>(
                (t, p, r, c) => transactionData = t);

        var response = await _client.PutAsync($"/v1/transactions/{transactionId}", GetContent(request));

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.Equal(request.AccountId, transactionData.AccountId);
        Assert.Equal(request.BatchId, transactionData.BatchId);
        Assert.Equal(request.EndToEndId, transactionData.EndToEndId);
        Assert.True(ValueEqual(request.MetaData, transactionData.MetaData));

    }

    private static HttpContent GetContent<T>(T body)
    {
        var stringContent = JsonConvert.SerializeObject(body);
        return new StringContent(stringContent, Encoding.UTF8, "application/json");
    }

    public bool ValueEqual<T1, T2>(T1 expected, T2 actual)
    {
        var expectedValues = JsonConvert.SerializeObject(expected);
        var actualValues = JsonConvert.SerializeObject(actual);

        if (expectedValues != actualValues)
        {
           _output.WriteLine($"expected: {expectedValues}\nactual: {actualValues}"); 
        }

        return expectedValues == actualValues;
    }

    ~CreateTransactionTests()
    {
        _factory.MockContainer.Reset();
    }
}
```









