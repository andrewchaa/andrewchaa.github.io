---
title: Interview Questions for a Full Stack TypeScript Developer role
date: 2023-03-14
tags:

---

I wrote down all the answers in bullet points so that I can remember them easily.

## Technical Skills

### What is Node.js? Explain its advantages and disadvantages.

- Open-source, cross-platform runtime environment built on Chrome’s V8 JavaScript engine

- Non-blocking IO: asynchronous, event-driven model

- Single language for both front-end and back-end

- Large ecosystem

### How do you handle asynchronous code in Node.js? Explain callbacks, promises, and async/await.

- A callback is a function passed as an agrument to another function. It gets executed after the completion of an asynchronous operation

```javascript
const fs = require('fs');

fs.readFile('example.txt', 'utf-8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
  } else {
    console.log('File contents:', data);
  }
});
```

- A promise represents the result of an asynchronous operation that may not have completed

- Two possible outcomes: resolved, rejected

- change `.then()` for success and `.catch()` for error

```javascript
const fs = require('fs').promises;

fs.readFile('example.txt', 'utf-8')
  .then(data => {
    console.log('File contents:', data);
  })
  .catch(err => {
    console.error('Error reading file:', err);
  });
```

- Async / Await is a syntactic feature that allows developers to write asynchronous code that looks and behaves like synchronous code

```javascript
const fs = require('fs').promises;

async function readExampleFile() {
  try {
    const data = await fs.readFile('example.txt', 'utf-8');
    console.log('File contents:', data);
  } catch (err) {
    console.error('Error reading file:', err);
  }
}

readExampleFile();
```

### What is the Event Loop in Node.js?

- Node.js component that handles asynchronous operation efficiently

- Manage and process incoming events, callbacks, and I/O operations in a non-blocking manner

- When an asynchronous operation is initiated, the request is sent to the appropriate worker

- The Event Loop continues processing other events and callbacks without waiting for the asynchronous operation to complete

### Explain the difference between process.nextTick() and setImmediate().

- `process.nextTick()` schedules the callback to be executed immediately after the current operation and other queued `process.nextTick()` callbacks

- `setImmediate()` schedules the callback to be executed after the current iteration of the Event Loop, during the “check” phase

### What are some key features of Express.js? Why is it commonly used with Node.js?

- Middleware: build modular and reusable components that handles different aspects of the request-response lifecycle, such as authentication and logging

- Routing

- Template Engines

- Simplified API

- Static File Serving

- Error Handling

- Extensibility and large community and ecosystem

### How do you handle file uploads in Node.js?

- Use `multer`

```javascript
const express = require('express')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const app = express()

app.post('/profile', upload.single('avatar'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
})

app.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
})

const cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
app.post('/cool-profile', cpUpload, function (req, res, next) {
  // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
  //
  // e.g.
  //  req.files['avatar'][0] -> File
  //  req.files['gallery'] -> Array
  //
  // req.body will contain the text fields, if there were any
})
```

### What are some popular Node.js middleware and their purposes?

- Passport.js: authentication

- Multer: to handle `multipart/form-data`

- Morgan: HTTP request logger

- Helmet: set various HTTP headers to secure Express app

- CORS: to enable Cross-Origin Resource Sharing

- Body-parser: parses incoming request bodies

- Cookie-parser

- Express-session

- Compression

- Rate-limiter-flexible: limit rate to protect applications from excessive requests

### How do you handle errors in a Node.js application?

- Error-first callbacks

```javascript
fs.readFile('file.txt', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  console.log('File content:', data);
});
```

- Catch promise rejection

```javascript
// With Promises
myAsyncFunction()
  .then((result) => {
    console.log('Result:', result);
  })
  .catch((err) => {
    console.error('Error:', err);
  });

// With async/await
async function performOperation() {
  try {
    const result = await myAsyncFunction();
    console.log('Result:', result);
  } catch (err) {
    console.error('Error:', err);
  }
}
```

- Error handling middleware

```javascript
// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).send({
    error: {
      message: err.message,
    },
  });
});
```

- `uncaughtException`

```javascript
process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
  // Perform cleanup, if necessary
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled rejection at:', promise, 'Reason:', reason);
  // Perform cleanup, if necessary
  process.exit(1);
});
```

### What are some performance optimization techniques for Node.js applications?

- Use the latest Node.js version

- Avoid computationally expensive tasks

- Use asynchronouos and non-blocking APIs

- Use Caching: in-memory caching or services like Redis or Memcached

- Optimise database queries

- Use a reverse proxy to offload tasks like SSL termination, serving static files, and load balancing

- Use compression middleware

- Monitor and profile

### Explain the concept of microservices and how you would implement them in a Node.js application.

An architectural pattern where an application is broken down into small, loosely lcoupled, and independently deployable services

- Identify service boundaries

- Design communication between services: REST, gRPC, or messaging

- Implement microservices using Node.js: Express or Fastify

- Containerise microservices

- Deploy and manage services: Kubernetes, Docker Swarm, or lambdas

- Implement centralised configuration

- Implement API Gateway

- Monitor and log

- Implement resilience and fault tolerance

### What is the role of package managers like npm and yarn in Node.js development?

- Dependency management

- Simplified installation

- Script management

### How do you use environment variables in Node.js?

- Useful to store sensitive information such as API keys or database credentials

- Manage settings that change between different environments

```javascript
const apiKey = process.env.API_KEY;
require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

### What are the differences between SQL and NoSQL databases? Explain how you've worked with both types in your projects.

SQL databases

- Relational data model with predefined schemas

- SQL for querying and managing data

- strong consistency and ACID support

- Scale vertically, requiring more powerful hardware

NoSQL databases

- document-based, key-value, column-family, or graph-based. Flexible or dynamic schemas

- query language or APIs

- Eventual consistency and varying level of consistency. ACID trade-off

- Horizontal scalability and distribute data across multiple nodes

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

### What is AWS Lambda? How does it work with Node.js?

- Event-driven serverless compute service by AWS

- Supports multiple langues including JavaScript

### What is Docker? How does it work with Node.js?

- Open-source containerization technology

- Containers are lightweight, portable, and self-sufficient environments

### What is Kubernetes? How does it work with Node.js?

- an open-source orchestration platform

- Automates the deployment, scaling, and management of containerised applications

## General

### Can you provide an overview of your experience working in Agile environments? How do you ensure effective communication and collaboration within the team?

Agile environment

- Work in a cross-function team

- Sprint and Kanban

- Agile is about receiving feedback early and often

- Retrospective is the foundation

Effective communication

- daily stand-up meeting

- team channel

- pair-programming

- bi-weekly demo and show and tell

- open discussions and active listening

### How do you approach estimating task complexity and time requirements during sprint planning sessions?

- Estimation is an ongoing process

- Break down larger tasks into smaller, manageable subtasks

- Use techniques like story points, T-shirt sizing, planning poker

- Use historical data

- Collaborative estimation

- Consider risks and dependencies

### Describe your experience working with solution designers and DevOps architects to design and implement technical solutions.

- Weekly catch up with a principal engineer and a DevOps engineer

- In case of Data Bricks data migration, a principal engineer, MS consultant, and a platform engineer were involved

- Explain your experience in building and extending microservices, particularly in a cloud-based environment.

- How do you ensure that your code is scalable and high-performant? Can you provide an example of a project where you had to optimize for performance?

- How do you approach adding integration tests and unit tests in your development process?

- Can you share your experience mentoring less experienced colleagues within a team? How do you approach knowledge sharing and supporting their growth?

- Describe your experience monitoring service metrics and logs. What tools or strategies do you use to ensure the reliability and performance of your services?

- How do you ensure that code reviews are thorough and lead to best practices being followed within the team?

- Can you share your experience working with Continuous Integration (CI/CD) and version control systems, particularly Git?

- How familiar are you with functional programming languages, such as Scala, Haskell, and Clojure? Can you provide an example of a project where you used one of these languages?

- Describe your experience working with relational and NoSQL databases, such as PostgreSQL and MongoDB.

- What is your familiarity with DevOps tools, like Terraform, Fargate, and Kubernetes? Have you ever used them in a project, and if so, in what capacity?

- Have you worked on frontend development using technologies like Node.js and React? Can you provide an example of a project you have worked on using these technologies?

- Are you familiar with messaging protocols, internal and external DSLs, and single sign-on technologies such as SAML and OAuth/OIDC? If so, can you discuss a project where you utilized these technologies?

Project Management:
1. How do you approach a new project?

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

- What is the purpose of a build system like Webpack or Gulp, and how do they help with front-end development?

- What are your experiences with front-end frameworks like React, Angular, or Vue.js?

- How do you handle cross-origin resource sharing (CORS) in a Node.js application?

- What is your experience with React? What are its benefits and drawbacks?

- What is your experience with Vue.js? What are its benefits and drawbacks?

- What is your experience with Angular? What are its benefits and drawbacks?

- What is your experience with mobile app development? Which platform have

