---
layout: post
title: Team City Basics
date: 2012-08-06 13:15:12.000000000 +01:00
type: post
published: true
status: publish
categories:
- Programming
tags:
- teamcity
meta:
  _edit_last: '1907066'
  tagazine-media: a:7:{s:7:"primary";s:0:"";s:6:"images";a:0:{}s:6:"videos";a:0:{}s:11:"image_count";i:0;s:6:"author";s:7:"1907066";s:7:"blog_id";s:7:"1833431";s:9:"mod_stamp";s:19:"2012-08-06
    13:15:12";}
  _wpas_skip_twitter: '1'
  _wpas_skip_linkedin: '1'
author:
  login: simplelifeuk
  email: andrew.chaa@yahoo.co.uk
  display_name: Andy
  first_name: Andrew
  last_name: Chaa
---
<p>This post is about the way I use TeamCity and would not be completed for the time being.</p>
<h3>Checkout rules</h3>
<p>you make checkout path to map to different path. For example, ruby build scripts are used multiple places, and you can set it to be deployed to different directories depending on your build set up. Honestly, I don't understand this feature very well, but the way I use is</p>
<pre>
build =&gt; ruby
</pre>
<p>to be continued...</p>
