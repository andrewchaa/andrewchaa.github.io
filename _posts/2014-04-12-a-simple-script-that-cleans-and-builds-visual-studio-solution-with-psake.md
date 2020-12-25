---
title: A simple script that cleans and builds visual studio solution with psake
date: 2014-04-12 12:51:39.000000000 +01:00
categories:
- Programming
tags:
- build
- powershell
- script
meta:
  _edit_last: '1907066'
  publicize_twitter_user: andrewchaa
  publicize_twitter_url: http://t.co/XmdIcOXZ5t
  _wpas_done_1752093: '1'
  _publicize_done_external: a:1:{s:7:"twitter";a:1:{i:111615627;b:1;}}
  _oembed_046ac79189769f52b694dbd24deccf9b: "{{unknown}}"
  _oembed_8de5b4d04559cdad00a062fd3dd4727f: "{{unknown}}"
---
<p><a href="https://github.com/psake/psake">psake</a> is a simple build automation tool written in powershell, and works well on Microsoft platform.</p>
<p>This is a really simple example that cleans bin folder, run msbuild to build the solution, and clean up pdb and xml files afterward.</p>
<p>[sourcecode language="powershell"]</p>
<p>properties {<br />
    $BuildConfiguration = if ($BuildConfiguration -eq $null ) { &quot;debug&quot; } else {<br />
        $BuildConfiguration }<br />
    $BuildScriptsPath = Resolve-Path .<br />
    $base_dir = Resolve-Path ..<br />
    $packages = &quot;$base_dir\packages&quot;<br />
    $build_dir = &quot;$base_dir\Sushiwa\bin&quot;<br />
    $sln_file = &quot;$base_dir\Sushiwa.sln&quot;<br />
}</p>
<p>task default -depends CleanUp, Compile</p>
<p>task CleanUp {<br />
    @($build_dir) | aWhere-Object { Test-Path $_ } | ForEach-Object {<br />
    Write-Host &quot;Cleaning folder $_...&quot;<br />
    Remove-Item $_ -Recurse -Force -ErrorAction Stop<br />
    }<br />
}</p>
<p>task Compile {<br />
    Write-Host &quot;Compiling $sln_file in $BuildConfiguration mode to $build_dir&quot;<br />
    Exec { msbuild &quot;$sln_file&quot; /t:Clean /t:Build /p:Configuration=$BuildConfiguration<br />
        /m /nr:false /v:q /nologo /p:OutputDir=$build_dir }</p>
<p>    Get-ChildItem -Path $build_dir -Rec | Where {$_.Extension -match &quot;pdb&quot;} | Remove-Item<br />
    Get-ChildItem -Path $build_dir -Rec | Where {$_.Extension -match &quot;xml&quot;} | Remove-Item<br />
}<br />
[/sourcecode]</p>
