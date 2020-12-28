---
title: Getting started with Serverless framework in c\#
date: 2020-12-20T20:00:43
categories:
  - technical
tags:
  - serverless
---


```bash
npm i -g serverless
```

You can verify the installation by running `serverless` To see which version of serverless you have installed run:

```text
serverless --version
```

Lets create a service using the provided CLI.

```bash
sls create --template aws-csharp --path lifenote

Serverless: Generating boilerplate...
Serverless: Generating boilerplate in "/Users/./dev/lifenote"
 _______                             __
|   _   .-----.----.--.--.-----.----|  .-----.-----.-----.
|   |___|  -__|   _|  |  |  -__|   _|  |  -__|__ --|__ --|
|____   |_____|__|  \___/|_____|__| |__|_____|_____|_____|
|   |   |             The Serverless Application Framework
|       |                           serverless.com, v2.16.0
 -------'

Serverless: Successfully generated boilerplate for template: "aws-csharp"
```

To build the solution, run `build.sh`

```text
# Linux or Mac OS
./build.sh

# Windows PowerShell
.\build.cmd
```

You can deploy it by `sls deploy`

This will deploy your function to AWS Lambda based on the settings in `serverless.yml`.

To invoke the function, do `sls invoke -f hello`

