---
title: Interview Questions
date: 2023-03-14
tags:
  - interview
---

These are my revision notes for my job interviews. As a contractor, I have job interviews more often than a permanent employee. Writing down the revision notes does not imply that I am incapable of answering these questions naturally. During interviews, I naturally get nervous, and due to my introversion, I often struggle to clearly articulate what I already know and understand. I simply want to avoid those situations and prepare myself to present myself in the best possible way.


### Explain C# covariance and contra variance


About how types relate to each other in the context of generic type parameters


**Covariance**

- Upcasting
- Use `out` keyword

**Contravariance**

- Downcasting
- Use `in` keyword

```c#
public interface ICovariant<out T> { }
public interface IContravariant<in T> { }

public class Covariant<T> : ICovariant<T> { }
public class Contravariant<T> : IContravariant<T> { }

public class Fruit { }
public class Apple : Fruit { }

public class TheInsAndOuts
{
    public void Covariant(ICovariant<Fruit> fruit) { }
    public void Contravariant(IContravariant<Apple> apple) { }

    public void Covariance()
    {
        ICovariant<Fruit> fruit = new Covariant<Fruit>();
        ICovariant<Apple> apple = new Covariant<Apple>();

        Covariant(fruit);
        Covariant(apple); //apple is being upcasted to fruit, without the out keyword this will not compile
    }

    public void Contravariance()
    {
        IContravariant<Fruit> fruit = new Contravariant<Fruit>();
        IContravariant<Apple> apple = new Contravariant<Apple>();

        Contravariant(fruit); //fruit is being downcasted to apple, without the in keyword this will not compile
        Contravariant(apple);
    }
}
```


What are the benefits?

- It increases the reusability of the code

## TypeScript, JavaScript


## API


### What is a REST API?

- Representational State Transfer API
- Uses HTTP methods to interact with resources on a web server
- Scalable and flexible
- Decoupling and Caching

## GraphQL


### What is GraphQL? How does it differ from REST?

- Unlike REST that exposes resources as endpoints, define a schema that describes the types of data available and the relationships
- Retrieve data from multiple sources with a single query
- The server sends only the data that the client has requested

## Authorization / Authentication


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

## Serverless


### What is AWS Lambda? How does it work with Node.js?

- Event-driven serverless compute service by AWS
- Supports multiple langues including JavaScript

## Docker / Kubernetes


### What is Docker? How does it work with Node.js?

- Open-source containerization technology
- Containers are lightweight, portable, and self-sufficient environments

### What is Kubernetes? How does it work with Node.js?

- an open-source orchestration platform
- Automates the deployment, scaling, and management of containerised applications

## Microservice


### Explain your experience in building and extending microservices, particularly in a cloud-based environment.

- Customer Acquisition
- API endpoints on Service Fabric. Raise domain events in success
- Subscribe to the domain evenets from Warehouse services, taking payments
- Documentation first. Define api endpoint and domain events specification and

### How do you ensure that your code is scalable and high-performant? Can you provide an example of a project where you had to optimize for performance?

- Choose the most appropriate algorithm and data structures
- Optimise database queries.
- Avoid N+1 query
- CQRS (Command and Query Responsibility Segregation): Separate Read from Write. Index table properly
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
	- Separate read and write queries

### Can you share your experience with designing and building RESTful Node microservices? What challenges did you face, and how did you overcome them?

- I worked on banking, e-commerce, and credit card systems. Customer onboarding, Faster payment, Microfrontend website
- Loosely coupled services with clear service boundary.
- Use messaging systems like Rabbit MQ, Azure Service Bus and AWS SNS and SQS
- Logging and metrics dashboard such as Kibana, CloudWatch, Grafana, Application Insight
- Clear ownership of APIs and versioning of APIs
- Challenges are eventual consistency, communication between services, handling failures gracefully. Resilience from circuit breaker and messaging. SLO for performance

## CI / CD


### Can you share your experience working with Continuous Integration (CI/CD) and version control systems, particularly Git?

- At Clear Bank, we went from bi-monthly release to multiple releases a day
- Git hook by husky.
- Integration tests and smoke tests
- Separation of service boundary with Service Bus / SNS messaging
- Automated testing and monitoring and alerting. Pager Duty

## Functional programming


### How familiar are you with functional programming languages, such as Scala, Haskell, and Clojure? Can you provide an example of a project where you used one of these languages?

- Used F# and Scala in the limited scope
- Try to benefit from functional programming concepts such as immutability, higher-order functions, and amplified types like Some and None
- Confident in my ability to quickly adapt.
1. Describe your experience working with relational and NoSQL databases, such as PostgreSQL and MongoDB.
2. What is your familiarity with DevOps tools, like Terraform, Fargate, and Kubernetes? Have you ever used them in a project, and if so, in what capacity?
3. Have you worked on frontend development using technologies like Node.js and React? Can you provide an example of a project you have worked on using these technologies?
4. Are you familiar with messaging protocols, internal and external DSLs, and single sign-on technologies such as SAML and OAuth/OIDC? If so, can you discuss a project where you utilized these technologies?

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
1. Describe a project where you used machine learning to make a product more data-driven and personalized. How did you ensure user privacy and anonymity throughout the process?
2. How do you collaborate with product managers and designers to create user-centered solutions? Can you give an example of a successful collaboration from your past work?
3. What are some challenges you have faced when integrating third-party APIs into your projects? How did you solve those challenges?
4. How do you implement Test-Driven Development (TDD) in your workflow, and why do you believe it's important for code quality?
5. What is your experience with TypeScript or other contemporary backend languages? How do you think this experience will benefit you in this role?
6. Describe your experience working in a cloud-native environment, such as GCP or AWS. What are some best practices you follow for cloud-based development?
7. Are you familiar with any of the following technologies: Kafka, Clojure, Python, Terraform, or Kubernetes? If so, please describe your experience and how you've used them in your projects.
8. As a full-stack developer, what areas of expertise do you consider yourself to be a specialist in? How do you think your specialization will contribute to the team's success?

### Parcel

- [https://parceljs.org/](https://parceljs.org/)
- Code splitting, tree shaking, and content hashing for caching

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


## S


### What is Big O Notation

- In computer science, describes the performance or complexity of an algorithm
- Express the upper bound of an algorithm’s time complexity, showing the worst-case scenario or the maximum time required
- O(1): constant time
- O(N): linear time. The performance grow linearly to the size of the input data set
- O(log N): the computation grows logarithmically in proportion to the input. Better than linear time
- O(N^2): proportional to the square of the size of the input. Common with algorithms that involves nested iterations such as bubble sort
- O(2^N): growth doubles with each addition to the input data set. Brut-force search algorithm

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


