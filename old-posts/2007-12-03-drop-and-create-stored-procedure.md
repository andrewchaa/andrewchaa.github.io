---
title: Drop and create stored procedure
date: 2007-12-03 21:02:19.000000000 +00:00
categories: []
tags: []
---
<pre>
USE SekyeeManagementSystem;
GO
IF OBJECT_ID ( 'dbo.CustomerSearchByNationality', 'P' ) IS NOT NULL
    DROP PROCEDURE dbo.CustomerSearchByNationality;
GO
CREATE PROCEDURE CustomerSearchByNationality
</pre>
