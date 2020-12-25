---
title: Handling Sandwich Code in C#
date: 2011-06-30 19:57:57.000000000 +01:00
type: post
published: true
status: publish
categories:
- Programming
tags:
- c#
- lamda
- sandwich code
meta:
  _edit_last: '1907066'
  _wpas_done_twitter: '1'
author:
  login: simplelifeuk
  email: andrew.chaa@yahoo.co.uk
  display_name: Andy
  first_name: Andrew
  last_name: Chaa
---
<p>What is "Sandwich Code"? I found it in <a href="http://rubykoans.com/">Ruby Koans</a>.</p>
<p>Often, you have to do something at the beginning and at the end, even though your main lock is in the middle. Let's say, you want to retrieve data from database. You have to create a connection, open it, use it to load data, and close it. You are interested in loading data, but you have to do some chores like opening a connection and closing it.</p>
<p>[sourcecode language="powershell"]<br />
_connection = new SqlConnection(ConfigurationManager.ConnectionStrings[&quot;Db&quot;].ConnectionString);<br />
_connection.open()var sql =<br />
    @&quot;SELECT     DATEPART(YEAR, PDate) AS [Year],<br />
                 DATEPART(MONTH, PDate) AS [Month],<br />
                 DATEPART(DAY, PDate) AS [Day],<br />
                 COUNT(*) AS [Count]<br />
        FROM     JobPostingPeriod<br />
       WHERE     PublishToDate &gt;= GETDATE() AND PDate &lt;= GETDATE()<br />
       GROUP BY  DATEPART(YEAR, PDate), DATEPART(MONTH, PDate), DATEPART(DAY, PDate)<br />
       ORDER BY  [Year], [Month], [Day]&quot;;</p>
<p>var result = _connection.Query(sql));return result;_connection.close()<br />
[/sourcecode]</p>
<p><span class="Apple-style-span" style="font-family:Georgia, 'Times New Roman', 'Bitstream Charter', Times, serif;font-size:13px;line-height:19px;white-space:normal;"><br />
</span><br />
<span class="Apple-style-span" style="font-family:Georgia, 'Times New Roman', 'Bitstream Charter', Times, serif;font-size:13px;line-height:19px;white-space:normal;">Those "bread-in-the-sandwich" code is repeated whenever you write any code that load data, and it can be quite annoying as you go on. In ruby, you can write a method that handles the opening and closing with block. In C#, you can use lamda delegate and Func.</span></p>
<div>I wrote a simple method, "ManageConnection", with the help of Dan, my Totaljobs colleague, as he happened to be with me.</div>
<div>It accepts an anonymous method that has SqlConnection as input, and return T.</div>
<div>And now I can re-write the data loading method like this.</div>
<p>[sourcecode language="powershell"]<br />
private T ManageConnection(Func func)<br />
{<br />
    _connection.Open();<br />
    var result = func(_connection);<br />
    _connection.Close();<br />
    return result;<br />
}<br />
[/sourcecode]</p>
<div>The excution flow is</div>
<div>1. GetJobCountByDate is called</div>
<div>2. It calls ManageConnection and pass conn.Query(sql) as anonymous method</div>
<div>3. In ManageConnection, _connection is opened.</div>
<div>4. In ManageConnection, func(_connection) is called. func is conn.Querysql at this point.</div>
<div>5. ManageConnection returns the result.</div>
<div>6. GetJobCountByDate receives the result from ManageConnection, and now returns the result.</div>
<div>I think this is nice and clean, once you understand how it works.</div>
<div>There are loads of sandwich code. If you write file, access database, write to http stream, ...</div>
<pre></pre>
<div id="cke_pastebin" style="position:absolute;left:-1000px;top:138px;width:1px;height:1px;">
<pre>	ection.open()</pre>
</div>
<div id="cke_pastebin" style="position:absolute;left:-1000px;top:138px;width:1px;height:1px;">var sql =</div>
<div id="cke_pastebin" style="position:absolute;left:-1000px;top:138px;width:1px;height:1px;">    @"SELECT    DATEPART(YEAR, PostedDate) AS [Year],</div>
<div id="cke_pastebin" style="position:absolute;left:-1000px;top:138px;width:1px;height:1px;">                DATEPART(MONTH, PostedDate) AS [Month],</div>
<div id="cke_pastebin" style="position:absolute;left:-1000px;top:138px;width:1px;height:1px;">                DATEPART(DAY, PostedDate) AS [Day],</div>
<div id="cke_pastebin" style="position:absolute;left:-1000px;top:138px;width:1px;height:1px;">                COUNT(*) AS [Count]</div>
<div id="cke_pastebin" style="position:absolute;left:-1000px;top:138px;width:1px;height:1px;">       FROM     JobPostingPeriod</div>
<div id="cke_pastebin" style="position:absolute;left:-1000px;top:138px;width:1px;height:1px;">      WHERE     PublishToDate &gt;= GETDATE() AND PostedDate &lt;= GETDATE()</div>
<div id="cke_pastebin" style="position:absolute;left:-1000px;top:138px;width:1px;height:1px;">      GROUP BY  DATEPART(YEAR, PostedDate), DATEPART(MONTH, PostedDate), DATEPART(DAY, PostedDate)</div>
<div id="cke_pastebin" style="position:absolute;left:-1000px;top:138px;width:1px;height:1px;">      ORDER BY  [Year], [Month], [Day]";</div>
<div id="cke_pastebin" style="position:absolute;left:-1000px;top:138px;width:1px;height:1px;">var result = _connection.Query(sql));</div>
<div id="cke_pastebin" style="position:absolute;left:-1000px;top:138px;width:1px;height:1px;">return result;</div>
<div id="cke_pastebin" style="position:absolute;left:-1000px;top:138px;width:1px;height:1px;">_connection.close()_connection = new SqlConnection(ConfigurationManager.ConnectionStrings["JobSeekerReadOnly"].ConnectionString);</div>
<div id="cke_pastebin" style="position:absolute;left:-1000px;top:138px;width:1px;height:1px;">_connection.open()</div>
<div id="cke_pastebin" style="position:absolute;left:-1000px;top:138px;width:1px;height:1px;">var sql =</div>
<div id="cke_pastebin" style="position:absolute;left:-1000px;top:138px;width:1px;height:1px;">    @"SELECT    DATEPART(YEAR, PostedDate) AS [Year],</div>
<div id="cke_pastebin" style="position:absolute;left:-1000px;top:138px;width:1px;height:1px;">                DATEPART(MONTH, PostedDate) AS [Month],</div>
<div id="cke_pastebin" style="position:absolute;left:-1000px;top:138px;width:1px;height:1px;">                DATEPART(DAY, PostedDate) AS [Day],</div>
<div id="cke_pastebin" style="position:absolute;left:-1000px;top:138px;width:1px;height:1px;">                COUNT(*) AS [Count]</div>
<div id="cke_pastebin" style="position:absolute;left:-1000px;top:138px;width:1px;height:1px;">       FROM     JobPostingPeriod</div>
<div id="cke_pastebin" style="position:absolute;left:-1000px;top:138px;width:1px;height:1px;">      WHERE     PublishToDate &gt;= GETDATE() AND PostedDate &lt;= GETDATE()</div>
<div id="cke_pastebin" style="position:absolute;left:-1000px;top:138px;width:1px;height:1px;">      GROUP BY  DATEPART(YEAR, PostedDate), DATEPART(MONTH, PostedDate), DATEPART(DAY, PostedDate)</div>
<div id="cke_pastebin" style="position:absolute;left:-1000px;top:138px;width:1px;height:1px;">      ORDER BY  [Year], [Month], [Day]";</div>
<div id="cke_pastebin" style="position:absolute;left:-1000px;top:138px;width:1px;height:1px;">var result = _connection.Query(sql));</div>
<div id="cke_pastebin" style="position:absolute;left:-1000px;top:138px;width:1px;height:1px;">return result;</div>
<div id="cke_pastebin" style="position:absolute;left:-1000px;top:138px;width:1px;height:1px;">_connection.close()</div>
<div id="cke_pastebin" style="position:absolute;left:-1000px;top:138px;width:1px;height:1px;">_connection = new SqlConnection(ConfigurationManager.ConnectionStrings["JobSeekerReadOnly"].ConnectionString);</div>
<div id="cke_pastebin" style="position:absolute;left:-1000px;top:138px;width:1px;height:1px;">_connection.open()</div>
<div id="cke_pastebin" style="position:absolute;left:-1000px;top:138px;width:1px;height:1px;">var sql =</div>
<div id="cke_pastebin" style="position:absolute;left:-1000px;top:138px;width:1px;height:1px;">    @"SELECT    DATEPART(YEAR, PostedDate) AS [Year],</div>
<div id="cke_pastebin" style="position:absolute;left:-1000px;top:138px;width:1px;height:1px;">                DATEPART(MONTH, PostedDate) AS [Month],</div>
<div id="cke_pastebin" style="position:absolute;left:-1000px;top:138px;width:1px;height:1px;">                DATEPART(DAY, PostedDate) AS [Day],</div>
<div id="cke_pastebin" style="position:absolute;left:-1000px;top:138px;width:1px;height:1px;">                COUNT(*) AS [Count]</div>
<div id="cke_pastebin" style="position:absolute;left:-1000px;top:138px;width:1px;height:1px;">       FROM     JobPostingPeriod</div>
<div id="cke_pastebin" style="position:absolute;left:-1000px;top:138px;width:1px;height:1px;">      WHERE     PublishToDate &gt;= GETDATE() AND PostedDate &lt;= GETDATE()</div>
<div id="cke_pastebin" style="position:absolute;left:-1000px;top:138px;width:1px;height:1px;">      GROUP BY  DATEPART(YEAR, PostedDate), DATEPART(MONTH, PostedDate), DATEPART(DAY, PostedDate)</div>
<div id="cke_pastebin" style="position:absolute;left:-1000px;top:138px;width:1px;height:1px;">      ORDER BY  [Year], [Month], [Day]";</div>
<div id="cke_pastebin" style="position:absolute;left:-1000px;top:138px;width:1px;height:1px;">var result = _connection.Query(sql));</div>
<div id="cke_pastebin" style="position:absolute;left:-1000px;top:138px;width:1px;height:1px;">return result;</div>
<div id="cke_pastebin" style="position:absolute;left:-1000px;top:138px;width:1px;height:1px;">_connection.close()</div>
