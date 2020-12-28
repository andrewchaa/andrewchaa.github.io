---
title: Create a nuget package and publish it to Azure Devops Repository
date: 2020-12-07T11:43:32
categories:
  - technical
tags:
  - azure-devops
---


So an idea came up. Decorate your C\# domain event class with "DomainEvent" attribute. Write a tool that parse the decorated the class and generate markdown file. 

So this post is about creating a nuget package for those attribute classes. 

### Two attributes

```csharp
// for domain event class
public class DomainEventAttribute : Attribute
{
    public string TopicName { get; }
    public string Description { get; }

    public DomainEventAttribute(string topicName, string description)
    {
        TopicName = topicName;
        Description = description;
    }
}

// for property description
public class DomainEventDescriptionAttribute : Attribute
{
    public string Description { get; }

    public DomainEventDescriptionAttribute(string description)
    {
        Description = description;
    }
}
```

### Class library project

Create a class library project and put those two above classes. Make it packable with [some extra properties](https://docs.microsoft.com/en-us/nuget/quickstart/create-and-publish-a-package-using-visual-studio?tabs=netcore-cli).

```markup
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>netstandard2.0</TargetFramework>
    <Platforms>x64</Platforms>
    <IsPackable>True</IsPackable>
    <Description>Decorator to wrap your service's domain event classes</Description>
    <Company>...</Company>
    <Authors>Innovation Technology</Authors>
    <Product>Domain Events Package</Product>
  </PropertyGroup>

</Project>
```

### Buld and publish

[Build and publish on Azure Devops](https://docs.microsoft.com/en-us/azure/devops/pipelines/artifacts/nuget?toc=%2Fazure%2Fdevops%2Fartifacts%2Ftoc.json&bc=%2Fazure%2Fdevops%2Fartifacts%2Fbreadcrumb%2Ftoc.json&view=azure-devops&tabs=yaml) pipeline

```yaml
name: 0.1$(Rev:.r)
queue: Hosted VS2017
trigger:
  branches:
    include:
    - master
variables:
  buildConfiguration: 'Release'
  packageProject: '**/*Attributes.csproj'
  dotnetCliVersion: '2.2.101'
steps:
- script: |
   git clean -d -x -f
    
  displayName: Clean Sources

- task: DotNetCoreInstaller@0
  displayName: DotNet CLI Installer
  inputs:
    version: $(dotnetCliVersion) 

- task: DotNetCoreCLI@2
  displayName: Build Projects (Release)
  inputs:
    projects: $(packageProject)
    packDirectory: '$(Build.ArtifactStagingDirectory)/nupkgs'
    arguments: '-c $(buildConfiguration) /p:Version=$(Build.BuildNumber) /p:PackageVersion=$(Build.BuildNumber)'

- task: DotNetCoreCLI@2
  displayName: Pack (release)
  inputs:
    command: 'pack'
    configuration: 'release'
    packagesToPack: $(packageProject)
    packDirectory: '$(build.artifactStagingDirectory)/nupkgs'
    nobuild: false
    versioningScheme: 'byBuildNumber'

- task: DotNetCoreCLI@2
  displayName: Publish to Nuget Feed (release)
  inputs:
    command: push
    packagesToPush: '$(Build.ArtifactStagingDirectory)/nupkgs/*.nupkg'
    publishVstsFeed: '<< your feed id>>'
```

