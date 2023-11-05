---
title: Getting starated with Mongo DB
date: 2023-10-28
tags:
  - mongodb
  - database
---

### Tools

- VS Code extension: [https://www.mongodb.com/docs/mongodb-vscode/](https://www.mongodb.com/docs/mongodb-vscode/)

- Compass: [https://www.mongodb.com/products/tools/compass](https://www.mongodb.com/products/tools/compass)

### Retrieve all documents in the collection

The **`find()`** method in MongoDB Node.js driver returns a cursor to the documents, not the documents themselves. To retrieve all documents from a query, you need to iterate over the cursor or convert it to an array.

```javascript
use('warranty')

db.getCollection('registrations').find().toArray()
```

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

## Index

When creating an index in MongoDB, you are defining the way MongoDB organizes and traverses the data when performing queries. Choosing the correct index type is crucial for query performance. Here's what each of the index types you mentioned means:

**1 (Ascending)**: This is an ascending order index. When you index a field with a value of 1, MongoDB will sort the indexed field in ascending order. This is beneficial for queries that sort ascendingly through the field.

**1 (Descending)**: This is a descending order index. When you index a field with a value of -1, MongoDB sorts the indexed field in descending order. This is useful for queries that sort descendingly through the field.

**2dsphere**: This index type supports queries that calculate geometries on an earth-like sphere. It's the index of choice for storing geographical location data and performing complex location-based queries like finding the nearest points of interest, calculating distances, and querying within specified regions or boundaries.

**Text**: A text index is used to support text search queries on string content. A text index will tokenize the string into words, filter out common stop words, and perform case-insensitive matching. It's useful for full-text search in applications, such as searching through article contents, comments, posts, etc.

When deciding which index to use, consider the following:

- For fields where you'll perform range queries or sort operations, a standard ascending (1) or descending (-1) index would be appropriate.

- If you're working with geospatial data and need to run queries that consider the Earth's curvature, use a 2dsphere index.

- If you need to search for text within string fields, then a text index is the right choice.

Indexes are not just limited to these types; there are other index types in MongoDB for specific use cases, such as `hashed` indexes for hash-based sharding and `compound` indexes that index multiple fields together. When creating a compound index, each field can be indexed as either ascending or descending, which you would decide based on how you query those fields.

