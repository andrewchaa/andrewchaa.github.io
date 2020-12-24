---
layout: post
title: Using uploadify in ASP.Net MVC application
date: 2010-09-24 11:55:44.000000000 +01:00
type: post
published: true
status: publish
categories: []
tags: []
meta:
  _edit_last: '1907066'
  _wp_old_slug: ''
author:
  login: simplelifeuk
  email: andrew.chaa@yahoo.co.uk
  display_name: Andy
  first_name: Andrew
  last_name: Chaa
---
<p><a href="http://www.dropbox.com">Dropbox</a> is getting more and more popular. I use it on my desktop, laptop, iphone, and ipad. Once I went to a post office to post a document, and realised that I don't know the address. I had my iphone with me, so used Dropbox to get the address. It was so useful, and ever since, I became a fan of Dropbox.</p>
<p>Anyway, Dropbox has nice Flash-based upload functionality, and I wanted to mimic the feature in my asp.net application. <a href="http://krystalware.com/Products/SlickUpload/">SlickUpload</a> is a very good component, but commercial. I googled and came across <a href="http://www.uploadify.com/">uploadify</a>.</p>
<p>The site has good example code and a link to <a href="http://casonclagg.com/articles/6/video-tutorial-uploadify-asp-net-c-sharp.aspx">asp.net example</a> too. If you want to make your file upload testable, read <a href="http://www.hanselman.com/blog/ABackToBasicsCaseStudyImplementingHTTPFileUploadWithASPNETMVCIncludingTestsAndMocks.aspx">Scott hanselman's fantastic post</a> about it.</p>
<p>The below is my code. One thing to note in the code are</p>
<ul>
<li>Url.SiteRoot() is a custom extension method that finds root of the web application. I use it as this application goes under another application. So the url of images is not /public/images/, but /[unknown]/public/images. You would not need Url.SiteRoot() if your application root is the top level directory in iis.</li>
</ul>
<p>[sourcecode language="csharp"]<br />
public ActionResult UploadFiles()<br />
{<br />
    foreach (string file in Request.Files)<br />
    {<br />
        var postedFileBase = Request.Files[file];<br />
        if (postedFileBase.ContentLength == 0)<br />
            continue;</p>
<p>        string savedFilename = Path.Combine(AppDomain.CurrentDomain.BaseDirectory,<br />
                                            Path.GetFileName(postedFileBase.FileName));<br />
        postedFileBase.SaveAs(savedFilename);<br />
    }</p>
<p>    return View();<br />
}</p>
<p>[/sourcecode]</p>
<p>[sourcecode language="javascript"]<br />
$(function(){<br />
    $(&quot;#file&quot;).uploadify({<br />
        'uploader': '&lt;%= Url.SiteRoot() %&gt;/public/images/uploadify.swf',<br />
        'script': 'Home/UploadFiles',<br />
        'cancelImg': '&lt;%= Url.SiteRoot() %&gt;/public/images/cancel.png',<br />
        'auto': false,<br />
        'multi': false<br />
    });<br />
})</p>
<p>&lt;h2&gt;Simple file upload.&lt;/h2&gt;<br />
&lt;p&gt;</p>
<p>    &lt;form action=&quot;&lt;%= Url.Action(&quot;UploadFiles&quot;, &quot;Home&quot;) %&gt;&quot; method=&quot;post&quot; enctype=&quot;multipart/form-data&quot;&gt;</p>
<p>        &lt;p&gt;<br />
        &lt;input type=&quot;file&quot; name=&quot;file&quot; id=&quot;file&quot; /&gt;<br />
        &lt;a href=&quot;javascript:$('#file').uploadifyUpload();&quot;&gt;Upload Files&lt;/a&gt;<br />
        &lt;/p&gt;</p>
<p>    &lt;/form&gt;<br />
&lt;/p&gt;</p>
<p>[/sourcecode]</p>
