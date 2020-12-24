---
layout: post
title: cookie에 관하여 (in asp.net terms)
date: 2007-10-22 11:17:54.000000000 +01:00
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
<p>cookier 쓰기</p>
<pre>
HttpCookie cookie = HttpContext.Current.Request.Cookies[settings.cookieName];
if (cookie == null)
{
    cookie = new HttpCookie(settings.cookieName, Guid.NewGuid().ToString());
    cookie.Expires = DateTime.Today.AddYears(1);
    Response.Cookies.Add(cookie);
}
</pre>
<p><span>In ASP.NET terms, a page receives a <code>CookieCollection</code> as a property of an <code>HttpRequest</code> object (usually <code>Request.Cookies</code>) and returns a <code>CookieCollection</code> of updates as a property of an <code>HttpResponse</code> object (usually <code>Response.Cookies</code>). from </span><a href="http://www.codeproject.com/aspnet/aspnetcookies.asp">On The Care and Handling of Cookies</a></p>
<p>Set cookier</p>
<p>HttpCookie cookie = new HttpCookie(Settings.CookieName, encryptedTicket);<br />
cookie.Expires = expiryDate;<br />
BasePage.Response.Cookies.Add(cookie);</p>
<p>public static void RemoveCookie(Page page)<br />
{<br />
//Remove cookie if present<br />
HttpCookie cookie = page.Request.Cookies[Settings.CookieName];<br />
if (cookie != null)<br />
{<br />
HttpCookie expiredCookie = new HttpCookie(Settings.CookieName, "");<br />
expiredCookie.Expires = DateTime.Today.AddYears(-1);<br />
page.Response.Cookies.Add(expiredCookie);<br />
}<br />
}</p>
<p>참고자료들</p>
<ul>
<li><a href="http://msdn2.microsoft.com/en-us/library/system.web.httpcookie.aspx">HttpCookie Class</a></li>
</ul>
