---
title: Automatically manage Node.js version in the shell session
date: 2023-05-11
tags:
  - shell scripting
  - bash
  - node.js
---

This is a Zsh script for automatically managing the version of Node.js in your shell session using Node Version Manager (nvm). It does this by looking for a **`.nvmrc`** file in your current working directory every time you change directories (**`chpwd`**). If such a file is found, it changes the Node.js version to the one specified in that file. If no **`.nvmrc`** file is found, it reverts to the default version set in nvm


```bash
autoload -U add-zsh-hook
load-nvmrc() {
  local node_version="$(nvm version)"
  local nvmrc_path="$(nvm_find_nvmrc)"

  if [ -n "$nvmrc_path" ]; then
    local nvmrc_node_version=$(nvm version "$(cat "${nvmrc_path}")")

    if [ "$nvmrc_node_version" = "N/A" ]; then
      nvm install
    elif [ "$nvmrc_node_version" != "$node_version" ]; then
      nvm use
    fi
  elif [ "$node_version" != "$(nvm version default)" ]; then
    echo "Reverting to nvm default version"
    nvm use default
  fi
}
add-zsh-hook chpwd load-nvmrc
load-nvmrc
```


