---
title: 50 Interview Questions for a Full Stack TypeScript Developer
date: 2023-03-14
tags:

---

I wrote down all the answers in bullet points so that I can remember them easily.

## Technical Skills

### What is TypeScript? What are its benefits over JavaScript?

- A superset of JavaScript

- Allows developers to write more reliable, maintainable, and scalable JavaScript code

- Strong typing: catch errors at compile time

- Better tooling support: better IDE support, auto-completing, refactoring, and code navigation

- Improved scalability for large code base by helping to prevent common errors

- Improved maintainability: type annotations make the code more readable

### What are the most important features of TypeScript?

- Static typing

- ES6/ESNext support: classes, arrow functions, async/await

- Type inference

- Tooling support

### What is the difference between "any" and "unknown" types in TypeScript?

- Type-safe counterpart of any

```javascript
anyValue.helloworld() // no error
unknownValue.helloWorld() // error
```

- You can assign `any` to anything but can assign `unknow` only to itself or `any`

- In an intersection everything absorbs unknown. `unknown & null; // null`

- In a union an unknown absorbs everything `unknown | null; // unknown`

- Only equality operators are allowed with unknown

```javascript
x == 5;
x !== 10;
x >= 0; // Error
x + 1; // Error
```

### What is the "non-null assertion operator" in TypeScript?

- To assert that its operand cannot be null or undefined during runtime

- Used where the compiler is unable to check if a variable cannot be null / undefined

```javascript
function splitInHalf(str: string | null) {
    let checkString = function () {
        if (str == null || str == undefined) {
            str = "test";
        }
    }
    checkString();
    return str!.substring(0, str!.length / 2);
}
```

### What is Node.js? How does it differ from other server-side technologies?

- server-side runtime environment that allows developers to build scalable and high-performing applications using JavaScript

- Built on the V8 JavaScript engine

- Event-driven, non-blocking I/O model to handle large number of connections and requests

- Developers can use the same javaScript for both the client and service-side of an application.

### What is event-driven programming? How does Node.js support event-driven programming?

- Supports event-driven programming through its event loop

- Event loop processes events in a non-blocking manner.

- Add a event to a queue and continues to process other events. 

### What is a callback function in Node.js?

- A function that is passed as an argument to another function

- Is executed when the first function has completed its taks

- Allow asynchronous processing of data without blocking the execution of other code

```javascript
const fs = require('fs');

// Read file asynchronously
fs.readFile('file.txt', 'utf8', function (err, data) {
  if (err) {
    console.error(err);
  } else {
    console.log(data);
  }
});

// Do something else while the file is being read
console.log('Reading file...'); 
```

### What are promises in Node.js?

- Represents the eventual completion of an asynchronous operation and its resultinv value

- Three states: `Pending`, `Fulfilled`, and `Rejected`

```javascript
const fs = require('fs');

const readFilePromise = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

readFilePromise('file.txt')
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });
```

### What is the difference between async/await and promises?

- both handles asynchronous operations

- Promises use a chain of `then()` and `catch()`

- `async/await` for a more synchronous style of coding

### What is middleware in Node.js?

- A function that handles specific tasks related to incoming and outgoing HTTP requests and responses.

```javascript
const express = require('express');
const app = express();

// Middleware function to log incoming requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Route handler function
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
```

### What is the purpose of a package.json file?

- Define metadata about a Node.js project

- list all the dependency packages

### What is a REST API?

- Representational State Transfer API

- Uses HTTP methods to interact with resources on a web server

- Scalable and flexible

- Decoupling and Caching

### What is GraphQL? How does it differ from REST?

- Unlike REST that exposes resources as endpoints, define a schema that describes the types of data available and the relationships

- Retrieve data from multiple sources with a single query

- The server sends only the data that the client has requested

### How would you implement authentication and authorization in a Node.js application?

- Authentication: verify a user’s identification through the acquisition of credentials

- Authorization: allow authenticated users access to resources

```javascript
const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
```

### What is a JWT? How does it work in a Node.js application?

- JSON Web Token

- Standardized format for representing claims securely between two parties

- header + payload + signature

### What is OAuth? How does it work in a Node.js application?

- Open Authorization

- Delegate authentication and authorization to third-party applications. Auth Server, social media platforms

- Access Token

- Refresh Token

### What are some of the most popular Node.js frameworks? Which one have you used? Why?

- Express: the most popular framework.

- NestJs: 

	- Modular architecture

	- TypeScript support

	- Decorators

	- Built-in dependency injection

	- Middleware

- What is serverless architecture? How does it work with Node.js?

- What is AWS Lambda? How does it work with Node.js?

- What is Docker? How does it work with Node.js?

- What is Kubernetes? How does it work with Node.js?

Project Management:
23. How do you approach a new project?

- What is your process for solving technical problems?

- What are the most important factors in building a successful project?

- How do you manage scope creep?

- What is your experience with Agile development methodologies?

- What is the most difficult project you have worked on? Why was it difficult?

- How do you balance competing priorities?

- How do you handle communication with project stakeholders?

- What is your experience with project documentation?

Backend Development:
32. What is your experience with database management systems? Which one have you used? Why?

- What is NoSQL? What is its benefit over SQL?

- What is MongoDB? How does it work with Node.js?

- What is PostgreSQL? How does it work with Node.js?

- What is Redis? How does it work with Node.js?

- What is Elasticsearch? How does it work with Node.js?

- What is the most complex backend project you have worked on? What was your role?

- What are your thoughts on microservices architecture? What are its benefits and drawbacks?

- What is your experience with API development? What is your preferred approach?

- What are the best practices for testing APIs in Node.js?

- What is your experience with server-side rendering? What are its benefits and drawbacks?

- What is your experience with caching? What are the best practices for caching in a Node.js application?

- What is the difference between unit testing and integration testing? Which one have you used in your previous projects?

- What is the difference between manual testing and automated testing? Which one have you used in your previous projects?

Frontend Development:
46. What is your experience with front-end frameworks? Which one have you used? Why?

- What is your experience with React? What are its benefits and drawbacks?

- What is your experience with Vue.js? What are its benefits and drawbacks?

- What is your experience with Angular? What are its benefits and drawbacks?

- What is your experience with mobile app development? Which platform have

