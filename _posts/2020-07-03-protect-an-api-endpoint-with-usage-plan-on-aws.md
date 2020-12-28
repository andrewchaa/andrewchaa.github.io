---
title: Protect an API endpoint with usage plan on AWS
date: 2020-07-03T18:39:32
categories:
  - technical
classes: wide
---


Recently, we received a new business requirement that another central system needs to access the backend and update the warranty information. The system will call this api once a day like a batch job in old days. We needed another policy. The simplest approach is to use API key with usage plan. 

## Usage plan

A [usage plan](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-api-usage-plans.html) specifies who can access one or more deployed API stages and methods—and also how much and how fast they can access them. The plan uses API keys to identify API clients and meters access to the associated API stages for each key. It also lets you configure throttling limits and quota limits that are enforced on individual client API keys.

## Create a usage plan

Go to API Gateway &gt; Usage plans and click "Create" button.

* Name
* Description

I skipped the stage for now. 

### Usage Plan API Keys

Choose "Add API Key" below to search through your existing API keys. Once a key is associated with a plan, API Gateway will meter all requests from the key and apply the plan's throttling and quota limits.

I've created a new one as I don't have any existing one. 

Now you have an active usage plan with an api key. The client can use this API key to access the API.

## Create api keys by using Serverless framework

You can specify a list of API keys to be used by your service Rest API by adding an apiKeys array property to the provider object in serverless.yml. You'll also need to explicitly specify which endpoints are private and require one of the api keys to be included in the request by adding a private boolean property to the http event object you want to set as private

```yaml
# serverless.yml

provider:
  name: aws
  runtime: dotnetcore2.1

  ...
  apiKeys:
    - name: <api key name>
      value: <api key value>
  usagePlan:
    quota:
      limit: 1000
      offset: 2
      period: MONTH
    throttle:
      burstLimit: 50
      rateLimit: 100

package:
  individually: true

functions:

  ...
  updateRegistrationWarranty:
    handler: Lambdas::Functions.updateRegistrationWarranty::Run

    package:
      artifact: bin/release/netcoreapp2.1/deploy-package.zip

    events:
      - http:
          path: registrations/{id}/warranty
          method: put
          reqeust:
            parameters:
              path:
                id: true
          cors: true
          private: true

```

