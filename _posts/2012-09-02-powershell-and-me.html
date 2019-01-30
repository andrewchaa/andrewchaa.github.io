---
layout: post
title: Powershell and me
date: 2012-09-02 16:11:20.000000000 +01:00
type: post
published: true
status: publish
categories:
- Programming
tags:
- powershell
meta:
  _edit_last: '1907066'
  _wpas_skip_twitter: '1'
  _wpas_skip_linkedin: '1'
  tagazine-media: a:7:{s:7:"primary";s:0:"";s:6:"images";a:0:{}s:6:"videos";a:0:{}s:11:"image_count";i:0;s:6:"author";s:7:"1907066";s:7:"blog_id";s:7:"1833431";s:9:"mod_stamp";s:19:"2012-09-05
    09:39:54";}
  enclosure: |
    http://dlbmodigital.microsoft.com/webcasts/wmv/23977_Dnl_L.wmv
    89460530
    video/asf
  _oembed_214e28c5c1d4d948e4e1f22be4fd7040: "{{unknown}}"
  _oembed_d361aedfe06ff42ed524b5d4f4d3ff26: "{{unknown}}"
author:
  login: simplelifeuk
  email: andrew.chaa@yahoo.co.uk
  display_name: Andy
  first_name: Andrew
  last_name: Chaa
---
<p>It's an interesting scripting language. Well, scripting has been for a long time in *nix systems, and I feel it's quite late that Windows catch up now. But still it's better than nothing, and I appreciate Microsoft for it. MS seems to be losing it's power to be blamed for it's evil or laziness in this post-pc era, anyway. </p>
<h3>Learning Powershell</h3>
<p>The best way to learn something is 1) to use it everyday (like a young boy practices kung fu while wiping his master's car window in "Best kid", I believe. In that sense, I'm lucky that I uses it everyday at <a href="http://www.huddle.com/">Huddle</a> (at the moment, as of 2012).</p>
<p>Another good ways, not as good as the first one, are to read good books about the topic and to answer others' questions on Q &amp; A sites like <a href="http://stackoverflow.com/questions/tagged/powershell">StackOverflow</a>. Probably, using it everyday and reading a book about it would be a fantastic combination.</p>
<p>I'm reading <a href="http://www.amazon.co.uk/gp/product/1449322700/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&amp;camp=1634&amp;creative=6738&amp;creativeASIN=1449322700&amp;linkCode=as2&amp;tag=andchachacha-21">Windows Powershell for Developers</a> by Douglas Finke. Very thin, but interesting, informative, and easy read with causual 1:1 chat style.  </p>
<p><strong>useful resources</strong></p>
<ul>
<li><a href="http://blogs.technet.com/b/heyscriptingguy/">Hey, Scripting Guy</a></li>
<li><a href="http://technet.microsoft.com/en-us/video/screencast-windows-powershell-introduction.aspx">An introduction to PowerShell</a></li>
<li><a href="http://technet.microsoft.com/en-us/scriptcenter/bb410849.aspx">PowerShell Scripting Centre</a></li>
<li><a href="http://blogs.msdn.com/b/powershell/">PowerShell blog</a></li>
</ul>
<h3>Installing Powershell</h3>
<p>It comes preinstalled with Windows 7, Windows Server 2008 R2, Windows 8, and Windows Server 2012 (if you have)<br />
If you want try PowerShell v3, you can download it at <a href="http://www.microsoft.com/en-us/download/details.aspx?id=29939">http://www.microsoft.com/en-us/download/details.aspx?id=29939</a></p>
<p>PowerShell has execution policy. By default, it can't load the profile and others.<br />
By running get-executionpolicy, you can check the policy on your machine.<br />
The recommended setting to begin with is "remotesigned".</p>
<p>[sourcecode language="powershell"]<br />
PS D:\dev&gt; get-executionpolicy<br />
RemoteSigned<br />
PS D:\dev&gt;set-executionpolicy remotesigned<br />
[/sourcecode]</p>
<h3>Determining the version of PowerShell installed</h3>
<p>$PSVersionTable will be the usual answer, as you do like this.</p>
<p>[sourcecode language="powershell"]<br />
PS D:\dev&gt; $PSVersionTable</p>
<p>Name                           Value<br />
----                           -----<br />
PSVersion                      2.0<br />
PSCompatibleVersions           {1.0, 2.0}<br />
BuildVersion                   6.1.7601.17514<br />
PSRemotingProtocolVersion      2.1<br />
WSManStackVersion              2.0<br />
CLRVersion                     4.0.30319.269<br />
SerializationVersion           1.1.0.1<br />
[/sourcecode]</p>
<p>But $PSVertionTable was introduced with PowerShell version 2. so, if it doesn't work, you need to do $Host.Version</p>
<p>[sourcecode language="powershell"]<br />
PS D:\dev&gt; $Host.Version</p>
<p>Major  Minor  Build  Revision<br />
-----  -----  -----  --------<br />
2      0      -1     -1<br />
[/sourcecode]</p>
<h3>simple scripts with files, process ...</h3>
<p>the examples below are from <a href="http://technet.microsoft.com/en-us/video/screencast-windows-powershell-introduction.aspx">Jeff Alexander's screencast</a>.</p>
<p>[sourcecode language="powershell"]<br />
# showing the list of files<br />
Get-Childitem c:\</p>
<p># format the output with pipe |<br />
dir c:\windows\explorer.exe | Format-List *</p>
<p># Choose the columns that you want<br />
dir c:\ | Format-Table Name, Extension, CreationTime</p>
<p># Lists only first 10 lines<br />
Get-Childitem c:\windows\system32\*.dll | select-object -first 10</p>
<p># Grouping by file extension<br />
Get-Childitem c:\windows\system32 | Group-Object extension</p>
<p># Lists files updated in 10 days, leveraging DateTime<br />
Get-Childitem c:\windows\system32 | Where-Object {$_.LastWriteTime -gt $($(Get-Date).adddays(-10))}</p>
<p># Sort process by process id<br />
Get-Process | Sort-Object ID</p>
<p># WMI to access system information<br />
Get-WmiObject win32_operatingsystem</p>
<p># Access registries<br />
Get-Childitem hkcu:\Software\Microsoft</p>
<p># Stop a process<br />
Get-Process notepad | stop-process</p>
<p>[/sourcecode]</p>
<h3>Pipeline</h3>
<p>from <a href="http://dlbmodigital.microsoft.com/webcasts/wmv/23977_Dnl_L.wmv">PowerShell Essentials for the Busy Admin (Part 2)</a></p>
<p>It allows ability to easily work at command line</p>
<ul>
<li>to retrieve items and work on them</li>
<li>to filter out data</li>
<li>to persist information</li>
<li>and to format output</li>
</ul>
<p>[sourcecode language="powershell"]<br />
# Start Process<br />
&quot;notepad&quot;, &quot;calc&quot; | foreach { start-process $_ }</p>
<p># Filter processes using too much CPU or Memory<br />
Get-Process | where { $_.pm -gt 20MB }<br />
Get-Process | where { $_.cpu -gt 10 }</p>
<p># Sort processes<br />
Get-Process | sort cpu -Descending</p>
<p># Sort event log entries<br />
Get-EventLog -LogName application -EntryType error | sort source | group source</p>
<p># Pipe to present<br />
get-process | format-table name, id -AutoSize<br />
Get-Service | where {$_.status -eq &quot;running&quot; } | Format-List *</p>
<p># Pipe to persist information<br />
get-process | format-table name, id -AutoSize | out-file c:\temp\processtable.txt<br />
gps | select name, id | Export-Csv -Path c:\temp\processCsv.csv</p>
<p>[/sourcecode]</p>
<h3>Handy commands</h3>
<p>[sourcecode language="powershell"]<br />
# Measure-command measures the performance of your command.<br />
Measure-command {Get-EventLog -LogName application -EntryType error | sort source | group source}</p>
<p># h lists all of your commands in the console<br />
PS D:\dev\&gt; h</p>
<p>  Id CommandLine<br />
  -- -----------<br />
  11 Get-Childitem c:\<br />
  12 get-childitem c:\<br />
  13 get-childitem c:\ | Format-List *<br />
  14 dir c:\windows\explorer.exe | Format-List *<br />
  15 dir \ | Format-Table Name, Extension, CreationTime<br />
  16 dir c:\ | Format-Table Name, Extension, CreationTime<br />
  17 Get-Childitem c:\windows\system32\*.dll | select-object -first 10<br />
  18 Get-Childitem c:\windows\system32 | Group-Object extension</p>
<p>[/sourcecode]</p>
