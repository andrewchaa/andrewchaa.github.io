---
title: Getting starated with Mongo DB
date: 2023-10-28
tags:
  - mongodb
  - database
---

## Tools

- VS Code extension: [https://www.mongodb.com/docs/mongodb-vscode/](https://www.mongodb.com/docs/mongodb-vscode/)

- Compass: [https://www.mongodb.com/products/tools/compass](https://www.mongodb.com/products/tools/compass)

## Usage examples

### Upsert a document

Use the key(s) as filter expression and set `upsert` to `true`. 

```typescript
import { MongoClient } from 'mongodb'
...

  const user: User = {
    companyId: companyId.trim(),
    companyName: companyName.trim(),
    firstname: firstname.trim(),
    lastname: lastname.trim(),
    email: email.trim().toLowerCase(),
    gasSafetyNumber: gasSafetyNumber?.trim(),
    oftecNumber: oftecNumber?.trim(),
  }

  const database = client.db('service-agent')
  const users = database.collection('users')
  const result = await users.updateOne(
    { companyId: user.companyId, email: user.email },
    { $set: { ...user } },
    { upsert: true }
  )
  await client.close()

```

