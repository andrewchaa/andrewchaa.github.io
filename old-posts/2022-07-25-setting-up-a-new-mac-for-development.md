---
title: Setting up a new Mac for development
date: 2022-07-25
tags:
  - mac
---

This is how I set up a new mac for development. 

### Tweaks

Trackpad

- `Tab to click`: System Preference > Track pad. Enable `Tab to click`

- `Three finger drag`: System Preference > Accessibility > Pointer Control > Trackpad options > Enable dragging. Choose `Three finger drag` 

Function keys

	- Use function keys without `fn`. As developer, I use function keys much more often than volume control. System Preference > Keyboard > Use F1, F2, etc. keys as standard function keys

Dock

- `Turn hiding on` so that it hides when your cursor is not at the bottom

### Apps

Download and install apps

- [Notion](https://www.notion.so/desktop)

- [Chrome](https://www.google.com/chrome/)

- [Rectangle](https://rectangleapp.com/):  Move and resize windows in macOS using keyboard shortcuts or snap areas

- [Microsoft Teams](https://www.microsoft.com/en-gb/microsoft-teams/download-app)

- [Amphetamine](https://apps.apple.com/us/app/amphetamine/id937984704?mt=12)

### Development

Tweaks

- Install [Fira Code](https://github.com/tonsky/FiraCode) font

	- `brew tap homebrew/cask-fonts`

	- `brew install --cask font-fira-code`

SDKs and CLIs

- [.NET 6](https://dotnet.microsoft.com/en-us/download/dotnet/6.0)

- node

	- `brew install node`

- [yarn](https://yarnpkg.com/getting-started/install)

	- `brew install corepack`

- Azure Cli

	- `brew update && brew install azure-cli`

Development tools and apps

- [warp](https://www.warp.dev/): The terminal for the 21st century 

- [brew](/d06094fb0c1d4ff28328e9ef35073787): The Missing Package Manager for macOS

- [xcode](https://apps.apple.com/us/app/xcode/id497799835?mt=12)

- Git: 

	- `brew install git`

	- `git config --global` [`user.name`](http://user.name/) `"first_name last_name"`

	- `git config --global user.email "email`[`@example.com`](mailto:MY_NAME@example.com)`"`

- [ohmyzsh](https://github.com/ohmyzsh/ohmyzsh)

- [Visual Studio code](https://code.visualstudio.com/)

	- `shft + cmd + p` and `Shell command: Install code command in PATH`

- [raycast](https://www.raycast.com/): a blazingly fast, totally extendable launcher. It lets you complete tasks, calculate, share common links, and much more

- [Rider](https://www.jetbrains.com/rider/download/#section=mac): .NET IDE with the power of ReSharper

- [Docker](https://docs.docker.com/desktop/install/mac-install/)

Instructions

- Add private NuGet package source

	- Create a Nuget.Config in the root directory of the code repositories. I did it by copying an existing config file. `cp ./Api/NuGet.Config .g` 

	- `dotnet nuget update source Private-Packages --username " " --password <PAT> --store-password-in-clear-text --configfile ./NuGet.Config`

