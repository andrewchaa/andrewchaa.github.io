---
title: My note on Github Actions
date: 2023-01-05
tags:
  - github actions
---

### Use matrix to reduce duplication of steps

To repeat the same job with different environment variables in a GitHub Actions workflow and run the jobs in parallel, you can use the `strategy` and `matrix` keywords.

Here is an example of how to use these keywords in a workflow:

```yaml
name: Deploy

on:
  push:
  workflow_dispatch:

jobs:
  deploy:
    name: deploy
    runs-on: ubuntu-latest
    strategy:
      matrix:
        stage: ['dev', 'prod']
      fail-fast: true
      max-parallel: 1
    env:
      TF_VAR_env: ${{ matrix.stage }}
      TF_VAR_website_callback_urls: '["http://localhost/callback"]'
      TF_VAR_website_signout_urls: '["http://localhost/signout"]'
    steps:
    - name: Checkout
      uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: 16
    - name: yarn build
      run: |
        yarn
        yarn build
    - name: Set up Terraform
      uses: hashicorp/setup-terraform@v1
    - name: Terraform Init
      working-directory: ./terraforms
      run: terraform init
      id: init
    - name: Terraform Plan
      working-directory: ./terraforms
      id: plan
      run: terraform plan -no-color -input=false
      continue-on-error: true
    - name: Terraform Plan Status
      if: steps.plan.outcome == 'failure'
      run: exit 1
    - name: Terraform Apply
      working-directory: ./terraforms
      id: apply
      if: github.ref == 'refs/heads/main' && github.event_name == 'push'
      run: terraform apply -auto-approve -input=false
```

In this example, the **`deploy`** job is defined with a **`strategy`** that creates a matrix of possible values for the **`env`** variable. The **`deploy`** job will be run once for each value in the matrix, with the corresponding **`env`** value set as an environment variable. In this case, the **`deploy`** job will be run twice, once with **`TF_VAR_env=dev`** and once with **`TF_VAR_env=prod`**.

### Run a step conditionally based on a git branch name

To run a step in a GitHub Actions workflow conditionally based on the branch, you can use the **`if`** and **`unless`** keywords.

Here is an example of how to use these keywords in a workflow:

```yaml
name: CI

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js
        uses: actions/setup-node@v1
        with:
          node-version: 14.x
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test
      - name: Deploy to staging
        run: npm run deploy-staging
        if: ${{ github.ref == 'refs/heads/staging' }}
      - name: Deploy to production
        run: npm run deploy-production
        if: ${{ github.ref == 'refs/heads/production' }}
```

In this example, the **`Deploy to staging`** step will be run only if the branch being pushed is **`staging`**, and the **`Deploy to production`** step will be run only if the branch being pushed is **`production`**.

You can also use the **`unless`** keyword to specify conditions that should be negated. For example:

```yaml
      - name: Deploy to staging
        run: npm run deploy-staging
        unless: github.ref == 'refs/heads/main'
```

This step will be run unless the branch being pushed is **`production`**.

### Run matrix job sequentially

The **`matrix`** feature allows you to execute jobs concurrently, eliminating the need to repeat common steps. However, I often need to run these jobs sequentially, particularly when deploying to **`dev`** and **`prod`**. In these situations, setting **`max-parallel`** to **`1`** is very useful.

```yaml
jobs:
  deploy:
    name: deploy
    runs-on: ubuntu-latest
    strategy:
      matrix:
        stage: ['dev', 'prod']
      fail-fast: true
      max-parallel: 1
    env:
      TF_VAR_env: ${{ matrix.stage }}
      TF_VAR_website_callback_urls: '["http://localhost/callback"]'
      TF_VAR_website_signout_urls: '["http://localhost/signout"]'
```

