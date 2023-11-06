---
title: How to Fix Node-Gyp Error When Installing Npm Packages
date: 2023-05-11
tags:
  - node.js
  - python
---

If you're trying to install npm packages for your Node or React app and you're getting a node-gyp error, you're not alone. This is a common error that can be caused by a number of things, but the most common cause is a mismatch between the node-gyp version and the Python version.


To fix this error, you'll need to install the correct version of Python and set the local Python version. Here's how to do it:


### Install the correct version of Python.


If you're using nvm, set your node version correctly. My node project uses node 16.x
you can use the following command to install the correct version of Python:


```bash
# .nvmrc
16.14.0
```


```bash
nvm use
```


If you're using pyenv, you can use the following command to install the correct version of Python:


```bash
pyenv install 3.8.16
```


Once you've installed the correct version of Python, you need to set the local Python version. To do this, use the following command:


```bash
pyenv local 3.8.16
```


### Try installing the npm packages again.


Once you've set the local Python version, try installing the npm packages again. If the error is gone, you're all set!


**Here are some additional tips:**

- Make sure you're using the latest version of node-gyp. You can do this by running the following command:

```bash
npm install -g node-gyp
```


