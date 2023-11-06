---
title: Build a React app with Azure Devops Pipeline
date: 2020-12-07T11:43:32
categories:
  - technical
tags:
  - azure-devops
---


* Create a new pipeline by clicking "New pipeline"
* I chose "Azure Repos Git"

## Pipeline yaml

```yaml
# azure-pipelines.yml

trigger:
  branches:
    include:
    - master
    - feature/*

pool:
  vmImage: 'ubuntu-latest'

variables:
  azureSubscription: shared-development
  system.debug: False

steps:
- task: Npm@1
  displayName: 'npm install'
  inputs:
    command: 'install'
    workingDir: 'src/'
    verbose: true

- task: Npm@1
  displayName: 'npm run build'
  inputs:
    command: 'custom'
    workingDir: 'src/'
    customCommand: 'run build'
    verbose: true

- task: CopyFiles@2
  displayName: 'Copy deployment content'
  inputs:
    SourceFolder: '$(Build.SourcesDirectory)/src/build'
    contents: '**/*'
    targetFolder: '$(Build.ArtifactStagingDirectory)'
    cleanTargetFolder: true

- task: PublishBuildArtifacts@1
  inputs:
    PathtoPublish: '$(Build.ArtifactStagingDirectory)'
    ArtifactName: 'www'
    publishLocation: 'Container'
```

