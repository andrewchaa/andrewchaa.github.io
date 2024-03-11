---
title: Using Regex Search for MongoDB Queries
date: 2024-03-11
tags:
  - mongodb
  - regex
---
As a developer, I often find myself in situations where I need to perform case-insensitive searches on data stored in MongoDB. This can be particularly useful when dealing with user information, such as names or emails. Fortunately, MongoDB provides a powerful feature called "regular expressions search" that can help us achieve this goal.

Here's the code snippet I wrote:

```javascript
function getSearchFilter(queryStringParameters: APIGatewayProxyEventQueryStringParameters) {
  const params = [
    'companyId',
    'jobNo',
    'engineer.email',
    'customer.address.postcode',
    'jobStatus',
  ];

  let filter = new Map<string, string | number | object>();
  params.forEach((key) => {
    if (queryStringParameters && queryStringParameters[key]) {
      const value = queryStringParameters[key];
      if (typeof value === 'number') {
        filter.set(key, parseInt(queryStringParameters[key]));
      } else {
        filter.set(key, { $regex: new RegExp(queryStringParameters[key], 'i') });
      }

      return;
    }
  });

  return filter;
}
```

In this code snippet, we define a function `getSearchFilter` that takes an object `queryStringParameters` as input. This object contains the parameters passed in the query string of a request.

The function first defines an array `params` containing the keys we want to search for. Then, it creates an empty `Map` called `filter`.

Next, we loop through each key in the `params` array. If the `queryStringParameters` object contains a value for the current key, we check if the value is a number or not.

If the value is a number, we simply add it to the `filter` map with the corresponding key.

However, if the value is not a number, we create a regular expression object using the `new RegExp()` constructor. We pass the value from `queryStringParameters` as the first argument and the `'i'` flag as the second argument. The `'i'` flag makes the regular expression case-insensitive.

We then add this regular expression object to the `filter` map, using the `$regex` operator provided by MongoDB. This tells MongoDB to perform a regular expression search for the given key and value.

Finally, we return the `filter` map, which can be used in a MongoDB query to perform a case-insensitive search.

By leveraging regular expressions in this way, I was able to easily search for user names and emails, regardless of their capitalization. This approach can be applied to various scenarios where case-insensitive searches are required, making it a valuable tool in a developer's arsenal.