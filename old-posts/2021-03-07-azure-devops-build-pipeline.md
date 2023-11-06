---
title: Azure DevOps Build Pipeline
date: 2021-03-07T22:06:43
categories:
  - technical
tags:
  - azure-devops
---


![](/assets/image%20%2818%29.png)

* A trigger tells a Pipeline to run
* A pipeline is made of one or more stages. A pipeline can deploy to one or more environments
* A stage is a way of organizing jobs in a pipeline and each stage can have one more jobs
* Each job runs on one agent. A job can also be agentless
* Each agent runs a job that contains one or more steps
* A step can be a task or script and is the smallest building block of a pipeline.
* As task is a pre-packged script that performs an action, such as invoking a REST API or publishing a build artifact.
* An artifact is a collection of files or packages published by a run.

## Jobs

### CI build to create artifacts

```yaml
name: 1.0$(Rev:.r)

trigger:
  branches:
    include:
    - master
    - hotfix/*
    - release/*
    - feature/*
    - bugfix/*
    - backlog/*
    - task/*

variables:
  major: 1
  minor: 0
  patch: $[counter(variables['minor'], 0)]
  version: $(major).$(minor).$(patch)
  dotnetCliVersion: 3.1.101
  buildConfiguration: Release
  buildPlatform: x64
  buildProjects: "**/*.csproj"
  cliProject: '**/*Clis.csproj'

jobs:
  - job: build_solution
    pool:
      vmImage: windows-2019
    steps:
      - checkout: self
        clean: true
        
      - task: UseDotNet@2        
        inputs:
          packageType: 'sdk'
          version: $(dotnetCliVersion)
          displayName: dotnet install

      # Restore packages
      - task: DotNetCoreCLI@2
        displayName: Restore Packages
        inputs:
          command: restore
          feedsToUse: select
          vstsFeed: 'release'
          includeNuGetOrg: false
          projects: $(buildProjects)
          noCache: false

      # Build          
      - task: DotNetCoreCLI@2
        displayName: Build Projects
        inputs:
          projects: $(buildProjects)
          packDirectory: '$(Build.ArtifactStagingDirectory)'
          arguments: '-c $(buildConfiguration) /p:Platform=x64 /p:Version=$(Build.BuildNumber) --no-restore'      

      # Publish the console application
      - task: DotNetCoreCLI@2
        displayName: Publish Console Project
        inputs:
          command: publish
          publishWebProjects: false
          zipAfterPublish: false
          projects: $(cliProject)
          arguments: --no-build --no-restore -c Release /p:Platform=x64 /p:Version=$(Build.BuildNumber) -o "$(Build.ArtifactStagingDirectory)\console\"

      - publish: $(Build.ArtifactStagingDirectory)\cli
        displayName: Publish Artifact
        artifact: console

      - pwsh: |
          Write-Host "##vso[build.addbuildtag]$(version)"
        displayName: add build tag
```

### Run tests

```yaml
name: $(Build.DefinitionName)_$(SourceBranchName)_$(Date:yyyyMMdd)$(Rev:.r)
parameters:
  - name: dotnet_version
    type: string
    default: 3.x
  - name: test_projects
    type: string
    default: "**/*.Tests.csproj"
  - name: build_platform
    type: string
    default: x64

stages:
  - stage: runtests
    jobs:
      - job: run deserialization tests
        pool:
          vmImage: windows-2019
        steps:
          - task: UseDotNet@2
            displayName: Use dotnet Version ${{ parameters.dotnet_version }}
            inputs:
              packageType: sdk
              version: ${{ parameters.dotnet_version }}
          - task: DotNetCoreCLI@2
            displayName: NuGet Restore
            inputs:
              command: restore
              projects: ${{ parameters.test_projects }}
              feedsToUse: select
              noCache: true
          - task: DotNetCoreCLI@2
            displayName: dotnet Test
            inputs:
              command: test
              projects: ${{ parameters.test_projects }}
              publishTestResults: true
              arguments: -c Release /p:Platform=${{ parameters.build_platform }}


```

#### Build step with multiline script

from [https://stackoverflow.com/questions/60391458/azure-pipeline-multiline-script](https://stackoverflow.com/questions/60391458/azure-pipeline-multiline-script) 

```text
steps:
- script: |
    echo "good"
    echo "nice"
```

## Approvals, checks, and gates

### Gate

Gates allow you to configure automated calls to external services, where the results are used to approve or reject a deployment. 



