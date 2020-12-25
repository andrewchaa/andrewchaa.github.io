---
title: having a cookie with sub-keys
date: 2007-11-13 14:46:00.000000000 +00:00
type: post
published: true
status: publish
categories: []
tags: []
meta: {}
author:
  login: simplelifeuk
  email: andrew.chaa@yahoo.co.uk
  display_name: Andy
  first_name: Andrew
  last_name: Chaa
---
<p>This is from <a href="http://msdn2.microsoft.com/en-us/library/ms178194.aspx">ASP.NET Cookies Overviewe</a></p>
<p>example</p>
<p style="border:1px ridge white;background-color:#ffffcc;font-family:Courier New;font-size:10pt;margin:10px;padding:10px;">HttpCookie cookie = HttpContext.Current.Request.Cookies[site.cookieName];<br />
<font color="blue">if</font> (cookie == <font color="blue">null</font>)<br />
{<br />
cookie = <font color="blue">new</font> HttpCookie(site.cookieName);<br />
cookie.Values["MId"] = Guid.NewGuid().ToString();<br />
cookie.Values["IsMId"] = <font color="blue">true</font>.ToString();<br />
cookie.Expires = DateTime.Today.AddYears(30);</p>
<p>Response.Cookies.Add(cookie);<br />
}</p>
