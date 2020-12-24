---
layout: post
title: How to use html test suite and cases on Selenium RC
date: 2009-04-09 14:27:29.000000000 +01:00
type: post
published: true
status: publish
categories:
- Programming
tags:
- selenium
- testing
meta:
  _edit_last: '1907066'
  _oembed_cd45d91d4cf77976dd6ba588f595f8e2: "{{unknown}}"
  _oembed_1bdefc2e96619e1ba18c4fd7f0b479da: "{{unknown}}"
  _oembed_052e0b5c41f3c9a8cedd4b3b9c7024e7: "{{unknown}}"
  _oembed_a3768ed868f8802354bba4fb2730951f: "{{unknown}}"
  _oembed_67762a864e45e10f79017a343c614cd4: "{{unknown}}"
  _oembed_e5dc686d181a71c12204e43f65be2376: "{{unknown}}"
  _oembed_cb65984d9acb599af585a13d7e3298c8: "{{unknown}}"
  _oembed_bf360522ea1248e2cc745417284c37b9: "{{unknown}}"
  _oembed_e7f33d2ce58fab23ba70f178f58def2e: "{{unknown}}"
  _oembed_df5e201803ae7fda4e0cea4bdc07c9bc: "{{unknown}}"
  _oembed_e63f3ee3a30d87164e30270a97ff8b73: "{{unknown}}"
author:
  login: simplelifeuk
  email: andrew.chaa@yahoo.co.uk
  display_name: Andy
  first_name: Andrew
  last_name: Chaa
---
<p>References</p>
<ul>
<li><a href="http://clearspace.openqa.org/message/49641">How to install and use Selenium RC</a></li>
<li><a href="http://www.jroller.com/selenium/">http://www.jroller.com/selenium/</a> Very good and complete article on introduction.</li>
<li><a href="http://wiki.openqa.org/display/SEL/Selenium+core+FAQ">Selenium Core FAQ</a></li>
<li><a href="http://wiki.openqa.org/display/SRC/Selenium+RC+FAQ">Selenium RC FAQ</a></li>
<li><a href="http://seleniumhq.org/projects/remote-control/languages/selenese.html">http://seleniumhq.org/projects/remote-control/languages/selenese.html</a></li>
</ul>
<p>Since 2009, I have used Selenium IDE and core. I love Selenium IDE. It is easy to use and is very handy as I can record test cases and also run them one by one by clicking on each. A colleague of mine used Selenium RC with C# but it did not impress me much because he started RC server first, then executed NUnit to lanuch the test suite. Also, I did not like coding in C# selenium test cases. How simple and elegant those html test caes are!</p>
<p>Then today, a bit shame to say, I realised I can use html test suite on Selenium RC. Oh how fantastic it is. My scrum team had scores of accumulated html test cases, and I can use them without any alteration.</p>
<p>First, let's see how to install Selenium RC</p>
<ol>
<li>You download Selenium RC from <a href="http://seleniumhq.org/download/">http://seleniumhq.org/download/</a></li>
<li>Unzip it into local hard drive, for example, c:\Selenium. Because Selenium RC is written in Java, you need to install java runtime if you do not have it.</li>
</ol>
<p>selenium-server.jar is the main engine that runs test suite. You can run it on command prompt, but it is very handy to create a batch file to run it as the above reference link showes it.</p>
<p>For IE</p>
<p>[sourcecode language="java"]<br />
cd \<br />
cd C:\Selenium\selenium-server-1.0-beta-2<br />
java -jar selenium-server.jar -port 4545  -htmlSuite *iehta &quot;http://www.sekyee.com&quot; &quot;C:\Selenium\Test_Suite.html&quot; &quot;C:\Selenium\Results.html&quot;<br />
pause<br />
[/sourcecode]</p>
<p>For firefox</p>
<p>[sourcecode language="java"]</p>
<p>cd \<br />
cd C:\Selenium\selenium-server-1.0-beta-2<br />
java -jar selenium-server.jar -port 4545  -htmlSuite *chrome &quot;http://www.totaljobs.com&quot; &quot;C:\Selenium\Test_Suite.html&quot; &quot;C:\Selenium\Results.html&quot;<br />
pause</p>
<p>[/sourcecode]</p>
<p>A simple selenium-server.jar usage is like this.<br />
selenium-server.jar -port {your port number} -htmlSuite {firefox or ie} {base url} {absolute path for your test suite} {absolute path for your test result file}</p>
<p>I'm not sure why * is required befire iehta, yet without the *, it does not find testsuite. Also, Results.html must exist before you run this even though it is an empty file.<br />
I find {base url} very handly, so you can put relative path in your test cases. This enables you to use the same test cases to test on different environments such as Dev, Int, Staging, and Live.</p>
<p>Hoep this helps</p>
