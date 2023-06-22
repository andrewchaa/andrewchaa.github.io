---
title: git merge vs git rebase, my perspective
date: 2023-06-21
tags:
  - git
---

As developers, we often find ourselves entangled in the intricate web of code version control. Git, the go-to version control system for many developers, offers a variety of commands to make this process easier. Two of the most commonly used commands are **`git merge`** and **`git rebase`**. Both are used to integrate changes from one branch into another, but they do so in distinctly different ways, and choosing between them can significantly affect the simplicity of your project's history.

what do these two commands actually do:

- **`git merge`**: This command takes the contents of a source branch and integrates it with the target branch. When a merge is performed, a new commit is created in the history of the target branch, which indicates that a merge happened. This merge commit has two parent commits: the latest commit on the target branch and the latest commit on the source branch.

- **`git rebase`**: This command moves or combines a sequence of commits to a new base commit. Essentially, it's like saying "I want my changes to be based on what everyone else has already done." When you rebase a branch onto another, the changes are reapplied on the target branch as if they happened after the changes on the target branch. This creates a new commit for each commit in the original branch, resulting in a much cleaner, linear history.

Despite the cleaner history offered by **`git rebase`**, I find myself gravitating towards **`git merge`** and here are my reasons:

- **Simplicity and Ease**: Merging is a straightforward process. It retains the context of the branch, keeping the commit history intact. I don't have to worry about my changes being applied out of context, as they would be in a rebase.

- **Conflict Resolution**: When conflicts arise during a merge, they need to be resolved only once. But with rebase, conflicts have to be resolved for each commit that's being reapplied. This can turn into an arduous and time-consuming task, especially if the branch has a lot of commits.

- **Safety**: Merging is a non-destructive operation; the existing branches are not changed in any way. This makes it a safe operation for developers, as you won't overwrite commits in the branch, which can be a concern when rebasing.

- **Traceability**: Merge commits clearly indicate when and where a set of changes were integrated into the target branch. This high-level overview can be particularly useful in understanding the history of complex projects.

My preference is `git merge`!

