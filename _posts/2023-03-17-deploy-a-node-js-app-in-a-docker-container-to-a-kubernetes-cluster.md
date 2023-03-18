---
title: Deploy a Node.js app in a docker container to a Kubernetes cluster
date: 2023-03-17
tags:
  - node.js
  - docker
  - kubernetes
---

Minikube is a lightweight Kubernetes approach to run a simple cluster with only one node to test our applications. Minikube is available for Linux, macOS, and Windows systems.

### Install required tools. 

- Install Docker: [https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/)

- Install kubectl: [https://kubernetes.io/docs/tasks/tools/](https://kubernetes.io/docs/tasks/tools/)

- Install a Kubernetes cluster like minikube (for local development): [https://minikube.sigs.k8s.io/docs/start/](https://minikube.sigs.k8s.io/docs/start/)

```bash
brew install minikube
minikube start

😄  minikube v1.29.0 on Darwin 13.2.1 (arm64)
✨  Automatically selected the docker driver
📌  Using Docker Desktop driver with root privileges
👍  Starting control plane node minikube in cluster minikube
🚜  Pulling base image ...
💾  Downloading Kubernetes v1.26.1 preload ...
    > preloaded-images-k8s-v18-v1...:  330.51 MiB / 330.51 MiB  100.00% 24.18 M
    > gcr.io/k8s-minikube/kicbase...:  368.75 MiB / 368.75 MiB  100.00% 10.16 M
🔥  Creating docker container (CPUs=2, Memory=6100MB) ...
🐳  Preparing Kubernetes v1.26.1 on Docker 20.10.23 ...
    ▪ Generating certificates and keys ...
    ▪ Booting up control plane ...
    ▪ Configuring RBAC rules ...
🔗  Configuring bridge CNI (Container Networking Interface) ...
    ▪ Using image gcr.io/k8s-minikube/storage-provisioner:v5
🔎  Verifying Kubernetes components...
🌟  Enabled addons: storage-provisioner, default-storageclass
🏄  Done! kubectl is now configured to use "minikube" cluster and "default" namespace by default
```

```bash
brew install kubectl
kubectl cluster-info dump
```

### Create a dummy Node.js Express application

Create a project and install packages

```bash
mkdir nodejs-docker-kubernetes
code nodejs-docker-kubernetes

npm init -y
Wrote to ../nodejs-docker-kubernetes/package.json:

{
  "name": "nodejs-docker-kubernetes",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

yarn add express
```

Set up TypeScript for the project

```bash
yarn add -D typescript ts-node @types/node @types/express
```

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "outDir": "dist",
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
```

Create `app.ts` for the application and add run scripts to `package.json`

```typescript
import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

```typescript
"scripts": {
  "start": "ts-node src/app.ts",
  "build": "tsc"
},
```

And run the service: `yarn start`

### Dockerise the app

Create a Dockerfile for the Node.js application:

```docker
FROM node:18

ENV NODE_ENV development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3002

CMD [ "node", "app.js" ]
```

Build the docker image

```bash
docker build -t nodejs-docker-k8s .
```

Push the docker image to a container registry

```bash
docker login
docker tag nodejs-docker-k8s username/nodejs-docker-k8s
docker push username/nodejs-docker-k8s
```

Create Kubernetes deployment and service files

```yaml
// deployment.yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nodejs-docker-k8s
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nodejs-docker-k8s
  template:
    metadata:
      labels:
        app: nodejs-docker-k8s
    spec:
      containers:
      - name: nodejs-docker-k8s
        image: nodejs-docker-k8s
        ports:
        - containerPort: 8080
```

```yaml
// service.yml
apiVersion: v1
kind: Service
metadata:
  name: nodejs-docker-k8s
spec:
  selector:
    app: nodejs-docker-k8s
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8080
  type: LoadBalancer
```

Start Kubernetes cluster and apply the Kubernetes deployment and service

```bash
minikube start
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
```

