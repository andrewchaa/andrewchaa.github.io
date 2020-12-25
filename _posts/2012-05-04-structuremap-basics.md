---
title: Structuremap Basics
date: 2012-05-04 10:03:17.000000000 +01:00
type: post
published: true
status: publish
categories: []
tags:
- basics
- dependency injection
- StructureMap
meta:
  _edit_last: '1907066'
  _wpas_done_linkedin: '1'
  publicize_results: a:1:{s:7:"twitter";a:1:{i:111615627;a:2:{s:7:"user_id";s:10:"andrewchaa";s:7:"post_id";s:18:"198352095848570882";}}}
  _wpas_done_twitter: '1'
author:
  login: simplelifeuk
  email: andrew.chaa@yahoo.co.uk
  display_name: Andy
  first_name: Andrew
  last_name: Chaa
---
<p>Define the instance for your interface</p>
<p>[sourcecode language="csharp"]<br />
public class WiringModule<br />
{<br />
    public void Initialize(IInitializationExpression x)<br />
    {<br />
        x.For&lt;IJobPoster&gt;().Use&lt;JobPoster&gt;();<br />
    }<br />
}</p>
<p>[/sourcecode]</p>
<p>Call the wiring module within Application_Start() event in Global.asax.cs</p>
<p>[sourcecode language="csharp"]<br />
protected void Application_Start()<br />
{<br />
    ObjectFactory.Initialize(wiringModule.Initalize);<br />
}</p>
<p>[/sourcecode]</p>
<p>To be continued</p>
