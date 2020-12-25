---
title: Specify .net version for COM+ components (dllhost.exe)
date: 2008-11-17 11:07:51.000000000 +00:00
type: post
published: true
status: publish
categories:
- Programming
tags:
- c# COM+
meta:
  _edit_last: '1907066'
author:
  login: simplelifeuk
  email: andrew.chaa@yahoo.co.uk
  display_name: Andy
  first_name: Andrew
  last_name: Chaa
---
<p>Last Thursday (13/11/2008), I reinstalled Visual Studio 2008 and sudeenly, all data access layer components which were COM+ did not work. WIth the help of other developers, the issue was tracked down that they were loaded into .Net framework 2.0. They were written in .Net 1.1 and should run in 1.1 context though. For some reason, COM+ components were loading into .Net 2.0 by default. <a href="http://technet.microsoft.com/en-us/sysinternals/bb896642.aspx">SysteInternal's FileMon</a> was really handy in tracking down this issue.</p>
<p>We asked google about fixing .Net version for COM+ and there was a post about it. It was a short writing but has everything I need.</p>
<p><a href="http://www.dalun.com/blogs/02.14.2007.htm">.Net: Run .Net 1.1 COM+ Serviced Components Under .Net 2.0 Framework</a></p>
<p>I created a config file for dllhost.exe<br />
The content of the file is like this.</p>
<p>[sourcecode language='xml']<br />
<?xml version="1.0"?><br />
<configuration><br />
    <startup><br />
        <requiredruntime version="v1.1.4322" safemode="true" /><br />
        <supportedruntime version="v1.1.4322" safemode="true" /><br />
     </startup><br />
</configuration><br />
[/sourcecode]</p>
<p>And all .Net COM+ components started working again like a magic! Hope this helps to anyone who read this post.</p>
