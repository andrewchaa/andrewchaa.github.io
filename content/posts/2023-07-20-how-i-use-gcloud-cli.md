---
title: How I use gcloud cli
date: 2023-07-20
tags:
  - google cloud
  - CLI
---

### Auth


```bash
# to obtain access credentials for the user account
gcloud auth login
```


### Network


```bash
# list all available networks
gcloud compute networks list --project=:project-name
```


### IDS


[https://cloud.google.com/intrusion-detection-system/docs/configuring-ids](https://cloud.google.com/intrusion-detection-system/docs/configuring-ids)


```bash
# Query IDS endpoints across projects
gcloud projects list --format="value(projectId)"

for project_id in $(gcloud projects list --format="value(projectId)"); do
  echo "Project: $project_id"
  gcloud ids endpoints list --project=$project_id
done
```


```bash
# Query projects that has VPC network but not IDS
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


```bash
# login
gcloud auth login

# add credentials for GCR repositories
gcloud auth configure-docker

# pull the image
docker pull eu.gcr.io/live/gcf/europe-west2/5f4029542275:latest
```


### List compute instances


```bash
gcloud compute instances list --project dev-test

NAME                             ZONE            MACHINE_TYPE   PREEMPTIBLE  INTERNAL_IP  EXTERNAL_IP     STATUS
europe-west2-a-gke-bastion    europe-west2-a  e2-small                    x.1.0.1    x.100.147.90     RUNNING
gateway-europe-west2-a-8kxt   europe-west2-a  n1-standard-1               x.0.0.2    x.100.147.10     RUNNING
green-europe-west2-a-0h84     europe-west2-a  n1-standard-2               x.1.0.3                     RUNNING
gateway-europe-west2-b-dwb2   europe-west2-b  n1-standard-1               x.0.0.4    x.100.76.10      RUNNING
green-europe-west2-b-bzbk     europe-west2-b  n1-standard-2               x.1.0.5                     RUNNING
green-europe-west2-c-sz0p     europe-west2-c  n1-standard-2               x.1.0.6                     RUNNING
```


### SSH


```bash
# remove the key with fingerprint 
gcloud compute os-login ssh-keys remove --key='e0d96d6fad35a61a0577f467940509b5aa08b6dea8d99456ec19a6e47126bc52'

# list login ssh keys
gcloud compute os-login ssh-keys list

# add a key with one year expiration
gcloud compute os-login ssh-keys add --key-file=/Users/user/.ssh/google_compute_engine.pub --ttl=1y
```


