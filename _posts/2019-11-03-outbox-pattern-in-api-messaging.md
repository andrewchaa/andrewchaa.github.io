---
title: Outbox Pattern in API and Messaging
date: 2019-11-03T00:00:00.000Z
comments: true
categories:
  - programming
tags: APIs Messaging
---

Outbox is a simple relational database table that temporarily store all the events the service raises.

Usually, an API request performs the following actions in sequence.

**POST /customers**

1. Validate the request
1. Create the customer in the database
1. Raise an event, CustomerCreated on messaging platform such as Service Bus or AWS SNS
1. Send the response, 201, back to the API client

In outbox pattern, you have two app services, API app and Event worker service.

**POST /customers**

API App

1. Validate the request
1. Create the customer in the database
1. Store the event to raise in a temporary table, Outbox
1. Send the response, 201, back to the API client

Event Worker Service

1. Poll the outbox database in intervals to perform batch job
1. Read the stored events from the table
1. Publish those events
1. Delete the stored data from the Outbox table

What would be the benefits, then?

As API app doesn't publish the resulting event to messaging platform, the request finishes quicker. Event worker service processes message publication in batches, so it becomes more efficient. EWS deletes the stored event from the outbox as the last step, you would never fail to publish events. If it fails to publish it, it wouldn't be able to delete it, so would try to publish the event in the next batch.


