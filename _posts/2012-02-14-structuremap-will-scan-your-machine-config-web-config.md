---
layout: post
title: structuremap will scan your machine.config / web.config
date: 2012-02-14 15:03:21.000000000 +00:00
type: post
published: true
status: publish
categories: []
tags:
- StructureMap
meta:
  _edit_last: '1907066'
  _wpas_done_linkedin: '1'
  publicize_results: a:1:{s:7:"twitter";a:1:{i:111615627;a:2:{s:7:"user_id";s:10:"andrewchaa";s:7:"post_id";s:18:"169436580182896641";}}}
  _wpas_done_twitter: '1'
author:
  login: simplelifeuk
  email: andrew.chaa@yahoo.co.uk
  display_name: Andy
  first_name: Andrew
  last_name: Chaa
---
<p>It's not a security threat or concern. I don't mean <a href="http://structuremap.net/structuremap/">StructureMap</a> does any harm. As IoC container, StructureMap tries to do his job by searching for assemblies specified in your machine.config or web.config.</p>
<p>For example, it is a kind of legacy, but we specified our custom GAC assemblies in web.config in C:\Windows\Microsoft.NET\Framework64\v2.0.50727\CONFIG</p>
<p>[sourcecode language="xml"]<br />
&lt;compilation&gt;<br />
  &lt;assemblies&gt;<br />
	&lt;add assembly=&quot;mscorlib&quot;/&gt;<br />
	&lt;add assembly=&quot;System, Version=2.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089&quot;/&gt;<br />
	...<br />
	&lt;add assembly=&quot;Your.Custom.Assembly, Version=1.0.0.0, Culture=neutral, PublicKeyToken=c77a5H561934e089&quot;/&gt;<br />
	...<br />
[/sourcecode]</p>
<p>The problem is StructureMap can complain that it can't load the type while it is trying to find the matching instance. For example, we have the assembly on our dev machine and integration server, but not on the build box, and suddenly our functional tests start failing. Our functional tests do not use those dlls at all, and still StructureMap fail.</p>
<p>So beware of those naughty custom GAC assemblies, if you have any and put them in web.config or machine.config.</p>
