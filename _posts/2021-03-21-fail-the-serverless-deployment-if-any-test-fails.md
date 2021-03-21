---
title: Fail the serverless deployment if any test fails
date: 2021-03-21T20:08:31
categories:
  - technical
tags:
  - serverless
---


```bash
#!/bin/bash

#install zip on debian OS, since microsoft/dotnet container doesn't have zip by default
if [ -f /etc/debian_version ]
then
  apt -qq update
  apt -qq -y install zip
fi

pushd src/KeidApis.Tests/
dotnet test | tee test-results.txt
popd

if grep -q "Failed: " src/KeidApis.Tests/test-results.txt; then
  echo "The deployment has stopped as there are failing tests..."
  rm src/KeidApis.Tests/test-results.txt
  exit
fi  

rm src/KeidApis.Tests/test-results.txt
pushd src/KeidApis.Apis/

dotnet restore
dotnet lambda package --configuration Release --framework netcoreapp3.1 --output-package bin/Release/netcoreapp3.1/package.zip
sls deploy
popd

```

First, it run all the tests by running `dotent test` `tee` will redirect the out to the file as well as to the screen. `grep` checks if the `test-results.txt` contains any failing tests. If it does, `exit` will stop the execution of the script. 

All the following bits are to deploy the lamda code to the test environment.

