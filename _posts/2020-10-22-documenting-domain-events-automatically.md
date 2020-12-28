---
title: Documenting Domain Events automatically
date: 2020-10-22T09:40:26
categories:
  - technical
classes: wide
---


Each team that manage a domain is supposed to document any events they publish to the Service Bus. My concern was the integrity of the documentation. It's not too difficult to document all the events your service publish. The problem, in my opinion, is more how to maintain it so that it doesn't diverge from the truth. As developer, I often see comments that are located just above the actual code are wrong. The comment was telling the truth once but the corresponding code has moved on. 

To solve this, I wondered if we could generate the documentation automatically. A similar approach is already popular. [Swagger](https://swagger.io/) doc and [Swashbuckle](https://github.com/domaindrivendev/Swashbuckle.WebApi). 

[https://swagger.io/](https://swagger.io/)

So, I'm creating a simple consolel app that will parse C\# assemblies, filtering out classes with "DomainEvent" attribute and spit out the content of those classes with metadata.

### Loading assemblies into memory

It's was relatively straightforward. Just do

```csharp
var assembly = Assembly.LoadFile(".\\Accounts.Events.dll");
```

### Filter out Types with a special attribute

With the power of [LINQ](https://docs.microsoft.com/en-us/dotnet/csharp/tutorials/working-with-linq), it's easy. I love Linq and any other functional elements in C\# language. Looking forward to C\# 9 with pattern matching.

```csharp
var types = assembly
    .GetTypes()
    .Where(x => x.IsDefined(typeof(DomainEventAttribute)));
```

### Get the property name, type and description

```csharp
var propertiesDisplay = string.Empty;
propertiesDisplay += "| Name | Type | Description |\n";
propertiesDisplay += "| ---- | ---- | ----------- |\n";

foreach (var info in properties)
{
    var descriptionAttribute = info.GetCustomAttribute<DomainEventDescriptionAttribute>();
    var description = descriptionAttribute?.Description;

    if (info.PropertyType.IsEnum)
    {
        propertiesDisplay += $"| {info.Name} | {GetEnumNames(Enum.GetNames(info.PropertyType))} | {description} |\n";
    } 
    else 
    {
        propertiesDisplay += $"| {info.Name} | {GetPropertyType(info)} | {description} |\n";
    } 
}

private static string GetEnumNames(IEnumerable<string> enumNames)
{
    var display = "Enum<br /><br />";
    foreach (var enumName in enumNames)
    {
        display += $"{enumName}<br />";
    }

    return display;
}

        

private static string GetPropertyType(PropertyInfo info)
{
    var propertyTypeString = info.PropertyType.ToString();
    return propertyTypeString
        .Replace("System.", string.Empty);
}


```

