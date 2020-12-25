---
title: rails generate basics
date: 2012-04-22 18:57:27.000000000 +01:00
type: post
published: true
status: publish
categories:
- Programming
tags:
- basics
- generate
- rails
meta:
  _edit_last: '1907066'
  _wpas_done_linkedin: '1'
  publicize_results: a:1:{s:7:"twitter";a:1:{i:111615627;a:2:{s:7:"user_id";s:10:"andrewchaa";s:7:"post_id";s:18:"194137861023469570";}}}
  _wpas_done_twitter: '1'
  tagazine-media: a:7:{s:7:"primary";s:0:"";s:6:"images";a:0:{}s:6:"videos";a:0:{}s:11:"image_count";s:1:"0";s:6:"author";s:7:"1907066";s:7:"blog_id";s:7:"1833431";s:9:"mod_stamp";s:19:"2012-04-22
    18:57:49";}
author:
  login: simplelifeuk
  email: andrew.chaa@yahoo.co.uk
  display_name: Andy
  first_name: Andrew
  last_name: Chaa
---
<p>create controller with help and home routes</p>
<p>[sourcecode language="bash"]<br />
$ rails generate controller StaticPages home help --no-test-framework<br />
[/sourcecode]</p>
<p>the option no-test-framework suppresses the default rspec test (or test::unit).</p>
<p>if you have created them by mistake, you can destroy them.</p>
<p>[sourcecode language="bash"]<br />
$ rails destroy controller StaticPages home help --no-test-framework<br />
[/sourcecode]</p>
<p>Creating a model is the same.</p>
<p>[sourcecode language="bash"]<br />
$ rails generate model Foo bar:string baz:integer<br />
$ rails destroy model Foo<br />
[/sourcecode]</p>
<h3>Errors</h3>
<p><b>Could not find a javascript runtime. </b><br />
Install <a href="https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager">node.js</a>. </p>
