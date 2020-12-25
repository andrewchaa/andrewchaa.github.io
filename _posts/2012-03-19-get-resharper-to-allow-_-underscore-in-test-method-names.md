---
title: Get ReSharper To Allow _ Underscore in Test Method Names
date: 2012-03-19 09:10:32.000000000 +00:00
type: post
published: true
status: publish
categories: []
tags:
- c#
- Resharper
- Unit Test
meta:
  _edit_last: '1907066'
  _wpas_done_linkedin: '1'
  publicize_results: a:1:{s:7:"twitter";a:1:{i:111615627;a:2:{s:7:"user_id";s:10:"andrewchaa";s:7:"post_id";s:18:"181668981302767616";}}}
  _wpas_done_twitter: '1'
  _oembed_111a2e0ac7941f3860c587fba0fa7538: "{{unknown}}"
  _oembed_cbb84a2ce296ae3273c216afed2fefe1: "{{unknown}}"
author:
  login: simplelifeuk
  email: andrew.chaa@yahoo.co.uk
  display_name: Andy
  first_name: Andrew
  last_name: Chaa
---
<p>ReSharper usually doesn’t like it, but you can turn off the inspection for test methods.</p>
<p><a href="http://atombrenner.blogspot.co.uk/2010/07/how-to-change-resharper-naming-style.html">http://atombrenner.blogspot.co.uk/2010/07/how-to-change-resharper-naming-style.html</a></p>
<p>Then you can do something like this.</p>
<p>[sourcecode language="csharp"]</p>
<p>[TestFixture]<br />
public class RegularExpressionExample<br />
{<br />
 [Test]<br />
 public void Regex_Can_Have_Name()<br />
 {</p>
<p> }<br />
}</p>
<p>[/sourcecode]</p>
