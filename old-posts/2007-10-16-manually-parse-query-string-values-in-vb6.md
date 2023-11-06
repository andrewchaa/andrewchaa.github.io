---
title: Manually parse query string values in VB6
date: 2007-10-16 10:43:53.000000000 +01:00
categories: []
tags: []
meta:
  _edit_last: '1907066'
---
<p><!-- code formatted by http://manoli.net/csharpformat/ --></p>
<pre>
<span class="kwrd">Dim</span> url <span class="kwrd">As</span> <span class="kwrd">String</span>
<span class="kwrd">Dim</span> queryString <span class="kwrd">As</span> <span class="kwrd">String</span>
<span class="kwrd">Dim</span> sQueryStringValues() <span class="kwrd">As</span> <span class="kwrd">String</span>
<span class="kwrd">Dim</span> sIndustrySectorId <span class="kwrd">As</span> <span class="kwrd">String</span>
<span class="kwrd">Dim</span> sSiteId <span class="kwrd">As</span> <span class="kwrd">String</span>
<span class="kwrd">Dim</span> sMode <span class="kwrd">As</span> <span class="kwrd">String</span>

<span class="rem">'1. url is normal</span>
<span class="rem">'2. url is empty</span>
<span class="rem">'3. SiteID is missing</span>

url = <span class="str">"http://localhost/Posting/templates/SiteXsl.asp?IndustryID=0&amp;SiteID=4&amp;Mode=4"</span>
<span class="rem">'url = ""</span>
<span class="rem">'url = "http://localhost/Posting/templates/SiteXsl.asp?IndustryID=0&amp;Mode=4"</span>

<span class="kwrd">If</span> InStr(1, url, <span class="str">"?"</span>, vbTextCompare) <span class="kwrd">Then</span>
    queryString = Split(url, <span class="str">"?"</span>)(1)

    <span class="kwrd">If</span> InStr(1, queryString, <span class="str">"&amp;"</span>, vbTextCompare) <span class="kwrd">Then</span>
        sQueryStringValues = Split(queryString, <span class="str">"&amp;"</span>)

        <span class="kwrd">Dim</span> str <span class="kwrd">As</span> <span class="kwrd">Variant</span>
        <span class="kwrd">For</span> <span class="kwrd">Each</span> str <span class="kwrd">In</span> sQueryStringValues
            <span class="kwrd">If</span> InStr(1, str, <span class="str">"SiteID="</span>, vbTextCompare) <span class="kwrd">Then</span>
                sSiteId = Replace(str, <span class="str">"SiteID="</span>, <span class="str">""</span>)
            <span class="kwrd">ElseIf</span> InStr(1, str, <span class="str">"IndustryID="</span>, vbTextCompare) <span class="kwrd">Then</span>
                sIndustrySectorId = Replace(str, <span class="str">"IndustryID="</span>, <span class="str">""</span>)
            <span class="kwrd">ElseIf</span> InStr(1, str, <span class="str">"Mode="</span>, vbTextCompare) <span class="kwrd">Then</span>
                sMode = Replace(str, <span class="str">"Mode="</span>, <span class="str">""</span>)
            <span class="kwrd">End</span> <span class="kwrd">If</span>
        <span class="kwrd">Next</span>

        MsgBox <span class="str">"IndustrySectorID: "</span> &amp; sIndustrySectorId
        MsgBox <span class="str">"SiteID: "</span> &amp; sSiteId
        MsgBox <span class="str">"Mode: "</span> &amp; sMode
    <span class="kwrd">End</span> <span class="kwrd">If</span>
<span class="kwrd">End</span> <span class="kwrd">If</span></pre>
