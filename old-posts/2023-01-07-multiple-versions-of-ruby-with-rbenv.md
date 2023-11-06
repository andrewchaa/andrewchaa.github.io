---
title: Multiple versions of ruby with rbenv
date: 2023-01-07
tags:
  - ruby
  - versions
---

To install multiple versions of Ruby, you can use a version manager such as **`rbenv`** or **`chruby`**. (though, chruby often failed compilation of ruby on my M2 MacBook) 

Here are the steps to install and use **`rbenv`** to manage multiple Ruby versions:

Install **`rbenv`** and the **`ruby-build`** plugin using Homebrew:

```bash
brew install rbenv ruby-build
```

Add the **`rbenv`** initialization commands to your shell configuration file (e.g. **`~/.bash_profile`** or **`~/.zshrc`**):

```bash
echo 'eval "$(rbenv init - zsh)"' >> ~/.zshrc
```

Restart your terminal to apply the changes.

Use the **`rbenv install`** command to install the desired Ruby versions:

```bash
rbenv install 3.2.0
rbenv install 2.6.6
```

Use the **`rbenv global`** command to set the default Ruby version:

```bash
rbenv global 2.7.2
```

Use the **`rbenv local`** command to set the Ruby version for a specific project:

```bash
cd myproject
rbenv local 2.6.6
```

To switch between Ruby versions, use the **`rbenv global`** command to set the desired version as the default, or use the **`rbenv local`** command to set the version for a specific project.

Alternatively, you can also use **`chruby`** to manage multiple Ruby versions. The steps to install and use **`chruby`** are similar to those for **`rbenv`**.

I hope this helps. Let me know if you have any questions or need further assistance.

