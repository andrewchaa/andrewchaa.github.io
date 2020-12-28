---
title: Adding a custom endpoint to AWS Amplify API
date: 2020-09-02T09:00:32
categories:
  - technical
tags:
  
---


I've added the existing custom api endpoint to the config file

```javascript
"aws_cloud_logic_custom": [
    {
        "name": "new_api",
        "endpoint": "https://xxxxxx1.execute-api.eu-west-1.amazonaws.com/dev",
        "region": "eu-west-1"
    },
    {
        "name": "existing_api",
        "endpoint": "https://xxxxxx2.execute-api.eu-west-1.amazonaws.com/dev",
        "region": "eu-west-1"
    }
],
```

One thing to be careful about is you can't have the name, `aws-exports.js`. It's the default config file name and the content of the file will be overwritten on Amplify Console build. I named mine to `aws-exports-custom.js`.  

