---
title: My take on Kubernetes
date: 2023-04-04
tags:
  - kubernetes
  - docker
---

My learnings along the way to Kubernetes heaven.


### Masters and Nodes


Machines in a Kubernetes cluster are referred to as Nodes. A Kubernetes cluster contains two types of Nodes:

- Master Nodes
- Worker Nodes

Usually, Master Nodes are referred to as “Masters” and Worker Nodes are called “Nodes”. Maters host the control plane and Nodes are where you run user applications.


### Hosted Kubernetes


![Untitled.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/875308e8-8000-4329-b1aa-ffd95b33ba6e/ff003436-784e-48e0-9f34-025c07180152/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20231214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20231214T012615Z&X-Amz-Expires=3600&X-Amz-Signature=a4ab4f964658d7abffad7d7d95651c8f5e491e9de49b00a20327085ecae67c8b&X-Amz-SignedHeaders=host&x-id=GetObject)


### Workflow


![Untitled.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/875308e8-8000-4329-b1aa-ffd95b33ba6e/ec49fcda-41bd-406f-a0c7-dc711519d9ac/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20231214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20231214T012615Z&X-Amz-Expires=3600&X-Amz-Signature=8d3ca9191cf4198442310a9cdf111b0e11013cbc6863a8119e2a8be807155a94&X-Amz-SignedHeaders=host&x-id=GetObject)


### Breaking down the Dockerfile


```docker
# use the node:current slim image as the base
FROM node:current-slim

# copy the application and dependencies from the current directory 
# into the /src directory
COPY . /src
RUN cd /src; npm install

# informs Docker that the container listens on the specified network ports 
# at runtime
EXPOSE 8080

CMD cd /src && node ./app.js
```


### Containerisation


The process of building an application into a container image is called _containerisation._


```bash
docker image build -t andrewchaa/qsk-course:1.0 .
docker image ls
```


### Host the image on a registry


```bash
docker login --username andrewchaa
docker image push andrewchaa/qsk-course:1.0
```


### Deploying the first application


```yaml
# nginx.yaml
apiVersion: v1
kind: Pod 
metadata:
    name: nginx 
spec:
    containers:
    - name: nginx-container
      image: registry.hub.docker.com/library/nginx
```


```bash
kubectl apply -f nginx.yaml

# port forward to open the pod
kubectl port-forward --address 0.0.0.0 nginx 3000:80
kubectl get pods

# stream logs
kubectl logs --follow nginx
```


### The workers


Where our applications actually run.


![Untitled.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/875308e8-8000-4329-b1aa-ffd95b33ba6e/9d124f90-f002-4158-9dd9-b9d4621c9648/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20231214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20231214T012615Z&X-Amz-Expires=3600&X-Amz-Signature=f31eb129e1e70c3d5d70f8205279e21bc992569a0cb044755c860b58cb32c718&X-Amz-SignedHeaders=host&x-id=GetObject)


### The master


In the reconciliation loop, the master compares the current state with the desired state and makes the necessary changes


![Untitled.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/875308e8-8000-4329-b1aa-ffd95b33ba6e/d483043c-6684-480e-9b9b-b565ac3ad805/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20231214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20231214T012615Z&X-Amz-Expires=3600&X-Amz-Signature=187aec28f6c35b287f5deb464fe46247d49b7d9f198a7724660351b64900b9ed&X-Amz-SignedHeaders=host&x-id=GetObject)


![Untitled.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/875308e8-8000-4329-b1aa-ffd95b33ba6e/c7ef6efa-2163-4bff-946b-5b9ad32fcecb/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20231214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20231214T012615Z&X-Amz-Expires=3600&X-Amz-Signature=2853c7fdecd1bd582e1e56eab14b1f6a08f85280ff40b07c3de857c298d3d572&X-Amz-SignedHeaders=host&x-id=GetObject)


### Difference between pods and containers


Multiple containers can run inside a single pod. A way to group containers


### Executing commands in a container running in the pod


```bash
kubectl exec nginx -- ls

kubectl exec -it nginx -- bash
kubectl exec -it apache -- sh
root@nginx:/#
```


### Killing pods


```bash
kubectl delete pod nginx
kubectl delete -f nginx.yaml

kubectl get pods
```


### Deployment

- Scale the applications by increasing or decreasing the number of replicas
- Roll out new versions of the application without downtime
- Easily rollback bad releases

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hellok8s # unique name for the deployment
spec:
  replicas: 1
  selector:      # manage all the pods tha have a label called app with
    matchLabels: # the value hellok8s
      app: hellok8s
  template:
    metadata:
      labels:
        app: hellok8s
    spec:
      containers:
      - image: brianstorti/hellok8s:v1
        name: hellok8s-container
```


```bash
kubectl apply -f deployment.yaml
# deployment.apps/hellok8s created

kubectl get deployments
# NAME       DESIRED   CURRENT   UP-TO-DATE   AVAILABLE
# hellok8s   1         1         1            1

kubectl get pods
# NAME                        READY   STATUS    RESTARTS
# hellok8s-6678f66cb8-42jtr   1/1     Running   0

kubectl port-forward hellok8s-78997b6f8f-zwv62 --address 0.0.0.0 3004567
```


### Controlling the Rollout Rate

- `maxSurge`: define how many pods we can have exceeding our desired `replica` count. The default value is 25%
- `maxUnavailable`: defines how many pods we can have below the desired count

```yaml
spec:
  strategy:
     rollingUpdate:
      maxSurge: 1
      maxUnavailable: 1
```


### Probing bad releases

- `readinessProbe`: make the container ready to start receiving requests only after it has received a specified number of successful responses

```yaml
spec:
    spec:
      containers:
      - image: brianstorti/hellok8s:buggy # Adding a buggy version
        name: hellok8s-container
        readinessProbe:
          periodSeconds: 1
          successThreshold: 5
          httpGet:
            path: /
            port: 4567
```

- `livenessProbe`: Kubernetes will keep calling this probe periodically to make sure the pod is healthy.

```yaml
spec:
    spec:
      containers:
      - image: brianstorti/hellok8s:v2
        name: hellok8s-container
        readinessProbe:
          periodSeconds: 1
          successThreshold: 5
          httpGet:
            path: /
            port: 4567
        livenessProbe:
          httpGet:
            path: /
            port: 4567
```


