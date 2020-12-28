---
title: Packing in Nuget
date: 2020-12-09T15:44:09
categories:
  - technical
classes: wide
---


Recently, I came across an error, 'DomainEvents.AttributesPackage 1.0.55'. You are trying to install this package into a project that targets 'Unsupported,Version=v0.0', but the package does not contain any assembly references or content files that are compatible with that framework. For more information, contact the package author. It was because I didn't [support multiple .NET versions](https://docs.microsoft.com/en-us/nuget/create-packages/supporting-multiple-target-frameworks). 

Let's [update project file to support multiple .NET framework versions](https://docs.microsoft.com/en-us/nuget/create-packages/multiple-target-frameworks-project-file).

```markup
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFrameworks>netstandard2.1;net45;net46</TargetFrameworks>
    <GeneratePackageOnBuild>true</GeneratePackageOnBuild>
    <PackageId>SanPellgrino</PackageId>
    <Version>0.4.0</Version>
    <Authors>Andrew Chaa</Authors>
    <AssemblyName>SanPellgrino</AssemblyName>
    <RootNamespace>SanPellgrino</RootNamespace>
    <Description>A collection of useful extension methods</Description>
    <PackageProjectUrl>https://github.com/andrewchaa/sanpellgrino</PackageProjectUrl>
    <PackageIconUrl>https://raw.githubusercontent.com/andrewchaa/SanPellgrino/master/src/Extensions/icon.jpeg</PackageIconUrl>
    <PackageIcon>icon.jpeg</PackageIcon>
    <PackageLicenseExpression>MIT</PackageLicenseExpression>
    <PackageTags>Extension Methods, Helper Methods</PackageTags>
  </PropertyGroup>
  <ItemGroup>
    <Reference Include="xunit.assert, Version=2.4.0.4049, Culture=neutral, PublicKeyToken=8d05b1bb7a6fdb6c">
      <HintPath>..\..\..\.nuget\packages\xunit.assert\2.4.0\lib\netstandard2.0\xunit.assert.dll</HintPath>
    </Reference>
    <Reference Include="xunit.core, Version=2.4.0.4049, Culture=neutral, PublicKeyToken=8d05b1bb7a6fdb6c">
      <HintPath>..\..\..\.nuget\packages\xunit.extensibility.core\2.4.0\lib\netstandard2.0\xunit.core.dll</HintPath>
    </Reference>
    <None Include=".\icon.jpeg" Pack="true" PackagePath="\" />
  </ItemGroup>
</Project>

```

Now, `dotnet pack` will create .nupkg targetting both .NET Standard 2.1 and .NET Framework 4.5 and 4.6. Make sure you reload the project. 

[PackageIconUrl is deprecated](https://docs.microsoft.com/en-us/nuget/reference/msbuild-targets#packageiconurl). So use PackageIcon and include the image in the project. 

```markup
<PropertyGroup>
  ...
  <PackageIcon>fountain-pen.png</PackageIcon>
  ...
</PropertyGroup>

<ItemGroup>
  <None Include="fountain-pen.png" Pack="true" PackagePath="\" />
</ItemGroup>

```

## Build script

```yaml
# pack nuget package
- task: DotNetCoreCLI@2
  displayName: Pack
  condition: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/master'))
  inputs:
    command: 'pack'
    configuration: 'release'
    packagesToPack: $(packageProject)
    packDirectory: '$(build.artifactStagingDirectory)/nupkgs'
    versioningScheme: 'byBuildNumber'        

# Publish to the innovation release feed
- task: DotNetCoreCLI@2 
  displayName: Publish to Nuget Feed
  condition: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/master'))
  inputs:
    command: push
    packagesToPush: '$(build.artifactStagingDirectory)/nupkgs/*.nupkg'
    publishVstsFeed: ''

```

