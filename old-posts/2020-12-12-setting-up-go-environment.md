---
title: Setting up Go environment
date: 2020-12-12T10:10:46
categories:
  - technical
tags:
  - golang
---


Go programs are organised into packages. 

* Package: a collection of source files in the same directory
* Module: a collection of related Go packages. 
* Repository: contains one or more modules

Now we have to set up environment variables and add Go paths. To see all environment variables, you can do `printenv`. Otherwise, do `echo $PATH`. 

```bash
echo $PATH

/Users/andrewchaa/.serverless/bin:
/Users/andrewchaa/.rbenv/shims:
/usr/local/bin:/usr/local/sbin:
/usr/bin:/bin:/usr/sbin:
/sbin:/usr/local/share/dotnet:
~/.dotnet/tools:
/Library/Apple/usr/bin:
/Library/Frameworks/Mono.framework/Versions/Current/Commands  
```

Let's add Go paths.



