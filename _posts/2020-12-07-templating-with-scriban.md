---
title: Templating with scriban
date: 2020-12-07T18:43:11
categories:
  - technical
tags:
  
---


Simply create a template and pass data object as parameter.

```csharp
    var template = Template.Parse(@"
##Ownership 
**Domain Event** | **Subscriptions** | **Domain** | **Sub Domain** | **Team**  | **Team Lead** | **CodeBase**
--|--|--|--|--|--|--
{{name}} |   | [{{domain}}](/{{domain_link}}) | {{sub_domain}} | {{team}}  |   | {{repository}}

<br>
<br>
");
    return template.Render(new
    {
        _domainEvent.Name,
        _serviceDefinition.Domain,
        DomainLink = $"{CbWiki.DomainPageRoot}/{_serviceDefinition.Domain} Domain".ToWikiLink(),
        _serviceDefinition.SubDomain,
        _serviceDefinition.Team,
        _serviceDefinition.Repository
    });
    
```

As templeate, it has extensive support for template language. I use `if` and `for`

```csharp
var template = Template.Parse(@"
  {{if obsolete}}##<font color=""red"">Description (OBSOLETE)</font>{{else}}##Description{{end}}
  {{if obsolete}}~~{{description}}~~{{else}}{{description}}{{end}}

  {{ properties }}
");

```

### Whicespace control

By default, any whitespace \(including new lines\) bofore or after a code block are copied as-is to the output. To use loop, "non greedy mode" using the charcter ~

```c
{{~ for event in events ~}}
[{{event.name}}]({{event.link}})
{{~ end ~}}
```

