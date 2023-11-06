---
title: The difference between .zprofile and .zshrc
date: 2022-12-22
tags:
  - bash
  - terminal
---

In the Unix and Linux operating systems, the **`.zprofile`** and **`.zshrc`** files are configuration files that are used to customize the zsh shell, which is a shell program that provides a command-line interface for interacting with the operating system.

The **`.zprofile`** file is executed when the zsh shell is started as a login shell, which typically occurs when you open a terminal window or log in to a remote system using ssh. The **`.zshrc`** file, on the other hand, is executed whenever you start a new zsh shell, which can include opening a new terminal window or opening a new terminal tab within an existing window.

The **`.zprofile`** file is typically used to set environment variables and run other commands that should be executed only once when the shell is started. The **`.zshrc`** file, on the other hand, is used to set aliases, functions, and other shell options that should be available every time a new zsh shell is started.

In general, it's a good idea to put environment variables and commands that only need to be run once at login time in the **`.zprofile`** file, and to put aliases, functions, and other shell options that should be available every time a new shell is started in the **`.zshrc`** file. This can help to keep your configuration organized and reduce the amount of unnecessary processing that occurs when you start a new shell.

