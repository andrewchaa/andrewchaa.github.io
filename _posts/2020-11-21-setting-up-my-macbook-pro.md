---
title: Setting up my Mac
date: 2020-11-21T21:56:57
categories:
  - technical
classes: wide
---


## Shell

* Instantly Awesome Zsh: [https://github.com/sorin-ionescu/prezto](https://github.com/sorin-ionescu/prezto)

### prezto

to show git branch, add git to the module

```text
# ~/.zprezto/runcoms/zpreztorc

# Set the Prezto modules to load (browse modules).
# The order matters.
zstyle ':prezto:load' pmodule \
  'environment' \
  'terminal' \
  'editor' \
  'history' \
  'directory' \
  'spectrum' \
  'utility' \
  'completion' \
  'git' \
  'prompt'
```



## System Preference

### Disable touch bar for text editors and IDE

Go to System Preferences &gt; Keyboard &gt; Shortcuts. Select function keys and add your apps.

![](.gitbook/assets/image%20%2820%29.png)

