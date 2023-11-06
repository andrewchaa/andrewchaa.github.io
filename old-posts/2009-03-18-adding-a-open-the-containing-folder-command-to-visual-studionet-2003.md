---
title: Adding a "Open the containing folder" command to Visual Studio.Net 2003
date: 2009-03-18 17:29:47.000000000 +00:00
categories:
- Programming
tags:
- Extensity
- Visual Studio add-in
meta:
  _edit_last: '1907066'
  _oembed_25edb4b82e39d4a0e76c41975e756815: "{{unknown}}"
  _oembed_ad21fb176d5b778ce82551130d13ca8e: "{{unknown}}"
  _oembed_d9e1d97bd3dd96ef7e11bd626170aa56: "{{unknown}}"
  _oembed_da57184917c3549112a14332970a1baa: "{{unknown}}"
  _oembed_15229328221ad6d3c16d8f5bd63ed760: "{{unknown}}"
  _oembed_85450c0fc3359a350326fd8285f997c3: "{{unknown}}"
---
<p>Resources</p>
<ul>
<li>Yahoo VS.Net add-on group: <a href="http://tech.groups.yahoo.com/group/vsnetaddin/">http://tech.groups.yahoo.com/group/vsnetaddin/</a></li>
<li>Visual Studio.Net Add-on samples: <a href="http://www.microsoft.com/downloads/details.aspx?familyid=3ff9c915-30e5-430e-95b3-621dccd25150&amp;displaylang=en#filelist">http://www.microsoft.com/downloads/details.aspx?familyid=3ff9c915-30e5-430e-95b3-621dccd25150&amp;displaylang=en#filelist</a></li>
</ul>
<p>I work for one of the popular job board companies and we still have some <span style="text-decoration:line-through;">many</span> projects written in .Net 1.1. I often use Visual Studio 2003, and whenever I use it, I miss all handy commands on Visual Studio 2008 such as "Open the containing folder."As a developer who loves developing small program for his use, I  myself finally decided to add "Open the containing folder" and a few other stuff to Visual Studio 2003.</p>
<p>First, you have to figure out the window name. You can do that using "Command Browser" which is one of <a href="http://www.microsoft.com/downloads/details.aspx?familyid=3ff9c915-30e5-430e-95b3-621dccd25150&amp;displaylang=en#filelist">those useful visual studio.net add-on development samples</a>. The name for source code editor tab is "Easy MDI Document Window."</p>
<p>Opening a folder is relatively easy. You can just call Process.Start like this</p>
<p>[sourcecode language='c#']<br />
System.Diagnostics.Process.Start(_application.ActiveDocument.Path);<br />
[/sourcecode]</p>
<p>The tricky thing was to add command to the tab. I used AddNamedCommand(...). Often, it returned an error similar to "The name already exists" error. So, I tried commands.Item(...) to check if the command already exist, yet this returned an error if the command does not exsit. I had to next try and catch blocks on connect.</p>
<p>[sourcecode language='c#']</p>
<p>try<br />
{<br />
    _iisRecycleCommand = commands.Item("ExtVS2003.Connect.ExtVS2003", -1);<br />
}<br />
catch (Exception e)<br />
{<br />
    Console.WriteLine(e.Message);<br />
    try<br />
    {<br />
        if (_iisRecycleCommand == null)<br />
        {<br />
            _iisRecycleCommand = commands.AddNamedCommand(addInInstance, "ExtVS2003", "Recycle IIS App pools", "Reset IIS", true, bitmapNo,<br />
                ref contextGUIDS, (int)vsCommandStatus.vsCommandStatusSupported+(int)vsCommandStatus.vsCommandStatusEnabled);<br />
            CommandBar cbTools = commandBars["Tools"];<br />
            //commandBars["Tools"].Controls[0].Caption<br />
            CommandBarControl cbcTools = _iisRecycleCommand.AddControl(cbTools, 1);<br />
        }<br />
    }<br />
    catch (Exception ex) { Console.WriteLine(ex.Message);}<br />
}</p>
<p>try<br />
{<br />
    _openContainingFolderCommand = commands.Item("ExtVS2003.Connect.OpenContainingFolder", -1);<br />
}<br />
catch (Exception e)<br />
{<br />
    Console.WriteLine(e.Message);<br />
    try<br />
    {<br />
        if (_openContainingFolderCommand == null)<br />
        {<br />
            _openContainingFolderCommand = commands.AddNamedCommand(addInInstance, "OpenContainingFolder", "Open the containing folder",<br />
                "Open the containing folder", true, 0, ref contextGUIDS,<br />
                (int) vsCommandStatus.vsCommandStatusSupported +<br />
                (int) vsCommandStatus.vsCommandStatusEnabled);<br />
            CommandBar cbEasyMDIWindow = commandBars["Easy MDI Document Window"];<br />
            CommandBarControl cbcEasyMDIWIndow = _openContainingFolderCommand.AddControl(cbEasyMDIWindow, 1);<br />
        }<br />
    }<br />
    catch (Exception ex) { Console.WriteLine(ex.Message);}<br />
}</p>
<p>[/sourcecode]</p>
<p>It finally works now and this is the full source code</p>
<p>[sourcecode language='c#']</p>
<p>using System.DirectoryServices;<br />
using System.Text.RegularExpressions;<br />
using System.Windows.Forms;</p>
<p>namespace ExtVS2003<br />
{<br />
    using System;<br />
    using Microsoft.Office.Core;<br />
    using Extensibility;<br />
    using System.Runtime.InteropServices;<br />
    using EnvDTE;</p>
<p>    #region Read me for Add-in installation and setup information.<br />
    // When run, the Add-in wizard prepared the registry for the Add-in.<br />
    // At a later time, if the Add-in becomes unavailable for reasons such as:<br />
    //   1) You moved this project to a computer other than which is was originally created on.<br />
    //   2) You chose 'Yes' when presented with a message asking if you wish to remove the Add-in.<br />
    //   3) Registry corruption.<br />
    // you will need to re-register the Add-in by building the MyAddin21Setup project<br />
    // by right clicking the project in the Solution Explorer, then choosing install.<br />
    #endregion</p>
<p>    ///<br />
<summary>
    ///   The object for implementing an Add-in.<br />
    /// </summary>
<p>    /// <seealso class="IDTExtensibility2" /><br />
    [GuidAttribute("594C22F4-C9ED-40B1-9CC7-2D095D68AD97"), ProgId("ExtVS2003.Connect")]<br />
    public class Connect : Object, IDTExtensibility2, IDTCommandTarget<br />
    {<br />
        const string OUTPUTWINDOWGUID = "{1BD8A850-02D1-11D1-BEE7-00A0C913D1F8}";<br />
        private _DTE _application;<br />
        private AddIn addInInstance;<br />
        private Command _iisRecycleCommand, _openContainingFolderCommand;<br />
        private OutputWindowPane _outputWindowPane;<br />
        private BuildEvents _buildEvents;</p>
<p>        ///<br />
<summary>
        ///        Implements the constructor for the Add-in object.<br />
        ///        Place your initialization code within this method.<br />
        /// </summary>
<p>        public Connect()<br />
        {<br />
        }</p>
<p>        ///<br />
<summary>
        ///      Implements the OnConnection method of the IDTExtensibility2 interface.<br />
        ///      Receives notification that the Add-in is being loaded.<br />
        /// </summary>
<p>        ///</p>
<param term="application" />
        ///      Root object of the host application.<br />
        ///<br />
        ///</p>
<param term="connectMode" />
        ///      Describes how the Add-in is being loaded.<br />
        ///<br />
        ///</p>
<param term="addInInst" />
        ///      Object representing this Add-in.<br />
        ///<br />
        /// <seealso class="IDTExtensibility2" /><br />
        public void OnConnection(object application, ext_ConnectMode connectMode, object addInInst, ref Array custom)<br />
        {<br />
            int bitmapNo = 59;<br />
            _application = (_DTE)application;<br />
            addInInstance = (AddIn)addInInst;</p>
<p>            SetBuildEvent();<br />
            SetOutputWindowPane();</p>
<p>            if (connectMode == ext_ConnectMode.ext_cm_Startup)<br />
            {<br />
                object []contextGUIDS = new object[] { };<br />
                Commands commands = _application.Commands;<br />
                _CommandBars commandBars = _application.CommandBars;</p>
<p>                // When run, the Add-in wizard prepared the registry for the Add-in.<br />
                // At a later time, the Add-in or its commands may become unavailable for reasons such as:<br />
                //   1) You moved this project to a computer other than which is was originally created on.<br />
                //   2) You chose 'Yes' when presented with a message asking if you wish to remove the Add-in.<br />
                //   3) You add new commands or modify commands already defined.<br />
                // You will need to re-register the Add-in by building the ExtVS2003Setup project,<br />
                // right-clicking the project in the Solution Explorer, and then choosing install.<br />
                // Alternatively, you could execute the ReCreateCommands.reg file the Add-in Wizard generated in<br />
                // the project directory, or run 'devenv /setup' from a command prompt.<br />
                try<br />
                {</p>
<p>                    try<br />
                    {<br />
                        _iisRecycleCommand = commands.Item("ExtVS2003.Connect.ExtVS2003", -1);<br />
                    }<br />
                    catch (Exception e)<br />
                    {<br />
                        Console.WriteLine(e.Message);<br />
                        try<br />
                        {<br />
                            if (_iisRecycleCommand == null)<br />
                            {<br />
                                _iisRecycleCommand = commands.AddNamedCommand(addInInstance, "ExtVS2003", "Recycle IIS App pools", "Reset IIS", true, bitmapNo,<br />
                                    ref contextGUIDS, (int)vsCommandStatus.vsCommandStatusSupported+(int)vsCommandStatus.vsCommandStatusEnabled);<br />
                                CommandBar cbTools = commandBars["Tools"];<br />
                                //commandBars["Tools"].Controls[0].Caption<br />
                                CommandBarControl cbcTools = _iisRecycleCommand.AddControl(cbTools, 1);<br />
                            }<br />
                        }<br />
                        catch (Exception ex) { Console.WriteLine(ex.Message);}<br />
                    }</p>
<p>                    try<br />
                    {<br />
                        _openContainingFolderCommand = commands.Item("ExtVS2003.Connect.OpenContainingFolder", -1);<br />
                    }<br />
                    catch (Exception e)<br />
                    {<br />
                        Console.WriteLine(e.Message);<br />
                        try<br />
                        {<br />
                            if (_openContainingFolderCommand == null)<br />
                            {<br />
                                _openContainingFolderCommand = commands.AddNamedCommand(addInInstance, "OpenContainingFolder", "Open the containing folder",<br />
                                    "Open the containing folder", true, 0, ref contextGUIDS,<br />
                                    (int) vsCommandStatus.vsCommandStatusSupported +<br />
                                    (int) vsCommandStatus.vsCommandStatusEnabled);<br />
                                CommandBar cbEasyMDIWindow = commandBars["Easy MDI Document Window"];<br />
                                CommandBarControl cbcEasyMDIWIndow = _openContainingFolderCommand.AddControl(cbEasyMDIWindow, 1);<br />
                            }<br />
                        }<br />
                        catch (Exception ex) { Console.WriteLine(ex.Message);}<br />
                    }</p>
<p>                }<br />
                catch(Exception ex)<br />
                {<br />
                    MessageBox.Show("Cant't place toolbutton, error: " + ex.Message, "error", MessageBoxButtons.OK);<br />
                }<br />
            }</p>
<p>        }</p>
<p>        private void SetOutputWindowPane()<br />
        {<br />
            OutputWindow outputWindow = (OutputWindow)_application.Windows.Item(Constants.vsWindowKindOutput).Object;<br />
            _outputWindowPane = outputWindow.OutputWindowPanes.Item(OUTPUTWINDOWGUID);<br />
        }</p>
<p>        private void SetBuildEvent()<br />
        {<br />
            _buildEvents = _application.Events.BuildEvents;<br />
            _buildEvents.OnBuildDone += new _dispBuildEvents_OnBuildDoneEventHandler(_buildEvents_OnBuildDone);<br />
            _buildEvents.OnBuildProjConfigDone += new _dispBuildEvents_OnBuildProjConfigDoneEventHandler(_buildEvents_OnBuildProjConfigDone);<br />
        }</p>
<p>        ///<br />
<summary>
        ///     Implements the OnDisconnection method of the IDTExtensibility2 interface.<br />
        ///     Receives notification that the Add-in is being unloaded.<br />
        /// </summary>
<p>        ///</p>
<param term="disconnectMode" />
        ///      Describes how the Add-in is being unloaded.<br />
        ///<br />
        ///</p>
<param term="custom" />
        ///      Array of parameters that are host application specific.<br />
        ///<br />
        /// <seealso class="IDTExtensibility2" /><br />
        public void OnDisconnection(ext_DisconnectMode disconnectMode, ref Array custom)<br />
        {<br />
            try<br />
            {<br />
                _iisRecycleCommand.Delete();<br />
                _openContainingFolderCommand.Delete();<br />
            }<br />
            catch (Exception ex)<br />
            {<br />
                MessageBox.Show("Error in Disconnect: " + ex.Message, "Error", MessageBoxButtons.OK);<br />
            }</p>
<p>        }</p>
<p>        ///<br />
<summary>
        ///      Implements the OnAddInsUpdate method of the IDTExtensibility2 interface.<br />
        ///      Receives notification that the collection of Add-ins has changed.<br />
        /// </summary>
<p>        ///</p>
<param term="custom" />
        ///      Array of parameters that are host application specific.<br />
        ///<br />
        /// <seealso class="IDTExtensibility2" /><br />
        public void OnAddInsUpdate(ref Array custom)<br />
        {<br />
        }</p>
<p>        ///<br />
<summary>
        ///      Implements the OnStartupComplete method of the IDTExtensibility2 interface.<br />
        ///      Receives notification that the host application has completed loading.<br />
        /// </summary>
<p>        ///</p>
<param term="custom" />
        ///      Array of parameters that are host application specific.<br />
        ///<br />
        /// <seealso class="IDTExtensibility2" /><br />
        public void OnStartupComplete(ref Array custom)<br />
        {<br />
        }</p>
<p>        ///<br />
<summary>
        ///      Implements the OnBeginShutdown method of the IDTExtensibility2 interface.<br />
        ///      Receives notification that the host application is being unloaded.<br />
        /// </summary>
<p>        ///</p>
<param term="custom" />
        ///      Array of parameters that are host application specific.<br />
        ///<br />
        /// <seealso class="IDTExtensibility2" /><br />
        public void OnBeginShutdown(ref Array custom)<br />
        {<br />
        }</p>
<p>        ///<br />
<summary>
        ///      Implements the QueryStatus method of the IDTCommandTarget interface.<br />
        ///      This is called when the command's availability is updated<br />
        /// </summary>
<p>        ///</p>
<param term="commandName" />
        ///        The name of the command to determine state for.<br />
        ///<br />
        ///</p>
<param term="neededText" />
        ///        Text that is needed for the command.<br />
        ///<br />
        ///</p>
<param term="status" />
        ///        The state of the command in the user interface.<br />
        ///<br />
        ///</p>
<param term="commandText" />
        ///        Text requested by the neededText parameter.<br />
        ///<br />
        /// <seealso class="Exec" /><br />
        public void QueryStatus(string commandName, vsCommandStatusTextWanted neededText, ref vsCommandStatus status, ref object commandText)<br />
        {<br />
            if(neededText == vsCommandStatusTextWanted.vsCommandStatusTextWantedNone)<br />
            {<br />
                switch (commandName)<br />
                {<br />
                    case "ExtVS2003.Connect.ExtVS2003":<br />
                        status = (vsCommandStatus)vsCommandStatus.vsCommandStatusSupported|vsCommandStatus.vsCommandStatusEnabled;<br />
                        break;</p>
<p>                    case "ExtVS2003.Connect.OpenContainingFolder":<br />
                        status  = (vsCommandStatus)vsCommandStatus.vsCommandStatusSupported|vsCommandStatus.vsCommandStatusEnabled;<br />
                        break;<br />
                }<br />
            }<br />
        }</p>
<p>        ///<br />
<summary>
        ///      Implements the Exec method of the IDTCommandTarget interface.<br />
        ///      This is called when the command is invoked.<br />
        /// </summary>
<p>        ///</p>
<param term="commandName" />
        ///        The name of the command to execute.<br />
        ///<br />
        ///</p>
<param term="executeOption" />
        ///        Describes how the command should be run.<br />
        ///<br />
        ///</p>
<param term="varIn" />
        ///        Parameters passed from the caller to the command handler.<br />
        ///<br />
        ///</p>
<param term="varOut" />
        ///        Parameters passed from the command handler to the caller.<br />
        ///<br />
        ///</p>
<param term="handled" />
        ///        Informs the caller if the command was handled or not.<br />
        ///<br />
        /// <seealso class="Exec" /><br />
        public void Exec(string commandName, vsCommandExecOption executeOption, ref object varIn, ref object varOut, ref bool handled)<br />
        {<br />
            handled = false;<br />
            if(executeOption == vsCommandExecOption.vsCommandExecOptionDoDefault)<br />
            {<br />
                switch (commandName)<br />
                {<br />
                    case "ExtVS2003.Connect.ExtVS2003":<br />
                        RecycleAllApplicationPools();<br />
                        handled = true;<br />
                        break;</p>
<p>                    case "ExtVS2003.Connect.OpenContainingFolder":<br />
                        OpenContainingFolder();<br />
                        handled = true;<br />
                        break;<br />
                }<br />
            }<br />
        }</p>
<p>        private void OpenContainingFolder()<br />
        {<br />
            System.Diagnostics.Process.Start(_application.ActiveDocument.Path);<br />
        }</p>
<p>        private void _buildEvents_OnBuildDone(vsBuildScope Scope, vsBuildAction Action)<br />
        {<br />
            if (IsBuildingGACProject())<br />
            {<br />
                RecycleAllApplicationPools();<br />
            }<br />
        }</p>
<p>        private void _buildEvents_OnBuildProjConfigDone(string Project, string ProjectConfig, string Platform, string SolutionConfig,<br />
            bool Success)<br />
        {<br />
            if (!Success)<br />
            {<br />
                _application.ExecuteCommand("Build.Cancel", string.Empty);<br />
            }<br />
        }</p>
<p>        private bool IsBuildingGACProject()<br />
        {<br />
            Regex GACRegex = new Regex("PJB.UI|PJB.Business", RegexOptions.IgnoreCase);<br />
            Projects projects = _application.Solution.Projects;</p>
<p>            foreach (Project project in projects)<br />
            {<br />
                if (GACRegex.Match(project.Name).Success)<br />
                {<br />
                    return true;<br />
                }<br />
            }<br />
            return false;<br />
        }</p>
<p>        private void RecycleAllApplicationPools()<br />
        {<br />
            DirectoryEntry appPools = new DirectoryEntry("IIS://localhost/W3SVC/AppPools");<br />
            _outputWindowPane.OutputString("-------------------------------------------\n");<br />
            _outputWindowPane.OutputString("Start recycling application pools.");<br />
            foreach (DirectoryEntry appPool in appPools.Children)<br />
            {<br />
                appPool.Invoke("Recycle", null);<br />
                _outputWindowPane.OutputString(".");<br />
            }<br />
            _outputWindowPane.OutputString(" completed.\n");<br />
        }</p>
<p>    }<br />
}</p>
<p>[/sourcecode]</p>
