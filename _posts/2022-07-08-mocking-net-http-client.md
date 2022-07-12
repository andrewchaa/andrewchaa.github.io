---
title: Mocking .NET HTTP Client
date: 2022-07-08
tags:
  - asp.net
  - unit test
---

I prefer testing the behaviour, rather than implementation. To test the behaviour, I create [TestServer](https://docs.microsoft.com/en-us/aspnet/core/test/integration-tests?view=aspnetcore-6.0), get the client from the test server, and make HTTP call. The client TestServer returns is only for that TestServer and you don’t have to specify baseUrl. 

```c#
var application = new WebApplicationFactory<Program>()
	  .WithWebHostBuilder(builder => {});

var client = application.CreateClient(); 
```

It happens that the SUT call another API endpoint and depending on the response of the API call, your SUT should behave differently. Test cases will be like

- Verify SUT makes a correct API call with all expected request details

- Mock the response in order to test if SUT handles different responses correctly

[MockHttp](https://github.com/richardszalay/mockhttp) comes in handy for these use cases

```c#
public class TestFixture
{
	public readonly MockHttpMessageHandler MockHttpHandler;

	public TestFixture()
	{
		MockHttpHandler = new MockHttpMessageHandler();
	}

	public HttpClient CreateClient()
	{
		var application = new WebApplicationFactory<Program>()
			.WithWebHostBuilder(builder =>
			{
				builder
					.ConfigureServices(serviceCollection =>
						serviceCollection.AddSingleton(MockHttpHandler.ToHttpClient()));
			});

		return application.CreateClient();
	}
}
```

```c#
public async Task ShouldMakeCorrectWebhookCall()
{
	// arrange
	const string webhookUrl = "http://localhost/fake-webhook";

	var webhookRequest = _testFixture
		.MockHttpHandler
		.Expect(webhookUrl)
		.Respond(HttpStatusCode.OK);
	var client = _testFixture.CreateClient();

	var endToEndId = "someEndToEndId";
	var request = new AtomicLockRequest { EndToEndId = endToEndId };

	// act
	var response = await client.PostAsync("v1/atomic-lock",
		new StringContent(JsonSerializer.Serialize(request),
			Encoding.UTF8,
			MediaTypeNames.Application.Json),
		CancellationToken.None);

	// assert
  _testFixture.MockHttpHandler.GetMatchCount(webhookRequest).Should().Be(1);
}
```

You can find more uses cases from the [project site](https://github.com/richardszalay/mockhttp). 

