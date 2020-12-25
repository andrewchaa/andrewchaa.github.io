---
title: Updating NHibernate version
date: 2012-08-29 12:52:20.000000000 +01:00
categories:
- Programming
tags:
- NHibernate
meta:
  _edit_last: '1907066'
  _wpas_skip_twitter: '1'
  _wpas_skip_linkedin: '1'
  tagazine-media: a:7:{s:7:"primary";s:0:"";s:6:"images";a:0:{}s:6:"videos";a:0:{}s:11:"image_count";i:0;s:6:"author";s:7:"1907066";s:7:"blog_id";s:7:"1833431";s:9:"mod_stamp";s:19:"2012-08-30
    12:40:51";}
---
<p>I'm updating NHibernate version of a project and comes across a few errors.</p>
<h3>NHibernate.ISession' does not contain a definition for 'Linq'</h3>
<p>It seems session.Linq&lt;T&gt;() is gone. <a href="http://stackoverflow.com/questions/4768212/nhibernate-isession-does-not-contain-a-definition-for-linq">An answer on StackOverflow</a> says I need to use session.Query&lt;T&gt;() instead.</p>
<pre>session.Linq&lt;T&gt;() is for the contrib provider for NHibernate 2.x
session.Query&lt;T&gt;() is for the built-in provider in NHibernate 3.x</pre>
