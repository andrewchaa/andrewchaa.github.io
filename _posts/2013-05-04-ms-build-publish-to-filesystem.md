---
title: MS Build - Publish to FileSystem
date: 2013-05-04 12:47:57.000000000 +01:00
type: post
published: true
status: publish
categories:
- Programming
tags:
- build
- msbuild
- teamcity
meta:
  _edit_last: '1907066'
  publicize_reach: a:2:{s:7:"twitter";a:1:{i:1752093;i:166;}s:2:"wp";a:1:{i:0;i:7;}}
  publicize_twitter_user: andrewchaa
  _wpas_done_1752093: '1'
  _publicize_done_external: a:1:{s:7:"twitter";a:1:{i:111615627;b:1;}}
  tagazine-media: a:7:{s:7:"primary";s:0:"";s:6:"images";a:0:{}s:6:"videos";a:0:{}s:11:"image_count";i:0;s:6:"author";s:7:"1907066";s:7:"blog_id";s:7:"1833431";s:9:"mod_stamp";s:19:"2013-05-04
    12:47:57";}
author:
  login: simplelifeuk
  email: andrew.chaa@yahoo.co.uk
  display_name: Andy
  first_name: Andrew
  last_name: Chaa
---
<p>I'm working for a simple project and wanted to deploy it to the webserver in my church. I installed <a href="http://www.jetbrains.com/teamcity/">TeamCity</a> and set it up to pull the source code from github and build it.</p>
<p>The challenge was, unexpectedly, publish. Initially, I used MS Web Deploy. For some reason I couldn't figure out, it didn't work. Also, I had to install an extra service. So I went for a simple msbuild file system deploy.</p>
<p>[sourcecode language="powershell"]</p>
<p>msbuild .\WebDrive.csproj /t:Package<br />
    /p:_PackageTempDir=&quot;\\webserver\output&quot; /p:Configuration=&quot;Release&quot;</p>
<p>[/sourcecode]</p>
<p>On TeamCity, I added an additional build step and configure it like these</p>
<ul>
<li><span style="line-height:13px;">Runner type: MSBuild</span></li>
<li>Build file path: WebDrive/WebDriveWeb.csproj</li>
<li>Targets: Clean;Build;Publish</li>
<li>Command line parameters: /t:Package /p:_PackageTempDir="\\web\output" /p:Configuration="Release"</li>
</ul>
<p>Much simpler that web deployment.</p>
