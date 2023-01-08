---
title: Back up DynamoDB tables
date: 2023-01-07
tags:
  - dynamodb
---

There are a few different options for backing up DynamoDB tables on AWS:

- DynamoDB Backup and Restore: This is a fully managed service that allows you to create on-demand or scheduled backups of your DynamoDB tables. You can use these backups to restore your tables in case of data loss or corruption.

- AWS Data Pipeline: This is a fully managed service that allows you to automate the movement and transformation of data. You can use AWS Data Pipeline to schedule regular backups of your DynamoDB tables and store them in Amazon S3.

- AWS CLI: You can use the AWS Command Line Interface (CLI) to create on-demand backups of your DynamoDB tables and store them in Amazon S3. This requires some manual effort, but can be useful for one-time backups or for backing up tables on a ad hoc basis.

- Third-party tools: There are also several third-party tools available that can help you automate the process of backing up DynamoDB tables. These tools may offer additional features such as data compression, incremental backups, and more.

Regardless of the method you choose, it's important to regularly test your backups to ensure that they are working as expected and can be used to restore your data in the event of a disaster.

The AWS DynamoDB console has an option to create data pipeline to back up the table to S3. To use it, the table should have Point-In-Time-Recovery (PITR) enabled. So I updated my terraform to enable it.

```yaml

```

