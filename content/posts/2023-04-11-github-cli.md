---
title: Github CLI
date: 2023-04-11
tags:
  - github
  - CLI
---

GitHub CLI is a command-line tool that brings GitHub functionality to your terminal, allowing you to interact with repositories, issues, pull requests, and more without leaving the command line. It is designed to make it easier for developers to work with GitHub in their development environment.


Here's a brief introduction to GitHub CLI and some examples of common actions:


### Installation:


```typescript
brew install gh
```


### Authentication:


To start using GitHub CLI, you'll need to authenticate with your GitHub account. Run the following command and follow the prompts:


```bash
gh auth login
```


### Creating a repository:


To create a new repository on GitHub, use the **`gh repo create`** command:


```bash
gh repo create <repository_name>
```


This command will create a new repository under your account with the specified name. You can also add flags like **`--private`** to make the repository private or **`--description`** to add a description.


### Cloning a repository:


To clone an existing GitHub repository to your local machine, use the **`gh repo clone`** command:


```bash
gh repo clone <repository_owner>/<repository_name>
```


### Creating an issue:


To create a new issue in the current repository, use the **`gh issue create`** command:


```bash
gh issue create --title "Issue title" --body "Issue description"
```


### Listing issues:


To list issues in the current repository, use the **`gh issue list`** command:


```bash
gh issue list
```


You can also filter the list by assignee, label, milestone, or state using flags like **`--assignee`**, **`--label`**, **`--milestone`**, and **`--state`**.


### Creating a pull request:


To create a new pull request, use the **`gh pr create`** command:


```bash
gh pr create --title "Pull request title" --body "Pull request description"
```


This command will create a new pull request for the currently checked-out branch.


### Checking out a pull request:


To check out a specific pull request locally, use the **`gh pr checkout`** command:


```bash
gh pr checkout <pull_request_number>
```


### Merging a pull request:


To merge a pull request, use the **`gh pr merge`** command:


```bash
gh pr merge <pull_request_number>
```


This command will merge the specified pull request into the base branch


