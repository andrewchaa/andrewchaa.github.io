---
title: About sublime text 2
date: 2012-06-19 10:38:03.000000000 +01:00
type: post
published: true
status: publish
categories: []
tags:
- About
- sublime text 2
meta:
  _edit_last: '1907066'
  _wpas_done_twitter: '1'
  _wpas_skip_linkedin: '1'
  _oembed_ff353806287165ac682c10aa0048a4d5: "{{unknown}}"
  _oembed_2b9163a09dc4091a187d7250492f02f3: "{{unknown}}"
  _oembed_7b43aec8029842c6b81b2dcebbbc2529: "{{unknown}}"
  _oembed_15f725225c0a0342bf94581474b910da: "{{unknown}}"
  _oembed_c61c1a18537e084bf996a2bd0fb370d3: "{{unknown}}"
  _oembed_2805b80b7b90b66b86cd2400e2be9ed6: "{{unknown}}"
author:
  login: simplelifeuk
  email: andrew.chaa@yahoo.co.uk
  display_name: Andy
  first_name: Andrew
  last_name: Chaa
---
<p>Another great text editor, free to everyone, but you can contribute to the project by paying for the license.</p>
<p>sublime text 2: <a href="http://www.sublimetext.com/2">http://www.sublimetext.com/2</a></p>
<h2>sublime packages</h2>
<p>By <a href="http://wbond.net/sublime_packages/package_control">installing sublime package control</a>, you can benefit from diverse plugins.</p>
<p>package control installation: <a href="http://wbond.net/sublime_packages/package_control/installation">http://wbond.net/sublime_packages/package_control/installation</a></p>
<p>List of community packages: <a href="http://wbond.net/sublime_packages/community">http://wbond.net/sublime_packages/community</a></p>
<p>List of packages I use</p>
<ul>
<li><a href="http://wbond.net/sublime_packages/alignment">Alignment</a></li>
<li><a href="https://github.com/buymeasoda/soda-theme">Soda theme</a></li>
<li><a href="https://github.com/Kronuz/SublimeCodeIntel">Sublime Code Intel</a></li>
</ul>
<h2>Setting up build system</h2>
<p>By setting up the build, you can easily run javascript tests or build sass.</p>
<p>Go to Tools -&gt; Build System -&gt; New Build System, and add your own build script. For example, mine is like this.</p>
<p>JavaScriopt.sublime-build<br />
[sourcecode language="javascript"]<br />
{<br />
    &quot;cmd&quot;: [&quot;cmd.exe&quot;, &quot;/c&quot;, &quot;rake&quot;, &quot;run_jstests&quot;, &quot;build_section=files&quot;],<br />
    &quot;working_dir&quot;: &quot;YOUR_WORKING_DIRECTORY&quot;,<br />
    &quot;selector&quot;: &quot;source.js&quot;<br />
}<br />
[/sourcecode]</p>
<h2>Shortcuts</h2>
<p>You can look at the <a href="http://docs.sublimetext.info/en/latest/reference/keyboard_shortcuts_win.html">comprehensive keyboard shortcuts</a>, yet the below are my favourites.</p>
<ul>
<li>open console: ctrl + '</li>
<li>open command pallete: ctrl + shift + p</li>
<li>find in files: ctrl + shft + F</li>
<li>reveal in sidebar: unfortunately, no shortcut key yet. right on the view and select it</li>
<li>Quick-open files by name: ctrl + p</li>
<li>Go to word in the current file: ctrl + ;
</li>
<li>Duplicate line(s): ctrl + shft + d</li>
<li>move line/selection up: ctrl + shft + up arrow</li>
<li>move line/selection down: ctrl + shft + down arrow</li>
<li>align variables declaration (alignment): ctrl + alt + a</li>
</ul>
