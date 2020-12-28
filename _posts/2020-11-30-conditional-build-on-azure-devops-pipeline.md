---
title: Conditional Build on Azure Devops Pipeline
date: 2020-11-30T15:18:02
categories:
  - technical
tags:
  - azure-devops
---


The first step is to add a test on the buld. It didn't have any build trigger. So I added it.

```yaml
name: scoring-services
trigger:
  branches:
    exclude:
      - master

```

Now also shedule it to run it nightly

```yaml
schedules:
  - cron: "0 0 * * *"
    displayName: Daily midnight build
    always: true
    branches:
      include:
        - master
```

To be continued ...

