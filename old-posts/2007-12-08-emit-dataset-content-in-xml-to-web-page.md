---
title: Emit DataSet content in xml to web page
date: 2007-12-08 15:19:46.000000000 +00:00
categories: []
tags: []
---
<p>요즘 YUI로 작업을 하고 있는데, 많은 데이터들이 xml로 필요하다. 그래서 간단하게 만들었지롱.</p>
```
DataSet job = this.Customer.GetJobs(PageUtility.ParseQueryStringInt("CustomerId"));
job.DataSetName = "ResultSet";
job.Namespace = "xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns=\"urn:yahoo:lcl\"";

if (job.Tables.Count &gt; 0)
    job.Tables[0].TableName = "Result";

Response.ContentType = "text/xml";
Response.Write(job.GetXml());

```
