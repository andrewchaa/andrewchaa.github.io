---
title: SRP (Single Responsibility) and encapsulation
date: 2014-11-27 11:53:35.000000000 +00:00
categories:
- Programming
tags: []
meta:
  _wpas_skip_facebook: '1'
  sharing_disabled: '1'
  _wpas_skip_google_plus: '1'
  _wpas_skip_linkedin: '1'
  _wpas_skip_tumblr: '1'
  _wpas_skip_path: '1'
  _rest_api_published: '1'
  _rest_api_client_id: "-1"
  publicize_twitter_user: andrewchaa
  publicize_twitter_url: http://t.co/wJZPvKh9f2
  _wpas_done_1752093: '1'
  _publicize_done_external: a:1:{s:7:"twitter";a:1:{i:111615627;b:1;}}
---
<p><a href="http://en.wikipedia.org/wiki/Single_responsibility_principle">Single Responsibility</a> is one of key principles in writing good code, I believe. So when you change a method or a class, you should have only one reason to change it. But at the same time, you don't want to reveal too much details. You want to encapsulate the internals and nicely abstract your business logic.</p>
<p>This morning, I had a brief chat with a colleague about method encapsulation. I was saying the method was hiding too much and he called it encapsulation. This kind of chat happens often among developers. We didn't come to conclusion and I thought about it afterward. This is my thought.</p>
<p><strong>A method should do only one thing</strong></p>
<p>For example,</p>
<ul>
<li>contentStore.remove(doc)</li>
<li>metaDataStore.remove(doc)</li>
<li>raise(new UiDocumentDeletedEvent(doc))</li>
</ul>
<p>The 3 lines of code are written separately and each call does only one thing. In my opinion, contentStore.remove() method shouldn't hide the following two call inside its method call. contentStore.remove() should do only one thing it's good at, which is removing the document from ContentStore.</p>
<p><strong>Encapsulation</strong></p>
<p>However, what if the 3 operations happen together very often. if it does, I think it's the time to introduce a facade object (<a href="http://en.wikipedia.org/wiki/Facade_pattern">facade pattern</a>) or <a href="https://cuttingedge.it/blogs/steven/pivot/entry.php?id=91">a command and command handler</a>. The command handler can have those 3 objects as dependencies and call them in sequence.</p>
<p>[sourcecode language="csharp"]<br />
public class DocumentRemovedCommandHandler : IHandle&lt;DocumentRemovedCommand&gt;<br />
{<br />
    ...<br />
    public void Handle(DocumentRemovedCommand command)<br />
    {<br />
        _contentStore.remove(doc);<br />
        _metaDataStore.remove(doc);<br />
        _event.raise(new UiDocumentDeletedEvent(doc));<br />
    }<br />
}<br />
[/sourcecode]</p>
<p>So, in conclusion, use facade or command, if you want to perform a group of operations. Otherwise, do one thing at a time, well.</p>
