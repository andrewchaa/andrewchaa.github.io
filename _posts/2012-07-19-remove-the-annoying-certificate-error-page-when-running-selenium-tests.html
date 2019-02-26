---
layout: post
title: Remove the annoying certificate error page when running selenium tests
date: 2012-07-19 16:17:42.000000000 +01:00
type: post
published: true
status: publish
categories:
- Programming
tags:
- acceptance test
- firefox
- selenium
- test automation
- webdriver
meta:
  _edit_last: '1907066'
  tagazine-media: a:7:{s:7:"primary";s:0:"";s:6:"images";a:0:{}s:6:"videos";a:0:{}s:11:"image_count";s:1:"0";s:6:"author";s:7:"1907066";s:7:"blog_id";s:7:"1833431";s:9:"mod_stamp";s:19:"2012-07-19
    16:17:42";}
  _wpas_skip_twitter: '1'
  _wpas_skip_linkedin: '1'
author:
  login: simplelifeuk
  email: andrew.chaa@yahoo.co.uk
  display_name: Andy
  first_name: Andrew
  last_name: Chaa
---
<p>Selenium and webdriver tests are everywhere these days. They can be often slow and flaky, but you need to run them to make sure you didn't break anything.</p>
<p>cf.For more information on selenium webdriver, go to <a href="http://seleniumhq.org/docs/03_webdriver.html">selenium webdriver documentation</a>.</p>
<p>Often what I find is I run selenium tests and start doing something as they take time to run. Then the tests are not running. Firefox stopped with certificate error! You have to add the certificate again to run those tests. It happens again and again, and as you are not a machine, you get tired mentally and emotionally. This is my story with selenium tests, so far.</p>
<p>There are a few ways to get around this certificate error. (I can't say it's annoying, as it warns you against the fraudulent websites.)</p>
<ul>
<li><a href="https://addons.mozilla.org/en-US/firefox/addon/remember-certificate-exception/">Remember Certificate Exception add-ons</a></li>
<li>With webdriver, set firefox profile to <a href="http://code.google.com/p/selenium/issues/detail?id=3767">accept untrusted certificates</a>.</li>
<li>Add your test sites to <a href="https://developer.mozilla.org/En/Cert_override.txt">cert_override.txt</a></li>
</ul>
<h2>cert_override.txt</h2>
<p>
This is a text file gerated in the user profile to store SSL certificate expections, if a user specifies it.<br />
Here is an example.</p>
<p>https://gist.github.com/3169147</p>
<h3>Fields</h3>
<p>Files are separated by a tab character, and each line is finished by a line feed character.</p>
<p>1. domainname:port : port 443 for HTTPS (SSL)<br />
2. hash algorithm OID</p>
<ul>
<li>SHA1-256: OID.2.16.840.1.101.3.4.2.1 (most used)</li>
<li>SHA-384: OID.2.16.840.1.101.3.4.2.2</li>
<li>SHA-512: OID.2.16.840.1.101.3.4.2.3</li>
</ul>
<p>3. Certificate fingerprint using previous hash algorithm</p>
<p>4. One or more characters for override type:</p>
<ul>
<li>M : allow mismatches in the hostname</li>
<li>U : allow untrusted certs (whether it's self signed cert or a missing or invalid issuer cert)</li>
<li>T : allow errors in the validity time, for example, for expired or not yet valid certs</li>
</ul>
<p>5. Certificate's serial number and the issuer name as a base64 encoded string</p>
<h3>Firefox profile</h3>
<p>In order to edit the file, you would have to find the file first, and it was tricky to locate Firefox profile.<br />
If you are on windows 7 or windows server 2008 like me, click on Windows Start and type %APPDATA%\Mozilla\Firefox\Profiles\ in the search box.<br />
If you on a earlier version of windows, please go to <a href="http://support.mozilla.org/en-US/kb/profiles-where-firefox-stores-user-data">a mozilla support page for the profile location</a>.</p>
