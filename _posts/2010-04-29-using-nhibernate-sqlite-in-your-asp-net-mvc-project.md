---
title: Using NHibernate, Sqlite in your ASP.Net MVC project
date: 2010-04-29 09:38:50.000000000 +01:00
categories:
- Programming
tags:
- MS Test
- NHibernate
meta:
  _edit_last: '1907066'
  _wp_old_slug: copy-hibernate-cfg-xml-to-ms-test-out-directory
---
<p>I used Entity Framework for my personal projects for a while but wanted to try NHibernate. Instead of NUnit, I tried MS Test this time.</p>
<p>First problem was that MS Test fails, complaining that hibernate.cfg.xml does not exist. It did not copy the file to MS Test out directory. Of course, I set "Copy to Output Directory" to "Copy always". <a href="http://nhforge.org/wikis/howtonh/your-first-nhibernate-based-application.aspx">Thanks to NHibernate Getting Started Guide</a>. It is copied to bin folder, but not to output folder. "System.IO.FileNotFoundException: Could not find file '...\TestResults\684 2010-04-29 09_42_19\Out\hibernate.cfg.xml'..  " occurred each time I ran the test. Some say it is a bug in MS Test, and I agree.</p>
<p>In order to copy the file to the output, you need to use <a href="http://msdn.microsoft.com/en-us/library/microsoft.visualstudio.testtools.webtesting.deploymentitemattribute%28VS.80%29.aspx">DeploymentItem</a> attribute. Thanks to Stackoverflow post, "<a href="http://stackoverflow.com/questions/20173/mstest-and-nhibernate">NHibernate and MS Test</a>".You can put the attribute at class level as well as method level. I put it on the test class.</p>
<p>[sourcecode language="csharp"]</p>
<p>[TestClass, DeploymentItem(@&quot;.\hibernate.cfg.xml&quot;)]<br />
public class Task_Test<br />
{<br />
    ...<br />
}</p>
<p>[/sourcecode]</p>
<p>Then I had this error message; "Could not create the driver from NHibernate.Driver.SQLiteDriver"<br />
I use "System.Data.SQLite" from <a href="http://sqlite.phxsoftware.com/">sqlite.phxsoftware.com</a>.After a little bit of googling, I found out that the example configuration was using "NHibernate.Driver.SQLiteDriver" and it is for old Sqlite driver.<br />
The connection.driver_class should be "<a href="http://sqlite.phxsoftware.com/forums/t/564.aspx">NHibernate.Driver.SQLite20Driver</a>" in order to use System.Data.SQLite.<br />
The below is my config.</p>
<p>hibernate.cfg.xml</p>
<p>[sourcecode language="xml"]</p>
<p>&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot; ?&gt;<br />
&lt;hibernate-configuration xmlns=&quot;urn:nhibernate-configuration-2.2&quot;&gt;<br />
 &lt;session-factory&gt;<br />
 &lt;property name=&quot;connection.provider&quot;&gt;NHibernate.Connection.DriverConnectionProvider&lt;/property&gt;<br />
 &lt;property name=&quot;dialect&quot;&gt;NHibernate.Dialect.SQLiteDialect&lt;/property&gt;<br />
 &lt;property name=&quot;connection.driver_class&quot;&gt;NHibernate.Driver.SQLite20Driver&lt;/property&gt;<br />
 &lt;property name=&quot;connection.connection_string&quot;&gt;data source=SprintManager.sqlite&lt;/property&gt;<br />
 &lt;property name=&quot;show_sql&quot;&gt;true&lt;/property&gt;<br />
 &lt;property name=&quot;proxyfactory.factory_class&quot;&gt;NHibernate.ByteCode.LinFu.ProxyFactoryFactory, NHibernate.ByteCode.LinFu&lt;/property&gt;</p>
<p> &lt;/session-factory&gt;<br />
&lt;/hibernate-configuration&gt;<br />
[/sourcecode]</p>
