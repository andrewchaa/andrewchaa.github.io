---
title: How I'm setting my Windows developer machine
date: 2020-08-12T09:38:47
categories:
  - technical
tags:
  
---


### Microsoft Teams for chats

Download from [https://www.microsoft.com/en-gb/microsoft-365/microsoft-teams/group-chat-software](https://www.microsoft.com/en-gb/microsoft-365/microsoft-teams/group-chat-software)

### Google Chrome

Download from [https://www.google.com/chrome/](https://www.google.com/chrome/)

Set Chrome as default browser on Settings &gt; Default apps

### Visual Studio 2019

Download from [https://visualstudio.microsoft.com/](https://visualstudio.microsoft.com/)

For Workloads, I choose the below additional options

* ASP.NET and web development
* Azure development
* .NET Core cross-platform development

I didn't choose Node.js as I will use NPM and other tools

Extensions

* Live Share
* SpecFlow for Visual Studio 2019
* Visual Studio IntelliCode
* SlowCheetah: manage App.config, App.debug.config
* ReSharper, of course

#### Resharper

Download from [https://www.jetbrains.com/resharper/](https://www.jetbrains.com/resharper/)

I use Resharer 2.x / Intelli J shortcuts

### Visual Studio Code

Download from [https://code.visualstudio.com/](https://code.visualstudio.com/)

```javascript
# settings.json

{
    "editor.fontFamily": "Fira Code",
    "editor.fontLigatures": true,
    "editor.fontSize": 13,
    "editor.insertSpaces": true
}
```

### ConEmu or Windows Terminal

For reliable terminal window: [https://conemu.github.io/](https://conemu.github.io/)

In case of Windows Terminal, you can get it from Microsoft Store: [https://github.com/Microsoft/Terminal](https://github.com/Microsoft/Terminal)

### SQL Server and Management Studio

* SQL Server Engine: [https://www.microsoft.com/en-gb/sql-server/sql-server-downloads](https://www.microsoft.com/en-gb/sql-server/sql-server-downloads)
* Management Studio: [https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?redirectedfrom=MSDN&view=sql-server-ver15](https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?redirectedfrom=MSDN&view=sql-server-ver15)

## Windows

### Mouse

I use inverted scroll direciton to match that on my macbook. I use Logitech Options: [https://www.logitech.com/en-gb/product/options](https://www.logitech.com/en-gb/product/options)

### Theme

The manufacturer's background is crude. Let's install some nice themes. Go to Settings &gt; Personalisation &gt; Themes

### Language

I'm a native Korean speaker, so install Korean language

Settings &gt; Language &gt; Preferred languages: Add a preferred language

## Code

### Chocolatey

Install choco: [https://chocolatey.org/install](https://chocolatey.org/install)

### FiraCode

Install [FiraCode](https://github.com/tonsky/FiraCode). It's free monospaced font with programming ligatures.

### Git

Install by choco

```text
choco install git.install
```

Then install Git Extensions for GUI: [http://gitextensions.github.io/](http://gitextensions.github.io/)

### Service Fabric SDK

As I develop services on Service Fabric at work, I need to install the SDK: [https://docs.microsoft.com/en-us/azure/service-fabric/service-fabric-get-started](https://docs.microsoft.com/en-us/azure/service-fabric/service-fabric-get-started)

### Postman

Install postman: [https://www.postman.com/](https://www.postman.com/)

### Terraform

```bash
choco install terraform
```

### Azure CLI

Install from [https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-windows?view=azure-cli-latest](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-windows?view=azure-cli-latest)

