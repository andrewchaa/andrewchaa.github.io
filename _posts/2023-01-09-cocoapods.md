---
title: Cocoapods
date: 2023-01-09
tags:
  - react native
  - ruby
---

CocoaPods is a dependency manager for Swift and Objective-C Cocoa projects. It helps you integrate third-party libraries, frameworks, and other software packages into your project. You can use CocoaPods to manage dependencies for your project and to specify the versions of third-party libraries that your project depends on. 

### Installing CocoaPods

I had an issue with ruby installed with `brew`. My workaround was to install ruby with `chruby` and `ruby-install`. ruby 3.1.3 is the version without XCode 14 issue.

```bash
brew install chruby
brew install ruby-install

ruby-install ruby 3.1.3`
```

Then you have to update your `~/.zshrc` with the following.

```bash
source /opt/homebrew/opt/chruby/share/chruby/chruby.sh
source /opt/homebrew/opt/chruby/share/chruby/auto.sh
chruby ruby-3.1.3`
```

Then install CocoaPods. I didn't have to use `sudo`.

```bash
gem install cocoapods
```

### Uninstalling CocoaPods

```bash
gem list --local | grep cocoapods | awk '{print $1}' | xargs gem uninstall
rm -rf .cocoapods/
```

