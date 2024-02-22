---
title: Embrace Records for Simple Data Transfer Objects in Java
date: 2024-02-21
tags:
  - java
---

## **Embrace Records for Simple Data Transfer Objects in Java**


For years, classes have been the go-to choice for defining data structures in Java and C#. But when it comes to simple Data Transfer Objects (DTOs), a new contender had emerged: records. Introduced in Java 14, records offer a concise and lightweight alternative to classes for holding immutable data. Let's delve into why you might favor records for your next simple DTO:


### **Conciseness**


Perhaps the most striking advantage of records is their brevity. Defining a record requires just a single keyword and braces, eliminating the boilerplate code associated with constructors, getters, and setters. This translates to cleaner, more readable code that's easier to maintain.


```java
import com.fasterxml.jackson.annotation.JsonProperty;
import javax.validation.constraints.NotBlank;

public record SendPromptRequest(
    @NotBlank
    @JsonProperty("prompt") String prompt
) {

  @Override
  public String toString() {
    return getClass().getName() 
			+	"@" 
			+ Integer.toHexString(System.identityHashCode(this));
	}
}
```


Btw, `toString()` is overriden to return a string that includes the class name and the identity hash code of the instance, which can be useful for debugging purposes.


### **Immutability**


Records are inherently immutable, meaning their state cannot be changed after creation. This immutability promotes thread safety and simplifies reasoning about your data, potentially reducing bugs and improving code quality.


### **Deconstruction**


Records come with built-in deconstruction capabilities, allowing you to easily unpack their fields into individual variables. This can be particularly useful when working with functional programming patterns or streams.


### **Pattern Matching**


Java 17 introduces pattern matching for records, enabling you to write more expressive and concise code for data validation and manipulation. This can further enhance the readability and maintainability of your codebase.


```java
record Person(String name, int age) {}

public static void validateAndGreet(Person person) {
  switch (person) {
    case Person(String name, int age) ->
        if (age >= 18) {
          System.out.println("Welcome, " + name + "!");
        } else {
          System.out.println("Sorry, " + name + ", you must be 18 or older.");
        }
    default -> System.out.println("Invalid person data.");
  }
}

public static void main(String[] args) {
  Person adult = new Person("John", 25);
  Person minor = new Person("Jane", 16);
  Person invalid = new Person("Error", -1);

  validateAndGreet(adult);   // Output: Welcome, John!
  validateAndGreet(minor);   // Output: Sorry, Jane, you must be 18 or older.
  validateAndGreet(invalid); // Output: Invalid person data.
}
```


### **Value Semantics**


Records follow value semantics, meaning that comparisons are based on the actual content of the data rather than object references. This aligns well with how we often think about DTOs, simplifying reasoning about equality and avoiding potential confusion.


### **Performance**


While benchmarks vary, records generally demonstrate comparable or even slightly better performance than classes for simple DTOs. This is likely due to their simpler structure and lack of unnecessary methods.


### **IDE Support**


Modern IDEs are equipped to provide intelligent code completion and refactoring support for records, ensuring a smooth developer experience.


