---
layout: post
title: running sublime text 2 on ubuntu
date: 2012-04-23 14:42:54.000000000 +01:00
type: post
published: true
status: publish
categories: []
tags:
- sublime
- sublime text 2
- ubuntu
meta:
  _edit_last: '1907066'
  _wpas_done_linkedin: '1'
  publicize_results: a:1:{s:7:"twitter";a:1:{i:111615627;a:2:{s:7:"user_id";s:10:"andrewchaa";s:7:"post_id";s:18:"194436210670841856";}}}
  _wpas_done_twitter: '1'
author:
  login: simplelifeuk
  email: andrew.chaa@yahoo.co.uk
  display_name: Andy
  first_name: Andrew
  last_name: Chaa
---
<p>You can download <a href="http://www.sublimetext.com/2">sublime text 2</a>.</p>
<p>I created a directory, "Applications" under Home. I extracted the downloaded tar in there. Then I did "Make Link" of sublime_text executable and put it into /home/bin, where $Path includes. I renamed the shortcut (excuse my windows terminology) to "subl", so I can just type "subl ." to launch the editor.</p>
<p>"Unable to locate theme engine in module_path: "pixmap""<br />
I run the editor and get this error.</p>
<p>[sourcecode language="bash"]<br />
sudo apt-get install gtk2-engines-pixbuf<br />
[/sourcecode]</p>
<p>Once you install gtk2..., the error will go away.</p>
