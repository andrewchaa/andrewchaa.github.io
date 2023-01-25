---
title: Getting started with Scala in VSCode
date: 2023-01-24
tags:
  - scala
  - vs code
---

### Install Scala

Install [JDK](https://adoptium.net/temurin/releases/?version=11)

For windows, [download and execute the Scala installer for Windows](https://docs.scala-lang.org/getting-started/index.html).

```bash
________ ___   / /  ___
    / __/ __// _ | / /  / _ |
  __\ \/ /__/ __ |/ /__/ __ |
 /____/\___/_/ |_/____/_/ | |
                          |/

Checking if a JVM is installed
Found a JVM installed under C:\Program Files\Eclipse Adoptium\jdk-11.0.18.10-hotspot.

Checking if ~\AppData\Local\Coursier\data\bin is in PATH
  Should we add ~\AppData\Local\Coursier\data\bin to your PATH? [Y/n]

Checking if the standard Scala applications are installed
  Installed ammonite
  Installed cs
  Installed coursier
  Installed scala
  Installed scalac
  Installed scala-cli
  Installed sbt
  Installed sbtn
  Installed scalafmt
```

Install [sbt](https://www.scala-sbt.org/download.html)

[Metals](https://www.scala-lang.org/2019/04/16/metals.html) is a Scala language server that supports code completions, type at point, goto definition, fuzzy symbol search and other advanced code editing and navigation capabilities

On VS Code, go to Extensions and search for Metals (Scala) and install it.

