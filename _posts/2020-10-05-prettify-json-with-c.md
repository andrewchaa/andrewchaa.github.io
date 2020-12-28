---
title: Prettify JSON with C\#
date: 2020-10-05T16:13:28
categories:
  - technical
---


Interestingly, [JSON.Net](https://www.newtonsoft.com/json) supported the feature already. The following's the code.

```csharp
var content = Encoding.UTF8.GetString(message.Body);
var beautified = JToken.Parse(content).ToString(Formatting.Indented);
```

