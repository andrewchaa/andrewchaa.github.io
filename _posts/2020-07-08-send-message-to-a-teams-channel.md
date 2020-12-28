---
title: Send message to a Teams' channel
date: 2020-07-08T10:13:31
categories:
  - technical
tags:
  - drafts
---


We started posting pending PRs in the group chat. Soon, it became a chore. So I thought we could automate it by scripting it.

## Creating an [incoming webhook](https://docs.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook)

Click ... on the top right corner to open the menu and choose Connector

![](../.gitbook/assets/image%20%2814%29.png)

Select Incoming Webhook. It'll give you an api endpoint for you to use.

```bash
https://outlook.office.com/webhook/xxxxx/IncomingWebhook/xxxx
```

Now Let's use the webhook endpoint to [send messages](https://docs.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/connectors-using).

## Sending messages

There's a playground to test your message format: [https://amdesigner.azurewebsites.net/](https://amdesigner.azurewebsites.net/)

To send a message, you call the webhook endpoint with string content. It supports mark down syntax.

```csharp
var chatRoom =
    "https://outlook.office.com/webhook/xxxxxxx";

var card = GetBody(facts);

var client = new HttpClient();
var response = await client.PostAsync(
    chatRoom,
    new StringContent(card));

```

For the card mesasge, I used [this example](https://docs.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/connectors-using).

```javascript
{
    "@type": "MessageCard",
    "@context": "http://schema.org/extensions",
    "themeColor": "0076D7",
    "summary": "Larry Bryant created a new task",
    "sections": [{
        "activityTitle": "![TestImage](https://47a92947.ngrok.io/Content/Images/default.png)Larry Bryant created a new task",
        "activitySubtitle": "On Project Tango",
        "activityImage": "https://teamsnodesample.azurewebsites.net/static/img/image5.png",
        "facts": [{
            "name": "Assigned to",
            "value": "Unassigned"
        }, {
            "name": "Due date",
            "value": "Mon May 01 2017 17:07:18 GMT-0700 (Pacific Daylight Time)"
        }, {
            "name": "Status",
            "value": "Not started"
        }],
        "markdown": true
    }],
    "potentialAction": [{
        "@type": "ActionCard",
        "name": "Add a comment",
        "inputs": [{
            "@type": "TextInput",
            "id": "comment",
            "isMultiline": false,
            "title": "Add a comment here for this task"
        }],
        "actions": [{
            "@type": "HttpPOST",
            "name": "Add comment",
            "target": "http://..."
        }]
    }, {
        "@type": "ActionCard",
        "name": "Set due date",
        "inputs": [{
            "@type": "DateInput",
            "id": "dueDate",
            "title": "Enter a due date for this task"
        }],
        "actions": [{
            "@type": "HttpPOST",
            "name": "Save",
            "target": "http://..."
        }]
    }, {
        "@type": "ActionCard",
        "name": "Change status",
        "inputs": [{
            "@type": "MultichoiceInput",
            "id": "list",
            "title": "Select a status",
            "isMultiSelect": "false",
            "choices": [{
                "display": "In Progress",
                "value": "1"
            }, {
                "display": "Active",
                "value": "2"
            }, {
                "display": "Closed",
                "value": "3"
            }]
        }],
        "actions": [{
            "@type": "HttpPOST",
            "name": "Save",
            "target": "http://..."
        }]
    }]
}
```





