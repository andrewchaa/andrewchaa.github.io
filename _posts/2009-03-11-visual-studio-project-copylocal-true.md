---
title: 'Visual Studio project, CopyLocal: true'
date: 2009-03-11 16:03:52.000000000 +00:00
categories: []
tags: []
meta:
  _edit_last: '1907066'
---
<p>Today, I had an automated build failure on the test server. I spent half a day to fix the issue and discovered that someone changed the CopyLocal property of reference to false. Of course, if you reference a dll in GAC, you need to set it to false, so that you reference the dll in GAC. But if you reference another project within the same solution, you need to set it to true. Setting CopyLocal to false locks the dll and often project build fails because the output dll cannot be overwritten. To me, referencing another project in the same solution and setting the property to false is plainly wrong.</p>
<p>I googled a little bit and came with the following guideline. (<a href="http://msdn.microsoft.com/en-us/library/aa984582.aspx">MSDN CopyLocal property</a>)</p>
<ul>
<li>if the reference is another project within the same solution, set it to true.</li>
<li>if the referenced assembly is in GAC (Global Assembly Cache), set it to false</li>
<li>As a special case, the value for the mscorlib.dll reference is false.</li>
<li>If the assembly is found in the Framework SDK folder, then the value is false.</li>
</ul>
<p>Hope this is clear.</p>
