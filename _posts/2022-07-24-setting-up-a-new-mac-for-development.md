---
title: Setting up a new Mac for development
date: 2022-07-24
tags:
  - mac
---

This is how I set up a new mac for development. 

### Tweaks

Trackpad

- `Tab to click`: System Preference > Track pad. Enable `Tab to click`

- `Three finger drag`: System Preference > Accessibility > Pointer Control > Trackpad options > Enable dragging. Choose `Three finger drag` 

Function keys

	- Use function keys without `fn`. 
	System Preference > Keyboard > Keyboard Shortcuts > Use F1, F2, etc. keys as standard function keys
	As developer, I use function keys much more often than volume control. 

Dock

- `Turn hiding on` so that it hides when your cursor is not at the bottom

### Apps

Download and install apps

- [Notion](https://www.notion.so/desktop)

- [Chrome](https://www.google.com/chrome/)

- [Rectangle](https://rectangleapp.com/):  Move and resize windows in macOS using keyboard shortcuts or snap areas

- [Microsoft Teams](https://www.microsoft.com/en-gb/microsoft-teams/download-app)

- [Discord](https://discord.com/download)

- [Amphetamine](https://apps.apple.com/us/app/amphetamine/id937984704?mt=12)

- Install Rosetta if you are Apple Silicon

```bash
sudo softwareupdate --install-rosetta
```

### Development

Tweaks

- Install [Fira Code](https://github.com/tonsky/FiraCode) font

```bash
brew tap homebrew/cask-fonts
brew install --cask font-fira-code
```

SDKs and CLIs

- [.NET 6](https://dotnet.microsoft.com/en-us/download/dotnet/6.0), .[NET 7](https://dotnet.microsoft.com/en-us/download/dotnet/7.0)

- node

```bash
brew install node
```

- [yarn](https://yarnpkg.com/getting-started/install)

```bash
brew install corepack
```

- Azure Cli

```bash
brew update && brew install azure-cli
```

- [AWS Cli](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)

```bash
aws configure

AWS Access Key ID [None]: AKIAIOSFODNN7EXAMPLE
AWS Secret Access Key [None]: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
Default region name [None]: us-west-2
Default output format [None]: json
```

Development tools and apps

- [warp](https://www.warp.dev/): The terminal for the 21st century 

- [brew](https://brew.sh/): The Missing Package Manager for macOS

- [xcode](https://apps.apple.com/us/app/xcode/id497799835?mt=12)

- Git: 

	- `brew install git`

	- `git config --global` [`user.name`](http://user.name/) `"first_name last_name"`

	- `git config --global user.email "email`[`@example.com`](mailto:MY_NAME@example.com)`"`

	- Add [alias](/29fa5b1b7bf645ec8e3c8b38e3c566b9)

- [ohmyzsh](https://github.com/ohmyzsh/ohmyzsh)

- [Visual Studio code](https://code.visualstudio.com/)

	- `shft + cmd + p` and `Shell command: Install code command in PATH`

- [Rider](https://www.jetbrains.com/rider/download/#section=mac): .NET IDE with the power of ReSharper

- [Docker](https://docs.docker.com/desktop/install/mac-install/)

- [Postman](https://www.postman.com/downloads/)

- [Authy](https://authy.com/download/)

Instructions

- Add private NuGet package source

	- Create a Nuget.Config in the root directory of the code repositories. I did it by copying an existing config file. `cp ./Api/NuGet.Config .g` 

	- `dotnet nuget update source Private-Packages --username " " --password <PAT> --store-password-in-clear-text --configfile ./NuGet.Config`

