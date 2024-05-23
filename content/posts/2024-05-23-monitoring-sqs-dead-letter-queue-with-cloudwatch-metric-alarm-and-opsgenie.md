---
title: Monitoring SQS Dead-Letter Queues with CloudWatch Metric Alarms and OpsGenie Integration
date: 2024-05-23
tags:
  - terraform
---
In this blog post, we'll explore how to create a CloudWatch metric alarm that monitors an Amazon Simple Queue Service (SQS) dead-letter queue and sends notifications to OpsGenie whenever there are messages in the dead-letter queue.

Dead-letter queues are essential for building fault-tolerant and reliable messaging systems. They serve as a repository for messages that cannot be processed successfully by the main queue, allowing for further investigation or reprocessing. However, it's crucial to monitor these queues and receive timely alerts when messages start accumulating, indicating potential issues that need to be addressed.

AWS CloudWatch provides a powerful monitoring solution for AWS services, including SQS. By creating CloudWatch metric alarms, you can define rules and thresholds to trigger alerts based on specific metrics. In this case, we'll create an alarm to monitor the `ApproximateNumberOfMessagesVisible` metric for the SQS dead-letter queue.

OpsGenie is a modern incident response and alerting platform that integrates seamlessly with AWS CloudWatch. By leveraging the OpsGenie integration, we can receive real-time alerts and notifications whenever our CloudWatch alarm is triggered, ensuring that our operations team is promptly informed about any issues with the dead-letter queue.

Here's the Terraform code that sets up the CloudWatch metric alarm and OpsGenie integration:

```
resource "aws_cloudwatch_metric_alarm" "send_notification_dlq_alarm" {
  alarm_name          = "${var.component}-${var.env}-send-notification-dlq-alarm"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "1"
  metric_name         = "ApproximateNumberOfMessagesVisible"
  namespace           = "AWS/SQS"
  period              = "300"
  statistic           = "SampleCount"
  threshold           = "0"
  alarm_description   = "This metric checks for any messages in the dead letter queue"
  alarm_actions       = [aws_sns_topic.opsgenie.arn]
  dimensions = {
    QueueName = aws_sqs_queue.send_notification_dead_letter.name
  }
}
```

Let's break down the code:

`comparison_operator`: The comparison operator for the alarm (`GreaterThanThreshold`).
`evaluation_periods`: The number of consecutive periods the metric must meet the threshold condition before triggering the alarm (1 period in this case).
`metric_name`: The name of the SQS metric to monitor (`ApproximateNumberOfMessagesVisible`).
`period`: The period (in seconds) over which the metric data is queried (300 seconds = 5 minutes).
`statistic`: The statistic to apply to the metric (`SampleCount`).
`threshold`: The threshold value for the alarm (0 in this case, meaning any non-zero value will trigger the alarm).
`alarm_actions`: The ARN of the Amazon SNS topic associated with OpsGenie, where notifications will be sent.
`dimensions`: The dimensions to identify the specific SQS queue (`QueueName=send_notification_dead_letter`).

With this CloudWatch metric alarm in place, OpsGenie will receive a notification whenever the `ApproximateNumberOfMessagesVisible` metric for the dead-letter queue exceeds the threshold of 0, indicating that there are messages in the queue.

OpsGenie provides a user-friendly interface for managing alerts, allowing you to acknowledge, assign, and resolve incidents. You can also configure escalation policies, on-call schedules, and integration with various communication channels (e.g., email, SMS, chat apps) to ensure that the right team members are notified promptly.

By combining the power of AWS CloudWatch, SQS dead-letter queues, and OpsGenie, you can effectively monitor and respond to potential issues in your messaging system, minimising downtime and ensuring smooth operations.