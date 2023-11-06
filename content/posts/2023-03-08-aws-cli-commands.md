---
title: AWS CLI Commands
date: 2023-03-08
tags:
  - AWS
  - CLI
---

### Download all data from an AWS DynamoDB table


```bash
aws dynamodb scan --table-name <table-name> --output json > <output-file>.json
aws dynamodb scan --table-name navien_service_agent-jobs-dev --output table jobs.csv
```


