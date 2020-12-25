---
title: windows batch file tips
date: 2012-07-17 16:23:14.000000000 +01:00
type: post
published: true
status: publish
categories:
- Programming
tags:
- tips
- windows batch file
meta:
  _edit_last: '1907066'
  tagazine-media: a:7:{s:7:"primary";s:0:"";s:6:"images";a:0:{}s:6:"videos";a:0:{}s:11:"image_count";s:1:"0";s:6:"author";s:7:"1907066";s:7:"blog_id";s:7:"1833431";s:9:"mod_stamp";s:19:"2012-07-17
    16:23:14";}
  _wpas_skip_twitter: '1'
  _wpas_skip_linkedin: '1'
  _oembed_ed38b06a23cd87a496e36bb2931132d6: "{{unknown}}"
  _oembed_1d27a53c87830c40396dff812e928d25: "{{unknown}}"
author:
  login: simplelifeuk
  email: andrew.chaa@yahoo.co.uk
  display_name: Andy
  first_name: Andrew
  last_name: Chaa
---
<h3>using batch parameter</h3>
<ul>
<li><a href="http://www.microsoft.com/resources/documentation/windows/xp/all/proddocs/en-us/percent.mspx?mfr=true">comprehensive documentation</a></li>
</ul>
<p>[sourcecode language="bash"]<br />
@echo off<br />
sublime_text.exe %1<br />
[/sourcecode]</p>
<h3>hide output and output only the stuff you want to reveal</h3>
<p>from <a href="http://stackoverflow.com/questions/2044882/how-to-hide-batch-output">http://stackoverflow.com/questions/2044882/how-to-hide-batch-output</a></p>
<p>[sourcecode language="bash"]<br />
@echo off<br />
echo verbose stuff 1<br />
echo verbose stuff 2<br />
echo verbose stuff 3<br />
echo important stuff! &gt;&amp;2<br />
echo verbose stuff 4<br />
[/sourcecode]</p>
<h3>launch an exe file asynchronously</h3>
<p>By default, scripts run synchronously. What it means is that when you launch an exe file, the batch file doesn't go on running until you close the program, and it is quite annoying.</p>
<p>So, use "start" command to run steps asynchrounously.</p>
<p>[sourcecode language="bash"]<br />
start sublime_text.exe %1<br />
[/sourcecode]</p>
