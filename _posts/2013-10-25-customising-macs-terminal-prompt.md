---
layout: post
title: Customising Mac's terminal prompt
date: 2013-10-25 21:56:46.000000000 +01:00
type: post
published: true
status: publish
categories:
- Programming
tags:
- bash
- mac
meta:
  publicize_twitter_user: andrewchaa
  publicize_twitter_url: http://t.co/2y99tApv1j
  _wpas_done_1752093: '1'
  _publicize_done_external: a:1:{s:7:"twitter";a:1:{i:111615627;b:1;}}
  _edit_last: '1907066'
  _wpas_skip_1752093: '1'
author:
  login: simplelifeuk
  email: andrew.chaa@yahoo.co.uk
  display_name: Andy
  first_name: Andrew
  last_name: Chaa
---
<p>You can <a href="http://lifehacker.com/202042/ask-lifehacker--how-do-i-customize-my-command-line-prompt">colourise it</a>, if you want.</p>
<p>Open .bash_profile in your editor (I used sublime)</p>
<p>[sourcecode language="bash"]</p>
<p>sublime .bash_profile</p>
<p>[/sourcecode]</p>
<p>Add this line</p>
<p>[sourcecode language="bash"]</p>
<p>export PS1=&quot;\u@\h \w &quot;</p>
<p>[/sourcecode]</p>
<p>Each option means</p>
<p>\d – Current date<br />
\t – Current time<br />
\h – Host name<br />
\# – Command number<br />
\u – User name<br />
\W – Current working directory (ie: Desktop/)<br />
\w – Current working directory, full path (ie: /Users/Admin/Desktop)</p>
