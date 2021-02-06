---
title: Everything about defining functions in serverless.yaml
date: 2021-01-27T19:59:52
categories:
  - technical
tags:
  - serverless
---


### Simple function that simply has http event.

```yaml
functions:
  listAnnouncements:
    handler: KeidApis.Apis::KeidApis.Apis.Controllers.AnnouncementsController::List
    package:
      artifact: bin/Release/netcoreapp3.1/package.zip
    events:
      - http:
          path: announcements
          method: get

```

I used `Controller` convention as I'm used to ASP.NET core structure. 

The `handler`'s format is `[Assembly Name]::[Full Name of the Class]::[Method Name]` 

| Valule | Description |
| :--- | :--- |
| KeidApis.Apis | the name of the assembly |
| KeidApis.Apis.Controllers.AnnouncementsController | the full class name |
| List | the method name |

### HTTP uri with request parameters

You can define request parameters, so that the function can parse a part of the uri and use it as parameter.

```yaml
  updateWarranty:
    handler: Navien.Installers.Lambdas::Navien.Installers.Lambdas.Functions.RegistrationsController::WarrantyPut
    package:
      artifact: bin/release/netcoreapp2.1/deploy-package.zip

    events:
      - http:
          path: /registrations/{serialNumber}/warranty
          method: put
          reqeust:
            parameters:
              path:
                serialNumber: true
          cors: true
          private: true

```

* {serialNumber} is the request parameter
* `true` means it's a mandatory parameter. The API Gateway will throw an exceptioin if the parameter is not in the url.
* `cors` matters as `put` is not a safe method and you need `cors` to make an api call from your javascript application.
* `private` means it's using an API key.

If you define request parameter, you can get the value from request's PathParameters collection

```csharp
public async Task<APIGatewayProxyResponse> WarrantyPut(
    APIGatewayProxyRequest request)
{
    var serialNumber = request.PathParameters["serialNumber"];

```

