---
title: Regular expression to check password strength
date: 2008-08-11 14:51:40.000000000 +01:00
categories: []
tags: []
---
<p>The requirement was to enforce a strong password which consists of </p>
<p><font color="#0000ff">at least one number or space, and one upper case letter.</font></p>
<p>&#160;</p>
<p>So as usual, I googled the regular expression and looked up a few regular expression books. To divide and conquer this requirement, </p>
<ol>
<li>at least one number: .*[0-9]</li>
<li>space: .*\s, \s means any spatial character like space and tab</li>
<li>one upper case: .*[A-Z]</li>
</ol>
<p>Also, you need to use positive look ahead so that any character follows, satisfying all those requirements</p>
<p>My first regular expression I came up with was </p>
<p>(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]|.*\s).*</p>
<p>This did work in .Net, but not in javascript. I used ASP.Net regular expression validator, and the tricky point was the same expression was processed by different engine. When it is validated on the service side, .Net process the expression. On client-side validation, javascript engie evaluate the expression. So the same password worked on firefox with server validation, but errored on IE which does client-side validation. I googled a bit and found <a href="http://www.marketingtechblog.com/2007/08/27/javascript-password-strength/">a similar expression by Douglas Karr</a>&#160;</p>
<blockquote><p><code>var strongRegex = new RegExp(&quot;^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$&quot;, &quot;g&quot;);</code></p>
</blockquote>
<p>So, using it, I changed my expression and it worked both on client-side and on server side like a charm!</p>
<p>The final version: </p>
<blockquote><p>(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]|.*\s).*</p>
</blockquote>
