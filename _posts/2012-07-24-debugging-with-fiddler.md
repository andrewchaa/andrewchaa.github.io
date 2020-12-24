---
layout: post
title: Debugging with Fiddler
date: 2012-07-24 14:29:12.000000000 +01:00
type: post
published: true
status: publish
categories:
- Programming
tags:
- fiddler
- reverse proxy
meta:
  _edit_last: '1907066'
  _wpas_skip_twitter: '1'
  _wpas_skip_linkedin: '1'
  tagazine-media: a:7:{s:7:"primary";s:0:"";s:6:"images";a:0:{}s:6:"videos";a:0:{}s:11:"image_count";i:0;s:6:"author";s:7:"1907066";s:7:"blog_id";s:7:"1833431";s:9:"mod_stamp";s:19:"2012-07-24
    16:30:53";}
  _oembed_222c00ad288c7e6d86d3bbf2878234b1: "{{unknown}}"
author:
  login: simplelifeuk
  email: andrew.chaa@yahoo.co.uk
  display_name: Andy
  first_name: Andrew
  last_name: Chaa
---
<h2>Setup</h2>
<p>Well, download Fiddler first by visiting <a href="http://www.fiddler2.com/fiddler2/version.asp">http://www.fiddler2.com/fiddler2/version.asp</a>.</p>
<h3>&nbsp;</h3>
<h3>Use BeyondCompare to compare web sessions</h3>
<p>Everyone loves BeyondCompare, isn't it?. At least, it's my favourite comparison tool. I know the tool and feels comfortable with it.</p>
<p>To set it on Fiddler, open QuickExce box by pressing alt + q. Then type the following commands there. The path to BC can be different depending on your installation. (from <a href="https://www.fiddler2.com/fiddler/help/CompareTool.asp">fiddler's CompareTool help</a>)</p>
<p>[sourcecode language="bash"]&lt;br&gt;about:config&lt;br&gt;PREFS SET fiddler.config.path.differ &quot;C:\Program Files (x86)\Beyond Compare 3\BComp.com&quot;&lt;br&gt;PREFS SET fiddler.differ.Params &quot;/diff \&quot;{0}\&quot; \&quot;{1}\&quot;&quot;&lt;br&gt;[/sourcecode]</p>
<p>Now, when you select two web sessions and press ctrl + w, you can compare those sessions against each other on beyond</p>
<h3>Script editor</h3>
<p>It's a text editor that helps you edit script rules and offers syntax highlighting and a class explorer (really useful) to help you author scripts. Get the installer with screenshot from <a href="http://www.fiddler2.com/fiddler/fse.asp">FiddlerScript page</a>.</p>
<p>Before you start installation, you need close your Fiddler.</p>
<p>With script editor, you can add a custom column.</p>
<p>https://gist.github.com/3171042</p>
<h3>Keyboard shortcuts</h3>
<p>I love keyboard shortcuts.</p>
<ul>
<li>ctrl + c: copy, ctrl + a: select all  </li>
<li>ctrl + g: go to a specific line number  </li>
<li>ctrl + alt + f: activate the Fiddler window  </li>
<li>ctrl + m: minimise Fiddler  </li>
<li>alt + q: set focus to the QuckExec box  </li>
<li>ctrl + t: activate inspector  </li>
<li>ctrl + w: compare sessions  </li>
<li>ctrl + shft + del: Clear the WinINET cache </li>
</ul>
