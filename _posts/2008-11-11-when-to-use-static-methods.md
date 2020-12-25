---
title: When to use static methods?
date: 2008-11-11 15:13:40.000000000 +00:00
categories:
- Programming
tags:
- c# programming
meta:
  _edit_last: '1907066'
---
<p>This is a question that hanuts me since I installed Resharper recently. Resharper keeps suggesting that the method can be static. I can see that it can be static. The method does not depend on any properties or methods of the class. But does that mean it should change to static?</p>
<p>I wasn't sure, so I asked google. Often, I think google is like a wizard or rabbi. I ask a question, and it answers. Anyway, there were people who were curios and thought about it.</p>
<p><a href="http://bytes.com/forum/thread245556.html">Kristofer Gafvert</a> says,</p>
<blockquote><p>Does this method belong to an object, or the class itself?<br />
A method belongs to an object, if it modifies the state of the object. If<br />
the method does not modify a specific object, it can most likely be static.</p></blockquote>
<p>I really agree. if the method does not modifies the state of the object, it just belongs to the class, not the object. What do you think?</p>
<p>Please have a look on this discussion.</p>
<ul>
<li><a href="http://bytes.com/forum/thread245556.html">When is it appropriate to use static methods?</a></li>
</ul>
