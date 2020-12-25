---
title: Test Data Builder with Fluent lambda interface
date: 2015-11-13 11:19:21.000000000 +00:00
categories:
- Programming
tags: []
meta:
  sharing_disabled: '1'
  _rest_api_published: '1'
  _rest_api_client_id: "-1"
  _publicize_job_id: '16816187121'
  _publicize_done_external: a:1:{s:7:"twitter";a:1:{i:1752093;s:56:"https://twitter.com/andrewchaa/status/665126811949359104";}}
  _publicize_done_2230353: '1'
  _wpas_done_1752093: '1'
  publicize_twitter_user: andrewchaa
---
<p>With the builder pattern, you can create an object in a more flexible and explicit way. And C# lamdba syntax makes the fluent interface more succinct</p>
<p>For example,</p>
<p>[sourcecode language="csharp"]</p>
<p>User fred = new UserTestDataBuilder()<br />
.With(u =&gt; u.Name = &quot;fred&quot;)<br />
.With(u =&gt; u.Reputation = 900)<br />
.With(u =&gt; u.ScholarBadge = true)<br />
.With(u =&gt; u.CriticBadge = true)</p>
<p>[/sourcecode]</p>
<p>You just need an Action&lt;T&gt; method and a class for the properties to populate.</p>
<p>[sourcecode language="csharp"]<br />
public class UserSpec<br />
{<br />
    public string Name {get; set;}<br />
    public int Reputation {get; set;}<br />
    ...<br />
}</p>
<p>public class UserTestDataBuilder()<br />
{<br />
    private UserSpec _userSpec = new UserSpec();<br />
    public UserTestDataBuilder With(Action&amp;lt;UserSpec&amp;gt; action)<br />
    {<br />
        action(_userSpec);<br />
        return this;<br />
    }</p>
<p>    public User Build()<br />
    {<br />
        return new User(_userSpec.Name, _userSpec.Reputation,<br />
            _userSpec.ScholarBadge, _userSpec.CriticBadge);<br />
    }<br />
}<br />
[/sourcecode]</p>
