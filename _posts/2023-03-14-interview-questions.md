---
title: Interview Questions
date: 2023-03-14
tags:
  - interview
---

I wrote down all the answers in bullet points so that I can remember them easily.

### JSON LD

[https://json-ld.org/](https://json-ld.org/)

- a lightweight JSON Linked Data

- ideal data format for REST web services and unstructured databases

```json
{
  "@context": "https://json-ld.org/contexts/person.jsonld",
  "@id": "http://dbpedia.org/resource/John_Lennon",
  "name": "John Lennon",
  "born": "1940-10-09",
  "spouse": "http://dbpedia.org/resource/Cynthia_Lennon"
}
```

### String literal union instead of string

```typescript
export type Ethnicity =
  | 'not-stated'
  | 'other'
  | 'black-or-black-british'
  | 'asian-or-asian-british'
```

### Explain C# covariance and contra variance

About how types relate to each other in the context of generic type parameters

**Covariance**

- Use more derived type (a subtype) in place of a less derived type

- Allow you to use `IEnumerable<Cat>` where a `IEnumerable<Animal>` is expected 

```c#
class Animal { }
class Mammal : Animal { }
class Cat : Mammal { }

IEnumerable<Cat> cats = new List<Cat>();
IEnumerable<Animal> animals = cats;
```

**Contravariance**

- Use a less derived type in place of a more derived type

- Allows you to use `AnimalAction<Animal>` where `AnimalAction<Cat>` is expected

```c#
delegate void AnimalAction<in T>(T animal);

AnimalAction<Animal> animalAction = (Animal a) => Console.WriteLine(a.GetType().Name);
AnimalAction<Cat> catAction = animalAction;
```

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

- Validation rules on API endpoints. Together with other teams, involving a principal developer

### Explain your experience in building and extending microservices, particularly in a cloud-based environment.

- Customer Acquisition

- API endpoints on Service Fabric. Raise domain events in success

- Subscribe to the domain evenets from Warehouse services, taking payments

### How do you ensure that your code is scalable and high-performant? Can you provide an example of a project where you had to optimize for performance?

- Choose the most appropriate algorithm and data structures

- Optimise database queries. Avoid N+1. Separate Read from Write. Index table properly

- Use caching

- Implement lazy loading

- Use code profiling and performance monitoring: Azure App Insight. Dynatrace, New Relic

- Use asynchronous programming and non-blocking operations

- Apply Microservice architecture. Break down application into smaller, independent services

- My experience

	- Payment Service, Basket service

	- Task.WhenAll for 5 connector services

	- Fragmented Cosmos DB: migrated the data into a new database

	- Serach feature: to Relational database

### How do you approach adding integration tests and unit tests in your development process?

- Write unit test and then integration test

- Write integration tests first and then unit test.

- Component test

### Can you share your experience mentoring less experienced colleagues within a team? How do you approach knowledge sharing and supporting their growth?

- Pair programming: show that I make mistakes, have gaps in my knowledge and not afraid to google to find the answer. Share my shortcuts, my practices, and how to solve a problem step by step, learning something new on the way

- Show and tell. Encourage everyone to share what he or she has learned. People can ask questions

- Whiteboard session. Present a challenge we have. Provide a few options we can think about. Then we discuss them

### Describe your experience monitoring service metrics and logs. What tools or strategies do you use to ensure the reliability and performance of your services?

- Every morning, I check on CloudWatch dashboard to see if there are messages in DLQ. Check error responses in the API calls.

- Set alarm on the number messages in DLQ, API response time, failed API requests on Slack and on mobile phone

- Set SLO: Service Level Objective

### How do you ensure that code reviews are thorough and lead to best practices being followed within the team?

- Team coding convention

- Ensure at least 2 people review the code

- Make the PR small and more often

- It should have accompanying tests

- Automate common checks: use linters and formatting tools

### Can you share your experience working with Continuous Integration (CI/CD) and version control systems, particularly Git?

- At Clear Bank, we went from bi-monthly release to multiple releases a day

- Git hook by husky. 

- Integration tests and smoke tests

- Separation of service boundary with Service Bus / SNS messaging

- Automated testing and monitoring and alerting. Pager Duty

### How familiar are you with functional programming languages, such as Scala, Haskell, and Clojure? Can you provide an example of a project where you used one of these languages?

- Used F# and Scala in the limited scope

- Try to benefit from functional programming concepts such as immutability, higher-order functions, and amplified types like Some and None

- Confident in my ability to quickly adapt. 

- Describe your experience working with relational and NoSQL databases, such as PostgreSQL and MongoDB.

- What is your familiarity with DevOps tools, like Terraform, Fargate, and Kubernetes? Have you ever used them in a project, and if so, in what capacity?

- Have you worked on frontend development using technologies like Node.js and React? Can you provide an example of a project you have worked on using these technologies?

- Are you familiar with messaging protocols, internal and external DSLs, and single sign-on technologies such as SAML and OAuth/OIDC? If so, can you discuss a project where you utilized these technologies?

### What was a time when you have been responsible for taking an influential technical decision and implementing it? What was the outcome?

- Go for messaging service, rather than API calls between services to make them loosely coupled. From Bi-monthly release to multiple releases a day

- BFF: Backend for FrontEnd. The website was based on replication data. Built a new APIs for FrontEnd that can modify and delete data.

- Data migration with Data Bricks, rather than using CosmosDB change feed. One time job, quickly done. No need to provision the resource and destroy it.

### Can you share your experience with designing and building RESTful Node microservices? What challenges did you face, and how did you overcome them?

- I worked on banking, e-commerce, and credit card systems. Customer onboarding, Faster payment, Microfrontend website

- Loosely coupled services with clear service boundary. 

- Use messaging systems like Rabbit MQ, Azure Service Bus and AWS SNS and SQS

- Logging and metrics dashboard such as Kibana, CloudWatch, Grafana, Application Insight

- Clear ownership of APIs and versioning of APIs

- Challenges are eventual consistency, communication between services, handling failures gracefully. Resilience from circuit breaker and messaging. SLO for performance

### What are some key considerations to make when developing React microfrontends, and how do you ensure seamless integration with the backend?

- Component isolation: responsible for specific part of the application

- Consistent design and user experience

- Cross-team colloboration

- Routing and navigation

- Backend integration

- Deployment and CI/CD

### How do you approach web accessibility in your development process, and what are some tools or techniques you use to ensure that your applications are accessible to everyone?

- Follow established guidelines: WCAG [https://www.w3.org/WAI/standards-guidelines/wcag/](https://www.w3.org/WAI/standards-guidelines/wcag/)

- Collaborate with designers: proper color contrasts, font sizes, semantic HTML

- Alt text for images

- Proper labelling and form elements

- Text alternatives for multimedia content

- Responsive design

- Describe a project where you used machine learning to make a product more data-driven and personalized. How did you ensure user privacy and anonymity throughout the process?

- How do you collaborate with product managers and designers to create user-centered solutions? Can you give an example of a successful collaboration from your past work?

- What are some challenges you have faced when integrating third-party APIs into your projects? How did you solve those challenges?

- How do you implement Test-Driven Development (TDD) in your workflow, and why do you believe it's important for code quality?

- What is your experience with TypeScript or other contemporary backend languages? How do you think this experience will benefit you in this role?

- Describe your experience working in a cloud-native environment, such as GCP or AWS. What are some best practices you follow for cloud-based development?

- Are you familiar with any of the following technologies: Kafka, Clojure, Python, Terraform, or Kubernetes? If so, please describe your experience and how you've used them in your projects.

- As a full-stack developer, what areas of expertise do you consider yourself to be a specialist in? How do you think your specialization will contribute to the team's success?

### Parcel

- [https://parceljs.org/](https://parceljs.org/)

- Code splitting, tree shaking, and content hashing for caching

### Iterate a Map

```javascript
const myMap = new Map<string, number>()
myMap.set('one', 1)
myMap.set('two', 2)

for (const [key, value] of myMap.entries()) {
	console.log(`Key: ${key}, Value: ${value}`)
}
```

### Popular react hooks

- `useState`: functional components to have local state

- `useEffect`: lifecycle management. 

- `useContext`: use context value

- `useReducer`: to deal with state logic or multiple state values

- `useRef` : creates a mutable object. Store a reference to DOM element 

- `useMemo`: for memoization to avoid expensive calculations on every render

### Can you briefly explain the benefits of using TypeScript in a React application? How does it improve the development process?

- Type safety

- Better IDE support

- Easier refactoring

- Improved readability

- Enhanced collaboration

### What are the key differences between using class components and functional components in React? Can you provide examples of when you would choose one over the other?

Class component

- Uses ES6 class syntax. 

- Lifecycle methods: `componentDidMount`, `componentDidUpdate`, `componentWillUnmount`

- Use `this.state`, `this.setState`

Functional component

- Use plain JavaScript function

- `useEffect` hook for side effect

- `useState` hook 

### How do you manage state in a React application? Can you explain the difference between local state, context, and Redux?

Local state

- The state managed by a single component

- Not shared. Only passed through props to child components

Context

- Share state between components without passing it down

- Useful for global state or shared stated accessed by multiple components

```javascript
import React from 'react';

// Create a context object with a default value of 'light'
const ThemeContext = React.createContext('light');

// ---

import React from 'react';
import ThemeContext from './ThemeContext';

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = React.useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

// ---

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ThemeProvider from './ThemeProvider';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// ---

import React, { useContext } from 'react';
import ThemeContext from './ThemeContext';

const ThemedButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      style={{ backgroundColor: theme === 'light' ? 'white' : 'black', color: theme === 'light' ? 'black' : 'white' }}
    >
      Toggle Theme
    </button>
  );
};

export default ThemedButton;
```

### Redux

- Centralise the entire application state into a single store

- Use actions and reducers to manage state updates

### How do you motivate colleagues and create a positive working environment?

- Create an intellectually safe environment - people can ask questions without fear of being seen incapable. Nurture growth mindset. We learn something along the way

- However small, try to take a step towards our technical North Star

- Encourage open communication: Active listening and let people talk and be heard before we make a team decision

- Recognise achievements and hard word, and show appreciation

- Offer opportunities: brown bag session talk, show and tell, go to team leads meeting

- Transparent and honest

- Healthy work-life balance

What is your experience with mentoring and supporting fellow developers and team members?

- Open and honest, and approachable. Create an environment where they feel comfortable sharing their concerns or challenges

- Share my knowledge and experience. Show I approach a problem and learn along the way.

- Offer support and resources

### How do you approach using containers for packaging applications? Are you familiar with Docker, Kubernetes, or other containerization technologies?

Install required tools:

- Install Docker: [**https://docs.docker.com/get-docker/**](https://docs.docker.com/get-docker/)

- Install kubectl: [**https://kubernetes.io/docs/tasks/tools/install-kubectl/**](https://kubernetes.io/docs/tasks/tools/install-kubectl/)

- Install a Kubernetes cluster like minikube (for local development): [**https://minikube.sigs.k8s.io/docs/start/**](https://minikube.sigs.k8s.io/docs/start/)

Create a Dockerfile for your Node.js application:

In your project's root directory, create a file called **`Dockerfile`** with the following content:

```docker
FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "node", "app.js" ]
```

Replace **`app.js`** with the entry point of your application if it's different.

Build the Docker image:

Run the following command in your project's root directory:

```bash
docker build -t your-image-name .
```

Replace **`your-image-name`** with a descriptive name for your Docker image.

Push the Docker image to a container registry (optional):

If you're deploying to a remote Kubernetes cluster, you'll need to push your Docker image to a container registry like Docker Hub or Google Container Registry. For example, to push to Docker Hub:

```bash
docker login
docker tag your-image-name your-dockerhub-username/your-image-name
docker push your-dockerhub-username/your-image-name
```

Create Kubernetes deployment and service files:

Create a file called **`deployment.yaml`** with the following content:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: your-app-name
spec:
  replicas: 1
  selector:
    matchLabels:
      app: your-app-name
  template:
    metadata:
      labels:
        app: your-app-name
    spec:
      containers:
      - name: your-app-name
        image: your-image-name
        ports:
        - containerPort: 8080
```

Replace **`your-app-name`** and **`your-image-name`** with your application's name and Docker image name respectively.

Create a file called **`service.yaml`** with the following content:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: your-app-name
spec:
  selector:
    app: your-app-name
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8080
  type: LoadBalancer


```

Replace **`your-app-name`** with your application's name.

Deploy your Node.js application to the Kubernetes cluster:

First, start your Kubernetes cluster. If you're using minikube, run:

```bash
minikube start
```

Apply the Kubernetes deployment and service files:

```bash
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
```

Access your Node.js application:

For minikube, run the following command to get the service URL:

```bash
minikube service your-app-name --url
```

For a remote Kubernetes cluster, use the external IP or domain name associated with the LoadBalancer service you created.

Can you describe your experience with setting up and maintaining CI/CD pipelines? What tools have you used, and how have they improved your development process?

## TypeScript

### Can you explain the difference between 'type aliases' and 'interfaces' in TypeScript?

**Declaration syntax:**

Type aliases use the 'type' keyword followed by the name of the alias and an assignment to a type definition.

```typescript
type Point = {
  x: number;
  y: number;
};
```

Interfaces use the 'interface' keyword followed by the name of the interface and a block containing the properties and their types.

```typescript
interface Point {
  x: number;
  y: number;
}
```

**Extending and implementing:**

Interfaces can extend other interfaces using the 'extends' keyword, allowing for the composition of multiple interfaces into a single one.

```typescript
interface Shape {
  area(): number;
}

interface Point {
  x: number;
  y: number;
}

interface Circle extends Shape, Point {
  radius: number;
}
```

Classes can also implement interfaces to enforce a specific structure.

```typescript
class Circle implements Shape, Point {
  x: number;
  y: number;
  radius: number;

  area(): number {
    return Math.PI * this.radius * this.radius;
  }
}
```

Type aliases can use intersection types to achieve a similar result, but classes cannot implement type aliases.

```typescript
type Circle = Shape & Point & {
  radius: number;
};
```

**Merging declarations:**

Interfaces support declaration merging, which means that if multiple interfaces with the same name are declared, they are automatically merged into a single interface.
Example:

Type aliases do not support declaration merging; redeclaring a type alias with the same name will result in an error.

```typescript
interface Box {
  width: number;
  height: number;
}

interface Box {
  depth: number;
}

// The resulting interface is as follows:
interface Box {
  width: number;
  height: number;
  depth: number;
}
```

Type display in error messages and IDEs:

	- When using interfaces, error messages and IDE tooltips will display the interface name, making it easier to understand the expected structure.

	- Type aliases often display the entire structure, which can be more verbose and harder to read, especially for complex types.

In general, interfaces are recommended when defining object shapes and for class implementations, while type aliases are more suitable for creating unions, intersections, or mapping types. However, depending on the use case and personal preference, either can be used for similar purposes with some caveats.

### Can you describe the concept of 'namespaces' in TypeScript and provide an example of how they can be used to organize code?

```typescript
namespace Geometry {
  export interface Point {
    x: number;
    y: number;
  }

  export class Circle implements Point {
    constructor(public x: number, public y: number, public radius: number) {}

    area(): number {
      return Math.PI * this.radius * this.radius;
    }
  }

  export class Rectangle implements Point {
    constructor(public x: number, public y: number, public width: number, public height: number) {}

    area(): number {
      return this.width * this.height;
    }
  }
}

// Usage:
const circle = new Geometry.Circle(0, 0, 5);
console.log(circle.area());

const rectangle = new Geometry.Rectangle(0, 0, 10, 20);
console.log(rectangle.area());
```

### What are generics in TypeScript, and how can they be utilized to make code more reusable and maintainable?

Generics are a powerful feature in TypeScript that allows you to create reusable and flexible components by providing a way to define placeholder types, which can be replaced with actual types when using the components. Generics enable you to write type-safe, reusable, and maintainable code without having to duplicate functionality for different types.

Here's an example to illustrate the use of generics:

Without generics, if you want to create a function that returns the first element of an array, you might need to write separate functions for different types, like this:

```typescript
function getFirstNumber(numbers: number[]): number {
  return numbers[0];
}

function getFirstString(strings: string[]): string {
  return strings[0];
}
```

This approach is not scalable, as you would need to write a new function for every type you want to support.

With generics, you can write a single function that can handle arrays of any type:

```typescript
function getFirstElement<T>(array: T[]): T {
  return array[0];
}

const numbers: number[] = [1, 2, 3];
const strings: string[] = ['a', 'b', 'c'];

const firstNumber = getFirstElement<number>(numbers); // Type: number
const firstString = getFirstElement<string>(strings); // Type: string
```

In this example, we define a generic function **`getFirstElement<T>`**. The **`<T>`** syntax represents a type variable that can be replaced with any actual type when the function is called. This way, we can use the same function for arrays of any type while preserving type safety.

Generics can also be used with interfaces, classes, and type aliases:

```typescript
// Generic interface
interface KeyValuePair<K, V> {
  key: K;
  value: V;
}

// Generic class
class Stack<T> {
  private elements: T[] = [];

  push(element: T): void {
    this.elements.push(element);
  }

  pop(): T | undefined {
    return this.elements.pop();
  }
}

const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
const poppedNumber = numberStack.pop(); // Type: number | undefined

const stringStack = new Stack<string>();
stringStack.push('a');
stringStack.push('b');
const poppedString = stringStack.pop(); // Type: string | undefined
```

Generics help improve code maintainability and reusability by allowing you to create type-safe, flexible components that can be used with different types without duplicating code or sacrificing type information.

### Can you explain how TypeScript handles function overloading, and provide an example use case?

```typescript
function greet(person: string): string;
function greet(person: string, age: number): string;
function greet(person: string, age?: number): string {
  if (age !== undefined) {
    return `Hello, ${person}! You are ${age} years old.`;
  } else {
    return `Hello, ${person}!`;
  }
}

const greeting1 = greet('Alice'); // "Hello, Alice!"
const greeting2 = greet('Bob', 25); // "Hello, Bob! You are 25 years old."
```

### What are union and intersection types in TypeScript, and how can they be used to create more flexible type definitions?

Union and intersection types are powerful features in TypeScript that enable you to create more flexible and expressive type definitions by combining existing types.

**Union types:**

A union type is a type that can be one of several types. It is denoted using the **`|`** (pipe) character between types. Union types are useful when a value can have different types, and you want to allow any of those types.

Example:

```typescript
type StringOrNumber = string | number;

function printValue(value: StringOrNumber) {
  console.log(value);
}

printValue('hello'); // Accepts a string
printValue(42); // Accepts a number
```

In this example, we define a union type **`StringOrNumber`** that can be either a **`string`** or a **`number`**. The **`printValue`** function accepts a parameter of type **`StringOrNumber`**, allowing it to handle both string and number values.

- Intersection types:

An intersection type is a type that combines multiple types into one, requiring a value to satisfy all combined types simultaneously. It is denoted using the **`&`** (ampersand) character between types. Intersection types are useful when you want to merge the properties or capabilities of multiple types.

Example:

```typescript
interface HasName {
  name: string;
}

interface HasAge {
  age: number;
}

type Person = HasName & HasAge;

const person: Person = {
  name: 'Alice',
  age: 30,
};

function printPersonDetails(person: Person) {
  console.log(`Name: ${person.name}, Age: ${person.age}`);
}

printPersonDetails(person); // "Name: Alice, Age: 30"
```

In this example, we define two interfaces, **`HasName`** and **`HasAge`**. We then create an intersection type **`Person`** that combines both interfaces. A value of type **`Person`** must have both a **`name`** and an **`age`** property, as defined by the combined interfaces. The **`printPersonDetails`** function accepts a parameter of type **`Person`** and prints the person's details.

Union and intersection types can be used in various scenarios to create more flexible and expressive type definitions, allowing you to write type-safe code that can handle different shapes and combinations of types.

### Can you provide an overview of TypeScript decorators, and give an example of how they can be used to enhance classes or properties?

TypeScript decorators are a special kind of declaration that can be used to modify or annotate classes, class members (properties, methods, accessors), or method parameters. They are based on the Decorator proposal for JavaScript, which is currently in the experimental stage. Decorators use the **`@`** symbol followed by an expression that resolves to a decorator function.

Here is an overview of the different types of decorators in TypeScript:

- Class decorators: Applied to class constructors, they can be used to observe, modify, or replace a class definition. They are evaluated top-down, but executed bottom-up.

- Method decorators: Applied to method or accessor declarations within classes, they can be used to observe, modify, or replace a method definition.

- Property decorators: Applied to property declarations within classes, they can be used to observe or modify a property definition.

- Parameter decorators: Applied to method parameter declarations within classes, they can be used to observe or modify a method's parameters.

To use decorators in a TypeScript project, you need to enable the **`experimentalDecorators`** compiler option in the **`tsconfig.json`** file.

Here's an example of using decorators to enhance a class and its properties:

```typescript
// Decorator for logging class instantiation
function LogClass(target: Function) {
  console.log(`Creating instance of ${target.name}`);
}

// Decorator for logging property access
function LogProperty(target: any, propertyKey: string) {
  let value = target[propertyKey];

  const getter = () => {
    console.log(`Getting ${propertyKey}: ${value}`);
    return value;
  };

  const setter = (newValue: any) => {
    console.log(`Setting ${propertyKey} to: ${newValue}`);
    value = newValue;
  };

  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true,
  });
}

@LogClass
class Person {
  @LogProperty
  public name: string;
  @LogProperty
  public age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

const person = new Person('Alice', 30); // Logs "Creating instance of Person"
person.name = 'Bob'; // Logs "Setting name to: Bob"
console.log(person.name); // Logs "Getting name: Bob" and outputs "Bob"
person.age = 31; // Logs "Setting age to: 31"
console.log(person.age); // Logs "Getting age: 31" and outputs "31"
```

In this example, we define two decorators:

- **`LogClass`**: A class decorator that logs when a new instance of the class is created.

- **`LogProperty`**: A property decorator that logs when a property is accessed or modified.

We then apply the decorators to the **`Person`** class and its **`name`** and **`age`** properties. When we create a new **`Person`** instance and interact with its properties, the decorators' logging behavior is executed.

Keep in mind that decorators are an experimental feature and may be subject to changes in the future as the proposal progresses

### How does TypeScript handle enums, and what benefits do they offer over traditional JavaScript constants?

- Readability and maintainability: group related constants together

- Type-safety and autocompletion

```typescript
enum Direction {
  Up,
  Down,
  Left,
  Right,
}

function move(direction: Direction): void {
  switch (direction) {
    case Direction.Up:
      console.log('Moving up');
      break;
    case Direction.Down:
      console.log('Moving down');
      break;
    case Direction.Left:
      console.log('Moving left');
      break;
    case Direction.Right:
      console.log('Moving right');
      break;
  }
}

move(Direction.Up); // "Moving up"
move(Direction.Left); // "Moving left"
```

### How do you create and use modules in TypeScript, and what are the differences between the various module systems it supports?

Modules are used to organise code by splitting it into separate files

**ES Module**

- Native module system in TypeScript and JavaScript

- set `module` to `ESNext` or `ES2020` in `tsconfig.json`

```typescript
// math.ts
export function add(a: number, b: number): number {
  return a + b;
}

export function subtract(a: number, b: number): number {
  return a - b;
}

// app.ts
import { add, subtract } from './math';

console.log(add(1, 2)); // 3
console.log(subtract(5, 3)); // 2
```

**Common JS**

- Node.js module system

- Set `module` to `CommonJS`

```typescript
// math.ts
function add(a: number, b: number): number {
  return a + b;
}

function subtract(a: number, b: number): number {
  return a - b;
}

module.exports = { add, subtract };

// app.ts
const { add, subtract } = require('./math');

console.log(add(1, 2)); // 3
console.log(subtract(5, 3)); // 2
```

**AMD and SystemJS**

- In order application

- Set `module` to `AMD`

### Can you explain the process of migrating a JavaScript project to TypeScript, and what steps should be considered during the transition?

- Install TypeScript and set up the build environment

```bash
npm install --save-dev typescript
```

```json
// tsconfig.json
{
    "compilerOptions": {
        "target": "ES2018",
        "module": "CommonJS",
        "strict": false,
        "esModuleInterop": true,
        "allowJs": true,
        "outDir": "dist"
    },
    "include": ["src"]
}
```

- Rename files from `.js` to `.ts` or `.tsx`

- Fix type errors

- Add types for external libraries

```json
npm install --save-dev @types/react @types/react-dom
```

- Gradually enable strict type checking

- Update build tools and scripts

### What are some best practices for writing clean and maintainable TypeScript code?

- Use a consistent code style: Use tools like Prettier and ESLint

- Use `strict` mode

- Provide explicit types. Use interfaces and type aliases

- Use enums for fixed sets of values

- Utilise generics

- Leverage utility types like `Partial<T>`, `ReadOnly<T>`, `Pick<T>`, and `Omit<T>`

- Organise the code with modules

- Use the type guard or discriminated unions to ensure type safety

- Write tests

### Utility types

**Partial<T>**

Create a new type with all properties of `T` set to optional

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

// Using Partial to create a new type with all properties optional
type PartialUser = Partial<User>;

const updateUser = (id: number, user: PartialUser) => {
  // Update user logic
};

updateUser(1, { name: 'John Doe' }); // Only updating the name
```

**ReadOnly<T>**

Creates a new type with all properties of `T` set to readonly 

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

// Using Readonly to create a new type with all properties readonly
type ReadonlyUser = Readonly<User>;

const user: ReadonlyUser = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
};

// Error: Cannot assign to 'name' because it is a read-only property
user.name = 'Jane Doe';
```

**Pick<T, K>**

Create a new type by picking a set of properties `K` from an existing type `T`

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

// Using Pick to create a new type with only 'name' and 'email' properties
type UserNameAndEmail = Pick<User, 'name' | 'email'>;

const getUserInfo = (user: UserNameAndEmail) => {
  console.log(`Name: ${user.name}, Email: ${user.email}`);
};
```

**Omit<T, K>**

Create a new type by omitting a set of properties `K` from an existing type `T`

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

// Using Omit to create a new type without the 'email' property
type UserWithoutEmail = Omit<User, 'email'>;

const getUserNameAndId = (user: UserWithoutEmail) => {
  console.log(`ID: ${user.id}, Name: ${user.name}`);
};
```

### Type guards and discriminated unions

**Type guards**

Perform a runtime check to determine the type of a value

`typeOf`, or `instanceOf`

```typescript
type StringOrNumber = string | number;

function processValue(value: StringOrNumber) {
  if (typeof value === 'string') {
    // TypeScript knows that 'value' is of type 'string' in this branch
    console.log(value.toUpperCase());
  } else {
    // TypeScript knows that 'value' is of type 'number' in this branch
    console.log(value * 2);
  }
}
```

**Discriminated unions**

```typescript
interface Circle {
  kind: 'circle';
  radius: number;
}

interface Square {
  kind: 'square';
  sideLength: number;
}

type Shape = Circle | Square;

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      // TypeScript knows that 'shape' is of type 'Circle' in this branch
      return Math.PI * shape.radius ** 2;
    case 'square':
      // TypeScript knows that 'shape' is of type 'Square' in this branch
      return shape.sideLength ** 2;
    default:
      // Exhaustiveness check
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
  }
}
```

## S

### What is Big O Notation

- In computer science, describes the performance or complexity of an algorithm

- Express the upper bound of an algorithm’s time complexity, showing the worst-case scenario or the maximum time required

- O(1): constant time

- O(N): linear time. The performance grow linearly to the size of the input data set

- O(log N): the computation grows logarithmically in proportion to the input. Better than linear time

- O(N^2): proportional to the square of the size of the input. Common with algorithms that involves nested iterations such as bubble sort

- O(2^N): growth doubles with each addition to the input data set. Brut-force search algorithm

### What is polymorphism in OO

- An object can behave differently in different contexts

- Compile-Time Polymorphism: method overloading. multiple methods with the same name but different parameters

- Run-Time Polymorphism: method overriding. or different objects that implement the same interface

- Structure code to be more flexible and easier maintain

### What do foreign keys do

- A field or key that references a primary key in another table

- Maintain referential integrity by ensuring the relationship between two tables: You can’t add a record with non-existent primary key in the parent table

- Used for navigation and joining tables

### How does cascade on delete work in SQL

- Automatically delete records from child tables when the corresponding records in the parent table are deleted

### What is responder chain in iOS

- a series of linked responder objects that inehrit from the UIResponder class. Event bubbling. 

### The difference between a reference type and a value type

- value type: A block of memory is allocated to store the value and the variable holds the actual data. Primitive types: int, float, bool, char, struct

- reference type: the variable stores a reference to the data’s location in memory: custom types. 

- strings are reference types in C# and Java and stored in heap, but value types in Swift

### What is the importance of DTOs

- Encapsulate data as a single object

- A container for transferring data between different parts of an application.

- Data Transformation and mapping

- Versioning and compatibility

How do you keep up to date on tech news

What you do you understand by operability and how do you use it in your current role

Model a loan system database

Walk us through a possible system solution for a banking transaction

Whiteboard a database design for a payments system

