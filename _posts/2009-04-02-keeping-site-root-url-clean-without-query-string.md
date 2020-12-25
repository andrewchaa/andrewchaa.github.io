---
title: Keeping site root url clean without query string
date: 2009-04-02 10:30:34.000000000 +01:00
type: post
published: true
status: publish
categories:
- Programming
tags:
- asp.net
- reflection
meta:
  _edit_last: '1907066'
author:
  login: simplelifeuk
  email: andrew.chaa@yahoo.co.uk
  display_name: Andy
  first_name: Andrew
  last_name: Chaa
---
<p>References</p>
<ul>
<li><a href="http://msdn.microsoft.com/en-us/library/ms178194.aspx">ASP.Net Cookies Overview</a></li>
<li><a href="http://it.toolbox.com/blogs/coding-dotnet/adding-parameters-to-query-string-at-run-time-19394">Adding parameters to query string at run time</a></li>
<li><a href="http://msdn.microsoft.com/en-us/library/system.reflection.bindingflags.aspx">Reflection Binding Flags Enumeration</a></li>
<li><a href="http://www.red-gate.com/products/reflector/">.Net reflector</a></li>
</ul>
<p>SEO is becoming more and more important issue these days, and your site root url can lose its SEO rank if there are too many different query string attached such as www.yoursite.com/?a=b&amp;b=c and www.yoursite.com/default.aspx?wt=129. It will be nice you can keep the site root clean lik www.yoursite.com</p>
<p>My company employed Scrum from this year and in March sprint, the above was one of the user stories I worked on.</p>
<p>The implementation logic is like this</p>
<ul>
<li>If the url has any query string, store query string values into cookie and redirect it to site root without query string.</li>
<li>If there is no query string, then check if cookie has any query string. If the cookie exists, then manually populate Request.QueryString object with the values from cookie.</li>
</ul>
<p>One tricky bit is Request.QueryString is read only property. So you need to find a private value that the property uses inside. I could do that using .Net reflector and it is _queryString. Using Reflection, you can set the value of a private variable.</p>
<p>The followings are the codes I wrote for this. Of course, I could not write this without the help from the above links.</p>
<p>[sourcecode language='c#']</p>
<p>        protected override void OnInit(EventArgs e)<br />
        {<br />
            if (!IsPostBack)<br />
            {<br />
                if (Request.QueryString.Count > 0)<br />
                    RedirectToCleanSiteRootUrl();</p>
<p>                if(Request.Cookies["QS"]!= null)<br />
                    PopulateQueryStringFromCookie();<br />
            }</p>
<p>            base.OnInit (e);<br />
        }</p>
<p>        private void RedirectToCleanSiteRootUrl()<br />
        {<br />
            HttpCookie cookie = new HttpCookie("QS");<br />
            foreach (string key in Request.QueryString.AllKeys)<br />
            {<br />
                cookie.Values[key] = Request.QueryString[key];<br />
                cookie.Expires = DateTime.Now.AddDays(1d);<br />
            }<br />
            Response.Cookies.Add(cookie);</p>
<p>            PageUtility.RedirectPermanent("/");<br />
        }</p>
<p>        private void PopulateQueryStringFromCookie()<br />
        {<br />
            NameValueCollection collection = (NameValueCollection) Request.GetType().GetField("_queryString",<br />
                BindingFlags.NonPublic | BindingFlags.Instance).GetValue(Request);<br />
            PropertyInfo readOnlyInfo = collection.GetType().GetProperty("IsReadOnly",<br />
                BindingFlags.NonPublic | BindingFlags.Instance);<br />
            readOnlyInfo.SetValue(collection,false,null);</p>
<p>            collection.Add(Request.Cookies["QS"].Values);<br />
            Response.Cookies["QS"].Expires = DateTime.Now.AddDays(-1d);<br />
        }</p>
<p>[/sourcecode]</p>
