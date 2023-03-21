---
title: Git Commands
date: 2022-06-27
tags:
  - commands
  - git
---

### Resources

- [https://stackoverflow.com/questions/50525244/git-command-output-is-in-editor-vim-and-not-directly-to-terminal-output](https://stackoverflow.com/questions/50525244/git-command-output-is-in-editor-vim-and-not-directly-to-terminal-output)

### Set up commands

```bash
# output the list of git branches to the terminal directly
git config --global pager.branch false
```

### Often used commands

```bash
# stash
git stash save "work in progress"
git stash list
git stash apply 0

# delete all local branches except master
git branch \| grep -v "master" \| xargs git branch -D

# on windows
git branch | select-string -NotMatch -Pattern "master" | %{ git branch -D $_.ToString().Trim() }

# rename branch
git branch -m feature/4810-feature-flag

# revert the file with the file from the master branch
git co master -- source/graphql/yarn.lock

# shallow clone, getting the latest copy of the relevant files, saving space and time
git clone --depth 1 [https://github.com/django/django.git](https://github.com/django/django.git)

# set VS Code as the default git editor
git config --global core.editor "code --wait"

# print public ssh key
cat ~/.ssh/id_rsa.pub

# prune local git cache
git fetch -p

# delete the tag locally and remotely
git tag -d 9.9.0
git push --delete origin 9.9.0

# create a tag locally and remotely
git tag -am "9.9.0" 9.9.0
git push --tags

# reset to origin/HEAD leaving files uncommitted
git reset --mixed origin/HEAD

# git pull force
git reset --hard origin/main

# to fix error: cannot lock ref ...
git remote prune origin

# reset local repository branch to remote repository HEAD
git fetch origin, git reset --hard origin/master

# list global config entries
git config --global --list

# edit global config file
git config --global --edit
```

