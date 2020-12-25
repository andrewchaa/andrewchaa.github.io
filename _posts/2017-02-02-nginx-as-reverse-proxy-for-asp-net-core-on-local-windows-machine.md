---
title: Nginx as Reverse proxy for ASP.NET Core on Local Windows machine
date: 2017-02-02
categories: [programming]
tags:
  email: andrew.yh.chaa@gmail.com
---

NginX is a basket full of interesting features, but here, I'll focus on using it as reverse proxy.

## Resources

Theses are the resources I've used and read to use NginX as my local reverse proxy for KESTREL.

* https://aspnetmonsters.com/2016/07/2016-07-17-nginx/
* NginX download: http://nginx.org/en/download.html
* nginx for windows: http://nginx.org/en/docs/windows.html
* An intro to nginx for KESTREL: https://aspnetmonsters.com/2016/07/2016-07-17-nginx/
* Beginner's Guide: http://nginx.org/en/docs/beginners_guide.html
* Increase names hash bucket size: http://charles.lescampeurs.org/2008/11/14/fix-nginx-increase-server_names_hash_bucket_size
* nginx server block: http://stackoverflow.com/questions/13240840/nginx-reverse-proxy-multiple-backends
* automatic proxy settings overrides your local hosts file: http://stackoverflow.com/questions/17842750/windows-hosts-file-not-working

## download nginx

Let's install NginX first. It's highly recommend that you use NginX on linux, not windows though. We just do it on windows for local development. Let's go to http://nginx.org/en/download.html and download windows binary. Unzip it and rename the folder like C:\nginx

To test, you run nginx.exe. I got a message like this.

```
nginx: [emerg] bind() to 0.0.0.0:80 failed (10013: An attempt was made to access a socket in a way forbidden by its access permissions)
```

It's because port :80 is already being used. On windows machine, there are a few applications that could be using port 80. It might be Skype, IIS or Sql Server Reporting. In my case, it was SQL server Reporting service. So I went to services and stopped it.

Once you stopped any service that occupied port 80, ngingx should be able to bind to port 80.

Now let's set up the configuration for our needs.

## nginx configuration

I've made a back-up of the existing nginx.conf like nginx - backup.conf.

Here is my configuration.

```
worker_processes  1;

error_log  logs/error.log;
error_log  logs/error.log  notice;
error_log  logs/error.log  info;

pid        logs/nginx.pid;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  logs/access.log  main;
    sendfile        on;
    keepalive_timeout  65;
    gzip  on;

    server {
        listen       80;
        server_name  localhost;

        location / {
          proxy_pass http://127.0.0.1:8060/;
        }
    }
}
```

It listens to port 80 and the server name is localhost. It will redirect the requst to localhost:8060 where my asp.net core app's running on kestrel. However, I don't want to use localhost. I'd like to map a subdomain to the app like awesomeapp.mydomain.com.

So I've added host entry and changed the server name.

c:\windows\system32\drivers\etc\hosts

```

127.0.0.1    ir-local.services.com
```

**caution**

Make sure you don't have automatic proxy settings and put your address in the proxy exemption list. (http://stackoverflow.com/questions/17842750/windows-hosts-file-not-working). If you have automatic proxy, it'll override your hosts file entry


nginx.conf

```
http {
    include       mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] $host "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"'
                      '$host $http_host';

    access_log  logs/access.log main;
    sendfile        on;
    keepalive_timeout  65;
    gzip  on;
    server_names_hash_bucket_size 64;

    server {
        listen       80;
        server_name  ir-local.astalavista.com;
        access_log  logs/access.ir.local.log main;

        location / {
          proxy_set_header X-Real-IP $remote_addr;
          proxy_set_header Host $host;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
          proxy_pass http://127.0.0.1:8060;
        }
    }
}


```

In the meantime, I came across an error, "nginx: [emerg] bind() to 0.0.0.0:80 failed (10013: An attempt was made to access a socket in a way forbidden by its access permissions)". It's becasue my domain names were quite long. You can increase the size of hash bucket in the config.

```
http {
    server_names_hash_bucket_size 64;
    ...
}
```
