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

# list all available networks
gcloud compute networks list --project=:project-name
```

### IDS

[https://cloud.google.com/intrusion-detection-system/docs/configuring-ids](https://cloud.google.com/intrusion-detection-system/docs/configuring-ids)

### Query IDS endpoints across projects

```bash
gcloud projects list --format="value(projectId)"

for project_id in $(gcloud projects list --format="value(projectId)"); do
  echo "Project: $project_id"
  gcloud ids endpoints list --project=$project_id
done
```

