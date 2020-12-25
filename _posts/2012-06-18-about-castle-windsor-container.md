---
title: About Castle Windsor Container
date: 2012-06-18 08:22:41.000000000 +01:00
categories:
- Programming
tags:
- About
- castle windsor
- dependency injection
- dynamic proxy
meta:
  _edit_last: '1907066'
  tagazine-media: a:7:{s:7:"primary";s:0:"";s:6:"images";a:0:{}s:6:"videos";a:0:{}s:11:"image_count";s:1:"0";s:6:"author";s:7:"1907066";s:7:"blog_id";s:7:"1833431";s:9:"mod_stamp";s:19:"2012-06-18
    16:11:24";}
  _wpas_done_twitter: '1'
  _wpas_skip_linkedin: '1'
  _oembed_08a34fffb70549aa89c6576be7b55d69: "{{unknown}}"
  _oembed_9ebcf7e475798a4e76071ea8c884f6ac: "{{unknown}}"
  _oembed_644eccbb67c0f9c648bdc0563e3d0a9c: "{{unknown}}"
  _oembed_9372db289b17cf2ac40cf7f155e966e7: "{{unknown}}"
  _oembed_42d0c38588aab31186ed187a82fd71b7: "{{unknown}}"
  _oembed_1b46edb04baa7be1d6613e0034d6c4f8: "{{unknown}}"
  _oembed_420a6b68cecd91f000e4909abef14a0b: "{{unknown}}"
  _oembed_ae2d832eacd5a04ff6c7e5e751e5cdb9: "{{unknown}}"
  _oembed_9852c239627682becbcb866fe40aa8a4: "{{unknown}}"
  _oembed_b8a93513ad4df1d075c3ab02cb0d82cd: "{{unknown}}"
---
<p>Since I moved to Huddle, I am using Castle Windsor. This post is the summary of what I would learn while using Castle Windsor.</p>
<h3>the source code</h3>
<p>I don't know why, but I found it difficult to find where the code is. It is here at <a href="https://github.com/castleproject">https://github.com/castleproject</a>. Even there is <a href="http://stackoverflow.com/questions/4847184/where-to-get-the-source-code-of-castle-project/11047138#11047138">a stackoverflow question</a> about where the code is.</p>
<h3>Very descriptive error message</h3>
<p>I often struggled with StructureMap error message, as it doesn't tell you what went wrong. I like Windor's, as it clearly states where it is screwed.</p>
<blockquote><p>
Can't create component 'LondonUbf.Installers.LoggerInterceptor' as it has dependencies to be satisfied.</p>
<p>'LondonUbf.Installers.LoggerInterceptor' is waiting for the following dependencies:<br />
- Service 'LondonUbf.Domain.ExceptionLogger' which was not registered.
</p></blockquote>
<h3>Tutorials</h3>
<p>There are a few tutorials. The link was in readme file of the project.</p>
<ul>
<li><a href="http://docs.castleproject.org/Windsor.Windsor-tutorial-ASP-NET-MVC-3-application-To-be-Seen.ashx">Windsor for ASP.NET MVC 3 application</a></li>
<li>Tutorial code: <a href="https://github.com/kkozmic/ToBeSeen">https://github.com/kkozmic/ToBeSeen</a></li>
</ul>
<p><strong>Use of Predicate</strong></p>
<p>By the way, an example code in the tutorial uses Predicate, and it is interesting. I knew they exists, but didn't really use it in my day-to-day coding.</p>
<p>[sourcecode language="csharp"]<br />
[Test]<br />
public void All_Controllers_Are_Registered()<br />
{<br />
    var allControllers = GetPublicClassesFromAssembly(c =&gt; c.Is&lt;IController&gt;());<br />
    var registeredControllers = GetImplementaionTypesFor(typeof (IController), _containerWithControllers);<br />
 Assert.That(allControllers, Is.EqualTo(registeredControllers));<br />
}<br />
private Type[] GetPublicClassesFromAssembly(Predicate&lt;Type&gt; where)<br />
{<br />
    return typeof (HomeController).Assembly.GetExportedTypes()<br />
        .Where(t =&gt; t.IsClass)<br />
        .Where(t =&gt; t.IsAbstract == false)<br />
        .Where(where.Invoke)<br />
        .OrderBy(t =&gt; t.Name)<br />
        .ToArray();<br />
}<br />
[/sourcecode]</p>
<p>By accepting Predicate parameter, you can make the method to accept lamda filter. This is the source of Predicate. It is delegate that returns boolean value.</p>
<p>[sourcecode language="csharp"]<br />
namespace System<br />
{<br />
    /// &lt;summary&gt;<br />
    /// Represents the method that defines a set of criteria and determines whether the specified object meets those criteria.<br />
    /// &lt;/summary&gt;<br />
    ///<br />
    /// &lt;returns&gt;<br />
    /// true if &lt;paramref name=&quot;obj&quot;/&gt; meets the criteria defined within the method represented by this delegate; otherwise, false.<br />
    /// &lt;/returns&gt;<br />
    /// &lt;param name=&quot;obj&quot;&gt;The object to compare against the criteria defined within the method represented by this delegate.&lt;/param&gt;&lt;typeparam name=&quot;T&quot;&gt;The type of the object to compare.This type parameter is contravariant. That is, you can use either the type you specified or any type that is less derived. For more information about covariance and contravariance, see Covariance and Contravariance in Generics.&lt;/typeparam&gt;&lt;filterpriority&gt;2&lt;/filterpriority&gt;<br />
    public delegate bool Predicate&lt;in T&gt;(T obj);<br />
}<br />
[/sourcecode]</p>
<h3>Registering interfaces</h3>
<p>Not much different from other IoC containers like Ninject and StructureMap.</p>
<p>[sourcecode language="csharp"]<br />
public class RepositoriesInstaller : IWindsorInstaller<br />
{<br />
    public void Install(IWindsorContainer container, IConfigurationStore store)<br />
    {<br />
        container.Register(Component.For&lt;FileNameParser, IMessageParser&gt;());<br />
        container.Register(<br />
            Component.For&lt;MessageRepository, IMessageRepository&gt;()<br />
            .DependsOn(new { messageDirectory = HostingEnvironment.MapPath(&quot;/Content/messages&quot;)})<br />
            );<br />
    }<br />
}<br />
[/sourcecode]</p>
<p>If your class depends on any other variable, you can use .DependsOn to resolve it. In the above example, I used HostingEnvironment.MapPath to find out the directory of "messages". It doesn't require HttpContext, unlike Server.MapPath(...).</p>
<p>cf) The difference betweeen Server.MapPath and HostingEnvironment.MapPath(...): <a href="http://stackoverflow.com/questions/944219/what-is-the-difference-between-server-mappath-and-hostingenvironment-mappath">http://stackoverflow.com/questions/944219/what-is-the-difference-between-server-mappath-and-hostingenvironment-mappath</a></p>
<h3>Dynamic Proxy</h3>
<ul>
<li>Introduction to dynamic proxy or interceptor: <a href="http://stw.castleproject.org/Tools.DynamicProxy-Introduction.ashx">http://stw.castleproject.org/Tools.DynamicProxy-Introduction.ashx</a></li>
<li>Tutorials: <a href="http://kozmic.pl/dynamic-proxy-tutorial/">http://kozmic.pl/dynamic-proxy-tutorial/</a></li>
<li><a href="https://skydrive.live.com/?cid=6e18e107780d3f4a&amp;id=6E18E107780D3F4A%21145">Tutorial source code</a></li>
</ul>
<p><strong>where T: class, new()</strong></p>
<p>It is a constraint on the generic parameter that T must be a class and have an parameterless default constructor. (from <a href="http://stackoverflow.com/questions/4737970/what-does-where-t-class-new-mean">Stackoverflow</a>)</p>
<p>The DP tutorial example used this syntax.</p>
<p>[sourcecode language="csharp"]<br />
public static TFreezable MakeFreezable&lt;TFreezable&gt;() where TFreezable : class, new()<br />
{<br />
    var freezableInterceptor = new FreezableInterceptor();<br />
    var proxy = _generator.CreateClassProxy&lt;TFreezable&gt;(new CallLoggingInterceptor(), freezableInterceptor);<br />
    _freezables.Add(proxy, freezableInterceptor);<br />
    return proxy;<br />
}<br />
[/sourcecode]</p>
<p>It is surprisingly simple to intercept a call to method. Just add .Interceptors() to the component registration.</p>
<p>[sourcecode language="csharp"]<br />
container.Register(<br />
    Component.For&lt;MessageRepository, IMessageRepository&gt;()<br />
    .DependsOn(new { messageDirectory = HostingEnvironment.MapPath(&quot;/Content/messages&quot;)})<br />
    .Interceptors&lt;MessageRepositoryInterceptor&gt;()<br />
    );<br />
[/sourcecode]</p>
<p>The interceptor is a simple class.</p>
<p>[sourcecode language="csharp"]<br />
public class MessageRepositoryInterceptor : IInterceptor<br />
{<br />
    private readonly ExceptionLogger _logger;</p>
<p>    public MessageRepositoryInterceptor(ExceptionLogger logger)<br />
    {<br />
        _logger = logger;<br />
    }</p>
<p>    public void Intercept(IInvocation invocation)<br />
    {<br />
        try<br />
        {<br />
            _logger.Log(string.Format(&quot;{0}.{1},  Message: {2} &quot;, invocation.TargetType.Name, invocation.Method.Name, invocation.Arguments[0]));<br />
            invocation.Proceed();<br />
        }<br />
        catch(Exception ex)<br />
        {<br />
            _logger.Log(ex);<br />
            throw;<br />
        }<br />
    }<br />
}<br />
[/sourcecode]</p>
<h3>the Life cycle of objects</h3>
<p>Quite bluntly saying, if you inject your dependencies into constructor of a class, those dependent objects are disposed together when the class gets disposed. However, if you use resolve a dependency manually, using .Resolve(), you have to release it manually.</p>
