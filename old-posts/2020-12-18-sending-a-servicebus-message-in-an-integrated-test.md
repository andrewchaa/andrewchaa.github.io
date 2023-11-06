---
title: Sending a ServiceBus message in an integrated test
date: 2020-12-18T13:24:17
categories:
  - technical
tags:
  - azure-service-bus
---


## What to test for integration testing?

You send a message and assert that the message is processed in a reasonable timeframe. If there's an issue with the mesasge, for example, that the payload is invalid, it would be retried a few times and would go to deadletter subscription queue. 

```csharp
public class HandleTransactionCreatedEventTests : IClassFixture<IntegrationTestClientFixture>
{
    private readonly IntegrationTestClientFixture _clientFixture;
    private readonly ITestOutputHelper _output;
    private readonly Fixture _fixture;
    private readonly TopicClient _topicClient;

    public HandleTransactionCreatedEventTests(IntegrationTestClientFixture clientFixture, 
        ITestOutputHelper output)
    {
        _clientFixture = clientFixture;
        _output = output;
        _fixture = new Fixture();

        _topicClient = new TopicClient(clientFixture.ServiceBusConnectionString,EventNames.TransactionCreated);
    }

    [Fact]
    public async Task Should_process_TransactionCreatedEvent_successfully()
    {
        // Arrange
        var transactionCreatedEvent = _fixture.Build<TransactionCreatedEvent>()
            .With(x => x.Currency, "EUR")
            .With(x => x.EndToEndId, Guid.NewGuid().ToString().Substring(0, 10))
            .With(x => x.Kind, "TransactionKind")
            .With(x => x.ActualPaymentMethod, "Card")
            .With(x => x.RequestedPaymentMethod, "Card")
            .Create();
        var message = transactionCreatedEvent.ToMessage();
        message.MessageId = Guid.NewGuid().ToString();
        _output.Log(transactionCreatedEvent);

        // Act
        await _topicClient.SendAsync(message);
        await _topicClient.CloseAsync();

        // Assert
        Assert.False(await _clientFixture.MessageStillInQueue(EventNames.TransactionCreated, message.MessageId));
        Assert.False(await _clientFixture.MessageFoundInDeadLetterQueue(EventNames.TransactionCreated, message.MessageId));
    }

}

```

## Check if the message is still in the subscription queue

```csharp
public async Task<bool> MessageStillInQueue(string eventName, string messageId)
{
    var receiver = new MessageReceiver(ServiceBusConnectionString,
        EntityNameHelper.FormatSubscriptionPath(eventName, EventNames.LedgerSubscripton));

    var messages = await receiver.PeekAsync(100);
    return messages.Any(x => x.MessageId == messageId);
}

```

The assumption is that the mesasge shouldn't in the subscription queue if it's processed correctly. I know it's not a strong argument but it seems to work. 

Also don't forget to check dead letter message queue.

```csharp
public async Task<bool> MessageFoundInDeadLetterQueue(string eventName, string messageId)
{
    var receiver = new MessageReceiver(ServiceBusConnectionString,
        EntityNameHelper.FormatDeadLetterPath(
            EntityNameHelper.FormatSubscriptionPath(eventName, EventNames.LedgerSubscripton)
            )
        );

    var messages = await receiver.PeekAsync(100);
    return messages.Any(x => x.MessageId == messageId);
}

```

