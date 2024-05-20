---
title: Create AWS SQS Queue with Retry Policy
date: 2024-05-20
tags:
  - terraform
---
The purpose of this Terraform script is to create an SQS queue (`update_cic_job`) with a dead-letter queue (`update_cic_job_dead_letter`) for handling messages that fail to be processed successfully. The redrive policy specifies that after 5 attempts, any unprocessed messages will be moved to the dead-letter queue for further investigation or handling.

This setup is useful for building fault-tolerant and reliable messaging systems, where failed messages are not lost but instead moved to a separate queue for later analysis or reprocessing. It also helps prevent the main queue from being flooded with messages that cannot be processed, ensuring that other messages can continue to be processed smoothly.
This Terraform script defines two AWS Simple Queue Service (SQS) queues: `update_cic_job` and `update_cic_job_dead_letter`.

```
resource "aws_sqs_queue" "update_cic_job" {
  name = "${var.component}-${var.env}-update-cic-job"

  redrive_policy = jsonencode({
    deadLetterTargetArn = aws_sqs_queue.update_cic_job_dead_letter.arn
    maxReceiveCount = 5
  })
}

resource "aws_sqs_queue" "update_cic_job_dead_letter" {
  name = "${var.component}-${var.env}-update-cic-job-dead-letter"
}
```
