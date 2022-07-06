---
title: Git Commands
date: 2022-06-27
tags:
  - commands
  - git
---

Usage|Description
---|---
`git branch \| grep -v "master" \| xargs git branch -D`|delete all local branches except master
`git co master -- source/graphql/yarn.lock`|revert the file with the file from the master branch
`git clone --depth 1` [`https://github.com/django/django.git`](https://github.com/django/django.git)|shallow clone, getting the latest copy of the relevant files, saving space and time
`git config --global core.editor "code --wait`|set VS Code as the default git editor
`git config --global --edit`|edit global config file
`git config --global --list`|list global config entries
`git fetch origin, git reset --hard origin/master`|reset local repository branch to remote repository HEAD
`git remote prune origin`|to fix `error: cannot lock ref ...`
`git reset --mixed origin/HEAD`|reset to origin/HEAD leaving files uncommitted
`git tag -am "9.9.0" 9.9.0`
`git push --tags`|create a tag locally and remotely
`git tag -d 9.9.0`
`git push --delete origin 9.9.0`|delete the tag locally and remotely
`cat ~/.ssh/id_rsa.pub`|print public ssh key

