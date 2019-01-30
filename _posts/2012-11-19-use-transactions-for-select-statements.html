---
layout: post
title: Use transactions for select statements
date: 2012-11-19 16:58:32.000000000 +00:00
type: post
published: true
status: publish
categories:
- Programming
tags:
- sql
meta:
  _edit_last: '1907066'
  tagazine-media: a:7:{s:7:"primary";s:0:"";s:6:"images";a:0:{}s:6:"videos";a:0:{}s:11:"image_count";i:0;s:6:"author";s:7:"1907066";s:7:"blog_id";s:7:"1833431";s:9:"mod_stamp";s:19:"2012-11-19
    16:58:32";}
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
<p>Transactions are usually when you have insert, update or delete statements with the "atomic" behaviour. However, in a highly concurrent application, it could happen that data you've read is already modified.</p>
<p>In this situation, you need to use a transaction to wrap your selects with the correct <a href="http://msdn.microsoft.com/en-us/library/ms173763(v=sql.100).aspx">isolation level</a>. </p>
<p>It's usually advisable to set the <a href="http://msdn.microsoft.com/en-us/library/ms186736.aspx">deadlock property</a> to low to avoid impacting behaviours other than select.</p>
<p>[sourcecode language="sql"]</p>
<p>...</p>
<p>CREATE procedure [Event].[ReadEvents]<br />
...<br />
  @startDate datetime = NULL,<br />
  @endDate datetime = NULL,<br />
...</p>
<p>  AS<br />
begin</p>
<p>...</p>
<p>  set nocount on;<br />
  set deadlock_priority low;<br />
  set transaction isolation level serializable;</p>
<p>  begin transaction;</p>
<p>...</p>
<p>commit transaction;    </p>
<p>end</p>
<p>GO</p>
<p>[/sourcecode]</p>
