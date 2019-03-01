---
published: false
---
## Unit Testing with ASP.NET Core

It's important that your unit test [run against public interface of module](https://herbertograca.com/2018/08/27/distillation-of-tdd-where-did-it-all-go-wrong/). Otherwise, you do not test behaviour but your implementation of the behaviour. In case of APIs, it'll be API interface via HTTP. 

![test-server.jpg]({{site.baseurl}}/assets/media/test-server.jpg)

```csharp
[Fact]
public async Task StatusMiddlewareReturnsPong()
{
  var hostBuilder = new WebHostBuilder()
    .UseStartup<Startup>();                         1

    using (var server = new TestServer(hostBuilder))
  {
    HttpClient client = server.CreateClient();

    var response = await client.GetAsync("/ping");

    response.EnsureSuccessStatusCode();
    var content = await response.Content.ReadAsStringAsync();
    Assert.Equal("pong", content);
  }
}
```

To mock service, you can use ConfigureTestService()
With test server, you can do black box testing, passing the arranged input and verifying the expected output of the module, API in this case.

```csharp
public CreateCurrentAccountValidationTests()
{
    _accountService = new Mock<IAccountService>();
    _accountService.Setup(c => c.CreateAccount(It.IsAny<AccountDetails>(),
            It.IsAny<Product>(),
            It.IsAny<Offering>()))
        .ReturnsAsync(new CreateAccountResult
        {
            IsSuccessful = true,
            AccountId = Guid.NewGuid()
        });

    var builder = new WebHostBuilder();
    var environment = EnvironmentNameProvider.Get();
    builder.UseKestrel()
        .UseEnvironment(environment)
        .ConfigureAppConfiguration((context, configBuilder) =>
        {
            configBuilder.SetBasePath(context.HostingEnvironment.ContentRootPath);
            configBuilder.AddJsonFile("appsettings.json", true);
            configBuilder.AddJsonFile($"appsettings.{environment}.json", true);
        });
    builder.UseStartup<TestStartup>();
    builder.ConfigureTestServices(services =>
        {
            services.AddTransient(p => _accountService);
        });

    var server = new TestServer(builder);
    _client = server.CreateClient();
}

[Fact]
public async Task Should_return_validation_error_message_if_validation_fails()
{
    var request = new CreateCurrentAccountRequest
    {
        SortCode = "201100",
        OrganizationId = Guid.NewGuid(),
        Name = "Test Account Name",
        UsageType = "Funds"
    };

    var requestMessage = new HttpRequestMessage(HttpMethod.Post, "api/accounts")
    {
        Content = new StringContent(JsonConvert.SerializeObject(request), Encoding.UTF8, "application/json")
    };

    var response = await _client.SendAsync(requestMessage);
    var result = await response.Content.ReadAsStringAsync();

    Assert.Equal(422, (int)response.StatusCode);
    Assert.Contains("Non existing organization id", result);
}

```



