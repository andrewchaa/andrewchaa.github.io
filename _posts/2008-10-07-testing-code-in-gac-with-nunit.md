---
title: Testing code in GAC with NUnit
date: 2008-10-07 09:54:51.000000000 +01:00
type: post
published: true
status: publish
categories: []
tags: []
meta:
  _edit_last: '1907066'
author:
  login: simplelifeuk
  email: andrew.chaa@yahoo.co.uk
  display_name: Andy
  first_name: Andrew
  last_name: Chaa
---
<p>I often run test codes that reference methods of business class and the class is compiled and stored in GAC. Sometimes, I update the method but NUnit keeps running the old code. What I did was</p>
<ul>
<li>Visual Studio's Clean (this deletes all assemblies under the test project)</li>
<li>reset iis. this is supposed to flush GAC</li>
<li>rebuild the business class.</li>
</ul>
<p>But still it did not work. I slept on it and the next morning, I remembered I didn't restart NUnit and NUnit might hold the old assembly in its own memory. I closed NUnit and opened it, and the new method was loaded. Fantastic.</p>
<p>So, when you changed your method but can't see it working, restart NUnit!</p>
<p>Added in 3 days later</p>
<p>To ensure NUnit loads the newly compile dll, please do</p>
<ul>
<li>Rebuild the whole solution of your GAC code</li>
<li>Clean adn rebuild your testing code</li>
<li>Close NUnit and start it again.</li>
</ul>
