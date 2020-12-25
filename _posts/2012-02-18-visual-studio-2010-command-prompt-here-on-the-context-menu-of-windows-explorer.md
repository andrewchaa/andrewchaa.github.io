---
title: Visual Studio 2010 Command Prompt Here On the Context Menu of Windows Explorer
date: 2012-02-18 22:08:31.000000000 +00:00
type: post
published: true
status: publish
categories:
- Programming
tags:
- command prompt
- explorer context menu
- pushd
- registry
- shell
- visual studio
meta:
  _edit_last: '1907066'
  tagazine-media: a:7:{s:7:"primary";s:0:"";s:6:"images";a:0:{}s:6:"videos";a:0:{}s:11:"image_count";s:1:"0";s:6:"author";s:7:"1907066";s:7:"blog_id";s:7:"1833431";s:9:"mod_stamp";s:19:"2012-02-18
    22:08:31";}
  _wpas_done_linkedin: '1'
  publicize_results: a:1:{s:7:"twitter";a:1:{i:111615627;a:2:{s:7:"user_id";s:10:"andrewchaa";s:7:"post_id";s:18:"170993148888236032";}}}
  _wpas_done_twitter: '1'
  _oembed_4180f4c42468873fa67cc5ac0219192b: "{{unknown}}"
  _oembed_1012d78d25902d01c2f1729a5f94682d: "{{unknown}}"
  _oembed_1744cb559aa18f2e808c7713815d8cf8: "{{unknown}}"
  _oembed_5cc9a5f406c39ee9ac2702469b2e994d: "{{unknown}}"
  _oembed_ef92d5d99ed0e8db0776d481350dec04: "{{unknown}}"
  _oembed_9f16273e37f19aedf48251725baa5b08: "{{unknown}}"
  _oembed_21869b2b4694b1f265f30794afacfcb1: "{{unknown}}"
  _oembed_69480ec41188b2ba0662ae2ff180b7a8: "{{unknown}}"
author:
  login: simplelifeuk
  email: andrew.chaa@yahoo.co.uk
  display_name: Andy
  first_name: Andrew
  last_name: Chaa
---
<p>You use keyboards and command line more and more, as you get more experienced with the tools in development. If you install git on windows, it creates "Git bash here" context menu on Windows Explorer. It is really handy, and I like it. I believe Visual Studio installation should do the same.</p>
<p>Well, it doesn't, but you can create it, if you want, with the little manipulation of windows registry.</p>
<p>First, open regedit. Make sure you export the current settings as backup, as your mistake can paralyse your system.</p>
<p>Second, Create two registry keys to enable the context menu on Windows Explorer.</p>
<ul>
<li>HKEY_CLASSES_ROOT\Directory\shell\vs_cmd</li>
<li>HKEY_CLASSES_ROOT\Directory\shell\vs_cmd\command</li>
</ul>
<p>The values are like these</p>
<p><span style="text-decoration:underline;"><span style="color:#000000;text-decoration:underline;">HKEY_CLASSES_ROOT\Directory\shell\vs_cmd</span></span></p>
<ul>
<li>Name: (Default)</li>
<li>Type: REG_SZ</li>
<li>Data: Visual Studio 2010 Command Prompt Here</li>
</ul>
<div><span style="text-decoration:underline;">HKEY_CLASSES_ROOT\Directory\shell\vs_cmd\command</span></div>
<ul>
<li>Name: (Default)</li>
<li>Type: REG_SZ</li>
<li>Data: cmd.exe /s /k pushd "%V" &amp;&amp; "C:\Program Files (x86)\Microsoft Visual Studio 10.0\VC\vcvarsall.bat" x86</li>
</ul>
<p>Then go to windows explorer and right-click on any directory. You will see a menu "Visual Studio 2010 Command Prompt Here"</p>
<p>Let me explain what's happening here.</p>
<ul>
<li>"HKEY_CLASSES_ROOT\Directory\shell" is where you put settings for your windows shell.</li>
<li>cmd.exe is reachable from any directory, so you don't have to specify the full path to execute it.</li>
<li>/s means to strip quote characters from the command_line (<a href="http://ss64.com/nt/cmd.html">http://ss64.com/nt/cmd.html</a>)</li>
<li>/k means to carry out a command but the shell remains without closing.</li>
<li>pushd let you execute cmd.exe with a given directory (<a href="http://www.hanselman.com/blog/PUSHDReminderItAutomaticallyMapsNetworkDrives.aspx">http://www.hanselman.com/blog/PUSHDReminderItAutomaticallyMapsNetworkDrives.aspx</a>)</li>
<li>vcvarsall.bat is a batch file executed when you run visual studio command prompt.</li>
</ul>
<p>&nbsp;</p>
<p>I also referenced the below nice posts.</p>
<ul>
<li><a href="http://www.reversealchemy.net/blog/2008/11/26/adding-the-visual-studio-2008-command-prompt-to-your-explorer-context-menu/">http://www.reversealchemy.net/blog/2008/11/26/adding-the-visual-studio-2008-command-prompt-to-your-explorer-context-menu/</a></li>
<li><a href="http://www.alteridem.net/2010/09/02/visual-studio-2010-command-prompt-here/">http://www.alteridem.net/2010/09/02/visual-studio-2010-command-prompt-here/</a></li>
</ul>
<p>but eventually, I used git's "bash shell here" registry settings.</p>
<p>&nbsp;</p>
