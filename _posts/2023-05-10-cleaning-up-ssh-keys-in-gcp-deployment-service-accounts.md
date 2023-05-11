---
title: Cleaning Up SSH Keys in GCP Deployment Service Accounts
date: 2023-05-10
tags:
  - google cloud
  - bash
---

When deploying resources to Google Cloud Platform (GCP), service accounts are required for authentication purposes. These accounts are used to SSH through a bastion, and the same service account is utilized for every test deployment. One issue we had was the cleanup script for SSH keys failed to work once in a while and a large number of ssh keys are built up in the metadata of the service account we use for deployment.

### The Deployment Process:

To use the deployment service account, a script is executed to log in and add an SSH key with a time-to-live (TTL) of 30 minutes. Ideally, a cleanup script should be present in each of these files, which runs when the main script exits. This cleanup script is responsible for removing the SSH key from the deployment service account.

```bash
gcloud compute ssh "${bastion_name}" \
  --project "${project}" \
  --zone "${bastion_zone}"
```

```bash
cleanup () {
    exit_code=$?
    if [ -f "${HOME}/.ssh/google_compute_engine.pub" ]; then
      echo "Removing SSH key"
      gcloud compute os-login ssh-keys remove --key-file="${HOME}/.ssh/google_compute_engine.pub"
    fi

    exit $exit_code
}
trap cleanup EXIT ERR INT TERM
```

### The Issue:

In some cases, the cleanup script failed to delete the key somehow, leading to an abundance of SSH keys accumulating on the deployment service account. 

### The Solution:

To resolve this issue, it is crucial to delete any SSH keys associated with the deployment account being used consistently. Since SSH keys are used temporarily for deployment purposes, removing them should not cause any disruptions.

This is the script that deletes all of the associated keys

```bash
cleanupRedundantSshKeys() {
  KEYS=$(gcloud compute os-login ssh-keys list --format=json | jq -r '.[].value.fingerprint')

  for key_fingerprint in $KEYS; do
    echo "Deleting key with fingerprint: $key_fingerprint"
    gcloud compute os-login ssh-keys remove --key="$key_fingerprint" || true
  done
}
```

To maintain a clean and efficient deployment process on GCP, it is essential to ensure that SSH keys are properly managed and removed after their TTL expires. By implementing a cleanup script for each deployment, you can prevent the buildup of unnecessary SSH keys and maintain a more organised and secure environment.

