---
title: Scripting react website deployment on Windows Server
date: 2022-06-07
tags:
  - powershell
  - scripting
  - CD/CD
---

One of my customers has an internally hosted website on their Windows Server. They store all their business data in MS SQL Server that runs on Windows Server. It’s a bit of old school but it has been working for them. 

A friend of mine and I built an website with react. It pulls data from the SQL server, create some reports and show them on the web page. As it is not hosted on the cloud, we didn’t have CI/CD. So I wrote a simple powershell script that deploys the website and learned a few things on the way.

- `xcopy`: [windows command to copy file](https://serverfault.com/questions/4639/what-is-the-windows-command-line-command-to-copy-files). Use `/Y` switch [to suppress interrupting question](https://stackoverflow.com/questions/11264231/is-there-any-way-to-force-copy-copy-without-overwrite-prompt-using-windows). 

- If you want to remove file using node.js, `fs.unlink` [is the answer](https://nodejs.org/api/fs.html#fs_fs_unlink_path_callback). 

- [Powershell command to copy file](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.management/copy-item?view=powershell-7.2) is `Copy-Item`

```powershell
gh repo clone deepeyesuk/aurora-web
pushd aurora-web
yarn
yarn build-iis
Copy-Item -Path ".\build\*" -Destination "..\..\aurora-web" -Recurse -Force
popd
Remove-Item -Recurse -Force aurora-web
```

