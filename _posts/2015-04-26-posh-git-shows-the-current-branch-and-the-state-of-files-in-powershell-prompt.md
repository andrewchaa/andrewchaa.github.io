---
title: Posh Git shows the current branch and the state of files in powershell prompt
date: 2015-04-26 11:01:49.000000000 +01:00
type: post
published: true
status: publish
categories:
- Programming
tags:
- git
- posh git
meta:
  sharing_disabled: '1'
  _rest_api_published: '1'
  _rest_api_client_id: "-1"
  publicize_twitter_user: andrewchaa
  publicize_twitter_url: http://t.co/kxwD1FQ8qY
  _wpas_done_1752093: '1'
  _publicize_done_external: a:1:{s:7:"twitter";a:1:{i:111615627;b:1;}}
  _oembed_66792280e15d726bac501eb2707787f9: "{{unknown}}"
author:
  login: simplelifeuk
  email: andrew.chaa@yahoo.co.uk
  display_name: Andy
  first_name: Andrew
  last_name: Chaa
---
<p>It's a set of PowerShell scripts that gives Git integration in PowerShell prompt.</p>
<p><a href="https://github.com/dahlbyk/posh-git">https://github.com/dahlbyk/posh-git</a></p>
<p>The first thing you notice once you install it, is that it can show the current branch and the state of files, additions, modifications, and deletions within.</p>
<p>Another nice feature is tab completion.</p>
<p>For example,</p>
<pre>git ch&lt;tab&gt; --&gt; git checkout</pre>
<p>You can install it via PsGet</p>
<pre>Install-Module posh-git</pre>
