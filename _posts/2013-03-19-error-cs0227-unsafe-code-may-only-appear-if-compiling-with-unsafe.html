---
layout: post
title: 'error CS0227: Unsafe code may only appear if compiling with /unsafe'
date: 2013-03-19 10:39:42.000000000 +00:00
type: post
published: true
status: publish
categories:
- Programming
tags:
- msbuild
meta:
  _edit_last: '1907066'
  publicize_reach: a:2:{s:7:"twitter";a:1:{i:1752093;i:166;}s:2:"wp";a:1:{i:0;i:7;}}
  tagazine-media: a:7:{s:7:"primary";s:0:"";s:6:"images";a:0:{}s:6:"videos";a:0:{}s:11:"image_count";i:0;s:6:"author";s:7:"1907066";s:7:"blog_id";s:7:"1833431";s:9:"mod_stamp";s:19:"2013-03-19
    10:39:42";}
  publicize_twitter_user: andrewchaa
  _wpas_done_1752093: '1'
  _publicize_done_external: a:1:{s:7:"twitter";a:1:{i:111615627;b:1;}}
author:
  login: simplelifeuk
  email: andrew.chaa@yahoo.co.uk
  display_name: Andy
  first_name: Andrew
  last_name: Chaa
---
<p>This is the error message you get, when you build a project with some bit of unsafe code in it.</p>
<p>Simply you need to "Alt + Enter" on the project to see the properties and tick on "Allow unsafe code" on build tab. Then it compiles lovely in visual studio.</p>
<p>However, I came across the error message again in the build. with MSBuiild, I got the message. It's still ticked on the project's property page. What's wrong? ...</p>
<p>The culprit was build type. In VS, you usually set the build type to DEBUG. so the Allow unsafe code option is turned on against debug, not release. So, open the project file in a simple text editor. I used Sublime text 2. Make sure the option exists in both debug and release.</p>
<p>[sourcecode language="xml"]<br />
  &lt;PropertyGroup Condition=&quot; '$(Configuration)|$(Platform)' == 'Debug|AnyCPU' &quot;&gt;<br />
    &lt;DebugSymbols&gt;true&lt;/DebugSymbols&gt;<br />
    &lt;DebugType&gt;full&lt;/DebugType&gt;<br />
    &lt;Optimize&gt;false&lt;/Optimize&gt;<br />
    &lt;OutputPath&gt;..\..\bin\Penge\&lt;/OutputPath&gt;<br />
    &lt;DefineConstants&gt;DEBUG;TRACE&lt;/DefineConstants&gt;<br />
    &lt;ErrorReport&gt;prompt&lt;/ErrorReport&gt;<br />
    &lt;WarningLevel&gt;4&lt;/WarningLevel&gt;<br />
    &lt;AllowUnsafeBlocks&gt;true&lt;/AllowUnsafeBlocks&gt;<br />
  &lt;/PropertyGroup&gt;<br />
  &lt;PropertyGroup Condition=&quot; '$(Configuration)|$(Platform)' == 'Release|AnyCPU' &quot;&gt;<br />
    &lt;DebugType&gt;pdbonly&lt;/DebugType&gt;<br />
    &lt;Optimize&gt;true&lt;/Optimize&gt;<br />
    &lt;OutputPath&gt;bin\Release\&lt;/OutputPath&gt;<br />
    &lt;DefineConstants&gt;TRACE&lt;/DefineConstants&gt;<br />
    &lt;ErrorReport&gt;prompt&lt;/ErrorReport&gt;<br />
    &lt;WarningLevel&gt;4&lt;/WarningLevel&gt;<br />
    &lt;AllowUnsafeBlocks&gt;true&lt;/AllowUnsafeBlocks&gt;<br />
  &lt;/PropertyGroup&gt;<br />
[/sourcecode]</p>
