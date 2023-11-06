---
title: Deserializing yaml file in C\#
date: 2021-03-04T14:41:16
categories:
  - technical
tags:
  - csharp
---


### Deserialize YAML

```csharp
var deserializer = new DeserializerBuilder()
        .Build();        
var banking = deserializer.Deserialize<Banking>(bankingYaml))
```

This is the simplest form. You can specify what naming convention you can use, such as camelcasing. I used it once it had a quirky behaviour. For example,

* yamlFile matches C\# object's YamlFile property.
* yamlName doesn't match YamlName property. It looks for Yamlname property.

TBC

