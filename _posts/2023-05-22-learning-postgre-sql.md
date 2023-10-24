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

## psql

### Installation

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

### Commands

```shell
# connect
psql -h localhost -p 15432 -u <user>

# list tables
\l

# connect to database
\c machinelearning

# list tables
\dt
```

### Statements

I came from a SQL Server background, and Postgres has slight variations in syntax. `ENUM` was interesting that I could create a custom type. Also, I have to put `;` to execute the statement in `psql`. Hmm, I’m not a big fan of typing `;` at the end of the statement (23/10/2023)

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

