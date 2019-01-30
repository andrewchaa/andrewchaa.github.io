---
layout: post
title: Install website in IIS using vbscript
date: 2008-09-15 16:26:12.000000000 +01:00
type: post
published: true
status: publish
categories:
- Programming
tags:
- IIS
- IIS ASP.Net
meta:
  _edit_last: '1907066'
author:
  login: simplelifeuk
  email: andrew.chaa@yahoo.co.uk
  display_name: Andy
  first_name: Andrew
  last_name: Chaa
---
<p>Reference</p>
<ul>
<li><a href="http://www.microsoft.com/technet/prodtechnol/WindowsServer2003/Library/IIS/ac49abd9-f35d-42ba-84e2-ffb6f6343016.mspx?mfr=true"></a><a href="http://www.microsoft.com/technet/scriptcenter/scripts/iis/default.mspx?mfr=true">Script Repository: IIS 6.0</a></li>
<li><a href="http://forums.iis.net/t/1120756.aspx">Enumerate IIS Virtual Directories using WMI in VBScript</a></li>
<li><a href="http://blogs.msdn.com/david.wang/archive/2006/06/08/HOWTO-Enumerate-IIS-website-and-ftpsite-configuration-VBScript-using-ADSI.aspx">HOWTO: Enumerate IIS website and ftpsite configuration (VBScript using ADSI) </a></li>
<li><a href="http://www.microsoft.com/technet/prodtechnol/WindowsServer2003/Library/IIS/ac49abd9-f35d-42ba-84e2-ffb6f6343016.mspx?mfr=true">Managing Certificates Programmatically (IIS 6.0)</a></li>
<li><a href="http://www.microsoft.com/technet/prodtechnol/WindowsServer2003/Library/IIS/bf6b6472-f58e-4271-9297-284357f69023.mspx?mfr=true">Managing Server Certificates by Using IISCertObj (IIS 6.0)</a></li>
<li><a href="http://forums.iis.net/p/1147263/1860565.aspx">import ssl from .pfx</a></li>
<li><a href="http://support.microsoft.com/?id=313624">How to programmatically install SSL certificates for Internet Information Server (IIS)</a></li>
<li><a href="http://www.codeproject.com/KB/cs/msadminbase.aspx">IIS Admin Base Object Wrapper for installing SSL Certificates</a></li>
<li><a href="http://www.activexperts.com/activmonitor/windowsmanagement/adminscripts/other/textfiles/">Scripts to manage Text Files</a></li>
</ul>
<p>In vbscript regular expression, you can use "SubMatches" collection to get the string you want to use. Before I found this, I had to get "Matches(0).Value" and replace unnecessary strings to empty string.</p>
<blockquote><p><span style="color:#0000ff;">WScript.Echo FSO.FolderExists("C:\temp\")<br />
Set Matches = regex.Execute(configLine)<br />
WScript.Echo Matches(0).SubMatches(1)</span></p></blockquote>
<p>The script parses website xml and does necessary actions. So, it uses regular expression heavily to parse the xml and get the right information. It has the following 5 operations</p>
<ul>
<li>Get Site identifier from metabase xml file</li>
<li>Delete the site using identifier</li>
<li>Create all virtual directories if not exist</li>
<li>Install application pools and web site. This imports the xml.</li>
<li>Install SSL Certificate</li>
</ul>
<p>This is the code<br />
[sourcecode language="vb"]<br />
Dim fso, iisSiteId, webConfigPath<br />
Set fso = CreateObject(&quot;Scripting.FileSystemObject&quot;)<br />
webConfigPath = &quot;..\IISSettings\Website.config&quot;</p>
<p>iisSiteId = GetIisSiteIdentifier()      ' Read site identifier from xml file<br />
If iisSiteId &amp;gt; 0 Then<br />
    DeleteWebsite iisSiteId             ' Delete the existing web site<br />
End If</p>
<p>CreateVirtualDirectories(webConfigPath) ' Create virtual directories</p>
<p>Call InstallAppPoolsWebSite             ' Install application pools and web site<br />
InstallSSLCertificate iisSiteId         ' Install certificate    </p>
<p>Sub CreateVirtualDirectories(path)<br />
    'On Error Resume Next</p>
<p>    Dim fl, strm, strLine, regex, Matches, fldPath<br />
    Set fl = FSO.GetFile(path)<br />
    Set strm = fl.OpenAsTextStream(1, -2)<br />
    Set regex = New RegExp<br />
    regex.Pattern = &quot;(^\s*Path=&quot;&quot;)(.+)(&quot;&quot;\s*$)&quot;</p>
<p>    WScript.Echo &quot;Creating virtual directories ...&quot;<br />
    Do Until strm.AtEndOfStream<br />
        strLine = strm.ReadLine<br />
        If regex.Test(strLine) = True Then<br />
            Set Matches = regex.Execute(strLine)<br />
            fldPath = Matches(0).SubMatches(1)<br />
            If fso.FolderExists(fldPath) = False Then<br />
                WScript.Echo fldPath<br />
                CreateFolderRecursive(fldPath)<br />
            End If<br />
        End If<br />
    Loop<br />
End Sub</p>
<p>Function CreateFolderRecursive(path)<br />
    CreateFolderRecursive = False<br />
    If Not fso.FolderExists(path) Then<br />
        If CreateFolderRecursive(fso.GetParentFolderName(path)) Then<br />
            CreateFolderRecursive = True<br />
            Call fso.CreateFolder(path)<br />
        End If<br />
    Else<br />
        CreateFolderRecursive = True<br />
    End If<br />
End Function</p>
<p>Sub InstallAppPoolsWebSite()<br />
    'If DefaultAppPoolPresent = False Then<br />
    'If DefaultAppPoolPresent(&quot;DefaultAppPool&quot;) = False Then<br />
    '    Import fso.GetFile(&quot;..\IISSettings\DefaultAppPool.config&quot;)<br />
    'End If<br />
    WScript.Echo &quot;Installing Application Pools and Website&quot;</p>
<p>    Dim flder, fls, fl<br />
    Set flder = fso.GetFolder(&quot;..\IISSettings\&quot;)<br />
    Set fls = flder.Files<br />
    For Each fl in fls<br />
        If InStr(fl.name, &quot;.config&quot;) &amp;gt; 0 Then<br />
            Import fso.GetFile(fl.Path)<br />
        End If<br />
    Next<br />
End Sub</p>
<p>Sub InstallSSLCertificate (siteIdentifier)<br />
    WScript.Echo &quot;Installing SSL Certificate... to W3SVC/&quot; &amp;amp; iisSiteId</p>
<p>    Dim iisCertObj<br />
    Set iisCertObj = CreateObject(&quot;IIS.CertObj&quot;)<br />
    iisCertObj.InstanceName = &quot;W3SVC/&quot; &amp;amp; siteIdentifier<br />
    iisCertObj.Import &quot;..\IISSettings\site_cert.pfx&quot;, &quot;1234567&quot;, true, true<br />
End Sub</p>
<p>''''''''''''''''''''''''''''''''''''''''''<br />
' Find site identifier from settings xml '<br />
''''''''''''''''''''''''''''''''''''''''''<br />
Function GetIisSiteIdentifier()<br />
    Dim SiteIdRegex, Matches<br />
    Set SiteIdRegex = New RegExp<br />
    SiteIdRegex.Pattern = &quot;(&quot;&quot;\/LM\/W3SVC\/)([0-9]+)(&quot;&quot;)&quot;</p>
<p>    Dim fl, strm, strXml<br />
    Set fl = fso.GetFile(&quot;..\IISSettings\Website.config&quot;)<br />
    Set strm = fl.OpenAsTextStream(1, -2)<br />
    Do<br />
        strXml = strm.ReadLine<br />
    Loop Until SiteIdRegex.Test(strXml) = True</p>
<p>    Set Matches = SiteIdRegex.Execute(strXml)<br />
    GetIisSiteIdentifier = Matches(0).SubMatches(1)<br />
End Function</p>
<p>''''''''''''''''''''''''''''''''<br />
' Impoart App pool and website '<br />
''''''''''''''''''''''''''''''''<br />
Sub Import(objFile)<br />
    Const IMPORT_EXPORT_MERGE     = 4<br />
    Dim strPassword, IIsComputer, filePath, strXML<br />
    Set IIsComputer = GetObject(&quot;winmgmts:{impersonationLevel=impersonate,authenticationLevel=pktPrivacy}!//localhost/root/MicrosoftIISv2:IIsComputer='LM'&quot;)<br />
    strPassword = &quot;&quot;<br />
    filePath = objFile.Path</p>
<p>    Set stream = objFile.OpenAsTextStream(1, -2)</p>
<p>    Do<br />
       strXML = stream.ReadLine<br />
    Loop Until InStr(strXML, &quot;&amp;lt;&amp;gt; 0 Or InStr(strXML, &quot;&amp;lt;&amp;gt; 0</p>
<p>    intFirst = InStr(1, strXML, &quot;&quot;&quot;&quot;)<br />
    strSourceMetabasePath = Mid(strXML, intFirst + 1, InStr(intFirst + 1, strXML, &quot;&quot;&quot;&quot;) - intFirst - 1)<br />
    strDestinationMetabasePath = strSourceMetabasePath<br />
    WScript.Echo &quot;Meta: &quot; &amp;amp; strSourceMetabasePath<br />
    intFlags = IMPORT_EXPORT_MERGE<br />
    WScript.Echo &quot;Importing: &quot; &amp;amp; filePath &amp;amp; &quot; &quot; &amp;amp; strSourceMetabasePath<br />
    IIsComputer.Import strPassword, filePath, strSourceMetabasePath, strDestinationMetabasePath, intFlags</p>
<p>    Start strSourceMetabasePath<br />
End Sub</p>
<p>Sub Start(strWebServer)<br />
   On Error Resume Next<br />
   Set IIsWebServer = GetObject(&quot;winmgmts:{impersonationLevel=impersonate,authenticationLevel=pktPrivacy}!//localhost/root/MicrosoftIISv2:IIsWebServer='&quot; &amp;amp; Mid(strWebServer, 5) &amp;amp; &quot;'&quot;)<br />
   IIsWebServer.Start<br />
End Sub</p>
<p>''''''''''''''''''''''''''''''''''''''''''''''<br />
' Check if DefaultApplicationPool is present '<br />
''''''''''''''''''''''''''''''''''''''''''''''<br />
'Function DefaultAppPoolPresent<br />
Function DefaultAppPoolPresent(poolName)<br />
    Dim appPools, appPool<br />
    Set appPools = GetObject(&quot;IIS://localhost/W3SVC/AppPools&quot;)</p>
<p>    DefaultAppPoolPresent = False<br />
    for each appPool in appPools<br />
        if (appPool.Name = poolName) Then<br />
            DefaultAppPoolPresent = True<br />
        End If<br />
    next<br />
End Function</p>
<p>''''''''''''''''''''''''''''''''<br />
' Delete the existing website  '<br />
''''''''''''''''''''''''''''''''<br />
Sub DeleteWebsite(identifier)<br />
    On Error Resume Next<br />
    Dim website<br />
    Set website = Nothing<br />
    Set website = GetObject(&quot;IIS://LocalHost/W3SVC/&quot; &amp;amp; identifier) </p>
<p>    If website Is Nothing Then<br />
        WScript.Echo &quot;Cannot find the existing website: &quot; &amp;amp; identifier<br />
    Else<br />
        Set websiteParent = GetObject(website.Parent)<br />
        WScript.Echo &quot;Deleting: &quot; &amp;amp; website.Class &amp;amp; &quot; &quot; &amp;amp; website.Name<br />
        websiteParent.Delete website.Class, website.Name<br />
    End If<br />
End Sub<br />
[/sourcecode]</p>
