---
title: Getting started with Java
date: 2023-08-31
tags:
  - java
---

### Installing JDK

Use [Amazon Correto](https://aws.amazon.com/corretto/?filtered-posts.sort-by=item.additionalFields.createdDate&filtered-posts.sort-order=desc) which is a multiplatform, production-ready distribution of the Open Java Development Kit (OpenJDK)

### Packages in use

`javax.ws.rs`

[A Java API for RESTful web services](https://docs.oracle.com/javaee/7/api/javax/ws/rs/package-summary.html). It provides a set of classes and interfaces that can be used to create and consume RESTful web services and was introduced in Java EE 6

```java
@Path("api/v1/chat")
public interface ChatResource {
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("prompt")
	UUID createPrompt(@Valid @NotNull CreateChatRequest createChatRequest);
}
```

`javax.validation.constraints`

Provides a set of annotations that can be used to validate the values of fields and properties in Java objects.

```java
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class CreateChatRequest {
	@NotNull
  @NotEmpty
  private final String prompt;
}
```

### Request and Response DTO

```java
public class SendChatResponse {
	@NotNull
  private final String chatResponse;

  @JsonCreator
  public SendChatResponse(
		@JsonProperty("chatResponse") String chatResponse
  ) {
		this.chattResponse = chatResponse;
	}

	public String getChatResponse() { return chatResponse; }
}
```

