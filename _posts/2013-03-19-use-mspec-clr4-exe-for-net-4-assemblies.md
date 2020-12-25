---
title: Use mspec-clr4.exe for .NET 4 assemblies
date: 2013-03-19 14:42:57.000000000 +00:00
type: post
published: true
status: publish
categories:
- Programming
tags:
- MSpec
meta:
  _edit_last: '1907066'
  publicize_reach: a:2:{s:7:"twitter";a:1:{i:1752093;i:166;}s:2:"wp";a:1:{i:0;i:7;}}
  publicize_twitter_user: andrewchaa
  _wpas_done_1752093: '1'
  _publicize_done_external: a:1:{s:7:"twitter";a:1:{i:111615627;b:1;}}
  tagazine-media: a:7:{s:7:"primary";s:0:"";s:6:"images";a:0:{}s:6:"videos";a:0:{}s:11:"image_count";i:0;s:6:"author";s:7:"1907066";s:7:"blog_id";s:7:"1833431";s:9:"mod_stamp";s:19:"2013-03-19
    14:42:57";}
author:
  login: simplelifeuk
  email: andrew.chaa@yahoo.co.uk
  display_name: Andy
  first_name: Andrew
  last_name: Chaa
---
<p>Otherwise, you get an error like</p>
<blockquote><p>19/03/2013 14:31:39: An Error Occurred:<br />
Exec: Error executing command &amp; $mspecPath @(dir "$buildFolder\*Tests*\*Tests*.dll") .<br />
At D:\dev\Shared\Jwt\src\packages\psake.4.2.0.1\tools\psake.psm1:139 char:14<br />
+ throw &lt;&lt;&lt;&lt; ("Exec: " + $errorMessage)<br />
+ CategoryInfo : OperationStopped: (Exec: Error exe...*Tests*.dll") .:String) [], RuntimeException<br />
+ FullyQualifiedErrorId : Exec: Error executing command &amp; $mspecPath @(dir "$buildFolder\*Tests*\*Tests*.dll") .</p></blockquote>
<p>The error is slightly misleading as it's saying the problem is your powershell doesn't have .net 4 loaded.</p>
<p>It's true that Powershell 2 loads .NET 3.5 and doesn't support .NET 4, but as mspec.exe is just a executable, it should't be affected. So, use mspec-clr4, rather than mspec, if your test assemblies are built in .NET 4.</p>
<p>I've changed the $mspecPath.</p>
<p>[sourcecode language="powershell"]<br />
$mspecPath = &quot;$baseDir\src\packages\Machine.Specifications.0.5.12\tools\mspec-clr4.exe&quot;<br />
[/sourcecode]</p>
