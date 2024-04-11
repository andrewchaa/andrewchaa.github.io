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


## Arrays


Arrays have a fixed size once they're created like other programming languages.


Java doesn't have a spread operator like JavaScript. However, you can achieve this operation using the `System.arraycopy` method or using libraries like Apache Commons Lang and its `ArrayUtils` class.


```java
import org.apache.commons.lang3.ArrayUtils;

YourClass[] originalArray = ...;
YourClass newElement = ...;

YourClass[] newArray = ArrayUtils.add(originalArray, newElement);
```


### Filtering array

- Create a `Stream` and filter with the predicate lambda function
- Convert to typed array, use `toArray(T::new)`

```typescript
var messages = Array.stream(messages)
	.filter(x => x.getAuthor().equals(bot))
  .toArray(Message[]::new);
```


### Add an item to an array


```java
ArrayUtils.add(messages, new Message(BOT, content));
```


## Constants


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


## UUID
### Creating a random UUID
```java
DefaultUUIDGenerator.randomUUID()
```


## DateTime


Use `InstanceSource`


```java
Instant instance = instanceSource.instant();
```


## POJO (Plain Old Java Object)


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
		1. Fetch the Google credentials as a string using **`getGoogleCredentialsConfig()`**.
		2. Convert that string to bytes using UTF-8 encoding.
		3. Create a **`ByteArrayInputStream`** with those bytes.
		4. Use the **`fromStream`** method of **`ExternalAccountCredentials`** (presumably a part of the Google Cloud SDK) to convert that byte stream into a **`GoogleCredentials`** object.
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


### Enum


An enumeration (enum) is a special data type that enables for a variable to be a set of predefined constants. The variable must be equal to one of the values that have been predefined for it. Enumerations are used when you have values that you know aren't going to change, like month days, days, colors, deck of cards, etc.


Here is a simple example of an enumeration in Java:


```java
public enum Day {
    SUNDAY, MONDAY, TUESDAY, WEDNESDAY,
    THURSDAY, FRIDAY, SATURDAY
}
```


### Features of Enum:


**Compatible with String**: This is the best feature of Java enum, in my opinion. In C#, enum is from `int` and gets converted to number by default. It can cause an error if you change the order of enum values as `SUNDAY` was 0 until yesterday but 1 from today if you change the order. Java enum converts to `String` and you don’t have the same issue. 31/10/2023


**Strongly Typed**: Enumerations are strongly typed, meaning that an enum of one type cannot be assigned to an enum of another type even if their underlying values are the same.


**Namespace**: Enums are implicitly static final, meaning they have a fixed set of constants. The constants are always in uppercase letters.


**Ability to Use Enum in Switch Statements**: Enumerations can be used in switch statements.


**Values() Method**: You can iterate over the values of an enum class with the `values()` method.


**ValueOf() Method**: You can use the `valueOf()` method to get the enum constant of the specified string value, if it exists.


**Constructors, Fields, and Methods**: Enumerations can have constructors, fields, and methods.


### Example with Constructors, Fields, and Methods:


```java
public enum Planet {
    MERCURY (3.303e+23, 2.4397e6),
    VENUS   (4.869e+24, 6.0518e6),
    EARTH   (5.976e+24, 6.37814e6),
    // ... other planets ...

    private final double mass;   // in kilograms
    private final double radius; // in meters

    Planet(double mass, double radius) {
        this.mass = mass;
        this.radius = radius;
    }

    private double mass() { return mass; }
    private double radius() { return radius; }

    // universal gravitational constant  (m3 kg-1 s-2)
    public static final double G = 6.67300E-11;

    double surfaceGravity() {
        return G * mass / (radius * radius);
    }
    double surfaceWeight(double otherMass) {
        return otherMass * surfaceGravity();
    }
}

```


In this example, each enum constant is declared with values for mass and radius. These values are passed to the constructor when the constant is created. Java requires that the constants be defined first, prior to any fields or methods. Also, when there are fields and methods, the list of enum constants must end with a semicolon.


Note that the constructor for an enum type must be package-private or private access. It automatically creates the constants that are defined at the beginning of the enum body. You cannot invoke an enum constructor yourself.


## Record


Java records were introduced as a feature in Java 14 as a preview feature and were stabilized in Java 16. They provide a quick and compact way to model immutable data in Java. A record class is a special kind of class in Java that is designed to model immutable data in applications.


### Characteristics of Records:


**Immutable**: Once a record is created, its state cannot change. All fields in a record are final.


**Conciseness**: You do not need to write boilerplate code such as getters, setters, `equals()`, `hashCode()`, and `toString()` methods. The Java compiler automatically generates these for you.


**Public Fields**: All fields in a record are public and final.


**Canonical Constructor**: A record comes with a canonical constructor, which is a constructor with parameters for all the fields in the record.


**Compact Syntax**: You can define a record with a very compact syntax compared to regular classes.

- Don’t forget overriding `toString()`

### Syntax:


```java
public record RecordName(Type field1, Type field2, ...) {
    // Additional methods and annotations can go here
  @Override
  public String toString() {
    return "RecordName{" + "field1=" + field1 + "}";
  }
}
```


### Example:


```java
public record Person(String name, int age) { }
```


In this example, `Person` is a record with two fields: `name` and `age`. You do not need to manually create a constructor, getters, or `equals()`, `hashCode()`, and `toString()` methods. The Java compiler generates these for you.


### Using Records:


```java
public class Main {
    public static void main(String[] args) {
        Person person = new Person("John", 25);
        System.out.println(person.name());  // Prints: John
        System.out.println(person.age());   // Prints: 25
        System.out.println(person);         // Prints: Person[name=John, age=25]
    }
}
```


### When to Use Records:

- Use records when you want to model immutable data.
- They are great for data transfer objects (DTOs), value objects, and messages.

### Limitations of Records:

- Records cannot extend any other class and cannot be extended. They implicitly extend `java.lang.Record`.
- They cannot declare instance fields other than the private final fields which correspond to components of the state description. Any other fields must be static.
- They are implicitly final, so you cannot create a subclass of a record.

Records provide a clean and concise way to model immutable data in Java, reducing boilerplate code and improving readability.


### Override toString()


By default, it’ll return the content of the fields. If the `record` contains any sensitive information, override the `toString()` so that it doesn’t get logged in any logging.


```javascript
public record Message(Author author, String content) {
  @Override
  public String toString() {
    return "Message{" + 
			"author='" + author + "\'" +
			", content='...'" +
			"}";
  }
}
```


## Stream


`Stream` is an interface that represents a sequence of elements supporting sequential and parallel aggregate operations. Introduced in Java 8, `Stream` API provides a modern and functional approach to processing collections of objects. The Stream API is in the `java.util.stream` package.


### Key Characteristics of Java Streams:


**No Storage**: Streams don't store elements. They carry values from a source (like a collection or an array) through a pipeline of computational steps.


**Functional in Nature**: Streams facilitate functional-style operations on elements, such as map-reduce transformations.


**Lazy Execution**: Stream operations are lazily executed. This means computation on the source data is only performed when necessary for the terminal operation.


**Possibly Unbounded**: While collections have a finite size, streams need not. They can represent fixed-size collections, infinite streams, or compute elements on-demand.


**Consumable**: Streams are designed to be consumed only once. After a terminal operation is performed, the stream cannot be reused.


### Core Components of Stream API:

- **Stream Sources**: Collections, arrays, or I/O channels can serve as sources for streams.
- **Intermediate Operations**: These operations transform a stream into another stream, such as `filter`, `map`, `limit`, `sorted`, etc. They are lazy, meaning they're not executed until a terminal operation is invoked.
- **Terminal Operations**: These operations produce a result or a side-effect, such as `forEach`, `reduce`, `collect`, `findFirst`, etc. Once a terminal operation is performed, the stream is consumed and cannot be used further.

### Basic Example of a Stream:


```java
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class StreamExample {
    public static void main(String[] args) {
        List<String> myList = Arrays.asList("a1", "a2", "b1", "c2", "c1");

        List<String> filtered = myList.stream()   // Create a stream
                .filter(s -> s.startsWith("c"))   // Intermediate operation
                .map(String::toUpperCase)         // Intermediate operation
                .sorted()                         // Intermediate operation
                .collect(Collectors.toList());    // Terminal operation

        filtered.forEach(System.out::println);    // Outputs: C1, C2
    }
}
```


### Parallel Streams:


Java streams can be processed in parallel to leverage multicore architectures. Parallel streams divide the provided task into many and run them in parallel, which can lead to significant performance improvements. However, parallel processing can be more complex and may not always lead to better performance, especially for small datasets or operations that are not CPU-intensive.


## Optional


`java.util.Optional<T>` is a container object which may or may not contain a non-null value. It was introduced in Java 8 as a means to provide a clear and explicit way to convey the idea of optionality, thereby avoiding `null` checks and `NullPointerException`s.


Here are some key points about `Optional`:


**Avoiding Null**: Before `Optional`, a method could return `null` to indicate that no value was present, but that could easily lead to `NullPointerException`s if the caller didn't diligently check for `null`. With `Optional`, the intent is clear—there might not be a value.


**API Usage**: Methods that might not be able to return a result can return an instance of `Optional<T>` instead of potentially returning `null`. The caller of the method must then explicitly deal with the possibility that there might not be a value present.


**Common Methods**:

- `Optional.empty()`: Returns an empty `Optional` instance.
- `Optional.of(T value)`: Returns an `Optional` with the specified present non-null value.
- `Optional.ofNullable(T value)`: Returns an `Optional` describing the specified value, or an empty  if the value is `null`.
- `Optional.isPresent()`: Returns `true` if there is a value present, otherwise `false`.
- `Optional.get()`: If a value is present, this method returns the value, otherwise throws `NoSuchElementException`.
- `Optional.orElse(T other)`: Returns the value if present, otherwise returns `other`.
- `Optional.orElseGet(Supplier<? extends T> other)`: Returns the value if present, otherwise invokes `other` and returns the result of that invocation.
- `Optional.orElseThrow(Supplier<? extends X> exceptionSupplier)`: Returns the contained value if present, otherwise throws an exception to be created by the provided supplier.
- `Optional.ifPresent(Consumer<? super T> consumer)`: If a value is present, invoke the specified consumer with the value, otherwise do nothing.
1. **Chaining Methods**: `Optional` supports fluent API style operations that include `map`, `flatMap`, `filter`, etc., which can be chained together to perform complex conditional operations.

Here's a simple example of using `Optional`:


```java
public class OptionalExample {
    public static Optional<String> findString(List<String> list, String str) {
        for (String s : list) {
            if (s.equals(str)) {
                return Optional.of(s);
            }
        }
        return Optional.empty();
    }

    public static void main(String[] args) {
        List<String> list = Arrays.asList("a", "b", "c");
        Optional<String> result = findString(list, "b");

        result.ifPresent(System.out::println); // Prints "b"
        System.out.println(result.orElse("not found")); // Prints "b"

        Optional<String> notFound = findString(list, "d");
        System.out.println(notFound.orElse("not found")); // Prints "not found"
    }
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

1. **Definition**: An array in Java is a low-level data structure that holds a fixed number of values of a single type.
2. **Size**: Once you declare the size of an array, it's fixed. You cannot change it without creating a new array.
3. **Types**: Java supports both primitive and reference type arrays.
	- Primitive type arrays: `int[]`, `char[]`, `float[]`, etc.
	- Reference type arrays: `String[]`, `Object[]`, `CustomClass[]`, etc.
4. **Memory**: Arrays are stored in contiguous memory locations.
5. **Performance**: Access to an array element by its index is very fast, O(1). However, operations like inserting and removing an element in the middle require manual shifting of elements and are O(n).
6. **Usage**: Arrays are beneficial when the data size is known in advance, and changes to the data size are infrequent.

**List:**

1. **Definition**: `List` is a part of the Java Collections Framework and implements the `Collection` interface. It is a higher-level, dynamic data structure compared to arrays. The `List` interface has various implementations such as `ArrayList`, `LinkedList`, etc.
2. **Size**: Lists are dynamic. You can add or remove elements, and the list will resize dynamically.
3. **Types**: Lists only support reference types. Even when you have a list of primitives (like `int`), Java uses their wrapper classes (like `Integer`).
4. **Memory**: Depending on the implementation, the memory structure may differ:
	- `ArrayList` internally uses an array to store its elements. When it reaches its capacity, a new, larger array is created, and the old elements are transferred.
	- `LinkedList` uses a doubly-linked list data structure, where each element (node) contains a value and references to the next and previous nodes.
5. **Performance**:
	- `ArrayList` offers constant-time performance for indexed access and iteration, but O(n) for insertions and deletions in the middle.
	- `LinkedList` provides O(1) for insertions and deletions (if the node is known), but O(n) for indexed access.
6. **Usage**: Lists, especially `ArrayList`, are more common in standard applications due to their dynamic nature and the vast set of built-in methods provided by the Java Collections Framework.

## Google Guice


Google Guice (pronounced “juice”) is a lightweight dependency injection framework for Java 5 and above, brought to you by Google. Dependency injection is a design pattern that allows for more modular and testable code by removing hard-coded dependencies between classes, making it easier to swap out components for testing or maintenance.


### Core Concepts:


**Injection**: This is the process by which the dependencies of a class are ‘injected’ or provided to the class by an external entity, instead of the class creating them internally.


**Binder**: Guice uses a binding API to configure the injector, which is responsible for injecting dependencies. This is usually done in a Module.


**Module**: A module is where you define your bindings, which tell Guice how to map your injections. This is where you can configure which implementation of an interface to use, or what constant values to inject.


**Injector**: The injector is what creates objects and provides dependencies. You ask the injector to provide an instance of a particular class, and it takes care of creating that object and any dependencies that it has.


**Provider**: A provider is a factory for creating instances. Guice will use a provider when you need to provide a custom way of creating an instance of a type.


**Scope**: Guice allows you to control the lifecycle of your objects via scopes. The most common scopes are Singleton (one instance per Injector) and Prototype (a new instance every time).


**Example:**


Here is a simple example of how to use Guice:


```java
public interface MessageService {
    String getMessage();
}

public class EmailService implements MessageService {
    public String getMessage() {
        return "Sent via Email";
    }
}

public class MessageModule extends AbstractModule {
    @Override
    protected void configure() {
        bind(MessageService.class).to(EmailService.class);
    }
}

public class Application {
    private final MessageService service;

    @Inject
    public Application(MessageService service) {
        this.service = service;
    }

    public void sendMessage() {
        System.out.println(service.getMessage());
    }

    public static void main(String[] args) {
        Injector injector = Guice.createInjector(new MessageModule());
        Application app = injector.getInstance(Application.class);
        app.sendMessage();
    }
}

```


In this example, we have a `MessageService` interface with an implementation `EmailService`. The `MessageModule` class is our Guice module where we define our bindings. The `Application` class has a dependency on `MessageService`, which is injected through its constructor.


When we run the application, Guice takes care of creating the `Application` object, figuring out that it needs a `MessageService`, creating an `EmailService` to satisfy this dependency, and then injecting it.


This results in a flexible and decoupled design, where the `Application` class doesn’t need to know about how to create a `MessageService`, and it's easy to replace `EmailService` with a different implementation of `MessageService` if needed.


### Provides


You can provide a concrete class by using `@Provides`. Used in Provider pattern injection


```javascript
public class ModelModule extends AbstractModule {
  @Provides
  public ServiceClient serviceClient(ServiceConfiguration config) 
		throws IOException {
		var endpoint = String.format("%s-...", config.getLocation());
    var credentials = config.getCredentials();
    var credentialsProvider = FixedCredentialsProvider.create(credentials);
    var setting = ServiceSettings
			.newBuilder()
			.setCredentialsProvider(credentialsProvider)
			.setEndpoint(endpoint)
			.build();

		return ServiceClient.create(settings);
	}
}

public class ModelService {
  private final Provider<ServiceClient> serviceClientProvider;
  public ModelService(
	  Provider<ServiceClient> serviceClientProvider
  ) {
		this.serviceClientProvider = serviceClientProvider;
	}

	try (var serviceClient = serviceClientProvider.get()) {
  ...
  }
}
```


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

1. **Mock Creation**: You create a mock object for the dependency.
2. **Stubbing**: You provide a "fake" behavior or return value for some methods of the mock object.
3. **Running Code**: You run your code under test.
4. **Verification**: You verify if certain methods on the mock object were called.

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


