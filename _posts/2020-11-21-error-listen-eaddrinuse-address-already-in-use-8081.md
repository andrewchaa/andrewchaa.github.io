---
title: error listen EADDRINUSE address already in use 8081
date: 2020-11-21T23:57:18
categories:
  - technical
tags:
  - react
---


```bash
lsof -i :8081                                                                                                                                                                                                                ✘ 1 master ✱ ◼
COMMAND  PID USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
node    9298 user   25u  IPv6 0x991d2852b16exxxx      0t0  TCP *:sunproxyadmin (LISTEN)

❯❯❯ kill -9 9298                                                                                                                                                                                                                     master ✱ ◼
❯❯❯ npm start     
```

