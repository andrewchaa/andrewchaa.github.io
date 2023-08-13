---
title: Access database through bastion hosts
date: 2023-07-21
tags:
  - devops
  - bastion
  - ssh
---

A bastion host is a special-purpose computer on a network specifically designed and configured to withstand attacks, so named by analogy to the military fortification. The computer generally hosts a single application or process, for example, a proxy server or load balancer, and all other services are removed or limited to reduce the threat to the computer

You can protect sensitive data stores from outside access by using a [bastion host](https://en.wikipedia.org/wiki/Bastion_host). Then the data is shielded by a firewall, and bastions are dedicated bridge machines that sit between the firewall and the outside world and only allow authorised users to tunnel through to the data.

You can use Google OS Login to manage access to the bastion hosts, if you use google cloud. This requires you to upload your SSH to Google.

### Upload your SSH to Google Cloud

Get ready your SSH key pair. The public key is usually in `~/.ssh`. If you don’t any, [generate a new key](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent). 

Install gcloud CLI if you haven’t. Otherwise, authenticate the CLI tools with Google by running `gcloud auth login`

Check if you have already uploaded any key by running `gcloud compute os-login ssh-keys list`. If you have, you have a list of uploaded keys

```bash
FINGERPRINT    EXPIRY
8b1336...      2024-07-19T22:20:32Z
```

If you don’t have any uploaded key, add a key.

```bash
cloud compute os-login ssh-keys add \
	--project core \
	--key-file ~/.ssh/testkey.pub \
	--ttl 1y
```

Very if your OS Login profile exists

```bash
gcloud compute os-login describe-profile --project core
```

### Create a tunnel

```bash
ssh -L <local_port>:localhost:<instance_port> <username>@<base_url>
```

Once it succeeds. [`localhost`](http://localhost/) will be the host name of your database instance, even though it’s not on your local network. It’s because the port is forward to a remote host.

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/97672406-33d9-4552-a4fa-5e5ea4309e4b/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230813%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230813T012340Z&X-Amz-Expires=3600&X-Amz-Signature=e2fecdcb33ecabbffec7c6a3223e22363e81203c15e636d6395012c602ec6eb5&X-Amz-SignedHeaders=host&x-id=GetObject)

