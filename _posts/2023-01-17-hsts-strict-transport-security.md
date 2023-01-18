---
title: HSTS: Strict Transport Security
date: 2023-01-17
tags:
  - security
---

Strict-Transport-Security (HSTS) is a security feature that lets a web site tell browsers that it should only be accessed using HTTPS, instead of using HTTP. Once a supported browser receives this header that a website is compliant with HSTS, the browser will prevent any communications from being sent over HTTP to the specified domain and will instead send all communications over HTTPs. This is intended to prevent man-in-the-middle attacks and cookie hijacking.

