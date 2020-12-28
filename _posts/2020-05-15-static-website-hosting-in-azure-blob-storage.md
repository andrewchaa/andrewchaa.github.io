---
title: Static website hosting in Azure Blob Storage
date: 2020-05-15T08:19:45
categories:
  - technical
classes: wide
---


## Setting up

Create a storage account with blob storage. Then enable static website on the storage account. It'll ask you what would be the name of the default file. I chose index.html, as it's the default html file of my react app. 

![Enable Static website](.gitbook/assets/image%20%281%29.png)

Once enabled, it'll create $web directory / folder on the blob container.

![](.gitbook/assets/image.png)

It shows the endpoint: https://contoso.web.core.windows.net 

## Uploading content

You can use any of these tools to upload content to the $web container.

* [Azure CLI](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-static-website-how-to?tabs=azure-cli)
* [Azure PowerShell module](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-static-website-how-to?tabs=azure-powershell)
* [AzCopy](https://docs.microsoft.com/en-us/azure/storage/common/storage-use-azcopy-v10)
* [Azure Storage Explorer](https://azure.microsoft.com/features/storage-explorer/)
* [Azure Pipelines](https://azure.microsoft.com/services/devops/pipelines/)
* [Visual Studio Code extension](https://docs.microsoft.com/en-us/azure/javascript/tutorial-vscode-static-website-node-01)

I used Azure Storage Explorer for testing purpose, but would set up an Azure Pipeline to deploy the change automatically whenever a new commit gets pushed. 

## Public access level of the web container

The files at the primary static website endpoint are served through anonymous access requests, which means public read-only access to  all files. 

![](.gitbook/assets/image%20%282%29.png)

I used Public access level: Blob, so that the primary static website endpoint would be [https://contosoblobaccount.z22.web.core.windows.net/index.html](https://contosoblobaccount.z22.web.core.windows.net/index.html).

## Integrate a static website with Azure CDN

You can enable Azure CDN for your static website

* Go to your storage account overview
* Under the Blob Service menu, select Azure CDN to open the Azure CDN page
* Specify your static website endpoint in the Origin hostname field. 

![](.gitbook/assets/image%20%284%29.png)

* Update Origin fields like these. Otherwise, you would have the infamous XML error

![](.gitbook/assets/image%20%285%29.png)

## Map a custom domain

Go to Custom domains menu and set up your custom domain. You can use cname mapping. Also, provision SSL certificate, so that you wouldn't get security warning. 

Create a CNAME DNS record with your domain provider. The domain should point to xxxx.azureedige.net. After Azure CDN verifies the CNAME record that you create, traffic addressed to the source custom domain would be routed to the specified destination. 

## Resources

* [https://docs.microsoft.com/en-us/azure/storage/blobs/static-website-content-delivery-network](https://docs.microsoft.com/en-us/azure/storage/blobs/static-website-content-delivery-network)
* [https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-static-website](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-static-website)
* [https://docs.microsoft.com/en-us/azure/storage/blobs/storage-custom-domain-name?tabs=azure-portal](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-custom-domain-name?tabs=azure-portal)

