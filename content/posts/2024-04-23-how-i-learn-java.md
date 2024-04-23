---
title: How I learn Java
date: 2024-04-23
tags:
  - java
---
Some people call C# a slightly better Java. I am well experienced in C# but Java is a new language to me. I started using Java since August last year, 2023. It's an interesting journey for me to learn Java. In my mental model, the code I want to write exists. It's not C# or Java, yet it's closer to C# as C# is like my native programming language. I think in terms of JavaScript more often these days though. 
When I work on my projects, I translate the code in my mind into Java. This post is about the translation. It happens instantly sometimes as it's obvious. Sometimes, I have to google or ask LLM to help. 

### Add null value to a list
Tue. 23/4/2024
```java
given(resource.predict(argThat(argumentMatcher())))
    .willReturn(Arrays.asList(null, new BigDecimal("0.7"), null, new BigDecimal("0.5")));
```
- A typical way of creating a list with a given value is `List.of(new BigDecimal("0.7"))`
- `List.of()` doesn't allow `null` as argument
- Use `Arrays.asList()` if you want to insert a null value

### Filter out null values from a list
Tue. 23/4/2024
```java
private <T> Optional<T> getPrediction(List<T> predictions) {
	if (predictions == null) {
		return Optional.empty();
	}

	return predictions.stream()
		.filter(Objects::nonNull)
		.findFirst();
}
```
- To use lambda function, you call `stream()` on the collection. Stream in Java is a sequence of elements supporting sequential and parallel aggregate operations. C# doesn't require `stream()`. All collections support aggregate operations by default.
- `Objects::nonNull` is a method reference and used as a predicate in the `filter` operation

