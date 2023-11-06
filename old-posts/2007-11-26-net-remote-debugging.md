---
title: ".Net Remote Debugging"
date: 2007-11-26 11:05:56.000000000 +00:00
categories: []
tags: []
---
<p>Often, you want to debug appliactions on test server. Well, I can't say "debug production server", because it will disrupt the production service. But at least, often, you want to debug your deployed code on test server and the test server has the almost the same environment.</p>
<p>Files that are needed</p>
<ul>
<li>msvcmon.exe: C:\Program Files\Microsoft Visual Studio .NET 2003\Common7\Packages\Debugger</li>
<li>natdbgtlnet.dll: C:\Program Files\Microsoft Visual Studio .NET 2003\Common7\Packages\Debugger</li>
<li>NatDbgDM.dll: C:\Program Files\Microsoft Visual Studio .NET 2003\Common7\Packages\Debugger</li>
<li>msvcr71.dll: C:\Program Files\Microsoft Visual Studio .NET 2003\Common7\IDE</li>
</ul>
<p>Well, the above files are only for native code debugging. How can I use .Net debugging across domain. ... I need to investigate more.</p>
