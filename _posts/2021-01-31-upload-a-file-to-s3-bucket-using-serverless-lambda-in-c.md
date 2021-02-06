---
title: Upload a file to S3 bucket using serverless lambda in C\#
date: 2021-01-31T22:17:29
categories:
  - technical
tags:
  - serverless
---


### First, create a bucket in Cloudformation

Create a bucket and bucket policy with CloudFormation

```yaml
resources:
  Resources:
    attachmentsBucket:
      Type: AWS::S3::Bucket
      Properties:
        BucketName: xxxxxx-attachments
        AccessControl: Private
        CorsConfiguration:
          CorsRules:
            - AllowedMethods:
                - GET
                - PUT
                - POST
                - HEAD
              AllowedOrigins:
                - "*"
              AllowedHeaders:
                - "*"

    attachmentsBucketPolicy:
      Type: AWS::S3::BucketPolicy
      Properties:
        Bucket:
          Ref: attachmentsBucket
        PolicyDocument:
          Statement:
            - Effect: Allow
              Principal: '*'
              Action:
                - "s3:PutObject"
                - "s3:PutObjectAcl"
              Resource: "arn:aws:s3:::xxxxxx-attachments/*"

```

### Upload the file in c\#

We need to reference a package, `AWSSDK.S3` 



