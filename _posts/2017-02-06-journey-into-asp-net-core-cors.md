---
layout: post
title: A journey into ASP.NET Core CORS (Cross Origin Resource Sharing)
date: 2017-02-06
type: post
categories: [programming]
tags:
meta: {}
author:
  email: andrew.yh.chaa@gmail.com
  display_name: Andy
  first_name: Andrew
  last_name: Chaa
---

A quick note. I may turn this into a proper blog post.

"Cross-origin resource sharing (CORS) is a mechanism that allows restricted resources (e.g. fonts) on a web page to be requested from another domain outside the domain from which the first resource was served.[1] A web page may freely embed cross-origin images, stylesheets, scripts, iframes, and videos.[2] Certain "cross-domain" requests, notably AJAX requests, however are forbidden by default by the same-origin security policy." ( https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)

It's getting more common.
To make CORS Work, the server should send Access-Control-Allow-* in response headers

```
Access-Control-Allow-Credentials:true
Access-Control-Allow-Headers:content-type
Access-Control-Allow-Methods:PUT
Access-Control-Allow-Origin:http://the_origin_server
```

To do it on ASP.NET Core,

* install package: Microsoft.AspNetCore.Cors
* set up CORS with IApplicationBuilder

```
a.UseCors(b =>
  b.AllowAnyOrigin()
  .AllowAnyMethod()
  .AllowAnyHeader()
  .AllowCredentials());
```

The single issue that troubled me was ASP.NET Core's AutoValidateAntiforgeryTokenAuthorizationFilter. By default, Chrome doesn't send cookies together when it calls an endpoint different from the origin. You have two options,

* disable AutoValidateAntiforgeryTokenAuthorizationFilter
* or use WithCredentials on your request. It will send cookies then.

It took time for me to figure out the antiforgery validation error. The symptom is you get 400 Bad request after successful preflight OPTIONS request.

Hopt this helps.
