---
title: The type of the key field 'JobId' is expected to be 'System.Int32', but the
  value provided is actually of type 'System.Int64'.
date: 2010-04-05 10:49:13.000000000 +01:00
type: post
published: true
status: publish
categories: []
tags: []
meta:
  _edit_last: '1907066'
author:
  login: simplelifeuk
  email: andrew.chaa@yahoo.co.uk
  display_name: Andy
  first_name: Andrew
  last_name: Chaa
---
<p>It's a Easter Monday, very quiet everywhere. I have been working with Sqlite and had an weird error. When I try to update a record in sqlite, using Entity Framework, it complains that the type of primary key id is system.int64.</p>
<p>My code is below</p>
<p>JobTable jobToUpdate = (from j in _entities.JobTableSet<br />
where j.JobId == job.Id<br />
select j).FirstOrDefault();</p>
<p>jobToUpdate.Author = job.Author;<br />
jobToUpdate.Customer = job.Customer;<br />
jobToUpdate.Date = job.Date;<br />
jobToUpdate.Description = job.Description;<br />
jobToUpdate.Title = job.Title;</p>
<p>_entities.ApplyPropertyChanges(jobToUpdate.EntityKey.EntitySetName, jobToUpdate);<br />
_entities.SaveChanges();</p>
<p>I struggled to sort it out for 30 minutes and gave up. I have a similar code in ASP.Net MVC 1 and it works ok.</p>
<p>-----------------------</p>
<p>30 minutes later.</p>
<p>For some reason, integer column in sqlite is Int64. When you use Entity Framework and create classes from database using the automated tool, it converts the column to Int32. So you have to change it to Int64 manually. Secondly, if you use your own model class, the type of the key needs to be long, not int, as int translates into Int32 (not sure what happens in 64bit windows)</p>
