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

## Collections

### Arrays

Arrays have a fixed size once they're created like other programming languages.

Java doesn't have a spread operator like JavaScript. However, you can achieve this operation using the `System.arraycopy` method or using libraries like Apache Commons Lang and its `ArrayUtils` class.

```java
import org.apache.commons.lang3.ArrayUtils;

YourClass[] originalArray = ...;
YourClass newElement = ...;

YourClass[] newArray = ArrayUtils.add(originalArray, newElement);
```

### Filtering array

Create a `Stream` and filter with the predicate lambda function

```typescript
var messages = Array.stream(messages)
	.filter(x => x.getAuthor().equals(bot))
  .toArray(Message[]::new);
```

### Constants

Constant is a value that cannot be changed once assigned. Constants are not supported directly in Java. Instead, there is an alternative way to define a constant in Java by using the `static` and `final` keywords.

```java
static final String location = "us-central1";
static final String publisher = "google";
```

### Constants class

I like chucking in all constants in one place

```java
public final class Constants {
  static final String user = "user";
  static final String publisher = "publisher";
  static final String content = "content";
}
```

### Generic Value converter

To make your method generic, you can introduce a type parameter, say `<T>`, and then use this type parameter in the method signature. Here's your updated method using generics:

```java
private static <T> Value getValue(T parameters) 
	throws InvalidProtocolBufferException {
    Value.Builder parameterValueBuilder = Value.newBuilder();
    JsonFormat
			.parser()
			.merge(new Gson().toJson(parameters), parameterValueBuilder);

  return parameterValueBuilder.build();
}
```

Now the `getValue` method can accept any type of object as its `parameters` argument, and it will convert it to a `Value` using the provided logic. This approach makes the method more flexible and reusable.

### POJO (Plain Old Java Object)

### Request

```java
public class SendChatRequest {
  @NotNull @NotEmpty
  private final String prompt;

  @NotNull @NotEmpty
  private final String model;

  public SendChatRequest(
    @JsonProperty("model") String model,
    @JsonProperty("prompt") String prompt
  ) {
    this.model = model;
    this.prompt = prompt;
  }

  @JsonProperty("prompt")
  publicl String getPrompt() { return prompt; }

  @JsonProperty("model")
  publicl String getModel() { return model; }
}
```

### ApiResponse

It's pretty cool to have a structured response, no matter if it's a success or not. This way, the client using the endpoint doesn't need to deal with the response in a special way based on the API response's status. 

```json
# 200 OK
{
  "data": {
    "promptResponse": "This is an awesome place to live"
  }
}

# 400 Bad Request
{
  "errors": [
		"The model name is not provided"
  ]
}
```

```java
public class ApiResponse<T> {
  private final T data;
  private final String[] errors;

  public ApiResponse(
    @JsonProperty("data") T data
  ) {
    this.data = data;
    this.errors = new String[]{};
	}

  public ApiDataResponse(
    @JsonProperty("errors") String[] errors
  ) {
    this.data = null;
    this.errors = errors;
  }

  public T getData() { return data; }
  public String[] getErrors() { return errors; }
}
```

### Response

```java
public class SendChatResponse {
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

- `final` means an immutable field. 

- The **`@NotNull`** annotation suggests that this field must not be **`null`**

- **`@JsonCreator`**: This annotation indicates that the annotated constructor or factory method should be used to create instances of the containing class during deserialization by libraries like Jackson (a popular Java library for processing JSON).

- **`@JsonProperty("chatResponse")`**: This annotation is used in conjunction with Jackson to specify that the **`chatResponse`** parameter in the constructor should be populated with the value associated with the **`chatResponse`** key in the incoming JSON object.

### DTO for JSON 

```java
public class Instance {
	private final String prompt;

  public Instance(String prompt) {
		this.prompt = prompt;
  }
	public String getPrompt() {
		return prompt;
	}
	@Override
	public String toString() { return new Gson().toJson(this); }
}
```

### Configuration interface and class

```java
@ConfigurationType
@ImplementedBy(ChatServiceConfigurationImpl.class)
public interface ChatServiceConfiguration {
  @ConfigurationProperty(
    key = "gcp.chat.service.account.json.credentials",
    description = "JSON project credentials"
  )
  String getGoogleCredentialsConfig();

  default GoogleCredentials getGoogleCredentials() {
    var credentials = getGoogleCredentialsConfig()
			.getBytes(StandardCharsets.UTF_8);
    
		return ExternalAccountCredentials
			.fromStream(new ByteArrayInputStream(credentials));
  }
}

@Singleton
public class ChatServiceConfigurationImpl 
	implements ChatServiceConfiguration {
	private final Supplier<String> getProjectName;
  private final Supplier<String> getGoogleCredentialsConfig;

	@Override
  public String getProjectName() { return getProjectName.get(); }
  @Override
  public String getGoogleCredentialsConfig() {
    return getGoogleCredentialsConfig.get()
  }
}
```

- **`@ImplementedBy(ChatServiceConfigurationImpl.class)`**: a dependency injection framework, Google Guice. The annotation indicates that by default, **`ChatServiceConfigurationImpl.class`** provides the implementation of the **`ChatServiceConfiguration`** interface. In other words, if someone asks the DI framework for an instance of **`ChatServiceConfiguration`**, and no binding has been explicitly configured, it would use **`ChatServiceConfigurationImpl.class`**.

- Default Method:

	- This is a default method provided in the interface, which means implementing classes do not need to provide their own implementation unless they want to override this behavior.

	- The method is designed to:

		- Fetch the Google credentials as a string using **`getGoogleCredentialsConfig()`**.

		- Convert that string to bytes using UTF-8 encoding.

		- Create a **`ByteArrayInputStream`** with those bytes.

		- Use the **`fromStream`** method of **`ExternalAccountCredentials`** (presumably a part of the Google Cloud SDK) to convert that byte stream into a **`GoogleCredentials`** object.

	- This method abstracts away the process of converting the JSON credentials string into an actual **`GoogleCredentials`** object that can be used to interact with Google Cloud services.

### Supplier

In Java, the **`Supplier<T>`** is a functional interface introduced in Java 8, found in the **`java.util.function`** package. A functional interface is an interface that contains just one abstract method, and thus can represent lambda expressions targeting it.

The primary purpose of **`Supplier<T>`** is to represent a function that takes no arguments and returns a result of type **`T`**. In simpler terms, it supplies a value of type **`T`**.

Here's the basic structure of the **`Supplier<T>`** interface:

```java
@FunctionalInterface
public interface Supplier<T> {
    T get();
}
```

## Google Protocol Buffers

Protocol Buffers (often abbreviated as protobuf) is a method developed by Google to serialize structured data, similar to XML or JSON. It is both simpler and more efficient than both XML and JSON. Google's Protocol Buffers are defined in `.proto` files, which is a kind of schema for the serialized data.

The `Value` message is part of the protobuf's "well-known type" for working with a dynamic or loosely structured data model, similar to how you might use JSON in other contexts. Specifically, `Value` is a part of the `Struct` type which allows for flexible, map-like data structures.

Here's a breakdown of the `Value` message:

- **null_value**: A special value that represents an empty value.

- **number_value**: Represents a double value.

- **string_value**: Represents a string value.

- **bool_value**: Represents a boolean value.

- **struct_value**: Represents a structured value using the `Struct` message type.

- **list_value**: Represents a list of values using the `ListValue` message type.

The `Value` message allows for flexibility since any `Value` can contain any kind of data - be it a simple number, a string, a more complex structure, or even a list of other values.

An example of its utility is when using Google Cloud services, such as the Datastore, which can store a variety of data types. The `Value` type can encapsulate all these varieties.

### Holding JSON in Value

```java
private static Value getParametersValue(Parameters parameters) {
  var = Map.of(
    "temperature", Value
			.newBuilder()
			.setNumberValue(parameters.getTemperature())
			.build(),
    "maxOutputTokens", Value
			.newBuilder()
			.setNumberValue(parameters.getMaxOutputTokens())
			.build(),
  );

  return Value
		.newBuilder()
		.setStructValue(Struct.newBuilder().putAllFields(valueMap))
		.build();
}
```

### Array vs. Lists

Both `Array` and `List` are fundamental concepts in Java, but they have distinct characteristics and use cases. Let's delve into each:

**Array**:

- **Definition**: An array in Java is a low-level data structure that holds a fixed number of values of a single type.

- **Size**: Once you declare the size of an array, it's fixed. You cannot change it without creating a new array.

- **Types**: Java supports both primitive and reference type arrays.

	- Primitive type arrays: `int[]`, `char[]`, `float[]`, etc.

	- Reference type arrays: `String[]`, `Object[]`, `CustomClass[]`, etc.

- **Memory**: Arrays are stored in contiguous memory locations.

- **Performance**: Access to an array element by its index is very fast, O(1). However, operations like inserting and removing an element in the middle require manual shifting of elements and are O(n).

- **Usage**: Arrays are beneficial when the data size is known in advance, and changes to the data size are infrequent.

**List:**

- **Definition**: `List` is a part of the Java Collections Framework and implements the `Collection` interface. It is a higher-level, dynamic data structure compared to arrays. The `List` interface has various implementations such as `ArrayList`, `LinkedList`, etc.

- **Size**: Lists are dynamic. You can add or remove elements, and the list will resize dynamically.

- **Types**: Lists only support reference types. Even when you have a list of primitives (like `int`), Java uses their wrapper classes (like `Integer`).

- **Memory**: Depending on the implementation, the memory structure may differ:

	- `ArrayList` internally uses an array to store its elements. When it reaches its capacity, a new, larger array is created, and the old elements are transferred.

	- `LinkedList` uses a doubly-linked list data structure, where each element (node) contains a value and references to the next and previous nodes.

- **Performance**:

	- `ArrayList` offers constant-time performance for indexed access and iteration, but O(n) for insertions and deletions in the middle.

	- `LinkedList` provides O(1) for insertions and deletions (if the node is known), but O(n) for indexed access.

- **Usage**: Lists, especially `ArrayList`, are more common in standard applications due to their dynamic nature and the vast set of built-in methods provided by the Java Collections Framework.

## Testing

```java
class ChatServiceTest {
  @Inject
  private ChatService underTest;
  private final ChatServiceConfiguraton chatServiceConfiguraton =
		mock(ChatServiceConfiguraton.class);

	@BeforeEach
	void setUp() {
		Guice.createInjector(
			binder -> {
				binder.bind(ChatServiceConfiguraton.class)
					.toInstance(chatServiceConfiguraton);
			}
		).injectMember(this)

		underTest = new ChatService(chatServiceConfiguraton);
  }

	@Test
	void sendPrompt() {
		var response = underTest
			.sendPrompt(new SendPromptRequest("Explain what Mockto is"));
		assertThat(response.getPromptResponse()).isNotEmpty();
	}
}
```

### Mocking with Mockito

**Mockito** is a mocking framework that allows you to create and configure mock objects. Using Mockito, you can mock interfaces, generate stubs, and verify interactions between objects in your tests. It's a favorite tool in the Java world for unit testing because it enables you to write clean tests with a clear API.Let's discuss the code snippet you provided with Mockito in mind:

When you use mocks in tests, you typically follow these steps:

- **Mock Creation**: You create a mock object for the dependency.

- **Stubbing**: You provide a "fake" behavior or return value for some methods of the mock object.

- **Running Code**: You run your code under test.

- **Verification**: You verify if certain methods on the mock object were called.

```java
class ChatServiceTest {
  @Inject
  private ChatService underTest;
  private final PredictionService predictionService = mock(PredictionService.class);
  private final String promptResponse = "The bank is awesome";
  private final String model = "text-bison@001";
  private final String prompt = "Explain the bank";

	@BeforeEach
	void setUp() throws IOException {
		Guice.createInjector(
			binder -> {
				binder.bind(PredictionService.class)
					.toInstance(predictionService);
			}
		).injectMember(this)

		when(predictionService.predict(model, prompt)).thenReturn(promptResponse);
		underTest = new ChatService(chatServiceConfiguraton);
  }

	@Test
	void sendPrompt() {
		var response = underTest
			.sendPrompt(new SendPromptRequest(model, prompt));
		assertThat(response.getPromptResponse()).isEqualTo(promptResponse);
	}
}
```

### Assert exception

```java
@Test
void sendPrompt_returns_error_message() throws IOException {
  String exceptionMessage = "Value conversion failed";
  when(languageModelResource.predict(
    model,
    temperature,
    tokenLimit,
    prompt
  )).thenThrow(new RuntimeException(exceptionMessage));

  var exception = assertThrows(RuntimeException.class, () -> {
    underTest.sendPrompt(promptRequest);
  });

  assertThat(exception.getMessage())
    .isEqualTo("java.lang.RuntimeException: " + exceptionMessage);
}
```

### Match any parameter

To make a Mockito mock return the same value regardless of the parameters it receives, you can use the `any()` matcher for the arguments.

```java
import static org.mockito.ArgumentMatchers.any;

when(resource.predict(
	eq(model), 
	any(), 
	any())
).thenReturn(messages);
```

Here, `eq(model)` ensures that the method `predict` is called with the exact `model` you specified, while `any()` matches any value for the subsequent parameters. This way, no matter what `parameters` and `message` values the `predict` method is called with, it will always return the `messages`.

