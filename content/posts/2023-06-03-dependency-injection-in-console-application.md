---
title: Dependency Injection in Console Application
date: 2023-06-03
tags:
  - C#
---

Dependency injection is a design pattern that aids in reducing the dependency between software components. By injecting dependencies, we ensure that each module only focuses on its core responsibilities, thereby facilitating code maintenance, testing, and improving overall software design.


The .NET framework simplifies dependency injection through its built-in Microsoft.Extensions.DependencyInjection namespace. This namespace includes classes such as ServiceCollection, which acts as a container for registering services and allows for the smooth handling of dependencies.


### Setting Up Dependencies:


```c#
using Microsoft.Extensions.DependencyInjection;
using RoundUpService.Domains.Entities;
using RoundUpService.Domains.Repositories;

var services = new ServiceCollection()
    .AddTransient<IRepository<Transaction>, TransactionRepository>()
    .BuildServiceProvider();
```


Create an instance of ServiceCollection, which is a built-in class for registering and resolving dependencies. Using the AddTransient method, we register the TransactionRepository to be used whenever `IRepository<Transaction>` is required. The AddTransient method ensures a new instance of the repository is created every time it's requested.


### Obtaining and Using Services


After setting up our dependencies, we can obtain instances of our registered services as shown below:


```c#
var transactionRepository = services.GetService<IRepository<Transaction>>();
var transactions = await transactionRepository.List();
```


The whole code snippet is here.


```c#
// See https://aka.ms/new-console-template for more information

using Microsoft.Extensions.DependencyInjection;
using RoundUpService.Domains.Entities;
using RoundUpService.Domains.Repositories;

var services = new ServiceCollection()
    .AddTransient<IRepository<Transaction>, TransactionRepository>()
    .BuildServiceProvider();

var transactionRepository = services.GetService<IRepository<Transaction>>();
var transactions = await transactionRepository.List();

foreach (var transaction in transactions)
{
    Console.WriteLine(
        $"{transaction.Amount.MinorUnits} with the round up of {transaction.RoundUp.MinorUnits}");
}
```


