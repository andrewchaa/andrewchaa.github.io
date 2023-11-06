---
title: Github CLI
date: 2023-05-03
tags:
  - github
  - CLI
---

GitHub CLI is a command-line tool developed by GitHub that allows you to interact with GitHub directly from your terminal. It provides a more convenient way to manage repositories, issues, pull requests, and other GitHub features without using the web interface. The CLI makes it easier to perform various tasks, automate workflows, and integrate with other tools.


Here are some popular GitHub CLI commands:

1. **`gh repo clone <repository>`**: Clone a GitHub repository to your local machine. Replace **`<repository>`** with the repository's URL or its shorthand (e.g., **`owner/repo`**).
2. **`gh pr list`**: List all pull requests in the current repository. You can filter by status (open, closed, merged), author, assignee, or base branch.
3. **`gh pr create`**: Create a new pull request. This command opens an interactive prompt to fill in the required fields, like the base branch and head branch. You can also use flags like **`-title`**, **`-body`**, and **`-head`** to specify the details directly.
4. **`gh pr view <pull_request_id>`**: View the details of a pull request, including the title, description, author, and status. Replace **`<pull_request_id>`** with the pull request number.
5. **`gh pr checkout <pull_request_id>`**: Check out a pull request locally. This command creates a new branch and sets it to the commit of the specified pull request.
6. `gh repo view -w`: Open the repository in the web browser
7. **`gh issue create`**: Create a new issue in the current repository. Similar to **`gh pr create`**, this command opens an interactive prompt to fill in the required fields. You can use flags like **`-title`** and **`-body`** to specify the details directly.
8. **`gh issue list`**: List all issues in the current repository. You can filter by status (open, closed), author, assignee, or labels.
9. **`gh issue view <issue_id>`**: View the details of an issue, including the title, description, author, and status. Replace **`<issue_id>`** with the issue number.
10. **`gh repo create`**: Create a new repository on GitHub. This command opens an interactive prompt to fill in the required fields, like the repository name and visibility. You can use flags like **`-name`**, **`-description`**, and **`-private`** to specify the details directly.
11. **`gh auth login`**: Authenticate the GitHub CLI with your GitHub account. This command opens an interactive prompt to choose the authentication method (GitHub.com or GitHub Enterprise Server) and the preferred browser or token method.

These are just a few examples of the many commands available in the GitHub CLI. You can find more information and examples in the official GitHub CLI documentation: [**https://cli.github.com/manual/**](https://cli.github.com/manual/)


