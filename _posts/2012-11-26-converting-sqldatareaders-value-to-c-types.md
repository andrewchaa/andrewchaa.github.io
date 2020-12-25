---
title: Converting SqlDataReader's value to C# types
date: 2012-11-26 17:57:31.000000000 +00:00
type: post
published: true
status: publish
categories:
- Programming
tags:
- ado.net
- data access
- data reader
meta:
  _edit_last: '1907066'
  publicize_reach: a:2:{s:7:"twitter";a:1:{i:1752093;i:160;}s:2:"wp";a:1:{i:0;i:6;}}
  tagazine-media: a:7:{s:7:"primary";s:0:"";s:6:"images";a:0:{}s:6:"videos";a:0:{}s:11:"image_count";i:0;s:6:"author";s:7:"1907066";s:7:"blog_id";s:7:"1833431";s:9:"mod_stamp";s:19:"2012-11-26
    17:57:31";}
  publicize_twitter_user: andrewchaa
  _wpas_done_1752093: '1'
  _publicize_done_external: a:1:{s:7:"twitter";a:1:{i:111615627;b:1;}}
author:
  login: simplelifeuk
  email: andrew.chaa@yahoo.co.uk
  display_name: Andy
  first_name: Andrew
  last_name: Chaa
---
<p>I spent another day working with SqlDataReader, and actually I enjoyed it. It's pure geek joy to learn a new thing a day. </p>
<p>With SqlDataReader, you get the value and convert it in order to assign it to C# variable.</p>
<p>[sourcecode language="csharp"]<br />
person.FirstName = reader[colFirstName];<br />
person.Age = reader[colAge];<br />
[/sourcecode]</p>
<p>What if the column is nullable. You will get an exception. </p>
<p>You can check if the value is null like this.</p>
<p>[sourcecode language="csharp"]<br />
person.FirstName = reader[colFirstName] == DBNull.Value ? null : (string)reader[colFirstName];<br />
person.Age = reader[colAge] == DBNull.Value ? 0 : (int)reader[colAge];<br />
[/sourcecode]</p>
<p>It doesn't look very graceful. You read the value, validate it, and read it again to assign it. By using SqlReader.IsDBNull(), you can make it a little simpler.</p>
<p>[sourcecode language="csharp"]<br />
person.FirstName = reader.IsDBNull(colFirstName) ? null : (string)reader[colFirstName];<br />
person.Age = reader.IsDBNull(colAge) ? 0 : (int)reader[colAge];<br />
[/sourcecode]</p>
<p>Some argue that <a href="http://stackoverflow.com/a/3308441/437961">IsDBNull() is actually slower than comparing to DBNull.Value</a></p>
<p>And finally, you can <a href="http://stackoverflow.com/questions/1772025/sql-data-reader-handling-null-column-values">use C#'s "as" operator with the "??"</a> to cast the value.</p>
<p>[sourcecode language="csharp"]<br />
person.FirstName = reader[colFirstName] as string;<br />
person.Age = reader[colAge] as int? ?? 0;<br />
[/sourcecode]</p>
<p>It is elegant. Only one catch is that person.Age must be a nullable int. "as" only works for reference type. </p>
