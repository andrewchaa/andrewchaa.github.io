---
layout: post
title: Webdriver tips
date: 2012-09-20 10:01:28.000000000 +01:00
type: post
published: true
status: publish
categories:
- Programming
tags:
- webdriver
meta:
  _edit_last: '1907066'
  tagazine-media: a:7:{s:7:"primary";s:0:"";s:6:"images";a:0:{}s:6:"videos";a:0:{}s:11:"image_count";i:0;s:6:"author";s:7:"1907066";s:7:"blog_id";s:7:"1833431";s:9:"mod_stamp";s:19:"2012-09-21
    13:56:47";}
  _wp_old_slug: webdriver-basics
  _wpas_skip_twitter: '1'
  _wpas_skip_linkedin: '1'
author:
  login: simplelifeuk
  email: andrew.chaa@yahoo.co.uk
  display_name: Andy
  first_name: Andrew
  last_name: Chaa
---
<p><a href="http://code.google.com/p/selenium/">Webdriver</a> is still a useful testing framework, thought <a href="http://phantomjs.org/">phantom.js</a> may be a better fit for javascript-intensive for SPA(Single Page Application).</p>
<p>The below are a few usages I encounter often.</p>
<h3>XPath element locator</h3>
<p>Very common in locating elements. There is a simple <a href="http://www.w3schools.com/xpath/default.asp">XPath tutorial at W3School</a>, though I'm not a big fan of W3School. </p>
<p>[sourcecode language="csharp"]<br />
public MetaData ClickConfirmButton()<br />
{<br />
	var okButton = new Button(&quot;//*[contains(@id,'confirm-edit')]&quot;);<br />
	okButton.Click();<br />
	return this;<br />
}<br />
[/sourcecode]</p>
<p>A quick syntax I ofetn come across is </p>
<p>[sourcecode language="xml"]<br />
//*[contains(@data-test, 'row')][3]//*[contains(@data-test,'note')]<br />
[/sourcecode]</p>
<p>This means, to find an element that has "data-test" attribute with the value of "row" and go the the third element within it, and find an element with "note" value, there. (does it make sense?)</p>
<h3>wait until a page is loaded</h3>
<p>One big change from Selenium RC to Webdriver is waiting for loading. By default, Webdriver doesn't wait for a page or element is fully loaded. But you can use a <a href="http://selenium.googlecode.com/svn/trunk/docs/api/java/org/openqa/selenium/support/ui/FluentWait.html">handy wait command</a>.</p>
<p>[sourcecode language="csharp"]<br />
new WebDriverWait(_driver, TimeSpan.FromSeconds(10))<br />
    .Until(w =&gt; w.Url.Contains(&quot;workspace&quot;));<br />
[/sourcecode]</p>
<h3>Install the latest flash player for firefox</h3>
<p>Once I was testing a page that renders a flash content. The page opens without any problem on Chrome, but not on Firefox. Firefox just get frozen, and the automation test fails miserably. Chrome has its own flash player, so it's updated when the browser is updated, but it's not the case for Firefox. If firefox freezes over flash content, install <a href="http://get.adobe.com/flashplayer/">the latest Flash Player</a>. Otherwise, you will be pulling your hair, condemning Firefox harshly...</p>
<h3>Testing "Click to download a file" stuff</h3>
<p>By default, firefox pops up the download manager when you try to download a file. Also, the download path can be different per machine. You wouldn't want manager pop-up, as you don't like alert dialogue box. You can set a silent file download on firefox profile. </p>
<p>[sourcecode language="csharp"]<br />
var firefoxProfile = new FirefoxProfile</p>
<p>firefoxProfile.AcceptUntrustedCertificates = true</p>
<p>firefoxProfile.SetPreference(&quot;browser.download.dir&quot;, &quot;c:\temp\&quot;);<br />
firefoxProfile.SetPreference(&quot;browser.download.manager.showWhenStarting&quot;, false);<br />
firefoxProfile.SetPreference(&quot;browser.download.panel.removeFinishedDownloads&quot;, true);<br />
firefoxProfile.SetPreference(&quot;browser.download.manager.showAlertOnComplete&quot;, false);<br />
firefoxProfile.SetPreference(&quot;browser.download.folderList&quot;, 2);<br />
firefoxProfile.SetPreference(&quot;browser.download.manager.closeWhenDone&quot;, true);<br />
firefoxProfile.SetPreference(&quot;browser.helperApps.neverAsk.saveToDisk&quot;,<br />
    &quot;application/zip, application/x-zip, application/x-zip-compressed, application/pdf, text/plain, application/octet-stream, application/vnd.ms-excel, application/msword, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.presentationml.presentation&quot;<br />
);<br />
[/sourcecode]</p>
<p>You would need to know <a href="http://filext.com/faq/office_mime_types.php">the mime tppe of the files</a> you want to download silently.<br />
If you want to know more preferences, please visit <a href="http://kb.mozillazine.org/About:config_entries">Mozilla's knowledge base</a>.</p>
<p>to be continued ...</p>
