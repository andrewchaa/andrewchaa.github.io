---
title: Mocking Cosmos Container method for unit testing
date: 2020-07-10T19:35:04
categories:
  - technical
---


```csharp
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
public async Task Should_store_correct_transaction_details_in_the_database_and_return_200_Ok()
{
    // Arrange
    _factory.MockContainer.Reset();

    var transactionId = Guid.NewGuid();
    var request = _fixture.Build<CreateTransactionRequest>()
        .With(x => x.Currency, "EUR")
        .Create();

    TransactionData transactionData = null;

    var mockItemResponse = new Mock<ItemResponse<TransactionData>>();

    mockItemResponse.Setup(x => x.StatusCode)
        .Returns(HttpStatusCode.OK);

    _factory.MockContainer.Setup(x => x.CreateItemAsync(It.IsAny<TransactionData>(),
            It.IsAny<PartitionKey>(),
            It.IsAny<ItemRequestOptions>(),
            default(CancellationToken)))
        .ReturnsAsync(mockItemResponse.Object)                
        .Callback<TransactionData, PartitionKey?, RequestOptions, CancellationToken>(
            (t, p, r, c) => transactionData = t);

    // Act
    var response = await _client.PutAsync($"/v1/transactions/{transactionId}", request.ToStringContent());

    // Assert
    Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    Assert.Equal(request.AccountId, transactionData.AccountId);
    Assert.Equal(request.Amount, transactionData.Amount);
    Assert.Equal(request.Currency, transactionData.Currency);
    ...
}

```

## xUnit's IClassFixture

IClassFixture lets you use a shared class to use in your tests. I put all of my my infrastructure plumbing code there.

```csharp
public class TestApplicationFactory<TStartup> : WebApplicationFactory<TStartup> where TStartup : class
{
    public Mock<Container> MockContainer;

    public TestApplicationFactory() { }

    protected override IWebHostBuilder CreateWebHostBuilder() => new WebHostBuilder();

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        MockContainer = new Mock<Container>();

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

I have public MockContainer that mocks Cosmos Container.

## AutoFixture

AutoFixture is very handy to populate a request object. 

```csharp
var request = _fixture.Build<CreateTransactionRequest>()
    .With(x => x.Currency, "EUR")
    .Create();
```

## Set up Mock Cosmos Container

So that I can verify what parameters the Container receives. I use moq's Callback. I prefer it over Verify becasue I can assert each value per each line.

```csharp
var mockItemResponse = new Mock<ItemResponse<TransactionData>>();

mockItemResponse.Setup(x => x.StatusCode)
    .Returns(HttpStatusCode.OK);

_factory.MockContainer.Setup(x => x.CreateItemAsync(It.IsAny<TransactionData>(),
        It.IsAny<PartitionKey>(),
        It.IsAny<ItemRequestOptions>(),
        default(CancellationToken)))
    .ReturnsAsync(mockItemResponse.Object)                
    .Callback<TransactionData, PartitionKey?, RequestOptions, CancellationToken>(
        (t, p, r, c) => transactionData = t);
```

One thing to note is I used Mock&lt;ItemResponse&lt;TransactionData&gt;&gt;\(\). It's becasue ItemResponse has Internal constructor and I canot new up the class. So I used mock instead.

## Assert

```csharp
var response = await _client.PutAsync($"/v1/transactions/{transactionId}", request.ToStringContent());

// Assert
Assert.Equal(HttpStatusCode.OK, response.StatusCode);
Assert.Equal(request.AccountId, transactionData.AccountId);
Assert.Equal(request.Amount, transactionData.Amount);
Assert.Equal(request.Currency, transactionData.Currency);
...
```

