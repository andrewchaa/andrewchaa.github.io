---
title: Using reflection
date: 2020-11-27T15:07:11
categories:
  - technical
---


Recently, I have worked on a tool that scan c\# assemblies to discover domain events. Those event classes are decorated with \[DomainEvent\], so the tool search through assemblies and filter out classes with \[DomainEvent\] attribute. 

```csharp
assembly.GetLoadableTypes()
    .Where(x => !x.Name.StartsWith("<")
             && !x.Name.StartsWith("__")
             && !x.IsInterface
     );
```

One issue I had that I encountered an error, saying "[Could not load file or assembly](https://stackoverflow.com/questions/28889598/reflection-could-not-load-file-or-assembly-double-dependency-inversion) DomainEvents.AttributesPackage, Version=1.0.70.0". For some reason, it couldn't find the referencing assembly. An answer from a wise man from stackoverflow saved me a lot of time. You have to load those missing assemblies manually if any. You can do that by subscribing to `AssemblyResolve` event

```csharp
AppDomain.CurrentDomain.AssemblyResolve += (sender, args) =>
{
    var packageName = nameof(DomainEvents.AttributesPackage);
    if (!args.Name.Contains(packageName))
        return null;

    var assembly = AppDomain.CurrentDomain.GetAssemblies().FirstOrDefault(x => x.FullName.Contains(packageName));
    return assembly;
};

```

