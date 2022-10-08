---
title: Set up SSH for GIT
date: 2022-10-03
tags:
  - git
---

It’s a task I repeat when I get a new laptop. It has 3 steps

- Set up your default identity

- Add the key to the ssh-agent

- Add the public key to your Account settings

## Windows

### Set up your default identity

```bash
ssh-keygen
Generating public/private rsa key pair.
Enter file in which to save the key (/c/Users/emmap1/.ssh/id_rsa):
```

### Add the key to the ssh-agent

```bash
$ eval $(ssh-agent)
Agent pid 1950

$ ssh-add ~/.ssh/id_rsa
```

### Add the public key to your Account settings

```bash
code ~/.ssh/id_rsa.pub # to copy the public key
$ ssh -T git@bitbucket.org # to verify the configuration
```

## WSL on Windows

```bash
sudo apt install openssh-client
ssh-keygen -t rsa
```

