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

### Query projects that has VPC network but not IDS

```bash
# --quiet ignore any interactions

for project_id in $(gcloud projects list --format="value(projectId)"); do
  # Get IDS Endpoints and VPC Networks for the project
  ids_endpoints=$(gcloud ids endpoints list --project=$project_id --quiet --format="value(NAME)")
  vpc_networks=$(gcloud compute networks list --project=$project_id --quiet --format="value(NAME)")

  # Check if the project has VPC Networks but doesn't have IDS endpoints
  if [[ -z "$ids_endpoints" ]] && [[ -n "$vpc_networks" ]]; then
    echo "Project: $project_id"
    echo "VPC Networks:"
    echo "$vpc_networks"
    echo "-----------------------------"
  fi
done
```

### Pulling a docker image from GCR

24 APR 23

I had to delete a image as it’s not used any more and it has security vulnerabilities. Before deleting it, I wanted to back it up just in case. You have to [configure credentials](https://cloud.google.com/container-registry/docs/advanced-authentication#gcloud-helper) to access GCR.

```bash
# login
gcloud auth login

# add credentials for GCR repositories
gcloud auth configure-docker

# pull the image
docker pull eu.gcr.io/live/gcf/europe-west2/5f4029542275:latest
```

