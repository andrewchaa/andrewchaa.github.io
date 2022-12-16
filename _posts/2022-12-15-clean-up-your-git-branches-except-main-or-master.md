---
title: Clean up your git branches except main or master
date: 2022-12-15
tags:
  - git
---

As a developer, one of the tasks that I frequently perform is cleaning up my local Git repository by deleting old branches that are no longer needed. This is especially important if you work on a team and have multiple branches for different features or bug fixes. In this post, I will show you how to delete all of your local Git branches except for the branches named "main" and "master".

To delete all of your local Git branches, you can use the following command:

```bash
$ git branch | grep -v "main\|master" | xargs git branch -D
```

This command uses the **`git branch`** command to list all of the local branches in your repository, then uses the **`grep`** command to filter out the branches named "main" and "master". Finally, it uses the **`xargs`** command to pass the remaining branch names to the **`git branch -D`** command, which deletes the branches.

Alternatively, you can use the **`-a`** flag with the **`git branch`** command to list both local and remote branches, then use the same **`grep`** and **`xargs`** commands to delete all branches except for "main" and "master". Here is the command for that:

```bash
$ git branch -a | grep -v "main\|master" | xargs git branch -D
```

It's important to note that the **`git branch -D`** command only works for branches that have been fully merged into another branch, such as "main" or "master". If you have any local branches that have not been fully merged, you will need to use the **`git branch -d`** command instead. This command will delete the branch, but only if it has been fully merged.

In summary, deleting all of your local Git branches except for "main" and "master" is a simple task that can be accomplished using the **`git branch`**, **`grep`**, and **`xargs`** commands. This will help you keep your local repository clean and organized, and make it easier to manage your branches and collaborate with others on your team.

