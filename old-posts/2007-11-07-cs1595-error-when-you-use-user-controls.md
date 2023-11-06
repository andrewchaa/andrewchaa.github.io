---
title: CS1595 '...' is defined in multiple places error when you use a user control
date: 2007-11-07 11:22:12.000000000 +00:00
categories:
- Programming
tags:
- asp.net
meta:
  _edit_last: '1907066'
---
<p><span style="font-family:Arial,Helvetica,Geneva,SunSans-Regular,sans-serif;">CS1595: '_ASP.FormsLoginPart_ascx' is defined in multiple places; using definition from 'c:\WINDOWS\Microsoft.NET\Framework\v1.1.4322\Temporary ASP.NET Files\recruitment_selfservice\858213b9\9a24bb64\tyrklreb.dll'</span></p>
<p>I have this error often, because some .net webcontrols have the same file name, though they belong to different namespaces. I googled this a little bit and there are a few solutions.</p>
<ul>
<li>change webcontrol .ascx name. asp.net compiler does not like same webcontrol file name.<br />
ex) AnotherCurrentDate.ascx</li>
<li>use classname attribute in control directive<br />
ex) &lt;%@ Control Language="c#" AutoEventWireup="false" Codebehind="CurrentDate.ascx.cs" <span style="color:#0000ff;">Classname="AnotherCurrentDate" </span>Inherits="MyProj.CurrentDate" %&gt;</li>
</ul>
<p>The idea is from <a href="http://www.velocityreviews.com/forums/t105381-can-two-web-user-control-have-same-file-ascx-name-within-projec.html">velocity reviews thread</a></p>
