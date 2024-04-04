---
title: How I use mockito
date: 2024-03-25
tags:
  - java
  - mockito
---
[Mockito](https://site.mockito.org/) is a popular mocking framework for Java, and `mockito.verify` is a utility method used for verifying interactions between a mock object and the code under test. It allows you to assert that specific methods of a mock object were called (or not called) with certain arguments and in the expected order.

Here are some popular examples of using `mockito.verify`:

### Verify if a method was called

```java
// Arrange
List<String> mockedList = mock(List.class);

// Act
mockedList.add("Hello");

// Assert
verify(mockedList).add("Hello");
```

In this example, we create a mock object `mockedList` of the `List` interface. After calling the `add` method on the mock, we use `verify(mockedList).add("Hello")` to assert that the `add` method was called with the argument `"Hello"`.

### Verify if a method was called a specific number of times

```java
// Arrange
MyClass myClass = mock(MyClass.class);

// Act
myClass.doSomething();
myClass.doSomething();

// Assert
verify(myClass, times(2)).doSomething();
```

In this example, we use `verify(myClass, times(2)).doSomething()` to assert that the `doSomething` method of the `myClass` mock object was called exactly two times.

### Verify if a method was never called

```java
// Arrange
MyClass myClass = mock(MyClass.class);

// Act
// No method call

// Assert
verify(myClass, never()).doSomething();
```

Here, we use `verify(myClass, never()).doSomething()` to assert that the `doSomething` method of the `myClass` mock object was never called.

### Verify the order of method calls

```java
// Arrange
MyClass myClass = mock(MyClass.class);

// Act
myClass.doSomething();
myClass.doSomethingElse();

// Assert
InOrder inOrder = inOrder(myClass);
inOrder.verify(myClass).doSomething();
inOrder.verify(myClass).doSomethingElse();
```

In this example, we use the `inOrder` feature of Mockito to verify that the `doSomething` method was called before the `doSomethingElse` method on the `myClass` mock object.

### Verify interactions with arguments

```java
// Arrange
MyClass myClass = mock(MyClass.class);

// Act
myClass.processData("hello", 42);

// Assert
verify(myClass).processData(eq("hello"), anyInt());
```

Here, we use `verify(myClass).processData(eq("hello"), anyInt())` to assert that the `processData` method was called with the argument `"hello"` as the first parameter and any integer value as the second parameter. The `eq` and `anyInt` are argument matchers provided by Mockito.

These examples demonstrate how `mockito.verify` can be used to assert various scenarios involving method calls on mock objects. By verifying the interactions between the code under test and the mock objects, you can ensure that your code behaves as expected and catch potential issues early during the development process.