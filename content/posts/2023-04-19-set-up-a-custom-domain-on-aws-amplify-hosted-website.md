---
title: Set up a custom domain on AWS Amplify Hosted website
date: 2023-04-19
tags:
  - amplify
  - AWS
---

Setting up a custom domain on AWS Amplify Console is generally quite straightforward. However, this time, the challenge arose because the app was hosted in one AWS account while the domain Hosted Zone resided in another AWS account.


Initially, I added a CNAME record to the Route 53 Hosted Zone with the value of the default URL created by Amplify Console. The value looked like this:


```bash
https://main.d2rcpxxxxxxx.amplifyapp.com
```


This worked, and I was able to access the website through the custom URL. However, after a couple of days, Amplify Console disconnected the custom domain, displaying the message: "We had issues connecting your custom domain: [xxxxxuk.net](http://xxxxxuk.net/). Please visit the Domain Management page for more information."


Apparently, I wasn't supposed to use the default URL as the value for the CNAME record. Instead, I needed to use the CloudFront domain. But how could I obtain the underlying CloudFront domain URL?


The option was hidden in the menu. By selecting Action > View DNS records, a pop-up appeared displaying the CloudFront domain like the example below:


```bash
dashboard    CNAME    d1s0rlxxxxxxx.cloudfront.net
```


It was quite a tricky process!


