---
layout: post
title: RepositoryLocator, a variation of generic repository
date: 2012-03-09 19:04:39.000000000 +00:00
type: post
published: true
status: publish
categories: []
tags:
- Pattern
- Repository Pattern
- StructureMap
meta:
  _edit_last: '1907066'
  _wpas_done_linkedin: '1'
  publicize_results: a:1:{s:7:"twitter";a:1:{i:111615627;a:2:{s:7:"user_id";s:10:"andrewchaa";s:7:"post_id";s:18:"178194610873577472";}}}
  _wpas_done_twitter: '1'
author:
  login: simplelifeuk
  email: andrew.chaa@yahoo.co.uk
  display_name: Andy
  first_name: Andrew
  last_name: Chaa
---
<p>I use StructureMap as IoC at work.</p>
<p>I use it to get an object I need, and it is very handy.</p>
<p>One night, while cycling home, I thought what if I can get repository in the same way I get object from StructureMap.</p>
<p>I know there is a pattern called "Generic Repository", but this is slightly different. You have one generic repository class, and it locates an appropriate repository based on the type you want as return value. So, I call it Repository Locator.</p>
<p>So, look at the code and let me know if this is useful.</p>
<p>[sourcecode language="csharp"]<br />
class Program<br />
{<br />
    static void Main(string[] args)<br />
    {<br />
       ObjectFactory.Initialize(x =&gt;<br />
                                    {<br />
                                        x.For&lt;IRepository&lt;Company&gt;&gt;().Use&lt;CompanyRepository&gt;();<br />
                                        x.For&lt;IRepository&lt;User&gt;&gt;().Use&lt;UserRepository&gt;();<br />
                                    });</p>
<p>        var repository = ObjectFactory.GetInstance&lt;GenericRepository&gt;();<br />
        var company = repository.Find&lt;Company&gt;(1);<br />
        var user = repository.Find&lt;User&gt;(10);</p>
<p>        Console.WriteLine(&quot;Object: &quot; + company.GetType() + &quot;, &quot; + company.Id);<br />
        Console.WriteLine(&quot;Object: &quot; + user.GetType() + &quot;, &quot; + user.Id);<br />
    }<br />
}</p>
<p>public class GenericRepository<br />
{<br />
    public T Find&lt;T&gt;(int id)<br />
    {<br />
        var actualRepository = ObjectFactory.GetInstance&lt;IRepository&lt;T&gt;&gt;();<br />
        return actualRepository.Find(id);<br />
    }<br />
}</p>
<p>public class UserRepository : IRepository&lt;User&gt;<br />
{<br />
    public User Find(int id)<br />
    {<br />
        return new User { Id = id };<br />
    }<br />
}</p>
<p>public class CompanyRepository : IRepository&lt;Company&gt;<br />
{<br />
    public Company Find(int id)<br />
    {<br />
        return new Company { Id = id};<br />
    }<br />
}</p>
<p>public interface IRepository&lt;T&gt;<br />
{<br />
    T Find(int id);<br />
}</p>
<p>public class User<br />
{<br />
    public int Id { get; set; }<br />
}</p>
<p>public class Company<br />
{<br />
    public int Id { get; set; }<br />
}<br />
[/sourcecode]</p>
