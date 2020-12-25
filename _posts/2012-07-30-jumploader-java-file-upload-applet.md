---
title: Jumploader - Java File Upload Applet
date: 2012-07-30 16:25:47.000000000 +01:00
type: post
published: true
status: publish
categories:
- Programming
tags:
- jumploader
meta:
  _edit_last: '1907066'
  tagazine-media: a:7:{s:7:"primary";s:0:"";s:6:"images";a:0:{}s:6:"videos";a:0:{}s:11:"image_count";i:0;s:6:"author";s:7:"1907066";s:7:"blog_id";s:7:"1833431";s:9:"mod_stamp";s:19:"2012-07-30
    16:49:10";}
  _wpas_skip_twitter: '1'
  _wpas_skip_linkedin: '1'
author:
  login: simplelifeuk
  email: andrew.chaa@yahoo.co.uk
  display_name: Andy
  first_name: Andrew
  last_name: Chaa
---
<p>JumpLoader is a Java applet designed to upload files from the client to a server. Well, I know this is the age of HTML5 and you are not cool if you don’t use it like dropbox does.</p>
<p>By the way, you can refer to this comprehensive tutorial about <a href="http://www.matlus.com/html5-file-upload-with-progress/">Html5 File Upload with Progress</a>. Also, there is a good <a href="http://blueimp.github.com/jQuery-File-Upload/">jQuery file upload</a> library. It has slick interface based on twitter bootstrap.</p>
<ul>
<li>downalod from <a href="http://jumploader.com/download.html">http://jumploader.com/download.html</a> </li>
</ul>
<p>&nbsp;</p>
<p>It has a very comprehensive demo page. You can see all jumploader events callback functions and methods.</p>
<ul>
<li><a href="http://jumploader.com/demo.html">demo</a></li>
</ul>
<h3>&nbsp;</h3>
<h3>A few things you need to know.</h3>
<h4>file status</h4>
<ul>
<li>0: ready for upload  </li>
<li>2: uploaded  </li>
<li>3: failed.</li>
</ul>
<p>So each time, you can iterate over the files in Jumploader and decide which to resume upload.</p>
<p>[sourcecode language="csharp"]</p>
<p>var files = vm.getFiles();<br />
for (var i = 0; i &lt; files.length; i++) {<br />
	var file = files[i];<br />
	if (file.isRetryable()) {<br />
		self.uploader.retryFileUpload(file);<br />
	}<br />
 }</p>
<p>[/sourcecode]</p>
