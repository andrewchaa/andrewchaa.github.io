---
title: Handy git aliases
date: 2022-10-13
tags:
  - git
---

List of handy git aliases I use.

To list git aliases

```bash
git config --get-regexp alias
```

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
```

