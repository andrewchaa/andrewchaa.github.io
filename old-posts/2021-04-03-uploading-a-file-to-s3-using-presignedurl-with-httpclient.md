---
title: Uploading a file to S3 using PreSignedUrl with HttpClient
date: 2021-04-03T09:09:28
categories:
  - technical
tags:
  - csharp
---


```csharp
private static async Task UploadToS3(string filename, string preSignedUrl)
{
    await using var fileStream = File.OpenRead(filename);
    var fileStreamResponse = await new HttpClient().PutAsync(
        new Uri(preSignedUrl),
        new StreamContent(fileStream));
    fileStreamResponse.EnsureSuccessStatusCode();
}

```



