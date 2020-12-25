---
title: NuGet basics
date: 2012-08-21 10:27:05.000000000 +01:00
type: post
published: true
status: publish
categories:
- Programming
tags:
- basics
- NuGet
meta:
  _edit_last: '1907066'
  tagazine-media: a:7:{s:7:"primary";s:0:"";s:6:"images";a:0:{}s:6:"videos";a:0:{}s:11:"image_count";i:0;s:6:"author";s:7:"1907066";s:7:"blog_id";s:7:"1833431";s:9:"mod_stamp";s:19:"2012-08-31
    17:46:40";}
  _wpas_skip_linkedin: '1'
  _wpas_skip_twitter: '1'
author:
  login: simplelifeuk
  email: andrew.chaa@yahoo.co.uk
  display_name: Andy
  first_name: Andrew
  last_name: Chaa
---
<p>The definitive documentation is <a href="http://docs.nuget.org/">nuget.org</a>.<br />
If you are a console person and don't like nody UI stuff, you can <a href="http://docs.nuget.org/docs/start-here/Using-the-Package-Manager-Console">use the Package Manager Console</a>.</p>
<p>I am a NuGet user, most of the time, but once in a while, publish a package for my work and personal projects. </p>
<h3>To prepare for package creation</h3>
<p>Of course, <a href="http://nuget.codeplex.com/releases/view/58939">download NuGet.exe</a>, and make sure NuGet.exe is in your path.</p>
<p>Also, you need to <a href="http://docs.nuget.org/docs/creating-packages/creating-and-publishing-a-package#api-key">register with nuget.org to get your api key</a>, if you plan to share your package.</p>
<p>[sourcecode language="bash"]<br />
NuGet Update -self<br />
NuGet SetApiKey Your-API-Key<br />
[/sourcecode]</p>
<h3>Creating a package</h3>
<p>If your package would simply contain a single assembly, you can create the package from an assembly. Otherwise, you would usually create it from a project, in which you can also benefit from tokenisation.</p>
<p>This creates a special nuspec file with tokens, to be replaced based on the project metaday.</p>
<p><strong>Tokens</strong></p>
<ul>
<li>$id$: The Assembly name</li>
<li>$version$: The assembly version as specified in the assembly’s AssemblyVersionAttribute.</li>
<li>$author$: The company as specified in the AssemblyCompanyAttribute.</li>
<li>$description$: The description as specified in the AssemblyDescriptionAttribute.</li>
</ul>
<p>In the folder where the csproj file, run:<br />
[sourcecode language="bash"]<br />
nuget spec<br />
nuget pack MyProject.csproj -Prop Configuration=Release<br />
[/sourcecode]</p>
<p>nuget spec will generate a spec file with basic metadata. </p>
<p>[sourcecode language="xml"]<br />
&lt;?xml version=&quot;1.0&quot;?&gt;<br />
&lt;package &gt;<br />
  &lt;metadata&gt;<br />
    &lt;id&gt;$id$&lt;/id&gt;<br />
    &lt;version&gt;$version$&lt;/version&gt;<br />
    &lt;title&gt;$title$&lt;/title&gt;<br />
    &lt;authors&gt;$author$&lt;/authors&gt;<br />
    &lt;owners&gt;$author$&lt;/owners&gt;<br />
    &lt;licenseUrl&gt;http://LICENSE_URL_HERE_OR_DELETE_THIS_LINE&lt;/licenseUrl&gt;<br />
    &lt;projectUrl&gt;http://PROJECT_URL_HERE_OR_DELETE_THIS_LINE&lt;/projectUrl&gt;<br />
    &lt;iconUrl&gt;http://ICON_URL_HERE_OR_DELETE_THIS_LINE&lt;/iconUrl&gt;<br />
    &lt;requireLicenseAcceptance&gt;false&lt;/requireLicenseAcceptance&gt;<br />
    &lt;description&gt;$description$&lt;/description&gt;<br />
    &lt;releaseNotes&gt;Summary of changes made in this release of the package.&lt;/releaseNotes&gt;<br />
    &lt;copyright&gt;Copyright 2012&lt;/copyright&gt;<br />
    &lt;tags&gt;Tag1 Tag2&lt;/tags&gt;<br />
  &lt;/metadata&gt;<br />
&lt;/package&gt;<br />
[/sourcecode]</p>
<p>Once  nuspec is ready, run nuget pack.<br />
However, NuGet use the default build configuration set in the project file, and if you are a dev like me, it will be typically Debug. You wouldn't want to publish your assembly built in Debug. so make sure to use Configuration option.</p>
<p>You would want to check the package you created to make sure everything necessary in there. <a href="http://nuget.codeplex.com/releases/view/59864">Download NuGet Package Explorer</a> and verify it.</p>
<p>Then <a href="http://docs.nuget.org/docs/creating-packages/creating-and-publishing-a-package">publish it</a>.</p>
<h3>Add dependent assemblies to the package</h3>
<p>Your project will have dependent assemblies (dlls), and want to include them in the package. If the dlls are references via NuGet, use . Otherwise, they are manually added, so use </p>
<p>[sourcecode language="xml"]<br />
&lt;?xml version=&quot;1.0&quot;?&gt;<br />
&lt;package &gt;<br />
  &lt;metadata&gt;<br />
    &lt;id&gt;$id$&lt;/id&gt;<br />
    &lt;version&gt;$version$&lt;/version&gt;<br />
    &lt;title&gt;$title$&lt;/title&gt;<br />
    &lt;authors&gt;$author$&lt;/authors&gt;<br />
    &lt;owners&gt;$author$&lt;/owners&gt;<br />
    &lt;licenseUrl&gt;http://LICENSE_URL_HERE_OR_DELETE_THIS_LINE&lt;/licenseUrl&gt;<br />
    &lt;projectUrl&gt;http://PROJECT_URL_HERE_OR_DELETE_THIS_LINE&lt;/projectUrl&gt;<br />
    &lt;iconUrl&gt;http://ICON_URL_HERE_OR_DELETE_THIS_LINE&lt;/iconUrl&gt;<br />
    &lt;requireLicenseAcceptance&gt;false&lt;/requireLicenseAcceptance&gt;<br />
    &lt;description&gt;$description$&lt;/description&gt;<br />
    &lt;releaseNotes&gt;Summary of changes made in this release of the package.&lt;/releaseNotes&gt;<br />
    &lt;copyright&gt;Copyright 2012&lt;/copyright&gt;<br />
    &lt;tags&gt;Tag1 Tag2&lt;/tags&gt;<br />
    &lt;dependencies&gt;<br />
        &lt;dependency id=&quot;Hl.Local&quot; version=&quot;[1.0.0.51]&quot; /&gt;<br />
        &lt;dependency id=&quot;Hl.Valid&quot; version=&quot;[1.0.0.50]&quot; /&gt;<br />
    &lt;/dependencies&gt;<br />
  &lt;/metadata&gt;<br />
  &lt;files&gt;<br />
    &lt;file src=&quot;..\lib\Hl.Frame.dll&quot; target=&quot;lib\net35&quot; /&gt;<br />
  &lt;/files&gt;</p>
<p>&lt;/package&gt;<br />
[/sourcecode]</p>
<p>In dependency, if you use "[VERSION NO.]", it will look for the exact version.</p>
<h3>use a custom assemblyinfo from build server</h3>
<p>You want to increase the version number from the build. Then you will need to update assemblyinfo before build the project. Then nuget package will have the verion number like Common.Framework.1.0.0.9.nupkg. Unfortunately, you have to use a custom build script, something like this. (it's a psake script)</p>
<p>[sourcecode language="bash"]<br />
task BuildSolution -depends AssemblyInfo {<br />
	Message(&quot;Building version $version&quot;)<br />
	Exec { msbuild.exe &quot;$slnFile&quot; /t:Clean /t:Build /p:Configuration=$buildType /v:m /nologo }</p>
<p>task AssemblyInfo -depends Init {<br />
	Update-AssemblyInfo -company &quot;$COMPANY_NAME&quot; -copyright &quot;$COPYRIGHT&quot; -LiteralPath &quot;$baseDir\CustomAssemblyInfo.cs&quot; -AssemblyVersion $script:version<br />
}</p>
<p>[/sourcecode]</p>
