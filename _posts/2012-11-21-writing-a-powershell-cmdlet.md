---
title: Writing a powershell cmdlet...
date: 2012-11-21 18:09:53.000000000 +00:00
type: post
published: true
status: publish
categories:
- Programming
tags:
- cmdlet
- powershell
meta:
  _edit_last: '1907066'
  tagazine-media: a:7:{s:7:"primary";s:0:"";s:6:"images";a:0:{}s:6:"videos";a:0:{}s:11:"image_count";i:0;s:6:"author";s:7:"1907066";s:7:"blog_id";s:7:"1833431";s:9:"mod_stamp";s:19:"2012-11-21
    18:09:53";}
  publicize_reach: a:2:{s:7:"twitter";a:1:{i:1752093;i:157;}s:2:"wp";a:1:{i:0;i:6;}}
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
<p>A cmdlet (reads "command-lit") is a lightweight command used in Powershell environment. The Powershell runtime invokes cmdlets within the context of automation scripts that are provided at the command line. </p>
<p>Cmdlets perform an action. Through Powershell pipiline, they can return a .NET object. </p>
<p>Let's look at the code.</p>
<p>[sourcecode language="powershell"]<br />
[Cmdlet(VerbsData.Publish, &quot;Message&quot;, DefaultParameterSetName = IdRangeParameterSet, SupportsShouldProcess = true)]<br />
public class EventCmdlet : Cmdlet<br />
{<br />
    internal const string IdRangeParameterSet = &quot;IdRange&quot;;<br />
    const string DateRangeParameterSet = &quot;DateRange&quot;;</p>
<p>    [Parameter(HelpMessage = &quot;The source for the messages.&quot;, Mandatory = true, Position = 0)]<br />
    public string Source { get; set; }</p>
<p>    [Parameter(HelpMessage = &quot;The single audit entry id&quot;, Mandatory = true, ParameterSetName = IdParameterSet)]<br />
    public int? SingleId { get; set; }</p>
<p>    //this is to support WhatIf in unit tests. (In the context of the tests ShouldProcess would return always false)<br />
    public Func&lt;bool&gt; ShouldProcessAction = () =&gt; true;</p>
<p>    protected override void ProcessRecord()<br />
    {<br />
        var shouldProcess = ShouldProcessAction.Invoke();<br />
        _eventManager.ShouldProcess = shouldProcess;</p>
<p>        var source = _sourcesEvents.FirstOrDefault(s =&gt; s.Name.ToLower() == Source.ToLower());</p>
<p>        if(source == null)<br />
        {<br />
            _logger.ErrorFormat(&quot;The specified source {0} was not found&quot;, Source);<br />
            return;<br />
        }</p>
<p>        if(SingleId.HasValue)<br />
        {<br />
            _logger.InfoFormat(&quot;processing a message by a single Id of {0} &quot;, SingleId.Value);<br />
            _eventManager.PublishEvent(source, SingleId.Value);<br />
        }<br />
    }<br />
}</p>
<p>[/sourcecode]</p>
<h4>Cmdlet attribute</h4>
<p>[sourcecode language="powershell"]<br />
[Cmdlet(VerbsData.Publish, &quot;Message&quot;, DefaultParameterSetName = IdRangeParameterSet, SupportsShouldProcess = true)]<br />
public class EventCmdlet : Cmdlet<br />
[/sourcecode]</p>
<p>In order to declare a cmdlet class as a cmdle, <a href="http://msdn.microsoft.com/en-gb/library/windows/desktop/ms714420(v=vs.85).aspx">Cmdlet attribute</a> is required. So you start your class with this attribute.</p>
<h4>Cmdlet parameter</h4>
<p>[sourcecode language="powershell"]<br />
    [Parameter(HelpMessage = &quot;The source for the messages.&quot;, Mandatory = true, Position = 0)]<br />
    public string Source { get; set; }</p>
<p>    [Parameter(HelpMessage = &quot;The single audit entry id&quot;, Mandatory = true, ParameterSetName = IdParameterSet)]<br />
    public int? SingleId { get; set; }</p>
<p>    [Parameter(HelpMessage = &quot;The starting audit entry id&quot;, Mandatory = true, ParameterSetName = IdRangeParameterSet, Position = 1)]<br />
    public int? FromId { get; set; }</p>
<p>    [Parameter(HelpMessage = &quot;The ending audit entry id&quot;, Mandatory = true, ParameterSetName = IdRangeParameterSet, Position = 2)]<br />
    public int? ToId { get; set; }</p>
<p>[/sourcecode]</p>
<p>The public properties define the parameters available to the user that is running the application. You can use <a href="http://msdn.microsoft.com/en-gb/library/windows/desktop/dd878252(v=vs.85).aspx">positional parameters</a> which are handy if you need to put range values. <a href="http://msdn.microsoft.com/en-gb/library/windows/desktop/dd878348(v=vs.85).aspx">Parameter set</a> can be used to perform a specific action.</p>
<h4>ShouldProcess feature</h4>
<p>[sourcecode language="powershell"]<br />
[Cmdlet(VerbsData.Publish, &quot;Message&quot;, DefaultParameterSetName = IdRangeParameterSet, SupportsShouldProcess = true)]<br />
public class EventCmdlet : Cmdlet</p>
<p>...</p>
<p>    //this is to support WhatIf in unit tests. (In the context of the tests ShouldProcess would return always false)<br />
    public Func&lt;bool&gt; ShouldProcessAction = () =&gt; true;</p>
<p>...</p>
<p>    protected override void ProcessRecord()<br />
    {<br />
        var shouldProcess = ShouldProcessAction.Invoke();<br />
        ....<br />
    }</p>
<p>[/sourcecode]</p>
<p>Powershell allows you to write cmdlets that prompt for user feedback. It should be declared in the Cmdlet attribute and you must call ShouldProcess method. (For more info, <a href="http://msdn.microsoft.com/en-gb/library/windows/desktop/bb204629(v=vs.85).aspx">Requesting Confirmation from Cmdlets</a>)</p>
<h4>Processing method</h4>
<p>There are <a href="http://msdn.microsoft.com/en-gb/library/windows/desktop/ms714463(v=vs.85).aspx">Processing Methods</a> like BeginProcessing, ProcessRecord, and EndProcessing. Typically, you override ProcessRecord, as it is called for every record that the cmdlet processes. BeginProcessing and EndProcessing are called only one time.</p>
<h4>Running your cmdlet with F5 / Ctrl F5, visual studio run command</h4>
<p>It will be very convenient if you can run your cmdlet without manually opening a shell and importing your module. In your cmdlet project, open property of the project and set the following sections on Build tab.</p>
<ul>
<li>Start external program: c:\windows\syswow64\WindowsPowerShell\v1.0\powershell.exe</li>
<li>command line arguments: -noexit -command import-module .\Event.psd1</li>
</ul>
<h4>Resolving dependencies</h4>
<p>If your cmdlet performs a rather complex action, it will depend on various other assemblies. You need to inject those dependent binaries into your cmdlet. Also, in order to unit-test your code, you need to mock out those assemblies too. </p>
<p>Unfortunately, powershell cmdlet can only be invoked through the default constructor, and as a result, you cannot pass dependencies through its default constructor. </p>
<p>First, you need psd1, which is a powershell module definition. You can create one by using <a href="http://technet.microsoft.com/en-us/library/hh849709.aspx">New-ModuleManifest</a>. In the manifest file, you can specify RequiredAssemblies.</p>
<p>[sourcecode language="powershell"]<br />
# Assemblies that must be loaded prior to importing this module<br />
RequiredAssemblies = 'Test.Framework.dll',<br />
                     'EventR.Lib.dll',<br />
                     'EventR.Configuration.dll',<br />
                     'RabbitMQ.Client.dll',<br />
                     'Jayrock.Json.dll'<br />
[/sourcecode]</p>
<p>Then use your IoC as service locator in the default constructor. </p>
<p>[sourcecode language="powershell"]<br />
public EventCmdlet()<br />
{<br />
    Container.InitializeInstance&lt;EventConfigurationContributor&gt;();<br />
    _events = Container.Instance.ResolveAll&lt;IEvents&gt;().ToList();<br />
    _eventManager = Container.Instance.Resolve&lt;EventManager&gt;();<br />
    _logger = Container.Instance.Resolve&lt;ILoggerFactory&gt;().Create(MethodBase.GetCurrentMethod().DeclaringType);<br />
    ShouldProcessAction = () =&gt; ShouldProcess(&quot;Messages&quot;);<br />
}<br />
[/sourcecode]</p>
