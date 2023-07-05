---
title: Interview Questions - Microservice
date: 2023-07-02
tags:
  - microservice
  - interview
---

### Disclaimer

These are my revision notes for my job interviews. As a contractor, I have job interviews more often than a permanent employee. Writing down the revision notes does not imply that I am incapable of answering these questions naturally. During interviews, I naturally get nervous, and due to my introversion, I often struggle to clearly articulate what I already know and understand. I simply want to avoid those situations and prepare myself to present myself in the best possible way.

### How would you ensure a request to another service that fails is not done more than once?

- **409 Conflict**: If an POST API request fails because the entity already exists, return 409 Conflict so that the client stop retrying the same request

- **422 Too Many Requests**: If the request fails because the service cannot handle all the requests, return 422 Too Many Requests, so that the client stops retrying to send the same request

- **Retries with Exponential Backoff and Jitter**: Retry failed requests but with an increasing delay (exponential backoff) between each retry to give the failing service time to recover. The addition of jitter (randomness) helps to avoid all retried requests hitting the server at the same time if the failures were due to a load issue.

- **Using a Message Queue**: A message queue like RabbitMQ or Amazon SQS can be used for requests to other services. When a request fails, it can be returned to the queue to be tried again later. We can also implement a maximum retry count to avoid endless loops.

- **Implementing Circuit Breaker Pattern**: The circuit breaker pattern can help us to handle failures gracefully. When a service is down, the circuit breaker 'opens' and fails all further requests to the service without actually making the requests. The circuit breaker will periodically 'half-open' to test if the service has recovered. If the test request succeeds, the circuit breaker 'closes', and requests can be made to the service normally again. This prevents hammering a failing service with requests.

- **Idempotency**: Idempotency refers to the property where operations produce the same results whether they are done once or multiple times. This can be achieved by designing our APIs in such a way that multiple identical requests have the same effect as a single request.

### How would you design Instagram?

- Gather details by asking questions

- Write down Core features

	- Upload image

	- Follow other users

	- User feed

	- Support 10,000,000 users

- Define data models

	- Users: id, name, email, locatioin

	- Photos: id, user_id, caption, location, path

- Write all decisions clearly on the board

- Start from simplest design first

