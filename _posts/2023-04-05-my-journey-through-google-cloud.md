---
title: My journey through Google Cloud
date: 2023-04-05
tags:
  - google cloud
---

This is my exploration into the unchartered territory of Google Cloud, delving into a multitude of tools and services

### CLI commands

```bash
# to obtain access credentials for the user account
gcloud auth login
```

### Set up IDC

[https://cloud.google.com/intrusion-detection-system/docs/configuring-ids](https://cloud.google.com/intrusion-detection-system/docs/configuring-ids)

Set up IAM permissions

Set up private services access by enabling the Service Networking API

```bash
# Enable Service Networking API
gcloud services enable servicenetworking.googleapis.com --project :project-name
```

