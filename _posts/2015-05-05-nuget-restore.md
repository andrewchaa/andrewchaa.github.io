---
title: NuGet restore
date: 2015-05-05 09:51:34.000000000 +01:00
type: post
published: true
status: publish
categories:
- Programming
tags:
- NuGet
meta:
  sharing_disabled: '1'
  _rest_api_published: '1'
  _rest_api_client_id: "-1"
  publicize_twitter_user: andrewchaa
  publicize_twitter_url: http://t.co/UmzVggdMxd
  _wpas_done_1752093: '1'
  _publicize_done_external: a:1:{s:7:"twitter";a:1:{i:111615627;b:1;}}
author:
  login: simplelifeuk
  email: andrew.chaa@yahoo.co.uk
  display_name: Andy
  first_name: Andrew
  last_name: Chaa
---
<p><a href="https://docs.nuget.org/">NuGet</a> is a package manager like NPM for node.js or Gem for Ruby, and it is a dominant one in .NET.</p>
<p>You can handle dependency packages in two ways. You download them from NuGet server but also store them in your source control. Or, you just remember what packages you use in your project, and restore them on build. Node and Ruby guys always go for the 2nd option. .NET people used to do the first one, but now prefer the 2nd option. I agree to the 2nd option, restoring packages on build, rather than storing them in git repository. Git is for source code, NuGet repository is for packages.</p>
<p>The Visual Studio on my work machine isn't set up for NuGet restore. "Restore" option is disabled, and when I download and build an open-source project, it can't restore the packages and can't build the solution.</p>
<p>I've checked if there's work-around. It seems that the latest NuGet.exe can restore packages in command-line, regardless of your VS settings, which makes sense to me, as NuGet shouldn't depend on the settings of your IDE. So update NuGet.exe to the latest.</p>
<p>[sourcecode language="powershell"]<br />
exec { .\Tools\NuGet\NuGet.exe update -self }<br />
[/sourcecode]</p>
<p>Create an environmental variable, EnableNuGetPackageRestore, to true, but just for Process, not for Machine, not to impact other projects.</p>
<p>[sourcecode language="powershell"]<br />
[Environment]::SetEnvironmentVariable(&quot;EnableNuGetPackageRestore&quot;, &quot;true&quot;, &quot;Process&quot;)<br />
[/sourcecode]</p>
<p>Then, you can safely restore your packages in command-line.</p>
<p>[sourcecode language="powershell"]<br />
exec { .\Tools\NuGet\NuGet.exe restore &quot;.\Src\$name.sln&quot; | Out-Default } &quot;Error restoring $name&quot;<br />
[/sourcecode]</p>
<p>So, all the code in one place</p>
<p>[sourcecode language="powershell"]<br />
Write-Host &quot;Restoring&quot;<br />
[Environment]::SetEnvironmentVariable(&quot;EnableNuGetPackageRestore&quot;, &quot;true&quot;, &quot;Process&quot;)<br />
exec { .\Tools\NuGet\NuGet.exe update -self }<br />
exec { .\Tools\NuGet\NuGet.exe restore &quot;.\Src\$name.sln&quot; | Out-Default } &quot;Error restoring $name&quot;<br />
[/sourcecode]</p>
