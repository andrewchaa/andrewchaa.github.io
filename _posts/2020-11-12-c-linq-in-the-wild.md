---
title: C\# LINQ in the wild
date: 2020-11-12T19:34:23
categories:
  - technical
classes: wide
---


#### Find the duplicates in the list

[Use GroupBy and Count](https://stackoverflow.com/questions/18547354/c-sharp-linq-find-duplicates-in-list)

```csharp
var query = lst.GroupBy(x => x)
              .Where(g => g.Count() > 1)
              .Select(y => y.Key)
              .ToList();

```

#### Query list that contains a list

[https://stackoverflow.com/questions/2364090/linq-query-list-contains-a-list](https://stackoverflow.com/questions/2364090/linq-query-list-contains-a-list)

```csharp
ListObjectB.Where(p => p.ListOfObjectA.Any(x => ListOfIdsA.Contains(x.Id)))
ListObjectB.Where(p => p.ListOfObjectA.All(x => ListOfIdsA.Contains(x.Id)))
```

#### Distinct, ignoring case

Use StringComparer \([https://stackoverflow.com/questions/283063/linq-distinct-operator-ignore-case](https://stackoverflow.com/questions/283063/linq-distinct-operator-ignore-case)\)

```csharp
private static List<string> GetDomains(IList<DomainService> services)
{
    return services
        .Select(x => x.Domain)
        .Distinct(StringComparer.OrdinalIgnoreCase)
        .OrderBy(x => x)
        .ToList();
}
```

#### Flatten queries, returning list of lists

[https://stackoverflow.com/questions/958949/difference-between-select-and-selectmany](https://stackoverflow.com/questions/958949/difference-between-select-and-selectmany)

```csharp
var releases = bankingCore.DeploymentGroups
    .Where(x => x.ReleaseDefinitions != null)
    .SelectMany(x => x.ReleaseDefinitions)
    .ToList();
var builds = bankingCore.DeploymentGroups
    .Where(x => x.BuildDefinitions != null)
    .SelectMany(x => x.BuildDefinitions)
    .ToList();
```



