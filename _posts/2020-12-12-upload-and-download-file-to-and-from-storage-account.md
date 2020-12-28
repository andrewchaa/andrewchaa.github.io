---
title: Upload and download file to and from Storage account
date: 2020-12-12T10:09:28
categories:
  - technical
tags:
  - azure-storage-account
---


```text
dotnet add Microsoft.Azure.Storage.Blob
```

#### Object model <a id="set-up-the-app-framework"></a>

Azure Blob storage is optimized for storing massive amounts of unstructured data. Unstructured data is data that does not adhere to a particular data model or definition, such as text or binary data. Blob storage offers three types of resources:

* The storage account
* A container in the storage account
* A blob in the container

The following diagram shows the relationship between these resources.

![Diagram of Blob storage architecture](https://docs.microsoft.com/en-us/azure/storage/blobs/media/storage-blobs-introduction/blob1.png)

Use the following .NET classes to interact with these resources:

* [BlobServiceClient](https://docs.microsoft.com/en-us/dotnet/api/azure.storage.blobs.blobserviceclient): The `BlobServiceClient` class allows you to manipulate Azure Storage resources and blob containers.
* [BlobContainerClient](https://docs.microsoft.com/en-us/dotnet/api/azure.storage.blobs.blobcontainerclient): The `BlobContainerClient` class allows you to manipulate Azure Storage containers and their blobs.
* [BlobClient](https://docs.microsoft.com/en-us/dotnet/api/azure.storage.blobs.blobclient): The `BlobClient` class allows you to manipulate Azure Storage blobs.
* [BlobDownloadInfo](https://docs.microsoft.com/en-us/dotnet/api/azure.storage.blobs.models.blobdownloadinfo): The `BlobDownloadInfo` class represents the properties and content returned from downloading a blob.

#### [Download blobs ](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-dotnet-legacy)

Download the previously created blob by calling the DownloadAsync method. The example code adds a suffix of "DOWNLOADED" to the file name so that you can see both files in local file system.

```csharp
if (CloudStorageAccount.TryParse(configs.StorageConnectionString, out var storageAccount))
{
    var blobClient = storageAccount.CreateCloudBlobClient();
    var container = blobClient.GetContainerReference(configs.StorageContainerName);
    var blob = container.GetBlockBlobReference(configs.SqliteDbName);
    await blob.DownloadToFileAsync($".\\{configs.SqliteDbName}", FileMode.Create);
}

```

#### Upload blobs

```csharp

```

