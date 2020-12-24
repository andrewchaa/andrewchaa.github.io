---
layout: post
title: '"the file cannot be accessed by the system" after deleting windows home server'
date: 2009-05-10 19:35:00.000000000 +01:00
type: post
published: true
status: publish
categories:
- PC
tags:
- Windows Home Server
meta:
  _edit_last: '1907066'
  _oembed_6a15941574b8f551bc21a867f917f779: "{{unknown}}"
  _oembed_bde3cf5a820e06588d80c333f4a1f385: "{{unknown}}"
author:
  login: simplelifeuk
  email: andrew.chaa@yahoo.co.uk
  display_name: Andy
  first_name: Andrew
  last_name: Chaa
---
<p>Honestly I panicked when I tried to open a text file and found that I could not open the file nor copy it. I installed Windows Home Server. I liked the simple interface and enjoyed the straightforward backup. I deleted and installed Windows XP, because my HP Deskjet 1560 did not have its driver for windows server.</p>
<p>Then the problem appeared. As Windows Home Server does it, all my data files were on D:\ drive. When the XP installation finished, I tried to open a text file. I had an error messsage saying "the file cannot be accessed by the system." First, I thought, ah it must be something with NTFS ACL. I managed to find <a href="http://support.microsoft.com/kb/825751">xcacls.vbs</a> which shows NTFS ACL permission. It was ok. "Builtin\Administrators" had "Full Control" permission on the file. I googled the error message, and <a href="http://support.microsoft.com/kb/262320">http://support.microsoft.com/kb/262320</a> said I have to install "Remote Storage Database" back. Probably, it was true partly, and WHS seems to use it underneath. But I couldn't install WHS back, because WHS deletes all data on disk on installation. I googled again, adding "Home Server" to the error message. And at last, <a href="http://social.microsoft.com/Forums/en-US/whssoftware/thread/8b39a91b-8a9d-47d9-ae83-3d9427e3bf45">a social MSDN post</a> gave me a very simple solution. It seems that there was a guy who panicked like me.</p>
<p>The solution is to find the hidden /DE folder on your disk and copoy from it. Please visit the link and read the post. A guy called "bruber" really explained it very professionally.</p>
<ul>
<li><a href="http://social.microsoft.com/Forums/en-US/whssoftware/thread/8b39a91b-8a9d-47d9-ae83-3d9427e3bf45">The file can not be accessed by the system " Nightmare on 400 GB of data and backups</a></li>
</ul>
<p>I think Windows Home Server is a very good idea, but if it is intended to be used at home, I believe it should handle driver issues. Many cheap peripheral devices for PC usually do not provide drivers for server windows.</p>
