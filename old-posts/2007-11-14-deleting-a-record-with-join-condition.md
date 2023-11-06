---
title: deleting a record with join condition
date: 2007-11-14 16:16:29.000000000 +00:00
categories: []
tags: []
---
<div style="border:1px ridge white;background-color:#FFFFCC;font-family:Courier New;font-size:10pt;margin:10px;padding:10px;">DELETE&nbsp;dbo.Candy&nbsp;&nbsp;<br />
&nbsp;&nbsp;FROM&nbsp;dbo.Candy&nbsp;INNER&nbsp;JOIN&nbsp;dbo.CandyReport&nbsp;&nbsp;<br />
&nbsp;&nbsp;&nbsp;&nbsp;ON&nbsp;Candy.CandyReportId&nbsp;=&nbsp;CandyReport.CandyReportId&nbsp;&nbsp;<br />
&nbsp;WHERE&nbsp;CandyReport.CandyId&nbsp;=&nbsp;@CandyId<br />
&nbsp;<br />
DELETE&nbsp;dbo.CandyReport<br />
&nbsp;WHERE&nbsp;CandyReport.CandyId&nbsp;=&nbsp;@CandyId</p>
</div>
<p>사실 그렇게 어려운 건 아니지만, 그래도 tip으로.</p>
