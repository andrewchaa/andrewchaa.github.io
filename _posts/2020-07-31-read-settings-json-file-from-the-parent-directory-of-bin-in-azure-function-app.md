---
title: Read settings json file from the parent directory of "bin" in Azure Function app
date: 2020-07-31T15:31:17
categories:
  - technical
classes: wide
---


## Publish appsettings.json

Update the project file to publish the settings json file

```markup
<ItemGroup>
  <Content Include="host.json">
    <CopyToOutputDirectory>PreserveNewest</CopyToOutputDirectory>
    <CopyToPublishDirectory>PreserveNewest</CopyToPublishDirectory>
  </Content>
  <Content Include="appsettings.json">
    <CopyToOutputDirectory>PreserveNewest</CopyToOutputDirectory>
    <CopyToPublishDirectory>PreserveNewest</CopyToPublishDirectory>
  </Content>
</ItemGroup>
```

## Relative path and absolute path

```csharp
var settingPath = Path.GetFullPath(Path.Combine(@"../appsettings.json"));

var configBuilder = new ConfigurationBuilder();
configBuilder.AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
configBuilder.AddJsonFile(settingPath, optional: true, reloadOnChange: true);

var config = configBuilder.Build();
Services.Configure<ChatRoomOptions>(config.GetSection("chatRoom"));
```

