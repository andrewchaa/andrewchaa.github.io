---
title: Cognito userpool as authorizer of your lambda in serverless
date: 2021-02-13T21:52:32
categories:
  - technical
tags:
  - serverless
---


```yaml
  httpApi:
    authorizers:
      serviceAuthorizer:
        identitySource: $request.header.Authorization
        issueUrl: https://cognito-idp.${opt:region, self:provider.region}.amazonaws.com
        audience:
          - Ref: serviceUserPoolClient
          
  createAnnouncement:
    handler: XxxxApis.Apis::XxxxApis.Apis.Controllers.PostsController::Post
    package:
      artifact: bin/Release/netcoreapp3.1/package.zip
    events:
      - http:
          path: posts
          method: post
          cors: true
          authorizer: 
            arn: arn:aws:cognito-idp:eu-central-1:xxxxxxx:userpool/eu-central-1_${opt:userpoolId, self:provider.userpoolId}
          
resources:
  Resources:
    serviceUserPool:
      Type: AWS::Cognito::UserPool
      Properties:
        UserPoolName: xxxx-${opt:stage, self:provider.stage}
        AdminCreateUserConfig:
          AllowAdminCreateUserOnly: True
        UsernameAttributes:
          - email
        AutoVerifiedAttributes:
          - email
    serviceUserPoolClient:
      Type: AWS::Cognito::UserPoolClient
      Properties:
        ClientName: xxxx-client-${opt:stage, self:provider.stage}
        AllowedOAuthFlows:
          - implicit
        AllowedOAuthFlowsUserPoolClient: true
        AllowedOAuthScopes:
          - phone
          - email
          - openid
          - profile
          - aws.cognito.signin.user.admin
        UserPoolId:
          Ref: serviceUserPool
        CallbackURLs:
          - http://localhost:3000/sign-in-callback
          - https://www.xxxx.or.kr/sign-in-callback
        ExplicitAuthFlows:
          - ALLOW_USER_SRP_AUTH
          - ALLOW_REFRESH_TOKEN_AUTH
        GenerateSecret: false
        SupportedIdentityProviders:
          - COGNITO
    serviceUserPoolDomain:
      Type: AWS::Cognito::UserPoolDomain
      Properties:
        UserPoolId:
          Ref: serviceUserPool
        Domain: xxxx-${opt:stage, self:provider.stage}-${self:provider.environment.DOMAIN_SUFFIX}

```

