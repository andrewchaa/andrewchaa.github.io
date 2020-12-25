---
title: Undo git add before the first commit
date: 2012-03-09 18:46:05.000000000 +00:00
type: post
published: true
status: publish
categories: []
tags:
- git
meta:
  _edit_last: '1907066'
  _wpas_done_linkedin: '1'
  publicize_results: a:1:{s:7:"twitter";a:1:{i:111615627;a:2:{s:7:"user_id";s:10:"andrewchaa";s:7:"post_id";s:18:"178189944492273665";}}}
  _wpas_done_twitter: '1'
  _oembed_a78dfb37b4b024fb389bc7da87de172e: "{{unknown}}"
  _oembed_c1d15a8e7d60542df43f27655171668f: "{{unknown}}"
  _oembed_bb7ba4d98c3280b3a222c9f2a22a02d5: "{{unknown}}"
  _oembed_7d4581c99b455d17c4b06525e9af6f27: "{{unknown}}"
author:
  login: simplelifeuk
  email: andrew.chaa@yahoo.co.uk
  display_name: Andy
  first_name: Andrew
  last_name: Chaa
---
<p>As git newbie, this was very tricky but it happens quite often.</p>
<p>You create a new project, say C# project. In case of rails, when you create a new project, it automatically creates .gitignore, but Visual Studio doesn't. You do "git add . " and suddenly you realise you staged so many unnecessary files like resharper cache, dlls, etc.</p>
<p>You don't have any branch yet, as you din't make the first commit. You can't do "git reset ."</p>
<p>Anyway, to make a long story short, you have to</p>
<p>[sourcecode language="bash"]<br />
git rm -r --cached .<br />
[/sourcecode]</p>
<p>&nbsp;</p>
<p>If you want to have more detailed version of a similar story, go to <a href="http://stackoverflow.com/a/682343/437961">http://stackoverflow.com/a/682343/437961</a></p>
