---
title: Building APIs on AWS with TypeScript, Terraform, API Gateway, and Lambda
date: 2023-09-14
tags:
  - build
  - typescript
  - lambda
  - terraform
---

### Structured logging

`@aws-lambda-powertools/logger` enables JSON structured logging for AWS lambda.

```shell
yarn add @aws-lambda-powertools/logger
```

```typescript
import { Logger } from '@aws-lambda-powertools/logger'

const logger = new Logger({ serviceName: 'cognito-service' })
logger.info('Cognito user deleted successfully')
```

It logs the output like this

```json
{
    "level": "INFO",
    "message": "creating a job: {\n    \"jobNo\": \"2023030600001\",\n    \"companyId\": \"CT01\",\n    \"customer\": {\n        \"name\": \"Tester4 Lee\",\n        \"phone\": \"07377 692777\",\n        \"address\": {\n            \"line1\": \"20 Skerne Walk\",\n            \"line2\": \"Kingston\",\n            \"postcode\": \"KT2 5LQ\",\n            \"country\": \"United Kingdom\"\n        }\n    },\n    \"product\": {\n        \"id\": \"PLCB0021SH001\",\n        \"name\": \"LCB;0021,Kerosene,S,I,GB,CE\",\n        \"serialNumber\": \"1434W2281159027\"\n    },\n    \"serviceRequestDate\": \"2023-02-20\",\n    \"customerComment\": \"111Lorem Ipsum ...\",\n    \"estimatedSymptom\": \"A0100005\",\n    \"installationDate\": \"2023-01-29\",\n    \"warrantyExpiryDate\": \"2033-01-28\"\n}",
    "service": "createJob",
    "timestamp": "2023-10-04T21:51:59.285Z",
    "xray_trace_id": "1-651dde7e-0a0ed53805f4f1db59b3b2fc"
}
```

