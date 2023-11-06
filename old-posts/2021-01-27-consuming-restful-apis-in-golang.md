---
title: Consuming restful APIs in GoLang
date: 2021-01-27T19:37:16
categories:
  - technical
tags:
  - golang
---


I was given a [docker compose](https://docs.docker.com/compose/) file. I need to launch the docker in order to call the test apis. 

```yaml
version: '3'

services:
  accountapi:
    image: form3tech/interview-accountapi:v1.0.0-4-g63cf8434
    restart: on-failure
    depends_on:
      - postgresql
      - vault
    environment:
      - VAULT_ADDR=http://vault:8200
      - VAULT_TOKEN=8fb95528-57c6-422e-9722-d2147bcba8ed
      - PSQL_USER=root
      - PSQL_PASSWORD=password
      - PSQL_HOST=postgresql
      - PSQL_PORT=5432
      - STACK_NAME=f3-interview-accountapi
      - DATABASE-HOST=postgresql
      - DATABASE-SSL-MODE=disable
      - DATABASE-USERNAME=interview_accountapi_user
      - DATABASE-PASSWORD=123
    ports:
      - 8080:8080
  postgresql:
    image: postgres:9.5-alpine
    healthcheck:
      test: [ "CMD", "pg_isready", "-q", "-d", "postgres", "-U", "root" ]
      timeout: 45s
      interval: 10s
      retries: 10
    restart: always
    environment:
      - POSTGRES_USER=root
      - POSTGRES_PASSWORD=password
    volumes:
      - ./scripts/db:/docker-entrypoint-initdb.d/

  vault:
    image: vault:0.9.3
    environment:
      - SKIP_SETCAP=1
      - VAULT_DEV_ROOT_TOKEN_ID=8fb95528-57c6-422e-9722-d2147bcba8ed
```

As I have the yaml, I'd love to lanuch the docker image, but a few things before I get to the point. I need to [install Docker Desktop on my Mac](https://docs.docker.com/docker-for-mac/install/). Once installed, run `docker-compose up` to run the docker

You can connect to the docker image interactively

```bash
docker exec -it 7cb277649098b3ae /bin/sh; exit
psql
```

When I ran the docker image, it had errors saying, "password authentication failed for user 'interview\_accountapi\_user'". I had to create the database and the user by connecting to the docker image and running the commands to create user

```text
CREATE USER interview_accountapi_user WITH PASSWORD '***';
CREATE DATABASE interview_accountapi OWNER interview_accountapi_user;
```



