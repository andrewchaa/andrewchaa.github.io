---
title: rails validation basics
date: 2012-04-22 11:38:36.000000000 +01:00
type: post
published: true
status: publish
categories: []
tags:
- basics
- rails
- rails tutorial
- validation
meta:
  publicize_results: a:1:{s:7:"twitter";a:1:{i:111615627;a:2:{s:7:"user_id";s:10:"andrewchaa";s:7:"post_id";s:18:"194027429633867776";}}}
  _wpas_done_linkedin: '1'
  _edit_last: '1907066'
  _wpas_done_twitter: '1'
author:
  login: simplelifeuk
  email: andrew.chaa@yahoo.co.uk
  display_name: Andy
  first_name: Andrew
  last_name: Chaa
---
<p>Probably the easiest one, :length. You can give :maximum length.</p>
<p>[sourcecode language="rails"]<br />
class Micropost &lt; ActiveRecord::Base<br />
  attr_accessible :content, :user_id<br />
  validates :content, :length =&gt; { :maximum =&gt; 140 }<br />
end<br />
[/sourcecode]</p>
