---
title: Setting up Git
date: 2023-09-01
tags:
  - git
---
### Associate VS Code with Git
Of course, you should have [VS Code](https://code.visualstudio.com/download) already on your machine. 
Open Terminal and type this command
```bash
git config --global core.editor "code --wait"
```

### Automatically track remote branch

```bash
git config --global --add --bool push.autoSetupRemote true
```
### Set up handy aliases
Refer to [handy git aliases I uses day to day page](https://andrewchaa.me.uk/handy-git-aliases-i-use-day-to-day/)




