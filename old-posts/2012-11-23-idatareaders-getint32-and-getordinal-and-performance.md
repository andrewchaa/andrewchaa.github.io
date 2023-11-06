---
title: IDataReader's GetInt32() and GetOrdinal(), and performance
date: 2012-11-23 17:06:01.000000000 +00:00
categories:
- Programming
tags:
- data access
- data reader
- performance
meta:
  _edit_last: '1907066'
  tagazine-media: a:7:{s:7:"primary";s:0:"";s:6:"images";a:0:{}s:6:"videos";a:0:{}s:11:"image_count";i:0;s:6:"author";s:7:"1907066";s:7:"blog_id";s:7:"1833431";s:9:"mod_stamp";s:19:"2012-11-23
    17:06:01";}
  publicize_twitter_user: andrewchaa
  _wpas_done_1752093: '1'
  _publicize_done_external: a:1:{s:7:"twitter";a:1:{i:111615627;b:1;}}
  _oembed_b5db2d1aa9733f9137f47f1a56976c72: "{{unknown}}"
  _oembed_53ece208be385f769f78eb10cbb0f8fc: "{{unknown}}"
---
<p>Yesterday, I came across a code that simply pulls data with DataReader. These days, you would usually use NHibernate, Entity Framework, or whatever you like to access data. They hide away unnecessary details from you and you can enjoy easy access to your data, instantly and conveniently. </p>
<p>This is what I found.</p>
<p>[sourcecode language="csharp"]<br />
var reader = command.ExecuteReader();<br />
while (reader.Read())<br />
{<br />
    var entryId = reader.GetInt32(reader.GetOrdinal(&quot;entryId&quot;));<br />
    var entryType = (EntryType)reader.GetInt32(reader.GetOrdinal(&quot;Type&quot;));<br />
    ...<br />
}</p>
<p>[/sourcecode]</p>
<p><a href="http://msdn.microsoft.com/en-us/library/system.data.sqlclient.sqldatareader.getordinal.aspx">GetOrdinal()</a> returns the column ordinal, given the name of the column. It is a case-sensitive lookup. <a href="http://msdn.microsoft.com/en-us/library/system.data.sqlclient.sqldatareader.getint32.aspx">GetInt32()  </a>gets the value of the specified column as 32-bit integer.</p>
<p>I don't find this code very charming. You are calling two methods, GetInt32() and GetOrdinal() within a loop, and it's obviously ineffective. </p>
<p>First, you can replace GetInt32 to (int) casting. </p>
<p>[sourcecode language="csharp"]<br />
var reader = command.ExecuteReader();<br />
while (reader.Read())<br />
{<br />
    var entryId = (int)reader[&quot;entryId&quot;];<br />
    var entryType = (EntryType)reader[&quot;Type&quot;];<br />
    ...<br />
}<br />
[/sourcecode]</p>
<p>It looks simpler.<br />
GetInt32 is not very effective as it does a few more checks. Usually, you don't need to care, but still it makes you feel good to know a more performing option.<br />
Look at the following source of GetInt32</p>
<p>[sourcecode language="csharp"]<br />
public override int GetInt32(int i)<br />
{<br />
  this.ReadColumn(i);<br />
  return this._data[i].Int32;<br />
}</p>
<p>internal int Int32<br />
{<br />
  get<br />
  {<br />
    this.ThrowIfNull();<br />
    if (SqlBuffer.StorageType.Int32 == this._type)<br />
      return this._value._int32;<br />
    else<br />
      return (int) this.Value;<br />
  }<br />
  ....<br />
[/sourcecode]</p>
<p>Secondly, GetOrdinal(). </p>
<p>In the second example, when you do reader["entryId"], it internally calls GetOrdinal(). So, you are still calling GetOrdinal(). In fact, you can't avoid calling GetOrdinal() with datareader, as it is the way DataReader retrieve its data. </p>
<p>Look at the source code of GetOrdinal()</p>
<p>[sourcecode language="csharp"]<br />
public override int GetOrdinal(string name)<br />
{<br />
  SqlStatistics statistics = (SqlStatistics) null;<br />
  try<br />
  {<br />
    statistics = SqlStatistics.StartTimer(this.Statistics);<br />
    if (this._fieldNameLookup == null)<br />
    {<br />
      if (this.MetaData == null)<br />
        throw SQL.InvalidRead();<br />
      this._fieldNameLookup = new FieldNameLookup((IDataRecord) this, this._defaultLCID);<br />
    }<br />
    return this._fieldNameLookup.GetOrdinal(name);<br />
  }<br />
  finally<br />
  {<br />
    SqlStatistics.StopTimer(statistics);<br />
  }<br />
}</p>
<p>[/sourcecode]</p>
<p>It even uses timer while it's looking the column name!<br />
GetOrdinal is a rather expensive operation, especially in a loop. So, you can <a href="http://sqlblog.com/blogs/adam_machanic/archive/2006/07/12/sqldatareader-performance-tips.aspx">take it out of the loop</a> and make the code faster.</p>
<p>[sourcecode language="csharp"]<br />
var reader = command.ExecuteReader();<br />
int colEntryId = reader.GetOrdinal(&quot;entryId&quot;);<br />
int colType = reader.GetOrdinal(&quot;Type&quot;);<br />
while (reader.Read())<br />
{<br />
    var entryId = reader[colEntryId];<br />
    var entryType = (EntryType)reader[colType];<br />
    ...<br />
}</p>
<p>[/sourcecode]</p>
<p>So, you call GetOrdinal() just once and avoid using GetInt32. The code is more performing and looks simpler.<br />
Well, this is an art people are forgetting. Even I don't usually use DataReader these days, but if you care about performance and good code, knowing it still gives you a geeky joy.</p>
