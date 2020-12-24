---
layout: post
title: Open sublime text 2 from command line on windows
date: 2012-07-17 21:29:26.000000000 +01:00
type: post
published: true
status: publish
categories:
- Programming
tags:
- powershell
- sublime text 2
meta:
  _edit_last: '1907066'
  tagazine-media: a:7:{s:7:"primary";s:0:"";s:6:"images";a:0:{}s:6:"videos";a:0:{}s:11:"image_count";s:1:"0";s:6:"author";s:7:"1907066";s:7:"blog_id";s:7:"1833431";s:9:"mod_stamp";s:19:"2012-07-17
    21:29:26";}
  _wpas_skip_twitter: '1'
  _wpas_skip_linkedin: '1'
  _oembed_52bf44ab6c231574936100cec6f8fb9e: "{{unknown}}"
  _oembed_834206a5a02439a66e45222454c5484a: "{{unknown}}"
author:
  login: simplelifeuk
  email: andrew.chaa@yahoo.co.uk
  display_name: Andy
  first_name: Andrew
  last_name: Chaa
---
<p>In Mac, you can open sublime text 2 from terminal, and it’s really handy.</p>
<p>I wanted to replicate the same thing on windows, so wrote a simple script that enables it.<br />
Once you run this script, you can do the following things from command line.</p>
<p>subl       // this will open sublime text 2<br />
subl .     // open sublime text 2 with folder side bar. </p>
<p>For example, if you do it in c:\dev\trunk, sublime text will open with folder that is based on c:\dev\trunk.</p>
<p>To run the script, copy the below, and in the <strong>command prompt</strong> (not powershell prompt), right click and paste it. You must have powershell installed if you are not on windows 7 or Vista</p>
<p>[sourcecode language="bash"] </p>
<p>REM Begin Copy<br />
powershell<br />
Set-Content &quot;C:\Program Files\Sublime Text 2\subl.bat&quot; &quot;@echo off&quot;<br />
Add-Content &quot;C:\Program Files\Sublime Text 2\subl.bat&quot; &quot;start sublime_text.exe %1&quot;<br />
if (!($Env:Path.Contains(&quot;Sublime&quot;))) {[System.Environment]::SetEnvironmentVariable(&quot;PATH&quot;, $Env:Path + &quot;;C:\Program Files\Sublime Text 2&quot;, &quot;Machine&quot;)}<br />
exit<br />
REM End Copy</p>
<p>[/sourcecode]</p>
<p>You will have to close the command prompt as the path change would take effect when a new command prompt starts. </p>
