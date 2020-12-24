---
layout: post
title: 'Visual Studio Add-in: Recycle all IIS application pools on build done'
date: 2009-02-26 15:14:12.000000000 +00:00
type: post
published: true
status: publish
categories:
- Programming
tags:
- IIS
meta:
  _edit_last: '1907066'
  _oembed_7b009ac6b5dc0c65a125d7b519f2dccf: "{{unknown}}"
  _oembed_878d2ddf48ed8eee7f5cc192bb50b762: "{{unknown}}"
  _oembed_b8f32e1e716445c03ed90553f3368948: "{{unknown}}"
  _oembed_1c251db5ac8083f12ee4d41d0cc9d33c: "{{unknown}}"
author:
  login: simplelifeuk
  email: andrew.chaa@yahoo.co.uk
  display_name: Andy
  first_name: Andrew
  last_name: Chaa
---
<ul>
<li>related post: <a href="http://simplelifeuk.wordpress.com/2007/10/05/writing-a-visual-studionet-2003-add-in/">http://simplelifeuk.wordpress.com/2007/10/05/writing-a-visual-studionet-2003-add-in/</a></li>
<li>resources<br />
<a href="http://www.koders.com/csharp/fidA05F9CFC9911DC901EC86C43DD8CAD4F82AE1CB0.aspx">http://www.koders.com/csharp/fidA05F9CFC9911DC901EC86C43DD8CAD4F82AE1CB0.aspx</a><br />
<a href="http://www.microsoft.com/downloads/details.aspx?familyid=3ff9c915-30e5-430e-95b3-621dccd25150&amp;displaylang=en#filelist">Visual studio.net 2003 Automation Samples</a></li>
</ul>
<p>This is my 2nd visual studio-in. What it does is to recycle all application pools in IIS to make sure GAC is refreshed with newly built dlls.</p>
<p>There were a few things to tweak. This is an add-in for visual studio 2003, so it may not be suitable for vs 2005 or 2008 in some details.</p>
<ol>
<li>connectMode == ext_ConnectMode.ext_cm_Startup<br />
When the add-in wizard creates the skeleton code, ext_ConnectMode.ext_cm_UISetup is used. UISetup is only once when you set up the add-in, so the add-in is not loaded when you run this in debug-mode. Change it to ..._Startup.</li>
<li>_application.Solution.Projects<br />
In order to get projects I first tried ActiveSolutionProjects which worked perfectly fine in vs macro, but it did not work at all in add-in. ActiveSolutionProjects returned null if you build a solution. It returned only one project if you build a specific project. I used Solution.Projects and it worked as it is expected.</li>
</ol>
<p>This is the code for recycling application pools.</p>
<p>[sourcecode language="csharp"]<br />
private void RecycleAllApplicationPools()<br />
{<br />
DirectoryEntry appPools = new DirectoryEntry(&quot;IIS://localhost/W3SVC/AppPools&quot;);<br />
_outputWindowPane.OutputString(&quot;-------------------------------------------\n&quot;);<br />
_outputWindowPane.OutputString(&quot;Start recycling application pools\n&quot;);<br />
foreach (DirectoryEntry appPool in appPools.Children)<br />
{<br />
appPool.Invoke(&quot;Recycle&quot;, null);<br />
_outputWindowPane.OutputString(&quot;.&quot;);<br />
}<br />
_outputWindowPane.OutputString(&quot;\nRecycling is complete.\n&quot;);<br />
}<br />
[/sourcecode]</p>
<p>The following is the full code</p>
<p>[sourcecode language="csharp"]<br />
using System.DirectoryServices;<br />
using System.Text.RegularExpressions;<br />
using System.Windows.Forms;</p>
<p>namespace ExtVS2003<br />
{<br />
using System;<br />
using Microsoft.Office.Core;<br />
using Extensibility;<br />
using System.Runtime.InteropServices;<br />
using EnvDTE;</p>
<p>#region Read me for Add-in installation and setup information.<br />
// When run, the Add-in wizard prepared the registry for the Add-in.<br />
// At a later time, if the Add-in becomes unavailable for reasons such as:<br />
//   1) You moved this project to a computer other than which is was originally created on.<br />
//   2) You chose 'Yes' when presented with a message asking if you wish to remove the Add-in.<br />
//   3) Registry corruption.<br />
// you will need to re-register the Add-in by building the MyAddin21Setup project<br />
// by right clicking the project in the Solution Explorer, then choosing install.<br />
#endregion</p>
<p>/// &lt;summary&gt;<br />
///   The object for implementing an Add-in.<br />
/// &lt;/summary&gt;<br />
/// &lt;seealso class='IDTExtensibility2' /&gt;<br />
[GuidAttribute(&quot;594C22F4-C9ED-40B1-9CC7-2D095D68AD97&quot;), ProgId(&quot;ExtVS2003.Connect&quot;)]<br />
public class Connect : Object, IDTExtensibility2, IDTCommandTarget<br />
{<br />
const string OUTPUTWINDOWGUID = &quot;{1BD8A850-02D1-11D1-BEE7-00A0C913D1F8}&quot;;<br />
private _DTE _application;<br />
private AddIn addInInstance;<br />
private Command _command;<br />
private OutputWindowPane _outputWindowPane;<br />
private BuildEvents _buildEvents;</p>
<p>/// &lt;summary&gt;<br />
///        Implements the constructor for the Add-in object.<br />
///        Place your initialization code within this method.<br />
/// &lt;/summary&gt;<br />
public Connect()<br />
{<br />
}</p>
<p>/// &lt;summary&gt;<br />
///      Implements the OnConnection method of the IDTExtensibility2 interface.<br />
///      Receives notification that the Add-in is being loaded.<br />
/// &lt;/summary&gt;<br />
///<br />
&lt;param term='application'&gt;<br />
///      Root object of the host application.<br />
/// &lt;/param&gt;<br />
///<br />
&lt;param term='connectMode'&gt;<br />
///      Describes how the Add-in is being loaded.<br />
/// &lt;/param&gt;<br />
///<br />
&lt;param term='addInInst'&gt;<br />
///      Object representing this Add-in.<br />
/// &lt;/param&gt;<br />
/// &lt;seealso class='IDTExtensibility2' /&gt;<br />
public void OnConnection(object application, ext_ConnectMode connectMode, object addInInst, ref Array custom)<br />
{<br />
int bitmapNo = 59;<br />
_application = (_DTE)application;<br />
addInInstance = (AddIn)addInInst;</p>
<p>SetBuildEvent();<br />
SetOutputWindowPane();</p>
<p>if (connectMode == ext_ConnectMode.ext_cm_Startup)<br />
{<br />
object []contextGUIDS = new object[] { };<br />
Commands commands = _application.Commands;<br />
_CommandBars commandBars = _application.CommandBars;</p>
<p>// When run, the Add-in wizard prepared the registry for the Add-in.<br />
// At a later time, the Add-in or its commands may become unavailable for reasons such as:<br />
//   1) You moved this project to a computer other than which is was originally created on.<br />
//   2) You chose 'Yes' when presented with a message asking if you wish to remove the Add-in.<br />
//   3) You add new commands or modify commands already defined.<br />
// You will need to re-register the Add-in by building the ExtVS2003Setup project,<br />
// right-clicking the project in the Solution Explorer, and then choosing install.<br />
// Alternatively, you could execute the ReCreateCommands.reg file the Add-in Wizard generated in<br />
// the project directory, or run 'devenv /setup' from a command prompt.<br />
try<br />
{<br />
_command = commands.AddNamedCommand(addInInstance, &quot;ExtVS2003&quot;, &quot;Recycle IIS App pools&quot;, &quot;Reset IIS&quot;, true, bitmapNo,<br />
ref contextGUIDS, (int)vsCommandStatus.vsCommandStatusSupported+(int)vsCommandStatus.vsCommandStatusEnabled);<br />
CommandBar commandBar = commandBars[&quot;Tools&quot;];<br />
CommandBarControl commandBarControl = _command.AddControl(commandBar, 1);<br />
}<br />
catch(Exception ex)<br />
{<br />
MessageBox.Show(&quot;Cant't place toolbutton, error: &quot; + ex.Message, &quot;error&quot;, MessageBoxButtons.OK);<br />
}<br />
}</p>
<p>}</p>
<p>private void SetOutputWindowPane()<br />
{<br />
OutputWindow outputWindow = (OutputWindow)_application.Windows.Item(Constants.vsWindowKindOutput).Object;<br />
_outputWindowPane = outputWindow.OutputWindowPanes.Item(OUTPUTWINDOWGUID);<br />
}</p>
<p>private void SetBuildEvent()<br />
{<br />
_buildEvents = _application.Events.BuildEvents;<br />
_buildEvents.OnBuildDone += new _dispBuildEvents_OnBuildDoneEventHandler(_buildEvents_OnBuildDone);<br />
}</p>
<p>/// &lt;summary&gt;<br />
///     Implements the OnDisconnection method of the IDTExtensibility2 interface.<br />
///     Receives notification that the Add-in is being unloaded.<br />
/// &lt;/summary&gt;<br />
///<br />
&lt;param term='disconnectMode'&gt;<br />
///      Describes how the Add-in is being unloaded.<br />
/// &lt;/param&gt;<br />
///<br />
&lt;param term='custom'&gt;<br />
///      Array of parameters that are host application specific.<br />
/// &lt;/param&gt;<br />
/// &lt;seealso class='IDTExtensibility2' /&gt;<br />
public void OnDisconnection(ext_DisconnectMode disconnectMode, ref Array custom)<br />
{<br />
try<br />
{<br />
_command.Delete();<br />
}<br />
catch (Exception ex)<br />
{<br />
MessageBox.Show(&quot;Error in Disconnect: &quot; + ex.Message, &quot;Error&quot;, MessageBoxButtons.OK);<br />
}</p>
<p>}</p>
<p>/// &lt;summary&gt;<br />
///      Implements the OnAddInsUpdate method of the IDTExtensibility2 interface.<br />
///      Receives notification that the collection of Add-ins has changed.<br />
/// &lt;/summary&gt;<br />
///<br />
&lt;param term='custom'&gt;<br />
///      Array of parameters that are host application specific.<br />
/// &lt;/param&gt;<br />
/// &lt;seealso class='IDTExtensibility2' /&gt;<br />
public void OnAddInsUpdate(ref Array custom)<br />
{<br />
}</p>
<p>/// &lt;summary&gt;<br />
///      Implements the OnStartupComplete method of the IDTExtensibility2 interface.<br />
///      Receives notification that the host application has completed loading.<br />
/// &lt;/summary&gt;<br />
///<br />
&lt;param term='custom'&gt;<br />
///      Array of parameters that are host application specific.<br />
/// &lt;/param&gt;<br />
/// &lt;seealso class='IDTExtensibility2' /&gt;<br />
public void OnStartupComplete(ref Array custom)<br />
{<br />
}</p>
<p>/// &lt;summary&gt;<br />
///      Implements the OnBeginShutdown method of the IDTExtensibility2 interface.<br />
///      Receives notification that the host application is being unloaded.<br />
/// &lt;/summary&gt;<br />
///<br />
&lt;param term='custom'&gt;<br />
///      Array of parameters that are host application specific.<br />
/// &lt;/param&gt;<br />
/// &lt;seealso class='IDTExtensibility2' /&gt;<br />
public void OnBeginShutdown(ref Array custom)<br />
{<br />
}</p>
<p>/// &lt;summary&gt;<br />
///      Implements the QueryStatus method of the IDTCommandTarget interface.<br />
///      This is called when the command's availability is updated<br />
/// &lt;/summary&gt;<br />
///<br />
&lt;param term='commandName'&gt;<br />
///        The name of the command to determine state for.<br />
/// &lt;/param&gt;<br />
///<br />
&lt;param term='neededText'&gt;<br />
///        Text that is needed for the command.<br />
/// &lt;/param&gt;<br />
///<br />
&lt;param term='status'&gt;<br />
///        The state of the command in the user interface.<br />
/// &lt;/param&gt;<br />
///<br />
&lt;param term='commandText'&gt;<br />
///        Text requested by the neededText parameter.<br />
/// &lt;/param&gt;<br />
/// &lt;seealso class='Exec' /&gt;<br />
public void QueryStatus(string commandName, vsCommandStatusTextWanted neededText, ref vsCommandStatus status, ref object commandText)<br />
{<br />
if(neededText == vsCommandStatusTextWanted.vsCommandStatusTextWantedNone)<br />
{<br />
if(commandName == &quot;ExtVS2003.Connect.ExtVS2003&quot;)<br />
{<br />
status = (vsCommandStatus)vsCommandStatus.vsCommandStatusSupported|vsCommandStatus.vsCommandStatusEnabled;<br />
}<br />
}<br />
}</p>
<p>/// &lt;summary&gt;<br />
///      Implements the Exec method of the IDTCommandTarget interface.<br />
///      This is called when the command is invoked.<br />
/// &lt;/summary&gt;<br />
///<br />
&lt;param term='commandName'&gt;<br />
///        The name of the command to execute.<br />
/// &lt;/param&gt;<br />
///<br />
&lt;param term='executeOption'&gt;<br />
///        Describes how the command should be run.<br />
/// &lt;/param&gt;<br />
///<br />
&lt;param term='varIn'&gt;<br />
///        Parameters passed from the caller to the command handler.<br />
/// &lt;/param&gt;<br />
///<br />
&lt;param term='varOut'&gt;<br />
///        Parameters passed from the command handler to the caller.<br />
/// &lt;/param&gt;<br />
///<br />
&lt;param term='handled'&gt;<br />
///        Informs the caller if the command was handled or not.<br />
/// &lt;/param&gt;<br />
/// &lt;seealso class='Exec' /&gt;<br />
public void Exec(string commandName, vsCommandExecOption executeOption, ref object varIn, ref object varOut, ref bool handled)<br />
{<br />
handled = false;<br />
if(executeOption == vsCommandExecOption.vsCommandExecOptionDoDefault)<br />
{<br />
if(commandName == &quot;ExtVS2003.Connect.ExtVS2003&quot;)<br />
{<br />
RecycleAllApplicationPools();<br />
handled = true;<br />
return;<br />
}<br />
}<br />
}</p>
<p>private void _buildEvents_OnBuildDone(vsBuildScope Scope, vsBuildAction Action)<br />
{<br />
if (IsBuildingGACProject())<br />
{<br />
RecycleAllApplicationPools();<br />
}<br />
}</p>
<p>private bool IsBuildingGACProject()<br />
{<br />
Regex GACRegex = new Regex(&quot;PJB.UI|PJB.Business&quot;, RegexOptions.IgnoreCase);<br />
Projects projects = _application.Solution.Projects;</p>
<p>foreach (Project project in projects)<br />
{<br />
if (GACRegex.Match(project.Name).Success)<br />
{<br />
return true;<br />
}<br />
}<br />
return false;<br />
}</p>
<p>private void RecycleAllApplicationPools()<br />
{<br />
DirectoryEntry appPools = new DirectoryEntry(&quot;IIS://localhost/W3SVC/AppPools&quot;);<br />
_outputWindowPane.OutputString(&quot;-------------------------------------------\n&quot;);<br />
_outputWindowPane.OutputString(&quot;Start recycling application pools\n&quot;);<br />
foreach (DirectoryEntry appPool in appPools.Children)<br />
{<br />
appPool.Invoke(&quot;Recycle&quot;, null);<br />
_outputWindowPane.OutputString(&quot;.&quot;);<br />
}<br />
_outputWindowPane.OutputString(&quot;\nRecycling is complete.\n&quot;);<br />
}<br />
}<br />
}</p>
<p>[/sourcecode]</p>
