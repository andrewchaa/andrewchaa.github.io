---
title: Connecting to Github with SSH
date: 2022-10-03
tags:
  - git
---

GitHub is a popular version control platform that allows developers to collaborate on software projects. One way to connect to GitHub is through Secure Shell (SSH), which allows you to securely transfer files between your computer and the GitHub server. In this post, we'll walk through the steps of setting up an SSH connection to GitHub on a Mac.

### Step 1: Generate an SSH key

Before you can connect to GitHub with SSH, you need to generate an SSH key pair on your Mac. This consists of a private key that stays on your computer and a public key that you register with GitHub.

To generate an SSH key pair, open Terminal on your Mac and run the following command:

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"

Generating public/private rsa key pair.
Enter file in which to save the key (/Users/andrew/.ssh/id_rsa):
Created directory '/Users/{your-user}/.ssh'.
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /Users/{your-user}/.ssh/id_rsa
Your public key has been saved in /Users/{your-user}/.ssh/id_rsa.pub
The key fingerprint is:
SHA256:vJEp3o+eIfSF/xxxxxxxx your_email@example.com
The key's randomart image is:
+---[RSA 4096]----+
|          oo+    |
|         o *..   |
|          + +    |
|       -- + ++   |
|      o S = =  . |
|     o +     -- +|
|      o = +. ++*o|
|       . = . o++o|
|       .+ . o..EB|
+----[SHA256]-----+
```

On Windows for BitBucket

```bash
ssh-keygen
Generating public/private rsa key pair.
Enter file in which to save the key (/c/Users/emmap1/.ssh/id_rsa):

$ eval $(ssh-agent)
Agent pid 1950

$ ssh-add ~/.ssh/id_rsa
```

Replace "[**your_email@example.com**](mailto:your_email@example.com)" with the email address you used to sign up for GitHub. You will be prompted to enter a file in which to save the key and a passphrase for the key. You can either accept the default file location and leave the passphrase blank, or specify a different file location and enter a passphrase for added security.

Once the key pair is generated, you can view the public key by running the following command:

```bash
cat ~/.ssh/id_rsa.pub

The authenticity of host 'github.com (140.82.121.3)' can't be established.
ED25519 key fingerprint is SHA256:xxxxxxxx.
This key is not known by any other names
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added 'github.com' (ED25519) to the list of known hosts.
Hi {your_user_name}! You've successfully authenticated, but GitHub does not provide shell access.
```

On Windows for BitBucket

```bash
code ~/.ssh/id_rsa.pub # to copy the public key
$ ssh -T git@bitbucket.org # to verify the configuration
```

This will display the public key, which you will need in the next step.

### Step 2: Register the public key with GitHub

To register the public key with GitHub, log in to your GitHub account and go to your account settings. Click on the "SSH and GPG keys" tab and then click on the "New SSH key" button.

In the "Title" field, enter a name for the key (e.g. "Macbook"). In the "Key" field, paste the public key that you copied from the previous step. Finally, click on the "Add SSH key" button to save the key.

### Step 3: Test the connection

To test the connection, run the following command in Terminal:

```bash
ssh -T git@github.com
```

On Windows for BitBucket

```bash
$ ssh -T git@bitbucket.org
```

If the connection is successful, you should see a message like "Hi username! You've successfully authenticated, but GitHub does not provide shell access."

That's it! You are now set up to connect to GitHub with SSH on your Mac. You can use this connection to push and pull code from GitHub repositories, as well as perform other Git operations.

I hope this post has been helpful in getting you set up with SSH on your Mac. If you have any questions or comments, please feel free to leave them below. Happy coding!

