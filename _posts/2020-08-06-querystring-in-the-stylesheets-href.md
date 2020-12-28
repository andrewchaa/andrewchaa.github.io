---
title: QueryString in the Stylesheet's href
date: 2020-08-06T19:04:47
categories:
  - technical
tags:
  
---


```markup
<link rel="stylesheet" href="css/style.css?v=1">
```

What is it for?

The short answer is to force the update if the stylesheet is in the browser cache. Often v stands for the version.

Of course there's a long answer.

Often to converse the bandwidth, stylesheets send headers to the browser that they should expire long time later from now, often a year. They also send 304 Not Modified so that the browser can use the cache. 

It's a great feature, but it becomes a problem if there's a change in the stylesheet and you want to refresh it. The stylesheet is requested from the browser and the asset will send 304 Not Modified. The browser would re-use the cache instead of downloading it fresh. The end user would never download it for up to a year. 

You can solve this issue by adding a query string. 

```markup
<style type="text/css" rel="stylesheet" href="css/style.css?v=2" />
```

When the file gets updated, you can increase the version. You can do it with template like razor or tokenise it.

