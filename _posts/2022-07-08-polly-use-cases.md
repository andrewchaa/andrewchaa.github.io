---
title: Polly use cases
date: 2022-07-08
tags:
  - C#
---

[Polly](https://github.com/App-vNext/Polly) is a “.NET resilience and transient-fault-handling library that allows developers to express policies such as Retry, Circuit Breaker, Timeout, Bulkhead Isolation, Rate-limiting and Fallback in a fluent and thread-safe manner.”

These are my use cases.

Handle HTTP API Call Failures

```c#
await Policy
	.Handle<HttpRequestException>()
	.OrResult<HttpResponseMessage>(x =>
		x.StatusCode.IsNotOneOf(HttpStatusCode.Accepted, HttpStatusCode.OK))
	.RetryAsync(4)
	.ExecuteAsync(async () =>
	{
		var response = await _httpClient.PostAsync(webhookUrl),
			new StringContent(JsonSerializer.Serialize(webhookRequest)));
		return response;
	});
```

