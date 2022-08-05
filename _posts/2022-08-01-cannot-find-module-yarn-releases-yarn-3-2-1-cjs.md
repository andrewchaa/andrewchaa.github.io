---
title: Cannot find module ‘/…/.yarn/releases/yarn-3.2.1.cjs
date: 2022-08-01
tags:
  - yarn
---

I encounter this error once in a while. 

`Cannot find module '/.../navien-news-web/.yarn/releases/yarn-3.2.1.cjs'`

It happens when your yarn setting creates `yarnPath` in `.yarnrc.yml`

```yaml
nodeLinker: node-modules
yarnPath: .yarn/releases/yarn-3.2.1.cjs
```

A simple solution is to delete `.yarnrc.yml,` set the yarn version to stable, and install all the dependencies. 

```bash
rm -f ~/yarn*
yarn set version stable
```

