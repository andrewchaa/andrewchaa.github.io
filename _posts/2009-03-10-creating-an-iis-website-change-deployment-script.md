---
layout: post
title: Creating an IIS website change deployment script
date: 2009-03-10 10:54:19.000000000 +00:00
type: post
published: true
status: publish
categories:
- Programming
tags:
- IIS
meta:
  _edit_last: '1907066'
author:
  login: simplelifeuk
  email: andrew.chaa@yahoo.co.uk
  display_name: Andy
  first_name: Andrew
  last_name: Chaa
---
<p>Often, I need to deploy an website change to a production server. It can be a simple change like creating a virtual directory and rather rarely very big like setting up a new site. We export iis website setting, delete everything but the change, and import the change using vbscript.  The command is like this.</p>
<p>[sourcecode language='vb']<br />
Set IIsComputer = GetObject("winmgmts://localhost/root/MicrosoftIISv2:IIsComputer='LM'")<br />
...<br />
IIsComputer.Import "", strFilePath, strSourceMetabasePath, strDestinationMetabasePath, intFlags<br />
[/sourcecode]</p>
<p>The xml file only contains the part that changed and has a basic skeleton tags</p>
<p>[sourcecode language='xml']<br />
<?xml version="1.0"?><br />
<configuration xmlns="urn:microsoft-catalog:XML_Metabase_V64_0"><br />
<mbproperty><br />
<iis_global location="." sessionkey="......."><br />
</iis_global><br />
<iiswebserver location="/LM/W3SVC/00"></iiswebserver><br />
<iiswebdirectory location="/LM/W3SVC/00/ROOT/jsk" ...><br />
</iiswebdirectory><br />
</mbproperty><br />
</configuration><br />
[/sourcecode]</p>
