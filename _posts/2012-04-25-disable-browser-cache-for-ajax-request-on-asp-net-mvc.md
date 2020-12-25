---
title: Disable browser cache for ajax request on ASP.NET MVC
date: 2012-04-25 15:14:34.000000000 +01:00
categories:
- Programming
tags:
- ajax
- ASP.Net MVC
- attribute
- cache
- jquery
meta:
  _edit_last: '1907066'
  tagazine-media: a:7:{s:7:"primary";s:0:"";s:6:"images";a:0:{}s:6:"videos";a:0:{}s:11:"image_count";s:1:"0";s:6:"author";s:7:"1907066";s:7:"blog_id";s:7:"1833431";s:9:"mod_stamp";s:19:"2012-04-25
    15:14:34";}
  _wpas_done_linkedin: '1'
  publicize_results: a:1:{s:7:"twitter";a:1:{i:111615627;a:2:{s:7:"user_id";s:10:"andrewchaa";s:7:"post_id";s:18:"195168936009019392";}}}
  _wpas_done_twitter: '1'
---
<p>The application reloads the list of jobs, if any job is reposted or expired. We display different labels, such as "reposted", "expired", depending on the action. It worked well with browsers but IE 8.</p>
<p>Simply, IE was cacheing the part of html. Though we request the partial view by post.</p>
<p>[sourcecode language="javascript"]<br />
update: function () {<br />
    $.ajax({<br />
        type: &quot;GET&quot;,<br />
        url: &quot;MJobsB?p=&quot; + list.cPg(),<br />
        contentType: &quot;text/html; charset=utf-8&quot;,<br />
        dataType: &quot;html&quot;,<br />
        success: function (data) {<br />
            $('#ct #cnt').html(data);<br />
        },<br />
        error: function () { alert(&quot;Error Loading Jobs&quot;); }<br />
    });<br />
},<br />
[/sourcecode]</p>
<p>So, we brought in <a href="http://stackoverflow.com/a/1705113/437961">NoCache</a> attribute. And made the action not cached on IE. We made it with attribute, as we want to cache other stuff, especially images.</p>
<p>This is NoCache attribute.</p>
<p>[sourcecode language="csharp"]<br />
public class NoCacheAttribute : ActionFilterAttribute<br />
{<br />
    public override void OnResultExecuting(ResultExecutingContext filterContext)<br />
    {<br />
        filterContext.HttpContext.Response.Cache.SetExpires(DateTime.UtcNow.AddDays(-1));<br />
        filterContext.HttpContext.Response.Cache.SetValidUntilExpires(false);<br />
        filterContext.HttpContext.Response.Cache.SetRevalidation(HttpCacheRevalidation.AllCaches);<br />
        filterContext.HttpContext.Response.Cache.SetCacheability(HttpCacheability.NoCache);<br />
        filterContext.HttpContext.Response.Cache.SetNoStore();</p>
<p>        base.OnResultExecuting(filterContext);<br />
    }<br />
}<br />
[/sourcecode]</p>
<p>On controller, you just add the attribute.<br />
[sourcecode language="csharp"]<br />
[NoCache]<br />
[HttpGet]<br />
public ActionResult MJobsB(int cId, int? pg)<br />
{<br />
    return RenderJobListIn(&quot;_MJobsB&quot;, cId, Mode.List, pg, false);<br />
}<br />
[/sourcecode]</p>
