---
title: Managing certificate to publish an iOS app
date: 2020-12-20T17:14:53
categories:
  - technical
tags:
  - ios
---


* Create a certificate
* Create a profile
* Download the certificate from your developer account

#### Create a certificate

![](../.gitbook/assets/image%20%2824%29.png)

I used "Managed Certificates" on XCode. Easy.

#### Create a profile

Go to [https://developer.apple.com/account/resources/profiles/list](https://developer.apple.com/account/resources/profiles/list) and create a new one, if the existing one has expired. 

* Select Distribution to use it for distribution
* Select App Id. I chose wild card
* Select Certificat. I've already create a new certificate. So I chose the new fresh certificate.
* Give Provisioning Profile a name
* Download and install: Download the profile and install it by double-clicking it

#### Download the certificate

Download the certificate from [https://developer.apple.com/account/resources/certificates](https://developer.apple.com/account/resources/certificates)



