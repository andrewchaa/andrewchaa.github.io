---
title: Encryption and Hashing
date: 2020-09-18T13:37:13
categories:
  - technical
tags:
  
---


## Hashing

"Hash function is any function that can be used to map data of arbitrary size to fixed-size values." \([Wikipedia](https://en.wikipedia.org/wiki/Hash_function)\)

In my case, I store API Key hash in the database and verify the API Key by hasing the incomding token. I don't need to know the original value of the API token, as I only verify it by hashing it and compare the hashed value to the one in the database.

## Encryption

In cryptography, a [cipher ](https://en.wikipedia.org/wiki/Cipher)is an algorithm for performing encryption or decryption. To do encryption and decryption, I used Symmetric key and AES algorithm. You need a key and a new IV to encrypt or decrypt the value. 

