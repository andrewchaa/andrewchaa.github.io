---
layout: post
title: My favourite helpers for ASP.NET MVC
date: 2011-04-14 21:35:06.000000000 +01:00
type: post
published: true
status: publish
categories:
- Programming
tags:
- ASP.Net MVC
- Html Helper
meta:
  _edit_last: '1907066'
  _wp_old_slug: html-image-custom-html-helper-for-img-tag
  _wpas_skip_twitter: '1'
author:
  login: simplelifeuk
  email: andrew.chaa@yahoo.co.uk
  display_name: Andy
  first_name: Andrew
  last_name: Chaa
---
<p>As you use ASP.NET MVC on and on, you start building and using handy html helpers. Rob Conery posted a few of his helpers on <a href="http://blog.wekeroad.com/2010/01/20/my-favorite-helpers-for-aspnet-mvc">his blog</a>. You can find some more in his ASP.NET MVC source code. Inspired by his helpers, here I post mine.</p>
<h3>1. Html.Image</h3>
<p>Depending on the environment, the absolute url of an image can change. For example, on the dev machine, it is http://localhost:3107/content/images/cancel.gif. On Integration server, if the server host multiple applications under root with the same port numer, 80, the image path can be like http://intserver/app1/content/images/cancel.gif. In this case, the image would not be rendered. SiteRoot is Rob Conery's helper.</p>
<p>To avoid the situation like the above, I reference image suing SiteRoot functionality.</p>
<p>[sourcecode language="csharp"]<br />
public static string Image(this HtmlHelper helper, string imageName, string altText)<br />
{<br />
    var builder = new TagBuilder(&quot;img&quot;);<br />
    builder.MergeAttribute(&quot;src&quot;,<br />
        UrlHelpers.SiteRoot(helper.ViewContext.HttpContext) + &quot;/content/images/&quot; + imageName);<br />
    builder.MergeAttribute(&quot;alt&quot;, altText);</p>
<p>    return builder.ToString(TagRenderMode.SelfClosing);<br />
}<br />
[/sourcecode]</p>
<h3></h3>
<h3>2. Html.ClientIdFor</h3>
<p>In MVC, you pass viewmodel to View. I often refactor the viewmodel and the change involve property name. When you change a property name of a viewmodel, all server side code like Html.TextBoxFor(m =&gt; m.Input.Firstname" change accordingly, but you have to manually change javascript code.</p>
<p>For example,</p>
<p>[sourcecode language="javascript"]<br />
$('#Input_Firstname').change(resetRate);<br />
[/sourcecode]</p>
<p>You would have to change the id manually. I thought it would be nice to specify clientId with server-side code, and I was not alone. There were guys with <a href="http://stackoverflow.com/questions/5418898/get-the-generated-clientid-for-a-form-field">the same idea</a>. The following is the code for ClientIdFor and I got the code from <a href="http://stackoverflow.com/users/66873/john-landheer">John Landheer</a>'s <a href="http://stackoverflow.com/questions/5418898/get-the-generated-clientid-for-a-form-field">answer on stackoverflow</a>.</p>
<p>[sourcecode language="csharp"]<br />
public static MvcHtmlString ClientIdFor&lt;TModel, TProperty&gt;(this HtmlHelper&lt;TModel&gt; helper, Expression&lt;Func&lt;TModel, TProperty&gt;&gt; expression)<br />
{<br />
    return<br />
        MvcHtmlString.Create(<br />
            helper.ViewContext.ViewData.TemplateInfo.GetFullHtmlFieldId(<br />
                ExpressionHelper.GetExpressionText(expression)));<br />
}<br />
[/sourcecode]</p>
<h3></h3>
<h3>3. Script</h3>
<p>This writes javascript include statement.</p>
<p>[sourcecode language="csharp"]<br />
public static string Script(this HtmlHelper helper, string fileName)<br />
{<br />
    if (!fileName.EndsWith(&quot;.js&quot;))<br />
        fileName += &quot;.js&quot;;</p>
<p>    return string.Format(&quot;&lt;script src='{0}/{1}/{2}/{3}' type='text/javascript' &gt;&lt;/script&gt;\n&quot;,<br />
        helper.SiteRoot(), PUBDIR, SCRIPTDIR, helper.AttributeEncode(fileName));<br />
}</p>
<p>public static string ScriptIe(this HtmlHelper helper, string fileName)<br />
{<br />
    if (!fileName.EndsWith(&quot;.js&quot;))<br />
        fileName += &quot;.js&quot;;</p>
<p>    return string.Format(&quot;&lt;!--[if lt IE 7]&gt;\n&lt;script src='{0}/{1}/{2}/{3}' defer type='text/javascript' &gt;&lt;/script&gt;\n&lt;![endif]--&gt;&quot;,<br />
        helper.SiteRoot(), PUBDIR, SCRIPTDIR, helper.AttributeEncode(fileName));<br />
}<br />
[/sourcecode]</p>
<p>-- To be continued --</p>
