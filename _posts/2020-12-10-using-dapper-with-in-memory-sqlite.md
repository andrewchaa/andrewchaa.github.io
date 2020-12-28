---
title: Using dapper with sqlite
date: 2020-12-10T17:16:22
categories:
  - technical
tags:
  - data
---


#### Connection strings

```bash
# basic
Data Source=Application.db;Cache=Shared

# encrypted
Data Source=Encrypted.db;Password=MyEncryptionKey

# read only
Data Source=Reference.db;Mode=ReadOnly

# in-memory
Data Source=:memory:

# shareable in-memory
Data Source=Sharable;Mode=Memory;Cache=Shared
```

By setting Mode to memory, you can create an in-memory sqlite database. `Mode=Memory;Cache=Shared` will make the database shared across connections.

```csharp
var masterSqliteConnection = new SqliteConnection(
  "Data Source=Scriveners;Mode=Memory;Cache=Shared"
  );
 masterSqliteConnection.Open();
```



```csharp
var createCommand = connection.CreateCommand();
createCommand.CommandText =
    @"
    CREATE TABLE ServiceDefinitions (
        Name Text NOT NULL PRIMARY KEY,
        Release Text,
        Build Text,
        Team Text,
        Repository Text,
        Tier Text,
        Domain Text,
        SubDomain Text
    )";

createCommand.ExecuteNonQuery();
```

Btw, Sqlite query is case-sensitive by default. To do case-insensitive comparison, use `COLLATE NOCASE` 

```csharp
public async Task<HiveTeam> GetTeam(string name)
{
    await using var connection = new SqliteConnection(ScrivenerDatabase.ConnectionString);
    return await connection.QueryFirstOrDefaultAsync<HiveTeam>(
        $"SELECT * FROM {Tables.Teams} WHERE Name = @name COLLATE NOCASE",
        new {name});
}

```

