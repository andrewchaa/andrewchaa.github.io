---
title: Encapsulation without using classes in JavaScript
date: 2023-03-12
tags:
  - functional programming
  - javascript
---

In JavaScript, you can achieve encapsulation without using classes by using closures and factory functions. Closures allow you to create a private scope within a function, where you can define variables and functions that are not accessible from outside the function. Factory functions allow you to create objects that have private properties and methods that can only be accessed from within the object itself.


### Factory Method


Here's an example of how to use closures and factory functions to achieve encapsulation in JavaScript:


```javascript
function createCounter() {
  let count = 0;

  return {
    increment() {
      count++;
    },

    decrement() {
      count--;
    },

    getCount() {
      return count;
    }
  };
}

const myCounter = createCounter();
myCounter.increment();
myCounter.increment();
console.log(myCounter.getCount()); // output: 2
```


In this example, **`createCounter()`** is a factory function that returns an object with three methods: **`increment()`**, **`decrement()`**, and **`getCount()`**. The **`count`** variable is defined within the closure of the **`createCounter()`** function, which means it is not accessible from outside the object. This allows us to achieve encapsulation and hide the **`count`** variable from other parts of our code.


By using closures and factory functions in this way, you can create objects that have private properties and methods that are not accessible from outside the object, allowing you to achieve encapsulation in your JavaScript code


### Class, the Syntactic Sugar


I often hear that class is just a syntatic sugar in javascript. What actually happens when I create a new instance in javascript?

1. A new object is created.
2. The object's prototype is set to the constructor function's **`prototype`** property.
3. The constructor function is called with the **`this`** keyword set to the new object. This initializes the object's properties and methods.
4. The new object is returned.

Here's an example to illustrate this:


```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`Hi, my name is ${this.name} and I'm ${this.age} years old.`);
  }
}

const john = new Person('John', 30);
john.greet(); // output: Hi, my name is John and I'm 30 years old.
```


In this example, we create a new **`Person`** instance called **`john`** by using the **`new`** keyword with the **`Person`** constructor function. The constructor function sets the **`name`** and **`age`** properties of the **`john`** object, and defines the **`greet()`** method. When we call **`john.greet()`**, the **`greet()`** method is called on the **`john`** object, which logs the greeting to the console.


You can achieve the same thing using just functions:


```javascript
function createPerson(name, age) {
  return {
    name,
    age,
    greet() {
      console.log(`Hi, my name is ${this.name} and I'm ${this.age} years old.`);
    }
  };
}

const john = createPerson('John', 30);
john.greet(); // output: Hi, my name is John and I'm 30 years old.
```


In this example, we define a **`createPerson()`** function that returns an object with **`name`**, **`age`**, and **`greet()`** properties. The **`greet()`** method is defined as a function within the object and has access to the object's **`name`** and **`age`** properties via the **`this`** keyword. When we call **`createPerson('John', 30)`**, it returns an object with the **`name`** and **`age`** properties set to **`'John'`** and **`30`**, respectively, and the **`greet()`** method logs the greeting to the console.


This achieves the same functionality as the previous example using just functions. However, using classes can make your code more organized and easier to read, especially when you're working with complex objects and inheritance.


