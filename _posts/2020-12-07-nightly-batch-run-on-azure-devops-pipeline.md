---
title: Nightly batch run on Azure DevOps Pipeline
date: 2020-12-07T11:45:16
categories:
  - technical
tags:
  - azure-devops
---


My choice of solution is 

* Create a console app that does the job.
* Set up a pipeline that runs nightly to execute the console app.

### CI Build

First, build a console app and publish it as artifact.

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
          vstsFeed: 'innovation-release'
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

      # Publish the cli application
      - task: DotNetCoreCLI@2
        displayName: Publish Console Project
        inputs:
          command: publish
          publishWebProjects: false
          zipAfterPublish: false
          projects: $(cliProject)
          arguments: --no-build --no-restore -c Release /p:Platform=x64 /p:Version=$(Build.BuildNumber) -o "$(Build.ArtifactStagingDirectory)\cli\"

      - publish: $(Build.ArtifactStagingDirectory)\cli
        displayName: Publish Artifact
        artifact: cli

      - pwsh: |
          Write-Host "##vso[build.addbuildtag]$(version)"
        displayName: add build tag
```

A few things to note

* build.artifactStagingDirectory: the directory where artifact is staged

### Nightly Run Pipeline

Now, I have a build artifact that contains the console application. Create another pipeline that will download the artifact and run the executable. 

```yaml
name: $(Build.DefinitionName)-$(Date:yyyyMMdd)$(Rev:.r)
schedules:
  - cron: "0 0 * * *"
    displayName: Nightly run
    always: true
    branches:
      include:
        - master
trigger: none
parameters:  
  - name: build_tag
    displayName: Build Tag
    type: string
    default: latest
variables:
  - name: major
    value: 1
  - name: minor
    value: 0
  - name: patch
    value: $[counter(variables['minor'], 0)]
  - name: version
    value: $(major).$(minor).$(patch)
resources:
  repositories:
    - repository: templates
      type: git
      name: /yaml-templates
      ref: refs/heads/master      
  pipelines:
    - pipeline: build
      source: ci

jobs:
  - job: run_cli
    pool:
      vmImage: windows-2019
    timeoutInMinutes: 90
    steps:
      - download: none
      - task: DownloadPipelineArtifact@2
        displayName: download cli from '$(resources.pipeline.build.pipelineName)' with tag '${{ parameters.build_tag }}'
        name: download_artifact_console
        inputs:
          source: specific
          project: $(System.TeamProjectId)
          pipeline: $(resources.pipeline.build.pipelineID)
          artifactName: cli
          path: $(Pipeline.Workspace)/cli
          runVersion: latest
          allowPartiallySucceededBuilds: false
          allowFailedBuilds: false
      # Execute cli app
      - pwsh: ./Clis.exe --cmd create-domainpage
        workingDirectory: $(Pipeline.Workspace)/cli
        displayName: Executing script
        env:
          wiki-token: $(wiki-token)

```

`timeoutInMinutes` is very handy. Be default, if a job runs longer than 60 minutes, it fails. One of my nightly job runs longer, so I set it to 90 minutes.

Lastly, we need to the access token for the cli app. It needs read only access to a repository and write access to wiki. You can create variables for the pipeline. Set it as secret so that the value wouldn't be visible.

### Tasks I've used

 A [**task**](https://docs.microsoft.com/en-us/azure/devops/pipelines/process/tasks?view=azure-devops&tabs=yaml) is the building block for defining automation in a pipeline. A task is simply a packaged script or procedure that has been abstracted with a set of inputs.

#### Test

```yaml
# Test
- task: DotNetCoreCLI@2
  displayName: Test Projects
  inputs:
    command: test
    projects: $(testProjects)
    publishTestResults: true
    arguments: '--no-build -c $(buildConfiguration) /p:Platform=x64'      

```

#### Build

```yaml
# Install dotnet  
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
    includeNuGetOrg: false
    projects: $(buildProjects)
    noCache: false

# Build          
- task: DotNetCoreCLI@2
  displayName: Build Projects
  inputs:
    projects: $(buildProjects)
    packDirectory: '$(build.artifactStagingDirectory)'
    arguments: '-c $(buildConfiguration) /p:Platform=x64 /p:Version=$(Build.BuildNumber) --no-restore'      

```

#### Publish and add it as artifact

```yaml
# dotnet publish
- task: DotNetCoreCLI@2
  displayName: Publish Console Project
  inputs:
    command: publish
    publishWebProjects: false
    zipAfterPublish: false
    projects: $(cliProject)
    arguments: --no-build --no-restore -c Release /p:Platform=x64 /p:Version=$(Build.BuildNumber) -o "$(build.artifactStagingDirectory)\cli\"

# publics the artifact
- publish: $(build.artifactStagingDirectory)\cli
  displayName: Publish Artifact
  artifact: cli

```

#### Pack nuget package and publish to the feed

```yaml
# pack nuget package
- task: NuGetCommand@2
  displayName: Pack
  condition: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/master'))
  inputs:
    command: 'pack'
    packagesToPack: '**/*.nuspec'
    versioningScheme: 'byBuildNumber'
    buildProperties: 'Platform=x64'

# Publish to the innovation release feed
- task: DotNetCoreCLI@2 
  displayName: Publish to Nuget Feed
  condition: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/master'))
  inputs:
    command: push
    packagesToPush: '$(build.artifactStagingDirectory)/*.nupkg'
    publishVstsFeed: ''

```

