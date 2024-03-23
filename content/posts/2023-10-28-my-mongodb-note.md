---
title: My Mongo DB Note
date: 2023-10-28
tags:
  - mongodb
  - database
---

### Tools

- VS Code extension: [https://www.mongodb.com/docs/mongodb-vscode/](https://www.mongodb.com/docs/mongodb-vscode/)
- Compass: [https://www.mongodb.com/products/tools/compass](https://www.mongodb.com/products/tools/compass)

## Resources

- Quick reference: [https://www.mongodb.com/docs/drivers/node/current/quick-reference/#std-label-node-quick-reference](https://www.mongodb.com/docs/drivers/node/current/quick-reference/#std-label-node-quick-reference)

## Queries
### Retrieve all documents in the collection
The **`find()`** method in MongoDB Node.js driver returns a cursor to the documents, not the documents themselves. To retrieve all documents from a query, you need to iterate over the cursor or convert it to an array.

```javascript
use('warranty')
db.getCollection('registrations').find().toArray()
```

### Find a single document
`findOne()` for a single document or `find()` for multiple documents

```typescript
const users = await usersCollection
      .find<User>({email='user@email.com'})
	  .sort({ updateDateIso: -1})
      .skip(skip)
      .limit(pageSize)
      .toArray()
```

### Find with nested attributes

```typescript
{ "customer.name": 'Mrs Livingston'}
```

### Find documents with property’s value with trailing spaces

```javascript
// Compass
{"jobNo": {"$regex": ".+\\s+$"}}

// Code
const results = await yourCollection.find({
  jobNo: { $regex: /\s+$/, $options: 'i' }
}).toArray();
```

### Find if a property has `Int32` type value
Sometimes, your property has incorrect type value. In my case, `gasSafeNumber` is supposed to have `string` value but some documents had `Int32` values.

```javascript
find({ gasSafeNumber: { $type: ['int']}})
```

### Check the existence of the field

```javascript
find({ postCode: { $exists: true } })
```

### FInd if email contains `skyline`

```javascript
find({"email": {"$regex": "skyline"}})
```

### Sorting
Use `.sort({})`

`1` for ascending order and `-1` for descending order


```javascript
const users = await usersCollection
	.find<User>({email='youngho@email.com'})
	.sort({ updateDateIso: -1})
	.toArray()
```

## Aggregation
### Removing Duplications
In one use-case, I had to retrieve `companyId` and `companyName` from `users` collection. As the collection is about users, those retrieved results contained duplicates. To return distinct results without duplicates, I useed the aggregation framework with `$group` stage to group the documents by the specified fields, `companyId` and `companyName` and then project the fields I was interested in. Here's how I wrote the MongoDB query:

```javascript
db.users.aggregate([
  {
    $group: {
      _id: { companyId: "$companyId", companyName: "$companyName" },
    }
  },
  {
    $project: {
      _id: 0, // Exclude the _id field from the results
      companyId: "$_id.companyId", // Project the companyId
      companyName: "$_id.companyName" // Project the companyName
    }
  }
])
```

Here's what this aggregation does:
1. `$group`: This stage groups documents by both `companyId` and `companyName`. Each unique combination of `companyId` and `companyName` becomes a single document in the resulting output of this stage.
2. `$project`: This stage then reshapes each document to include only the `companyId` and `companyName`. The `_id: 0` excludes the `_id` field from the output, and the values are set to the corresponding parts of the `$_id` object created in the `$group` stage.

## Update
### Update a field

```javascript
use('service-agent');

db.getCollection('users').updateMany(
  { email: { $in: [
    "info@deepeyes.co.uk",
    "accounts@deepeyes.com",
  ]}}, 
  { $set: { 'status': 'ACTIVE' } }
);
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

### Remove a field that’s not used any more
You can use `$unset`

```javascript
use('warranty');

const query = { postCode: { $exists: true } };
const updateResult = db.getCollection('registrations').updateMany(
  query,
  { $unset: { postCode: "" } }
);
console.log(`Documents updated: ${updateResult.modifiedCount}`);
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


## Pagination


use `$skip`, `$limit`, and `countDocuments`. 


```typescript
export const selectUsersMongo = async (
  page: number,
  pageSize: number,
  searchCondition: string,
  searchValue: string
)
  : Promise<[User[], number]>  => {
  logger.info(`selecting users by page: ${page} and pageSize: ${pageSize}`)

  await client.connect()

  try {
    const skip = (page - 1) * pageSize
    const filter = getFilter(searchCondition, searchValue)
    const total = await usersCollection.countDocuments(filter)
    const users = await usersCollection
      .find<User>(filter)
      .skip(skip)
      .limit(pageSize)
      .toArray()

    return [users, total]
  } catch (error) {
    logger.error('error selecting users:', error)
  } finally {
    await client.close()
  }
}

```


## Removing `_id` from retrieved data


Mongo DB uses `_id` as an identity attribute that’s unique. Yet, I don’t use it as I have another key that’s unique to the domain. Often it’s unnecessary to have the attribute and the value in the retrieved data set.


To remove the `_id` field from the documents returned by a MongoDB query in your JavaScript application, you have a couple of options:


### Use MongoDB's `$project` in Aggregation Pipeline


If you're using an aggregation pipeline, you can add a `$project` stage to your pipeline to exclude the `_id` field:


```javascript
db.collection.aggregate([
  // ... (your other aggregation stages)
  {
    $project: {
      _id: 0, // Exclude the _id field
      // Include other fields you want
    }
  }
]);
```


### Modify the Result in JavaScript


If you're not using an aggregation pipeline or prefer to handle this in JavaScript, you can simply delete the `_id` property from each object after you've fetched the results:


```javascript
const results = await db.collection.find().toArray();

results.forEach(doc => {
  delete doc._id; // Remove the _id property
});

// Now 'results' doesn't have the _id field

```


### Specify Fields in `find()` or `findOne()`


If you are using `find()` or `findOne()`, you can specify which fields to include or exclude in the second argument (projection):


```javascript
const results = await db.collection.find({}, { projection: { _id: 0 } }).toArray();

```


In this code, `{ projection: { _id: 0 } }` is used to exclude the `_id` field from the results.


### Choose Based on Use Case

- Use the `$project` stage in the aggregation pipeline if you are already using an aggregation pipeline for other reasons.
- Modify the result in JavaScript if you want more flexibility or need to perform other transformations on the data.
- Use projection in `find()` or `findOne()` for a straightforward query without an aggregation pipeline.

Remember, the `_id` field is a unique identifier for each document in MongoDB. If you remove it, make sure that it's not needed for any other operations (like updates or deletes) later in your application.


