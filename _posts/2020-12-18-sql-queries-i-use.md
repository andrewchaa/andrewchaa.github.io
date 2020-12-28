---
title: Sql queries I use for SQLite
date: 2020-12-18T16:57:20
categories:
  - technical
tags:
  - data
---


#### Case insensitivity in SQLite

This was an issue when I did lots of string comparision. There are two ways. First, you can use `COLLATE NOCASE` in the where clause, each time. The other option is you create the column to be case-insensitive. The second option is much faster in performance

```sql
SELECT DISTINCT Repository 
  FROM ServiceDefinitions 
WHERE Team = @Team COLLATE NOCASE
```

```sql
CREATE TABLE "DomainEvents" (
	"Name"	Text NOT NULL COLLATE NOCASE,
	"Obsolete"	INTEGER,
	"Description"	Text,
	"Domain"	BLOB,
	"SubDomain"	Text,
	"Team"	Text,
	"TeamLead"	Text,
	"SubscriberCount"	INTEGER,
	PRIMARY KEY("Name")
);
```

#### Case-insensitive string comparison with Sqlite

Use `COLLATE NOCASE`

```sql
SELECT DISTINCT Repository 
  FROM ServiceDefinitions 
WHERE Team = @Team COLLATE NOCASE
```

#### Create a table

```sql
CREATE TABLE IF NOT EXISTS ServiceDefinitions (
    Name Text NOT NULL PRIMARY KEY,
    Team Text,
    Repository Text,
    Tier Text,
    Domain Text,
    SubDomain Text
)

```

#### Handling duplicates

```sql
SELECT DISTINCT Domain FROM Services
```

The above distinct is case-sensitive, especially in sqlite. for case-insensitive, use GROUP BY.

```sql
SELECT Domain Services GROUP BY LOWER(Domain)
```

#### Wild-card match

```sql
LIKE '%.rtf'
```

