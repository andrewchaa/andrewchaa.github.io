---
layout: post
title: What I learned while updating my church website
date: 2012-06-04 20:02:48.000000000 +01:00
type: post
published: true
status: publish
categories:
- Programming
tags:
- ASP.Net MVC
- Personal Project
- twitter bootstrap
meta:
  _wpas_done_linkedin: '1'
  _edit_last: '1907066'
  publicize_results: a:1:{s:7:"twitter";a:1:{i:111615627;a:2:{s:7:"user_id";s:10:"andrewchaa";s:7:"post_id";s:18:"209736989291970562";}}}
  _wpas_done_twitter: '1'
  tagazine-media: a:7:{s:7:"primary";s:0:"";s:6:"images";a:0:{}s:6:"videos";a:0:{}s:11:"image_count";s:1:"0";s:6:"author";s:7:"1907066";s:7:"blog_id";s:7:"1833431";s:9:"mod_stamp";s:19:"2012-06-04
    20:29:57";}
  _oembed_0a27053e63b9451d6573129751fa926f: "{{unknown}}"
  _oembed_cb621df340d48a8f0c4aaafa74c58d56: "{{unknown}}"
  _oembed_27cd30f5edeae4f2e00ed93bb5abd501: "{{unknown}}"
  _oembed_aee5578ea95e2859bf30214091d83609: "{{unknown}}"
  _oembed_61fbcfeec7138d257bd3c9768778613a: "{{unknown}}"
  _oembed_f159c4be5cceee4ff4cd2905c516e13e: "{{unknown}}"
  _oembed_8295989060a7534144af3cb000a80c46: "{{unknown}}"
  _oembed_081e7905ecdbec67bd2d3a5b1e3596ed: "{{unknown}}"
  _oembed_4d10643b46065e61dc7d3604b138b7ee: "{{unknown}}"
  _oembed_8c2739da8d7d9c984505c380cdf04c20: "{{unknown}}"
  _oembed_ab71f2e4567b5881525534c56cffcbc8: "{{unknown}}"
  _oembed_076f0ae126364ee49f6b1e4ead73af2c: "{{unknown}}"
  _oembed_18ef36baff1ae26c44fca941acf3f75e: "{{unknown}}"
  _oembed_9c912ccf9ec48eedefeba2ee841a5768: "{{unknown}}"
  _oembed_e0f59f17367e5ad69d88ee58a239293e: "{{unknown}}"
  _oembed_eccb0adc723884a9ff05929f2298008e: "{{unknown}}"
  _oembed_686f0b4a59ef262aaf9c5174e7ba7bfa: "{{unknown}}"
  _oembed_84de894ba6008b6ac25e4fc33e4397ef: "{{unknown}}"
  _oembed_6f35a2549328df74210d926d672e4d35: "{{unknown}}"
  _oembed_1ed5511ab4d2d5ece8620690e0833566: "{{unknown}}"
  _oembed_507beb39509cf19ea9f90c36d6f085a6: "{{unknown}}"
  _oembed_41f692a96101484b865f61f485411f73: "{{unknown}}"
  _oembed_ae2917f281c28184b9bcece45de90776: "{{unknown}}"
  _oembed_bb485c935e5a0c4acff5bf651db3b711: "{{unknown}}"
  _oembed_0c5e1d8191159d9492cfac751fd1b898: "{{unknown}}"
author:
  login: simplelifeuk
  email: andrew.chaa@yahoo.co.uk
  display_name: Andy
  first_name: Andrew
  last_name: Chaa
---
<p>Working on a person project is lots of fun. You have a whole control over your project, what to do, how to do, and when to do. Also, it gives an opportunity to learn things to a deeper level. Last 3 months, I was learning ruby on rails, following ruby koans and rails book. Honestly, it is not much of a fun just to follow examples on the book, as you just type the code for the sake of practice, not to build anything relevant and meaningful to you.</p>
<p>Anyway, I am happy that I am back to my personal project and actually building something important to me. This post is about what I would learn in the journey - well this sounds like I'm doing something very important, but it's actually my hobby project. </p>
<h2>Trello</h2>
<p><a href="https://trello.com/">https://trello.com/</a></p>
<p>It is a free SCRUM board on the web, developed by the same people who built stackoverflow.com. It is the best online SCRUM board I have ever used.</p>
<h2>AppHarbor</h2>
<p><a href="https://appharbor.com/">https://appharbor.com/</a></p>
<p>Mose of people already knows this, I believe. You can deploy your .NET application with git, very easily, and can benefit from their basic free account.</p>
<h2>Bootstrap, from twitter</h2>
<p><a href="http://twitter.github.com/bootstrap/index.html">http://twitter.github.com/bootstrap/index.html</a></p>
<p>This is more than a CSS framework. It has all the styled layouts, buttons, menus, navigation bars, etc. You can utilise the sleek twitter design on your project. I'm not very good at website design, like most of server side guys, but with the help of this, finally, I can build a decent site for myself and for friends. </p>
<h2>sitemap</h2>
<p>
Well, I knew this before and used it at work, but this was the first time I implemented sitemap for my personal project.</p>
<p>The definitive guide is <a href="http://www.sitemaps.org/protocol.html">sitemmap.org</a>. I also used <a href="https://www.google.com/webmasters/tools">google webmaster tool</a> to submit the site map.</p>
<h2>Regular expression</h2>
<p>The Sunday service messages will be saved as files in json format. The file name will have the meta data of the content, for example, title, leacture year and date, chapters, and so on. I use regular expression to parse the file names and retrieve the data.</p>
<p>[sourcecode language="powershell"]<br />
file name: 2012 Genesis 1 1.1-1.25 In The Beginning.json<br />
pattern: ^([0-9]+)\s([0-9A-Za-z]+)\s([0-9]+)\s([0-9.-]+)\s([0-9A-Za-z ]+)<br />
[/sourcecode]</p>
<p>Online regex tester and regex cheatsheet were really helpful to test the pattern.</p>
<ul>
<li>A Better .NET Regular Expression Tester: <a href="http://derekslager.com/blog/posts/2007/09/a-better-dotnet-regular-expression-tester.ashx">http://derekslager.com/blog/posts/2007/09/a-better-dotnet-regular-expression-tester.ashx</a></li>
<li>RegExLib.com tester: <a href="http://regexlib.com/RETester.aspx?AspxAutoDetectCookieSupport=1">http://regexlib.com/RETester.aspx?AspxAutoDetectCookieSupport=1</a></li>
<li>Regular Expression Cheat Sheet (V2): <a href="http://www.addedbytes.com/cheat-sheets/regular-expressions-cheat-sheet/">http://www.addedbytes.com/cheat-sheets/regular-expressions-cheat-sheet/</a></li>
</ul>
<p>&nbsp;</p>
<p><strong>Names Group</strong></p>
<p>You can use named group to make the pattern more readable.<br />
[sourcecode language="csharp"]<br />
string fileName = &quot;2012 Genesis 1 1.1-1.25 In The Beginning.json&quot;;</p>
<p>var pattern = new Regex(@&quot;(?&lt;Year&gt;[0-9]+?)\s(?&lt;Book&gt;[0-9A-Za-z]+?)\s(?&lt;LectureNo&gt;[0-9]+?)\s(?&lt;Chapter&gt;[0-9.-]+?)\s(?&lt;Title&gt;.+?)\.json&quot;);<br />
var match = pattern.Match(fileName);</p>
<p>Assert.That(match.Groups[&quot;Year&quot;].Value, Is.EqualTo(&quot;2012&quot;));<br />
Assert.That(match.Groups[&quot;Book&quot;].Value, Is.EqualTo(&quot;Genesis&quot;));<br />
Assert.That(match.Groups[&quot;LectureNo&quot;].Value, Is.EqualTo(&quot;1&quot;));<br />
Assert.That(match.Groups[&quot;Chapter&quot;].Value, Is.EqualTo(&quot;1.1-1.25&quot;));<br />
Assert.That(match.Groups[&quot;Title&quot;].Value, Is.EqualTo(&quot;In The Beginning&quot;));<br />
[/sourcecode]</p>
<p>&nbsp;</p>
<h2>ASP.NET MVC 3 tips</h2>
<p><strong>Reading message files from /Content/messages directory</strong></p>
<p>All the messages are in json format and stored in /Content/messages directory. On Get request, the controller read all files in there and render them as list. In my unit test, I used a relative path to the bin directory like </p>
<p>[sourcecode language="csharp"]<br />
[Test]<br />
public void Should_List_Files_In_The_Message_Directory()<br />
{<br />
    const string messagePath = @&quot;..\..\..\LondonUbf\Content\messages&quot;;<br />
    var repository = new MessageRepository(messagePath);</p>
<p>    var messages = repository.FindAll();</p>
<p>    Assert.That(messages.First().FileName.Contains(&quot;\\2012 Genesis 1 1.1-1.25 In The Beginning.json&quot;), Is.True);<br />
    Assert.That(messages.First().Book, Is.EqualTo(&quot;Genesis&quot;));<br />
}<br />
[/sourcecode]</p>
<p>But web project dll is hosted by iis and the working directory, so I cannot use the relative path. Simply, I used Server.MapPath(). I haven't used it for a while since ASP.NET</p>
<p>[sourcecode language="csharp"]<br />
public ActionResult Messages()<br />
{<br />
    var repository = new MessageRepository(Server.MapPath(&quot;/Content/messages&quot;));<br />
    var viewModel = new MessageViewModel { Messages = repository.FindAll()};</p>
<p>    return View(viewModel);<br />
}<br />
[/sourcecode]</p>
<p>&nbsp;</p>
<p><strong>Output safe HTML string non escaped</strong></p>
<p>Razor view always escapes html, but I need to output the message I read from file system to the page. You can do this with <a href="http://stackoverflow.com/questions/4281424/asp-net-mvc-razor-output-html-string-non-escaped">Html.Raw()</a> method. </p>
<p>[sourcecode language="html"]<br />
&lt;div class=&quot;row&quot;&gt;<br />
    &lt;div class=&quot;span9&quot;&gt;<br />
        @Html.Raw(Model.ContentHtml)<br />
    &lt;/div&gt;<br />
&lt;/div&gt;<br />
[/sourcecode]</p>
<p>&nbsp;</p>
<p><strong>Custom Error Handling</strong><br />
You can use Application_Error(...) event and log the error and handle it in your way. (<a href="http://stackoverflow.com/a/620559/437961">http://stackoverflow.com/a/620559/437961</a>)</p>
<p>[sourcecode language="html"]<br />
protected void Application_Error(object sender, EventArgs e)<br />
{<br />
    var exception = Server.GetLastError();</p>
<p>    var logger = _container.Resolve&lt;ILogger&gt;();<br />
    logger.ErrorFormat(&quot;{0}: {1}{2}{3}{4}&quot;, DateTime.Now, exception.Message, Environment.NewLine, exception.StackTrace, Environment.NewLine);<br />
}<br />
[/sourcecode]</p>
<p>&nbsp;</p>
<p><strong>/favicon.ico routing issue</strong><br />
If you don't ignore the routing, it will raise an error and fill up the log file soon on every request. Add it to global.asax.cs<br />
[sourcecode language="html"]<br />
routes.IgnoreRoute(&quot;{*favicon}&quot;, new { favicon = @&quot;(.*/)?favicon.icon(/.*)?&quot; });<br />
[/sourcecode]</p>
<p>&nbsp;</p>
<p><strong>finding file path of App_Data</strong><br />
[sourcecode language="csharp"]<br />
string appDataPath = Server.MapPath(&quot;~/app_data&quot;);<br />
[/sourcecode]</p>
<p>&nbsp;</p>
<p><strong>Razor syntax</strong><br />
Using @: to explicitly indicate the start of content</p>
<p>
Not all content container blocks start with a tag element tag, though, and there are scenarios where the Razor parser can’t implicitly detect a content block. (from <a href="http://weblogs.asp.net/scottgu/archive/2010/12/15/asp-net-mvc-3-razor-s-and-lt-text-gt-syntax.aspx">http://weblogs.asp.net/scottgu/archive/2010/12/15/asp-net-mvc-3-razor-s-and-lt-text-gt-syntax.aspx</a>)</p>
<p>[sourcecode language="csharp"]<br />
@if (someCondition) {<br />
    @: some content not surrounded by a tag element...<br />
}<br />
[/sourcecode]</p>
<p>&nbsp;</p>
<h3>Weird "length==" url with Html.ActionLink</h3>
<p>[sourcecode language="csharp"]<br />
@Html.ActionLink(&quot;All&quot;, &quot;Index&quot;, &quot;Messages&quot;, new { Class = &quot;btn btn-primary&quot;})<br />
[/sourcecode]</p>
<p>vs</p>
<p>[sourcecode language="csharp"]<br />
@Html.ActionLink(&quot;All&quot;, &quot;Index&quot;, new { controller = &quot;Messages&quot;}, new { Class = &quot;btn btn-primary&quot;})<br />
[/sourcecode]</p>
<p>The first adds length= to the url. It tries to use "Message" as object and convert it to controller name, but string has length property, so it try to use it too. (<a href="http://stackoverflow.com/questions/824279/why-does-html-actionlink-render-length-4">http://stackoverflow.com/questions/824279/why-does-html-actionlink-render-length-4</a>)</p>
<p>Use the latter and explicitly specify your controller.</p>
<h3>Render view in xml</h3>
<p>To enhance SEO, I created a sitemap.xml and it needs to be rendered dynamically. By default, the view is rendered as HTML, but you can use classic ASP.NET Response object to change it to xml.</p>
<p>[sourcecode language="csharp"]<br />
@{<br />
    Layout = null;<br />
    Response.ContentType = &quot;text/xml&quot;;<br />
}<br />
&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;<br />
&lt;urlset<br />
      xmlns=&quot;http://www.sitemaps.org/schemas/sitemap/0.9&quot;<br />
      xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot;<br />
      xsi:schemaLocation=&quot;http://www.sitemaps.org/schemas/sitemap/0.9<br />
      http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd&quot;&gt;</p>
<p>&lt;url&gt;<br />
  &lt;loc&gt;http://www.londonubf.org.uk/&lt;/loc&gt;<br />
&lt;/url&gt;<br />
...<br />
[/sourcecode]</p>
<p>&nbsp;</p>
<h2>C# Tips</h2>
<p><strong>ToTitleCase</strong><br />
Sometimes, you want to capitalise the first letter of each word. This is handy in that case.</p>
<p>[sourcecode language="csharp"]<br />
message.Title =<br />
   CultureInfo.CurrentCulture.TextInfo.ToTitleCase(lines[1].ToLower());<br />
[/sourcecode]</p>
<h2>Twilio</h2>
<p>Nice way to send or receive text message, even phone call.<br />
<a href="https://www.twilio.com/">https://www.twilio.com/</a></p>
