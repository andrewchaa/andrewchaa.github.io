---
title: Skipping IIS Custom Error pages
date: 2013-06-26 15:14:01.000000000 +01:00
type: post
published: true
status: publish
categories:
- Programming
tags:
- asp.net
- IIS
meta:
  _edit_last: '1907066'
  publicize_reach: a:2:{s:7:"twitter";a:1:{i:1752093;i:174;}s:2:"wp";a:1:{i:0;i:10;}}
  publicize_twitter_user: andrewchaa
  _wpas_done_1752093: '1'
  _publicize_done_external: a:1:{s:7:"twitter";a:1:{i:111615627;b:1;}}
  tagazine-media: a:7:{s:7:"primary";s:73:"http://simplelifeuk.files.wordpress.com/2013/06/dumb_iis7_errror_page.jpg";s:6:"images";a:1:{s:73:"http://simplelifeuk.files.wordpress.com/2013/06/dumb_iis7_errror_page.jpg";a:6:{s:8:"file_url";s:73:"http://simplelifeuk.files.wordpress.com/2013/06/dumb_iis7_errror_page.jpg";s:5:"width";i:855;s:6:"height";i:771;s:4:"type";s:5:"image";s:4:"area";i:659205;s:9:"file_path";b:0;}}s:6:"videos";a:0:{}s:11:"image_count";i:1;s:6:"author";s:7:"1907066";s:7:"blog_id";s:7:"1833431";s:9:"mod_stamp";s:19:"2013-06-26
    15:14:01";}
author:
  login: simplelifeuk
  email: andrew.chaa@yahoo.co.uk
  display_name: Andy
  first_name: Andrew
  last_name: Chaa
---
<p>By default, IIS7 intercepts 4xx and 5xx status responses with its own custom error pages. At work, we have a custom redirection module that checks if the status is 401 Unauthorized and spits javascript to redirect to the log in page. We use javascript in order to preserve # fragment in the return url.</p>
<p>The issue was 401. We set 401 to the response to send a meaninful response. The body contains a javascript redirection chunk. But it is intercepted by IIS7, so the user is not redirected but only see an dumb IIS 401 error page.</p>
<p><a href="http://simplelifeuk.files.wordpress.com/2013/06/dumb_iis7_errror_page.jpg"><img class="aligncenter size-full wp-image-1544" alt="dumb_iis7_errror_page" src="{{ site.baseurl }}/assets/dumb_iis7_errror_page.jpg" width="640" height="577" /></a></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>After some googling, I found two ways to handle the issue. One is to let all response ignore IIS custom error pages. You can do that by setting existingResponse="PassThrough" in the web.config.</p>
<p>[sourcecode language="xml"]<br />
&lt;configuration&gt;<br />
  &lt;system.webServer&gt;<br />
    &lt;httpErrors existingResponse=&quot;PassThrough&quot; /&gt;<br />
  &lt;/system.webServer&gt;<br />
&lt;/configuration&gt;<br />
[/sourcecode]</p>
<p>&nbsp;</p>
<p>The other is to set response.TrySkipIisCustomErrors = true, and then the only that response will be passed through without being intercepted by IIS7 custom error pages. </p>
<p>The second option was appropriate, as we want to pass through only for redirection module.<br />
[sourcecode language="csharp"]<br />
public void OnEndRequest(HttpContextBase context)<br />
{<br />
    if (context.Response.StatusCode != 401)<br />
        return;</p>
<p>    var response = context.Response;<br />
    response.TrySkipIisCustomErrors = true;<br />
    response.Status = response.Status;<br />
    response.StatusCode = (int)HttpStatusCode.Unauthorized;<br />
    response.TrySkipIisCustomErrors = true;<br />
    response.ClearContent();<br />
    response.RedirectLocation = null;<br />
    response.Write(_buildClientRedirectionResponse.GetRedirectionScript());<br />
    response.End();<br />
}<br />
[/sourcecode]</p>
<p>For me, TrySkipIisCustomErros = true didn't work until you set a value to response.StatusCode. It seems that response.TrySkipIisCustomErrors = true and response.Status = response.Status should be set together.</p>
<p>With the second option, you can benefit from Custom error pages and a temporal pass through for 401 for redirection. Hope this helps.</p>
