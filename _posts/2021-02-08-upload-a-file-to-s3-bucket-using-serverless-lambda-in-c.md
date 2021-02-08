---
title: Upload a file to S3 bucket using serverless lambda in C\#
date: 2021-02-08T21:34:44
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
        BucketName: xxxx-attachments-${opt:stage, self:provider.stage}
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
                - "s3:GetObject"
              Resource: "arn:aws:s3:::xxxx-attachments-${opt:stage, self:provider.stage}/*"
            - Effect: Allow
              Principal:
                AWS: 
                  - Fn::GetAtt: [ IamRoleLambdaExecution, Arn ]
              Action:
                - "s3:PutObject"
                - "s3:PutObjectAcl"
                - "s3:GetObject"
              Resource: "arn:aws:s3:::xxxx-attachments-${opt:stage, self:provider.stage}/*"

```

As it's a public bucket, it allows `s3:GetObject` to everyone \(`Principal:'*'`\). Yet, only `IamRoleLambdaExecution` can upload the file. 

### Pre-signed url

It's much easier and hassle-free to use presigned request to S3 to upload files. API Gateway is not really for uploading binary blob.

![Using Presigned Request Url](/assets/image%20%2827%29.png)

```csharp
public APIGatewayProxyResponse Post(APIGatewayProxyRequest proxyRequest)
{
   var (request, err) = proxyRequest.Body.Deserialize<AttachmentRequest>();
   if (err != null)
   {
       return BadRequest(err.Message);
   }

   Console.WriteLine($"Received upload attachment request, {request.ToJson()}");
   
   var key = $"{Guid.NewGuid()}.{request.Filename}";
   var s3Client = new AmazonS3Client(RegionEndpoint.EUCentral1);
   var urlRequest = new GetPreSignedUrlRequest
   {
      BucketName = Buckets.Attachments,
      Key = key,
      Verb = HttpVerb.PUT,
      Expires = DateTime.UtcNow.AddMinutes(1)
   };

   var signedUrl = s3Client.GetPreSignedURL(urlRequest);

   return Ok(new
   {
      Key = key, 
      ObjectUrl = $"https://{urlRequest.BucketName}.s3.eu-central-1.amazonaws.com/{key}",
      SignedUrl = signedUrl
   });
  
}

```





