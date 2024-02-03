---
title: Learning PostgreSQL
date: 2023-05-22
tags:
  - database
  - postgresql
---

### The motto

- The most advanced open-source database in the world
- POST-Ingres: Michael Stonebraker developed Ingress and then a post-Ingres project

## Installation


### postgresql


```shell
brew install postgresql
brew services start postgresql@14
```


### psql


First check if you have `psql` is installed.


```shell
psql --version
```


If it’s not, install it via `brew`
[https://www.timescale.com/blog/how-to-install-psql-on-mac-ubuntu-debian-windows/](https://www.timescale.com/blog/how-to-install-psql-on-mac-ubuntu-debian-windows/)


```shell
brew doctor
brew update
brew install libpq

brew link --force libpq
```


## Postico


### Autocomplete


Press Tab, and Postico automatically tries to complete the word you are typing


### Shortcuts

- ⌘ ↩︎: Execute the current query (or the current selection, if any)
- ⌥⌘↩︎: Execute all queries in the Query View
- ⇧⌘T: Go the SQL Query View (used to be called the Terminal)
- ⇥: Shift the selected line(s) to the right (increase indentation)
- ⇧⇥: Shift the selected line(s) to the left (decrease indentation)
- ⌘]: Alternate shortcut for shift right
- ⌘[: Alternate shortcut for shift left
- ^⌘←: Replace the current query with the previous query from your history.
- ^⌘→: Replace the current query with the next query from your history.
- ⌘/: Comment or uncomment the selected line(s) by prepending two dashes
- ⌥⌘/: Comment (or uncomment) the selection with a block comment (/* */)
- ^H: Look up the current word (or selection) in [Dash](https://kapeli.com/dash)

## Commands


```shell
# connect
psql -h localhost -p 15432 -u <user>

# list databases
\l

# connect to database
\c machinelearning

# list tables
\dt
```


## Statements


I came from a SQL Server background, and Postgres has slight variations in syntax. `ENUM` was interesting that I could create a custom type. Also, I have to put `;` to execute the statement in `psql`. Hmm, I’m not a big fan of typing `;` at the end of the statement (23/10/2023)


## Upsert


```sql
WITH _users AS (
  INSERT INTO users (users_uid, ...)
  VALUES (?:2, ...)
  ON CONFLICT (users_uid) DO
  UPDATE SET users_uid = EXCLUDED.users_uid
)
INSERT INTO conversations (conversation_uid, conversation_title, users_id, created_at)
VALUES (
  ?:0,
  ?:1,
  (SELECT users_id FROM _users),
  ?:3
  )
```


`ON CONFLICT` is a feature of PostgreSQL that allows you to perform an action when a proposed record conflicts with an existing record.


`ON CONFLICT ON user_uid` clause is saying "when you try to insert a record into the `users` table and the `user_uid` already exists in the table, then do the following action: `UPDATE user_uid = EXCLUDED.user_uid`. This means that if a conflict occurs, then the existing record's `user_uid` should be updated to the new value.


The `EXCLUDED` keyword is a special table in PostgreSQL that contains the row proposed for insertion. So `EXCLUDED.user_uid` refers to the `user_uid` of the new record that you tried to insert.


## Managing table


### Creating a table


This is more of a comprehensive example to create tables, constraints, and indexes. (23/10/23)


```sql
CREATE TABLE conversations (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  uid UUID NOT NULL,
  title VARCHAR(512),
  created_at TIMESTAMP NOT NULL,

  CONSTRAINT pk_id PRIMARY KEY (id),
  CONSTRAINT uk_uid UNIQUE (uid)
);

CREATE TYPE author AS ENUM (
  'MODEL',
  'AUTHOR'
);

CREATE TABLE messages (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  uid UUID NOT NULL,
  conversation_id BIGINT NOT NULL,
  author author NOT NULL,
  created_at TIMESTAMP NOT NULL,

  CONSTRAINT pk_id PRIMARY KEY (id),
  CONSTRAINT uk_uid UNIQUE (uid),
  CONSTRAINT fk_messages_conversations_id FOREIGN KEY (conversation_id) REFERENCES conversations (id)
)

CREATE INDEX idx_messages_conversation_id ON messages (conversation_id);
```


### Deleting table


```sql
DROP TABLE Conversations
DROP TABLE Messages
```


### Altering table

- Only one altering action per statement.
- Put `;` to mark the end of the statement.

```sql
ALTER TABLE conversations DROP COLUMN user_uid;
ALTER TABLE conversations ADD COLUMN user_id bigint NOT NULL:
ALTER TABLE conversations 
  ADD CONSTRAINT fk_conversations_user_id 
	FOREIGN KEY (user_id)
	REFERENCES users (user_id);
```


## ENUM


An enum (short for "enumerated type") in PostgreSQL is a data type that comprises a static, ordered set of values. They are useful when a column is intended to only contain a limited set of possible values, which can be represented as human-readable strings, making the data self-explanatory and enforcing integrity at the database level.


### **Creating Enum**


Enums are created with the `CREATE TYPE` command, followed by the `AS ENUM` keyword and a list of possible values.


```sql
CREATE TYPE mood AS ENUM ('sad', 'ok', 'happy');
```


Once created, the enum can be used as a column type in a table:


```sql
CREATE TABLE person (
    name text,
    current_mood mood
);
```


**Advantages:**

1. **Data Integrity:** Enums restrict the column to the predefined list of values, preventing invalid data from being inserted.
2. **Clarity:** They make the data more readable and self-documenting, as the allowed values are clear and meaningful.
3. **Performance:** Comparisons of enum values are faster than those of text values because they are internally represented as integers.

**Considerations:**

- **Flexibility:** Altering existing enums can be cumbersome. You can easily add new values, but removing or renaming existing ones is not straightforward and typically involves creating a new enum type.
- **Portability:** Since enums are a PostgreSQL-specific feature, using them can reduce the portability of your database to other SQL systems which may not support enums or implement them differently.
- **Indexing and Constraints:** While you can index enum columns and use them in constraints and joins, their special nature means that you have to be mindful of how they interact with other PostgreSQL features like array types or composite types.

### Deleting Enum


```sql
DROP TYPE author_type
```


### Alter Enum


Altering a value is not permitted. You have to create a new one, convert the value, and replace it with the old one


```typescript
CREATE TYPE author_type AS ENUM (
  'USER',
  'BOT'
)

ALTER TABLE messages 
	ALTER COLUMN author TYPE author_type
  USING author::text::author_type
```


