---
title: Working on security vulnerabilities of NPM packages
date: 2023-04-18
tags:
  - node.js
  - npm
  - security
---

### npm audit

If **`npm audit`** shows you a list of vulnerable packages and you want to update only specific ones, you can use the **`npm update`** command followed by the package name. This command will update the specified package to the latest version that satisfies the version range defined in your **`package.json`**

`npm audit fix` can do the trick only updating `package-lock.json`. 

### Dependabot

You can configure it to run daily or on a specific branch with the configuration file

```bash
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "daily"
    target-branch: "your-branch-name"
```

Replace **`"your-branch-name"`** with the name of the branch you want Dependabot to run against. This configuration file tells Dependabot to check for updates in the **`npm`** package ecosystem daily and target the specified branch for pull requests.

Make sure to commit and push the **`dependabot.yml`** file to the same branch you want to target, so Dependabot can read the configuration.

For more information and additional configuration options, you can refer to the [**Dependabot configuration options**](https://docs.github.com/en/code-security/supply-chain-security/keeping-your-dependencies-updated-automatically/configuration-options-for-dependency-updates) documentation.

### `requires` 

When a package requires another package, the required package is specified under `requires` attribute in the `package-lock.json`.

This is an example of `package-lock.json`.

```bash
"libs": {
  "version": "7.1.1",
  "resolved": "https://npm.pkg.github.com/download/Group/libs/7.1.1/e6d9490468685ab60eb8dfe47f7d45205fd452fb",
  "integrity": "sha512-4n2khsjIV/4Ew1FRDNwiGpI47TqnhDM5mJYjzxkSgGPbW4pDO98Op3Mtku553xWD/UYqEaM24CxKe0MrbdMAAw==",
  "requires": {
    "@google-cloud/pubsub": "^2.6.0",
    "@google-cloud/trace-agent": "^5.1.6",
    "bluebird": "^3.7.2",
    "co-body": "^6.0.0",
    "google-libphonenumber": "^3.2.8",
    "jsonwebtoken": "^8.5.1",
    "jsrsasign": "^10.4.1",
    "knex": "^0.21.12",
    "koa": "^2.11.0",
    "koa-bodyparser": "^4.3.0",
    "koa-compose": "^4.1.0",
    "koa-json": "^2.0.2",
    "koa-jwt": "^3.6.0",
    "koa-router": "^8.0.8",
    "sway": "^2.0.6"
  },
...
"jsrsasign": {
      "version": "10.8.2",
      "resolved": "https://registry.npmjs.org/jsrsasign/-/jsrsasign-10.8.2.tgz",
      "integrity": "sha512-iKTMkVZxyXzvd+MYLxzPk5WFZ4jPX22TrO7fQ7vS1dfso30/jntH2EexW7+K1rn11F1GkiR9Q3ulF0FQxvNNRw=="
    },
```

In the above example, `libs` requires `jsrsasign` that has a version of `10.4.1` and above until the next major version change. I increased the version of `libs` so that I could have `jsrsasign@10.8.2`

As the minimum version of `jsrsasign` is `10.4.1`, the package was resolved with the version of `10.8.2`

