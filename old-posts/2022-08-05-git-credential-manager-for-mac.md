---
title: Git Credential Manager for Mac
date: 2022-08-05
tags:
  - git
  - tools
---

Since I start using `https://...` repository url, rather than ssh, I have to enter my Azure PAT on my Mac each time I pull or push my change. Then I learned of [Git Credential Manager](https://github.com/GitCredentialManager/git-credential-manager) from Microsoft

To install, run the following:

```bash
brew tap microsoft/git
brew install --cask git-credential-manager-core
```

After installing you can stay up-to-date with new releases by running:

```bash
brew upgrade git-credential-manager-core
```

That’s all. 

> Once it's installed and configured, Git Credential Manager is called implicitly by Git. You don't have to do anything special, and GCM isn't intended to be called directly by the user. For example, when pushing (`git push`) to [Azure DevOps](https://dev.azure.com/), [Bitbucket](https://bitbucket.org/), or [GitHub](https://github.com/), a window will automatically open and walk you through the sign-in process. (This process will look slightly different for each Git host, and even in some cases, whether you've connected to an on-premises or cloud-hosted Git host.) Later Git commands in the same repository will re-use existing credentials or tokens that GCM has stored for as long as they're valid.

