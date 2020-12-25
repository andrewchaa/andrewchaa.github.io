---
title: rake basics
date: 2012-04-22 11:06:05.000000000 +01:00
type: post
published: true
status: publish
categories:
- Programming
tags:
- basics
- rails tutorial
- rake
meta:
  _edit_last: '1907066'
  _wpas_done_linkedin: '1'
  publicize_results: a:1:{s:7:"twitter";a:1:{i:111615627;a:2:{s:7:"user_id";s:10:"andrewchaa";s:7:"post_id";s:18:"194019246865522688";}}}
  _wpas_done_twitter: '1'
  tagazine-media: a:7:{s:7:"primary";s:0:"";s:6:"images";a:0:{}s:6:"videos";a:0:{}s:11:"image_count";s:1:"0";s:6:"author";s:7:"1907066";s:7:"blog_id";s:7:"1833431";s:9:"mod_stamp";s:19:"2012-04-22
    15:28:15";}
author:
  login: simplelifeuk
  email: andrew.chaa@yahoo.co.uk
  display_name: Andy
  first_name: Andrew
  last_name: Chaa
---
<p>Rake is ruby make, a make-like language in ruby. <a href="http://en.wikipedia.org/wiki/Make_(software)">make</a> has been used to build code in linux &amp; unit environment.</p>
<p>[sourcecode language="bash"]<br />
$ bundle exec rake db:migrate<br />
[/sourcecode]</p>
<p>This execute migrate db scripts. Use bundle exec, to run the version of rake in your gem file.</p>
<p>[sourcecode language="bash"]<br />
$ bundle exec rake -T db<br />
$ bundle exec rake -T<br />
[/sourcecode]</p>
<div>You can see rake commands.</div>
