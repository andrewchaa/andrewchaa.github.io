---
title: Build CI/CD pipeline for serverless by using Github Action
date: 2021-02-04T15:58:35
categories:
  - technical
tags:
  - serverless
---


You create a yaml file in `.github/workflows` directory. Very similar approach to other CI/CD pipelines like Azure DevOps. The order of the jobs was like this.

* Set the agent VM: ubuntu-latest
* Set node version: \[14.x\]
* Define `steps` 
* Set up Node
* Install serverless
* Restore dotnet packages, as I used C\# as the language
* Install Amazon.Lambda.Tools
* Build the serverless package
* Serverless deploy

I had to learn a few things in the hard way. Also there wasn't any example to deploy serverless functions written in C\#. Hope this post could help for other developers who chose to use C\# for their projects.

#### Trigger on master branch

This was very simple. 

```yaml
name: Deploy master branch

on:
  push:
    branches:
      - main
```

#### Checkout the code and set up node on the agent

```yaml
jobs:
  deploy:
    name: deploy
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [14.x]
    steps:
    - uses: actions/checkout@v2
    - name: Setup .NET Core SDK
      uses: actions/setup-dotnet@v1.7.2
      with:
        dotnet-version: 3.1.x
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v1
      with:
        node-version: ${{ matrix.node-version }}
```

### Build the project and deploy

I encountered quite a few issues here. 

#### No .NET project found

This was because the command runs in the current working directory by default and it's the root directory of the project, not where the project file was. The lambda project was `/src/keid-apis` Simply I changed the directory to the project directory. Also to run multiple commands, you have to use `|` 

```yaml
- run: |
        npm i -g serverless
        pushd src/KeidApis.Apis
```

#### Security tokens

You can use Github's secret management and it was very straightforward and useful.

```yaml
env:
        AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
        AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        AWS_SDK_LOAD_CONFIG: 1

```

#### Profile ... does not exist

I was pulling my hair to sort this out. My serverless yaml had profile specified, so that it wouldn't use default profile which was different from my laptop and from my friend's machine. Once the profile exists in the yaml, `serverless deploy` [tries to find the profile](https://github.com/serverless/serverless/issues/5474) from `~/.aws/credentials` and `~/.aws/config` and then fails. To be fair, it's not `serverless` behaviour. It's the AWS plugin that Serverless uses. 

I solved the issue by creating those two files in the agent.

```yaml
- run: |
        mkdir ~/.aws
        (echo "[keid]"; echo "aws_access_key_id=${{ secrets.AWS_ACCESS_KEY_ID }}"; echo "aws_secret_access_key=${{ secrets.AWS_SECRET_ACCESS_KEY }}") > ~/.aws/credentials
        (echo "[keid]"; echo "region=eu-central-1"; echo "output=json") > ~/.aws/config
```

#### My action script

This is the whole script for the deployment.

```yaml
name: Deploy master branch

on:
  push:
    branches:
      - main

jobs:
  deploy:
    name: deploy
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [14.x]
    steps:
    - uses: actions/checkout@v2
    - name: Setup .NET Core SDK
      uses: actions/setup-dotnet@v1.7.2
      with:
        dotnet-version: 3.1.x
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v1
      with:
        node-version: ${{ matrix.node-version }}
    - run: |
        mkdir ~/.aws
        (echo "[keid]"; echo "aws_access_key_id=${{ secrets.AWS_ACCESS_KEY_ID }}"; echo "aws_secret_access_key=${{ secrets.AWS_SECRET_ACCESS_KEY }}") > ~/.aws/credentials
        (echo "[keid]"; echo "region=eu-central-1"; echo "output=json") > ~/.aws/config
        npm i -g serverless
        pushd src/KeidApis.Apis
        dotnet restore
        dotnet tool install -g Amazon.Lambda.Tools --framework netcoreapp3.1
        dotnet lambda package --configuration Release --framework netcoreapp3.1 --output-package bin/Release/netcoreapp3.1/package.zip
        serverless deploy
      env:
        AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
        AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        AWS_SDK_LOAD_CONFIG: 1
```

