---
title: Installing Ruby on Mac with chruby and ruby-install
date: 2022-12-27
tags:
  - ruby
  - mac setup
---

Installing Ruby on a Mac using chruby and ruby-install is a quick and easy way to manage multiple versions of Ruby on your system. In this blog post, we'll outline the steps required to install Ruby using these tools.

Before you begin, make sure that you have the latest version of Xcode and the Xcode command line tools installed on your Mac. You can install these by opening the Terminal app and running the following command:

```bash
xcode-select --install
```

Once you have Xcode and the command line tools installed, you can proceed with the installation of chruby and ruby-install.

### Installing chruby and ruby-install

To install chruby and ruby-install, you'll need to use a package manager like Homebrew. If you don't already have Homebrew installed, open the Terminal app and enter the following command:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

This will download and install Homebrew on your system.

With Homebrew installed, you can now use it to install chruby and ruby-install. Enter the following commands in the Terminal:

```bash
brew install chruby
brew install ruby-install
```

This will download and install both chruby and ruby-install.

### Installing Ruby

Now that chruby and ruby-install are installed, you can use them to install Ruby. To install the latest stable version of Ruby, enter the following command in the Terminal:

```bash
ruby-install ruby
```

This will download and install the latest stable version of Ruby. 

Once the installation is complete, you can use chruby to switch between different versions of Ruby. For example, to switch to the latest stable version of Ruby, enter the following command:

```bash
chruby ruby
---
ruby-3.2.0
```

To switch to a specific version of Ruby, specify the version number like this:

```bash
chruby ruby-3.2.0
```

To use the latest version in the terminal automatically, add the followings to your `~/.zshrc`

```bash
source /opt/homebrew/opt/chruby/share/chruby/chruby.sh
source /opt/homebrew/opt/chruby/share/chruby/auto.sh
chruby ruby-3.2.0
```

### Conclusion

Installing Ruby on a Mac using chruby and ruby-install is a quick and easy way to manage multiple versions of Ruby on your system. With these tools installed, you can easily switch between different versions of Ruby as needed, and install new versions as they are released. Whether you're a Ruby developer working on multiple projects or just want to try out the latest version of Ruby, chruby and ruby-install make it easy to manage your Ruby installations on a Mac.

