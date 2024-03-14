---
title: Handy `git` aliases I use day to day
date: 2024-03-08
tags:
  - tools
  - git
---
These aliases provide shortcuts for Git commands I commonly use, making your workflow faster and more efficient.

```shell
git config --get-regexp alias
# list of handy git aliases I use.

git config --global --unset alias.trololo
# to remove git alias you don't want any more

git config --global alias.co 'checkout'
# check out a branch

git config --global alias.new 'checkout -b'
# create a new branch

git config --global alias.renew !f() { git branch -d $1 && git checkout -b $1; }; f
# delete and recreate the branch

git config --global alias.ps 'push'
# push to the remote repository

git config --global alias.pl 'pull'
# pull from the remote repository

git config --global alias.st 'status -sb'
# shows the current branch, unstaged changes, and staged changes

git config --global alias.ll 'log --oneline'
# displays the git log in a single line format for each commit

git config --global alias.last 'log -1 HEAD --stat'
# shows information about the most recent commit

git config --global alias.cm 'commit -m'
# commit changes with a message

git config --global alias.rv 'remote -v'
# view information about remote repositories

git config --global alias.gl 'config --global -l'
# lists all configured git aliases and settings

git config --global alias.se '!git rev-list --all | xargs git grep -F'
# search all commits for a keyword

git config --global alias.dnm '!git branch | grep -v "master\\|main" | xargs git branch -D'
# delete all branches other than master or main

git config --global alias.fb '!git fetch && git rebase origin/main'
# fetch changes from the remote and rebase the local branch

git config --global alias.fm '!git fetch && git merge origin/main'
# fetch changes fromt he remote and merge the local branch
```