---
title: Environment specific web.config using appSettings file property
date: 2008-11-05 10:29:53.000000000 +00:00
type: post
published: true
status: publish
categories: []
tags: []
meta:
  _edit_last: '1907066'
  _wp_old_slug: environment-dependant-webconfig-using-appsettings-file-property
author:
  login: simplelifeuk
  email: andrew.chaa@yahoo.co.uk
  display_name: Andy
  first_name: Andrew
  last_name: Chaa
---
<p>As most companies do, you would have different environments such as INT (intergration), Staging, and Live servers. Web.config is really handy, but you cannot put environment specific settings there, because the same file is deployed across all environments.</p>
<p>This troubleed me and my company (which is Totaljobs) for a while and I came across this <strong>file</strong> property.</p>
<p>Put the file property like this.</p>
<p>[sourcecode language='xml']<br />
<appsettings file="relative file name"><br />
</appsettings><br />
[/sourcecode]</p>
<p><a href="http://msdn.microsoft.com/en-us/library/ms228154.aspx">MSDN says</a>,</p>
<blockquote><p>Optional <span><a id="ctl00_rs1_mainContentContainer_ctl12" href="http://msdn.microsoft.com/en-us/library/system.string.aspx">String</a></span> attribute.</p>
<p>Specifies a relative path to an external file that contains custom application configuration settings. The specified file contains the same kind of settings that are specified in the <span><span class="keyword">appSettings</span></span> <a id="ctl00_rs1_mainContentContainer_ctl13" href="http://msdn.microsoft.com/en-us/library/ms228312.aspx">add</a>, <a id="ctl00_rs1_mainContentContainer_ctl14" href="http://msdn.microsoft.com/en-us/library/ms228133.aspx">clear</a>, and <a id="ctl00_rs1_mainContentContainer_ctl15" href="http://msdn.microsoft.com/en-us/library/ms228241.aspx">remove</a> attributes and uses the same key/value pair format as those elements.</p>
<p>The path that is specified is relative to the local configuration file. The runtime ignores the attribute, if the specified file cannot be found.</p>
<p>Because any changes to the Web.config file cause the application to restart, using a separate file allows users to modify values that are in the <span><span class="keyword">appSettings</span></span> section without causing the application to restart. The contents of the separate file are merged with the <span><span class="keyword">appSettings</span></span> section in the Web.config file. This functionality is limited to the <span><span class="keyword">appSettings</span></span> attribute.</p></blockquote>
<p>Yet you <span style="color:#ff0000;">can still use an absolute path</span>. We use a path like "c:\program files\company\config\evweb.config"</p>
<p>Ah, the content of evweb.config is like this.</p>
<p>[sourcecode language='xml']<br />
<appsettings><br />
    <add key="key" value="value" /><br />
</appsettings><br />
[/sourcecode]<br />
Hope this helps.</p>
