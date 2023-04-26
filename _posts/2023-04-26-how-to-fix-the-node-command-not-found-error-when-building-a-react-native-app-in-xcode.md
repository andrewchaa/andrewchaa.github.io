---
title: How to Fix the "node command not found" Error When Building a React Native App in Xcode
date: 2023-04-26
tags:
  - react native
  - xcode
  - node.js
---

If you're building a React Native app in Xcode and you get the error "node: command not found", don't worry, you're not alone. This is a common error that can happen if you're using nvm (Node Version Manager).

NVM allows you to install and manage multiple versions of Node.js on your computer. When you use NVM, the node executable is installed in a directory that's not in Xcode's default search path. This is why you get the error "node: command not found" when you try to build your app.

To fix this error, you need to create a symbolic link to the node executable in Xcode's default search path. A symbolic link is a special type of file that points to another file. In this case, we're going to create a symbolic link that points to the node executable in the NVM directory.

To create a symbolic link, open a Terminal window and run the following command:

```bash
sudo ln -s $(which node) /usr/local/bin/node
```

This command will create a symbolic link called node in the /usr/local/bin directory. The /usr/local/bin directory is one of Xcode's default search paths, so this will fix the "node: command not found" error.

Once you've created the symbolic link, you should be able to build your React Native app without any errors.

