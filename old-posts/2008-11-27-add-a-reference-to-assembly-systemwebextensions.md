---
title: add a reference to assembly 'System.Web.Extensions...
date: 2008-11-27 11:55:24.000000000 +00:00
categories:
- Programming
tags:
- asp.net
meta:
  _edit_last: '1907066'
---
<p>I was adding a ajax-enabled control on a page and suddenly having "... You must add a reference to assembly 'System.Web.Extensions..." error. It complained that my website assembly does not have a reference to 'System.Web.Extensions' and it was true. Definitely, I added the reference to my project, but the compiled dll does not have it.</p>
<p>I googled a little bit. Some suggest that I need to install Microsoft Ajax framework 1.0. I did it long time ago, but I re-installed it. The problem persisted. One good document was <a href="http://www.asp.net/AJAX/Documentation/Live/ConfiguringASPNETAJAX.aspx">Configuring ASP.Net Ajax</a>. I noticed &lt;control&gt; section in the web.config</p>
<blockquote>
<h2 class="subsectionTitle"><a name="controls">The &lt;controls&gt; Element</a></h2>
<p>The &lt;controls&gt; element registers ASP.NET AJAX namespaces in the System.Web.Extensions assembly and maps the <span class="keyword">asp</span> tag prefix as an alias for these namespaces. The controls in the ASP.NET AJAX namespaces can be referenced in a Web page with syntax such as the following:</p></blockquote>
<p>First, I didn't have ScriptManager. This was a silly mistake.<br />
[code language='xml']<br />
<asp:scriptmanager id="ScriptManager1" runat="server" /></p>
<p>[/code]<br />
Second, I didn't register tagPrefix for "asp". I find this strange. asp prefix is the default one, and I wondered why I bother to do. It turned out that if you don't have tagPrefix for "asp", your web project does not reference system.web.extensions and it will break. So, please do.<br />
[code language='xml']<br />
<system.web></p>
<pages>
    <controls><br />
      <add tagprefix="asp" namespace="System.Web.UI" assembly="System.Web.Extensions, Version=1.0.61025.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" /><br />
    </controls>
  </pages>
</system.web><br />
[/code]</p>
