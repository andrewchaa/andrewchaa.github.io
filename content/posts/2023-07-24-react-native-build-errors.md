---
title: React Native Build Errors
date: 2023-07-24
tags:
  - react native
  - xcode
---

Building React Native app sometimes can be very challenging. It emits loads of different errors. This is the collection of errors I encountered and was able to fix with the help of many other guys on the Internet. 


### Sentry - API request failed


Wed. 18/10/2023


error: API request failed
caused by: sentry reported an error: unknown error (http status: 507)


### **node command not found**


This is a common error that can happen if you're using nvm (Node Version Manager). NVM allows you to install and manage multiple versions of Node.js on your computer. When you use NVM, the node executable is installed in a directory that's not in Xcode's default search path. This is why you get the error "node: command not found" when you try to build your app.


To fix this error, you need to create a symbolic link to the node executable in Xcode's default search path. A symbolic link is a special type of file that points to another file. In this case, we're going to create a symbolic link that points to the node executable in the NVM directory.


```bash
sudo ln -s $(which node) /usr/local/bin/node
```


### Using the first of multiple matching destinations


This happens when you have multiple iPhone destinations with the same version: [https://stackoverflow.com/questions/69306519/flutter-error-xcodebuild-warning-using-the-first-of-multiple-matching-destina](https://stackoverflow.com/questions/69306519/flutter-error-xcodebuild-warning-using-the-first-of-multiple-matching-destina)


```dart
xcodebuild: WARNING: Using the first of multiple matching destinations:
    { platform:iOS Simulator, id:dvtdevice-DVTiOSDeviceSimulatorPlaceholder-iphonesimulator:placeholder, name:Any iOS Simulator Device }
    { platform:iOS Simulator, id:320795B7-1385-4044-B442-87A9808936D9, OS:15.0, name:iPhone 13 Pro }
```


Simply open the project in XCode. The error will go away afterwards.


### use_expo_modules! 


The root cause of the issue was the latest breaking change in Ruby 3.2. Ruby is known for its frequent breaking changes in order to improve quickly. **`File.exists?`** was removed in Ruby 3.2.


A workaround for this issue is to install Ruby 3.1 instead.


