---
title: list of javascript quirks
date: 2012-07-25 14:19:30.000000000 +01:00
type: post
published: true
status: publish
categories:
- Programming
tags:
- javascript
meta:
  _edit_last: '1907066'
  tagazine-media: a:7:{s:7:"primary";s:0:"";s:6:"images";a:0:{}s:6:"videos";a:0:{}s:11:"image_count";i:0;s:6:"author";s:7:"1907066";s:7:"blog_id";s:7:"1833431";s:9:"mod_stamp";s:19:"2012-07-25
    14:19:30";}
  _oembed_d654be883355e4e181dd1447fc30b022: "{{unknown}}"
  _oembed_a4fe2039c324098ab14bbd1cad5981e6: "{{unknown}}"
author:
  login: simplelifeuk
  email: andrew.chaa@yahoo.co.uk
  display_name: Andy
  first_name: Andrew
  last_name: Chaa
---
<p>This post is to remind myself of mistakes I did or encountered with javascript.</p>
<h3>Do not use window.location.origin</h3>
<p>It is undefined in Firefox currently (ver. 14.0.1). Instead, use window.location.protocol + '//' + window.location.host</p>
<p>from <a href="http://stackoverflow.com/questions/5375788/jquery-load-responds-with-error-under-firefox-works-fine-under-chrome">http://stackoverflow.com/questions/5375788/jquery-load-responds-with-error-under-firefox-works-fine-under-chrome</a></p>
<p>to be continued...</p>
