---
title: 'MSBUild task: Get the latest code from TFS and build'
date: 2009-01-26 16:17:29.000000000 +00:00
categories:
- Programming
tags:
- build
- msbuild
meta:
  _edit_last: '1907066'
  _oembed_3ba108dd0b74adc35fa324550cb1872a: "{{unknown}}"
  _oembed_09a6f6ee75c98bec3912e49517dcd816: "{{unknown}}"
  _oembed_bdcf068aa36bfd17a6c7a6f8a4acefc4: "{{unknown}}"
  _oembed_75bf60f280b9248c7f10c8008d426dbe: "{{unknown}}"
  _oembed_cae3b403aef1825ac5caced69992eb32: "{{unknown}}"
  _oembed_a1085ccd107b65de3df023329a449a49: "{{unknown}}"
  _oembed_f6cacdcbb20f3c3374f77cffcfd37149: "{{unknown}}"
  _oembed_fd4adcf214a9d87d88356d64b9ddd574: "{{unknown}}"
---
<p>Resource</p>
<ul>
<li>TFS command-line help: <a href="http://blogs.msdn.com/noahc/archive/2007/01/22/real-tfs-command-line-help.aspx">http://blogs.msdn.com/noahc/archive/2007/01/22/real-tfs-command-line-help.aspx</a></li>
<li>SDC Tasks: <a href="http://www.codeplex.com/sdctasks">http://www.codeplex.com/sdctasks</a></li>
<li>remotely copy with user credential: <a href="http://www.experts-exchange.com/OS/Miscellaneous/Q_21207420.html">http://www.experts-exchange.com/OS/Miscellaneous/Q_21207420.html</a></li>
<li>xcopy help: <a href="http://www.computerhope.com/xcopyhlp.htm">http://www.computerhope.com/xcopyhlp.htm</a></li>
</ul>
<p>This is a simple task, but it took some time for me to udnerstand, as MSBuild was a new thing to me.<br />
First, Get the latest code from TFS is TFS task, not MSBUild task. So, you can use tf.exe command-line utility.</p>
<p>[sourcecode language="vb"]<br />
&quot;C:\Program Files\Microsoft Visual Studio 9.0\Common7\IDE\tf.exe&quot; get $/root/MSBUILD/Team/Sapphire /force /recursive<br />
[/sourcecode]</p>
<p>the batch file is like this</p>
<p>[sourcecode language="vb"]<br />
&quot;C:\Program Files\Microsoft Visual Studio 9.0\Common7\IDE\tf.exe&quot; get $/root/OccupyingSpace/GoYocal /force /recursive<br />
&quot;C:\WINDOWS\Microsoft.NET\Framework\v3.5\msbuild.exe&quot; &quot;C:\TEMP\Test_GoYocalBuild.proj&quot; /t:Clean;Test<br />
pause<br />
[/sourcecode]</p>
<p>You need SDC taks in order to build .sln file. Please download it from codeplex. I created a simple proj file that builds .sln file</p>
<p>[sourcecode language="xml"]<br />
&lt;Project ToolsVersion=&quot;3.5&quot; DefaultTargets=&quot;Build&quot; xmlns=&quot;http://schemas.microsoft.com/developer/msbuild/2003&quot;&gt;<br />
    &lt;Import Project=&quot;$(MSBuildExtensionsPath)\Microsoft\VisualStudio\TeamBuild\Microsoft.TeamFoundation.Build.targets&quot; /&gt;<br />
    &lt;Import Project=&quot;C:\vss\root\MSBUILD\bin\Microsoft.Sdc.Common.tasks&quot;/&gt;<br />
    &lt;Target Name=&quot;Test&quot; &gt;<br />
        &lt;Tools.DevEnv<br />
            VisualStudio=&quot;9.0&quot;<br />
            Path=&quot;C:\VSS\root\OccupyingSpace\GoYocal\GoYocal.sln&quot;<br />
            Config=&quot;Release&quot;<br />
            OutputFolder=&quot;C:\VSS\root\OccupyingSpace\GoYocal\src\app\bin&quot;<br />
            Clean=&quot;true&quot;&gt;<br />
        &lt;/Tools.DevEnv&gt;<br />
    &lt;/Target&gt;</p>
<p>    &lt;PropertyGroup&gt;<br />
        &lt;TFSServerName&gt;http://rbi101:8080&lt;/TFSServerName&gt;<br />
        &lt;SourceControlMainDirectory&gt;$/root/OccupyingSpace/GoYocal&lt;/SourceControlMainDirectory&gt;<br />
        &lt;WorkspaceName&gt;myworkspace&lt;/WorkspaceName&gt;<br />
        &lt;TfCommand&gt;&quot;C:\Program Files\Microsoft Visual Studio 9.0\Common7\IDE\tf.exe&quot;&lt;/TfCommand&gt;<br />
        &lt;DevenvCommand&gt;&quot;C:\Program Files\Microsoft Visual Studio 9.0\Common7\IDE\devenv.exe&quot;&lt;/DevenvCommand&gt;<br />
        &lt;WorkingDirectory&gt;c:\&lt;/WorkingDirectory&gt;<br />
    &lt;/PropertyGroup&gt;<br />
&lt;/Project&gt;<br />
[/sourcecode]</p>
<p>After I used the batch file, I realised I could use &lt;Exce Command=''&gt; for any dos command. So, I moved "GetLatest" bit into msbuild proj.<br />
Also, included remote copy to the server. The final codes are like the below</p>
<p>batch file</p>
<p>[sourcecode language="vb"]<br />
&quot;C:\WINDOWS\Microsoft.NET\Framework\v3.5\msbuild.exe&quot; MSBUld_Build.proj /t:GetLatest;Build;Deploy<br />
pause<br />
[/sourcecode]</p>
<p>and msbuild proj file</p>
<p>[sourcecode language="xml"]<br />
&lt;Project ToolsVersion=&quot;3.5&quot; DefaultTargets=&quot;Build&quot; xmlns=&quot;http://schemas.microsoft.com/developer/msbuild/2003&quot;&gt;<br />
&lt;Import Project=&quot;$(MSBuildExtensionsPath)\Microsoft\VisualStudio\TeamBuild\Microsoft.TeamFoundation.Build.targets&quot; /&gt;<br />
&lt;Import Project=&quot;C:\MSBUILD\bin\Microsoft.Sdc.Common.tasks&quot;/&gt;</p>
<p>&lt;PropertyGroup&gt;<br />
&lt;TF&gt;&quot;C:\Program Files\Microsoft Visual Studio 9.0\Common7\IDE\tf.exe&quot;&lt;/TF&gt;<br />
&lt;TFSourceLocation&gt;$/Occup/GoYocal&lt;/TFSourceLocation&gt;<br />
&lt;SolutionRoot&gt;C:\Occu\GoYocal&lt;/SolutionRoot&gt;<br />
&lt;RemoteWebRoot&gt;\\TJ103\d$\Occu\WebSites\GoYocal&lt;/RemoteWebRoot&gt;<br />
&lt;Copy&gt;xcopy /E /I /R /Y&lt;/Copy&gt;<br />
&lt;/PropertyGroup&gt;</p>
<p>&lt;Target Name=&quot;GetLatest&quot;&gt;<br />
&lt;Exec Command=&quot;$(TF) get $(TFSourceLocation) /force /recursive /version:T /noprompt&quot; ContinueOnError=&quot;true&quot; /&gt;<br />
&lt;/Target&gt;</p>
<p>&lt;Target Name=&quot;Build&quot; &gt;<br />
&lt;Tools.DevEnv VisualStudio=&quot;9.0&quot; Path=&quot;$(SolutionRoot)\GoYocal.sln&quot; Config=&quot;Release&quot; OutputFolder=&quot;$(SolutionRoot)\src\app\bin&quot; Clean=&quot;true&quot;&gt;<br />
&lt;/Tools.DevEnv&gt;<br />
&lt;/Target&gt;</p>
<p>&lt;Target Name=&quot;Deploy&quot;&gt;<br />
&lt;Exec Command='net use &quot;x:&quot; &quot;$(RemoteWebRoot)&quot; /u:domain\username pwd' /&gt;<br />
&lt;Exec Command='$(Copy) &quot;$(SolutionRoot)\src\app&quot; &quot;x:&quot; '/&gt;<br />
&lt;Exec Command='net use x: /d' /&gt;<br />
&lt;/Target&gt;</p>
<p>&lt;/Project&gt;<br />
[/sourcecode]</p>
