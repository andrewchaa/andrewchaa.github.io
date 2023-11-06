---
title: .NET Logging in Console Application
date: 2023-06-11
tags:

---

Logging is a critical part of any software application. It allows you to track the execution of your code, identify errors, and troubleshoot problems.


In .NET, there are a number of different logging frameworks available but the one that comes out of the box is Microsoft.Extensions.Logging framework. This framework provides a generic logging API that can be used with a variety of logging providers, such as the Console, File, and Azure Application Insights providers.


To use the Microsoft.Extensions.Logging framework in your console application, you first need to install the Microsoft.Extensions.Logging NuGet package. Once you have installed the package, you can configure logging in your application by creating a ServiceCollection and adding the Logging extension.


The following code shows how to configure logging in a console application:


```c#
var services = new ServiceCollection();

// Register your dependencies
services.AddTransient<SaveRoundUpService>();

// Configure logging
services.AddLogging(x => x.AddConsole());

// Build the service provider
var provider = services.BuildServiceProvider();
```


Once you have configured logging, you can use the ILogger interface to log messages to your configured logging providers. The following code shows how to log a message to the Console:


```c#
public SaveRoundUpService(
    IAccountRepository accountRepository,
    ITransactionRepository transactionRepository,
    ISavingsGoalRepository savingsGoalRepository,
    ILogger<SaveRoundUpService> logger)
{
    _accountRepository = accountRepository;
    _transactionRepository = transactionRepository;
    _savingsGoalRepository = savingsGoalRepository;
    _logger = logger;
}

var roundUpAmount = transactions.Sum(x => x.RoundUp.MinorUnits);
var roundUpCount = transactions.Count(x => x.RoundUp.MinorUnits > 0);
var roundUpCurrency = transactions.First().Amount.Currency;

_logger.LogInformation($"Found {roundUpCount} transactions to round up");

```


The ILogger interface provides a number of different methods for logging messages, such as LogInformation(), LogWarning(), LogError(), and LogError(). The different methods allow you to specify the severity of the message, as well as additional information about the message, such as the source of the message and the stack trace.


