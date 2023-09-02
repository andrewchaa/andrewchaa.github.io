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

### Set up handy aliases

```bash
git config --global alias.co 'checkout'
git config --global alias.new 'checkout -b'
git config --global alias.ps 'push'
git config --global alias.pl 'pull'
git config --global alias.st 'status -sb'
git config --global alias.ll 'log --oneline'
git config --global alias.last 'log -1 HEAD --stat'
git config --global alias.cm 'commit -m'
git config --global alias.rv 'remote -v'
git config --global alias.gl 'config --global -l'
git config --global alias.se '!git rev-list --all | xargs git grep -F'
git config --global alias.dnm '!git branch | grep -v "master\|main" | xargs git branch -D'
git config --global alias.fb '!git fetch && git rebase origin/main'
git config --global alias.fm '!git fetch && git merge origin/main'
```

