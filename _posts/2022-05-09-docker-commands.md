---
title: Docker commands
date: 2022-05-09
tags:
  - docker
  - commands
---

Here are some Docker commands I use with examples:

```bash
# Build a Docker image from a Dockerfile.
docker build -t your-image-name .

# Run a Docker container using a Docker image.
docker run -d -p 8080:3000 --name your-container-name your-image-name

# List running Docker containers.
docker ps

# List Docker images.
docker images

# Execute a command inside a running Docker container.
docker exec -it your-container-name bash

# Stop a running Docker container.
docker stop your-container-name

# Remove a stopped Docker container.
docker rm your-container-name

# Remove a Docker image.
docker rmi your-image-name

# Pull a Docker image from a registry (e.g., Docker Hub).
docker pull node:14

# Show logs of a Docker container.
docker logs your-container-name
```

### Container

### Image

- `docker image ls`, `docker images`: list docker images

- `docker run -it --entrypoint sh playground-api`: overrides the existing entrypoint and run the image with bash shell

