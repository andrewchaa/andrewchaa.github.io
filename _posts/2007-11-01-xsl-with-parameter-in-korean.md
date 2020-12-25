---
title: XSL with parameter (in korean)
date: 2007-11-01 09:06:07.000000000 +00:00
type: post
published: true
status: publish
categories: []
tags: []
meta: {}
author:
  login: simplelifeuk
  email: andrew.chaa@yahoo.co.uk
  display_name: Andy
  first_name: Andrew
  last_name: Chaa
---
<p>맡은 일 중에 하나가 XSL에 param을 넣어서 처리하는 것인데, XSL에 대해서 아는 거는, 그냥 XML에 있는 값들을 사이 사이에 집어넣는 거라서 좀 쪽팔렸다. 이미 족은 팔렸고 열심히 공부해서 일을 해내야지. 아자! 열심히 해보자.</p>
<p>Reference</p>
<ul>
<li><a href="http://skillport.books24x7.com/book/id_9810/viewer.asp?bookid=9810&amp;chunkid=529730633">Beginning XSLT 2.0: From Novice to Professional by Jeni Tennison</a>,  <a href="http://www.apress.com/resource/bookfile/2229">Source code</a></li>
<li><a href="http://msdn2.microsoft.com/en-us/library/ms753809.aspx">createProcessor</a> 예제</li>
</ul>
<p>Insturction</p>
<ul>
<li><span class="fixed">&lt;xsl:value-of&gt;: </span>&lt;xsl:value-of select="/greeting" /&gt;</li>
<li><span class="fixed">&lt;xsl:for-each&gt;: for each loop</span>
<ul>
<li>&lt;xsl:for-each select="/TVGuide/Channel"&gt;</li>
<li>...</li>
<li>&lt;/xsl:for-each&gt;</li>
</ul>
</li>
</ul>
<p>Using and referring to a variable</p>
<p>&lt;xsl:variable name="minRating" select="6" as="xs:integer" /&gt;<br />
Minimum rating: &lt;xsl:value-of select="$minRating" /&gt;</p>
<p>회사에서 쓰고 있는 VB Apps는 MSXML3를 쓰고 있었다. 그러니 MSXML2용으로 parameter를 넘기는 것이 가능하겠지.. ㅎㅎㅎ</p>
<p>VB 예제</p>
<pre><span style="color:blue;">Dim</span> xslt <span style="color:blue;">As</span> <span style="color:blue;">New</span> Msxml2.XSLTemplate30
<span style="color:blue;">Dim</span> xslDoc <span style="color:blue;">As</span> <span style="color:blue;">New</span> Msxml2.FreeThreadedDOMDocument30
<span style="color:blue;">Dim</span> xmlDoc <span style="color:blue;">As</span> <span style="color:blue;">New</span> Msxml2.DOMDocument30
<span style="color:blue;">Dim</span> xslProc <span style="color:blue;">As</span> IXSLProcessor
xslDoc.async = <span style="color:blue;">False</span>
xslDoc.load App.Path &amp; <span style="color:maroon;">"\createProcessor.xsl"</span>
<span style="color:blue;">If</span> (xslDoc.parseError.errorCode &lt;&gt; 0) <span style="color:blue;">Then</span>
   <span style="color:blue;">Dim</span> myErr
   <span style="color:blue;">Set</span> myErr = xslDoc.parseError
   MsgBox(<span style="color:maroon;">"You have error "</span> &amp; myErr.reason)
<span style="color:blue;">Else</span>
   <span style="color:blue;">Set</span> xslt.stylesheet = xslDoc
   xmlDoc.async = <span style="color:blue;">False</span>
   xmlDoc.load App.Path &amp; <span style="color:maroon;">"\books.xml"</span>
   <span style="color:blue;">If</span> (xmlDoc.parseError.errorCode &lt;&gt; 0) <span style="color:blue;">Then</span>
      <span style="color:blue;">Set</span> myErr = xmlDoc.parseError
      MsgBox(<span style="color:maroon;">"You have error "</span> &amp; myErr.reason)
   <span style="color:blue;">Else</span>
      <span style="color:blue;">Set</span> xslProc = xslt.createProcessor()
      xslProc.input = xmlDoc
      xslProc.addParameter <span style="color:maroon;">"param1"</span>, <span style="color:maroon;">"Hello"</span>
      xslProc.Transform
      MsgBox xslProc.output
   <span style="color:blue;">End</span> <span style="color:blue;">If</span>
<span style="color:blue;">End</span> <span style="color:blue;">If</span></pre>
<p>&lt;xsl:Choose&gt; 예제</p>
<p>&lt;xsl:param name="Mode" select="1" /&gt;<br />
&lt;xsl:param name="IndustrySectorID" select="0" /&gt;<br />
&lt;xsl:param name="SiteID" select="4" /&gt;</p>
<p>&lt;xsl:output method="xml" omit-xml-declaration="no" indent="yes" encoding="iso-8859-1"/&gt;<br />
&lt;xsl:strip-space elements="*"/&gt;<br />
&lt;xsl:template match="/"&gt;<br />
&lt;xsl:choose&gt;<br />
&lt;xsl:when test = "$Mode = 1"&gt;&lt;xsl:apply-templates select="/" mode="Map1" /&gt;&lt;/xsl:when&gt;<br />
&lt;xsl:when test = "$Mode = 2"&gt;&lt;xsl:apply-templates select="/" mode="Map2" /&gt;&lt;/xsl:when&gt;<br />
&lt;xsl:when test = "$Mode = 4"&gt;&lt;xsl:apply-templates select="/" mode="Map4" /&gt;&lt;/xsl:when&gt;<br />
&lt;xsl:when test = "$Mode = 5"&gt;&lt;xsl:apply-templates select="/" mode="Map5" /&gt;&lt;/xsl:when&gt;<br />
&lt;/xsl:choose&gt;<br />
&lt;/xsl:template&gt;</p>
