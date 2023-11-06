---
title: Print all environment variables in Azure DevOps pipeline
date: 2021-02-24T10:59:55
categories:
  - technical
tags:
  - azure-devops
---


```yaml
steps: 
  – task: Bash@3
    inputs:
      targetType: 'inline'
      script: 'env | sort'
```

