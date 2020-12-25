---
title: Deploying Sqlite together with ASP.Net MVC and Entity Framework
date: 2010-04-26 14:27:19.000000000 +01:00
categories:
- Programming
tags:
- sqlite
meta:
  _edit_last: '1907066'
  _oembed_78f8ae5cca2941d2aeb963edc2334aae: "{{unknown}}"
  _oembed_b778f4bd8d05ca04bac49143661847e4: "{{unknown}}"
---
<p>Of course, you need to install sqlite or deploy the dll together. Yet I keep forgetting that I need to register ".Net Framework Data Provider for Sqlite" You don't need it on your dev machine, as Sqlite installation register it with your version of .Net machine.config.</p>
<p>If  you not register it, you will have an error "Unable to find the requested .Net Framework Data Provider."</p>
<p>Add &lt;DbProviderFactories&gt;...&lt;/DbProviderFactories&gt; in your web.config (<a href="http://www.linuxquestions.org/questions/linux-server-73/sqlite-problems-attempt-to-write-a-readonly-database-611727/">http://www.linuxquestions.org/questions/linux-server-73/sqlite-problems-attempt-to-write-a-readonly-database-611727/</a>)</p>
<p>[sourcecode language="xml"]<br />
...<br />
&lt;/connectionStrings&gt;</p>
<p>&lt;system.data&gt;<br />
  &lt;DbProviderFactories&gt;<br />
    &lt;remove invariant=&quot;System.Data.SQLite&quot; /&gt;<br />
    &lt;add name=&quot;SQLite Data Provider&quot; invariant=&quot;System.Data.SQLite&quot; description=&quot;.Net Framework Data Provider for SQLite&quot; type=&quot;System.Data.SQLite.SQLiteFactory, System.Data.SQLite&quot; /&gt;<br />
  &lt;/DbProviderFactories&gt;<br />
&lt;/system.data&gt;</p>
<p>&lt;system.web&gt;<br />
...<br />
[/sourcecode]</p>
<p>I put "..." in order to show where you put the definition.</p>
<p>Another thing that I forget, is to give enough permission to application pool, so IIS process can update sqlite db. Otherwise, you have "sqlite attempt to write a readonly database" error.<br />
Easy and lazy option is to sete the pool's identity to "Local System", but I would not recommend it.</p>
