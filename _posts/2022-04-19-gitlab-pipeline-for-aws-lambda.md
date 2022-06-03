
---
title: gitlab-pipeline-for-aws-lambda
date: 2022-04-19T10:22:00.000Z
tags:
  - pipeline
  - gitlab
---

Gitlab pipeline starts from `.gitlab-ci.yml` in the root directory.

```yaml
include: [
  ci/common.yml,
  ci/build.yml,
  ci/dev.yml,
  ci/uat.yml,
  ci/prod.yml,
]

stages:
  - Build
  - Dev Plan
  - Dev Deploy
  - UAT Plan
  - UAT Approve Release
  - UAT Deploy
  - Prod Plan
  - Prod Announce Release
  - Prod Deploy

image: '$AWS_IMAGE:tf1.1-latest'
```

Gitlab organise the pipeline work in `stage` and `job`. A `stage` is a collection of `jobs`

To deploy a lambda, you would need to build the code, provision the cloud resource with terraform, and deploy the code to the resource. The typical process is to have `build`, `plan`, and `deploy` stages.

Build stage builds your .NET or Node.js code.

```yaml
variables:
  GIT_DEPTH: 1

Build Dotnet:
  image: "$BUILD_DOTNET_IMAGE:3.1"
  stage: Build
  script:
    - ./scripts/build-dotnet.sh
  artifacts:
    paths:
      - "out/*.zip"

Build NodeJs:
  image: "$BUILD_NODE_IMAGE:14alpine-latest"
  stage: Build
  script:
    - ./scripts/build-nodejs.sh
  artifacts:
    paths:
      - "out/*.zip"
```

Dev stage plan the resource for the `Dev` environment and deploy the code. It requires build artifacts from the `Build` stage. Global resources are those deployed only once. Regional resources are deployed multiple times in each region. Gitlab’s `paralle` `matrix` job is very handy to do it.

```yaml
Dev Plan Global:
  stage: Dev Plan
  extends: .terraform
  script:
    - ./scripts/plan.sh auth-key dev eu-west-1 global
    - ./scripts/plan.sh dns dev eu-west-1 global
  artifacts:
    paths:
      - out/*.tfplan

Dev Plan Regional:
  stage: Dev Plan
  extends: .terraform
  needs:
    - job: Build Dotnet
      artifacts: true
    - job: Build NodeJs
      artifacts: true
  parallel:
    matrix:
      - REGION: eu-west-1
      - REGION: us-east-1
  script:
    - ./scripts/plan.sh api dev ${REGION} regional
  artifacts:
    paths:
      - out/*.tfplan

Dev Deploy Global:
  stage: Dev Deploy
  extends: .terraform
  needs:
    - job: Dev Plan Global
      artifacts: true
    - job: Dev Plan Regional
      artifacts: false
  script:
    - ./scripts/apply.sh auth-key dev eu-west-1 global
    - ./scripts/apply.sh dns dev eu-west-1 global

Dev Deploy Regional:
  stage: Dev Deploy
  extends: .terraform
  needs:
    - job: Build Dotnet
      artifacts: true
    - job: Build NodeJs
      artifacts: true
    - job: Dev Plan Regional
      artifacts: true
    - job: Dev Deploy Global
      artifacts: false
  parallel:
    matrix:
      - REGION: eu-west-1
      - REGION: us-east-1
  script:
    - ./scripts/apply.sh api dev ${REGION} regional

Dev Test:
  stage: Dev Deploy
  needs:
    - job: Dev Schema Push
  trigger:
    project: orders/orders-end-to-end-tests
    branch: dev
    strategy: depend
  variables:
    api_auth_key: "$api_auth_key_dev"
    customer_support_auth_key: "$customer_support_auth_key_dev"
    ci_environment_name: "dev"
    log_level: "Information"
```

The stages for `UAT` is almost the same but two things. It has an additional step of `Approve Release` and `only: refs: master`

```yaml
UAT Approve Release:
  stage: UAT Approve Release
  allow_failure: false
  when: manual
  script: echo "Deploy to UAT environment"
  image: alpine:3.11.6
  dependencies: []
  variables:
    GIT_STRATEGY: none
  only:
    refs:
      - master
```

