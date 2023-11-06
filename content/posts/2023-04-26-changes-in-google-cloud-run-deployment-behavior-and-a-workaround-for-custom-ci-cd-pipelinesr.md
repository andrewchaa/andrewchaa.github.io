---
title: Changes in Google Cloud Run Deployment Behavior and a Workaround for Custom CI/CD Pipelinesr
date: 2023-04-26
tags:
  - google cloud
  - CLI
---

Google Cloud Run has been a popular choice for deploying containerized applications quickly and easily on Google Cloud Platform. However, a recent change in the default behavior of the **`gcloud run deploy`** command has left some users with broken deployment pipelines. In this blog post, we will discuss this change, its impact on custom CI/CD pipelines, and a workaround to ensure smooth deployments.


### Issue


Starting from March 8, 2023, Google Cloud Run has altered the default behavior of the **`gcloud run deploy`** command. The command now automatically runs the npm build script (**`npm run build`**) even if you do not specify it. This change was made to improve the performance of deployments.


However, this modification has led to issues in some CI/CD pipelines that deploy to Google Cloud using **`gcloud run deploy`**. In these cases, the pipelines began to fail due to the automatic execution of the **`npm run build`** script. The issue arises because not all files are available at the point when the build script runs. In many custom CI/CD environments, the application is already built and only the compiled files are uploaded. As a result, running the "npm build" script again is not necessary and leads to errors.


### Workaround:


To resolve this issue and ensure that your custom CI/CD pipelines continue to function correctly, you can add an empty build command to your **`package.json`** file. This will override the default behavior of the **`gcloud run deploy`** command and prevent it from executing the **`npm run build`** script automatically.


To do this, simply add the following line to the "scripts" section of your **`package.json`** file:


```json
"gcp-build": ""
```


By including this empty command, you effectively instruct Google Cloud Run to skip the build step during the deployment process.


