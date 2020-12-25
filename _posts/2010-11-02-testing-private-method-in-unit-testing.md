---
title: Testing private method in unit testing
date: 2010-11-02 10:21:17.000000000 +00:00
categories:
- Programming
tags:
- c#
- NUnit
meta:
  _edit_last: '1907066'
  _wp_old_slug: ''
  _oembed_4e0a8656b7364c971459d0998caf0f50: "{{unknown}}"
  _oembed_7a4661076298d1938f7e4de3d305ab7e: "{{unknown}}"
---
<p>Ideally, it is not recommended to test private methods, as complex internals should be kept hidden and only interface be tested. Well, in real world, sometimes, you need to test your private methods, as it performs very important operation.</p>
<p>In my case, the method was public and later I changed it to private, since it is better to be hidden. Yet, I still wanted to test it, as it does lots of things - calling several other private methods and sum up the result.</p>
<p>You can use .Net reflection and easily do it. One nice article I found by googling was <a href="http://www.codeproject.com/KB/cs/testnonpublicmembers.aspx">http://www.codeproject.com/KB/cs/testnonpublicmembers.aspx</a>. Simple and straight-forward.</p>
<p>I created a static helper method. I changed variable names in the above example, as it follows old C++ style. These days, C# guys prefer longer variable name without type prefix.</p>
<p>[sourcecode language="csharp"]<br />
public class TestHelper<br />
{<br />
    public static object RunStaticMethod(Type type, string method, object[] parameters)<br />
    {<br />
        return RunMethod(type, method, null, parameters, BindingFlags.Static | BindingFlags.NonPublic);<br />
    }</p>
<p>    public static object RunInstanceMethod(Type type, string method, object instance, object[] parameters)<br />
    {<br />
        return RunMethod(type, method, instance, parameters, BindingFlags.Instance | BindingFlags.NonPublic);<br />
    }</p>
<p>    private static object RunMethod(Type type, string method, object instance, object[] parameters, BindingFlags flags)<br />
    {<br />
        try<br />
        {<br />
            MethodInfo info = type.GetMethod(method, flags);<br />
            return info.Invoke(instance, parameters);<br />
        }<br />
        catch (Exception ex)<br />
        {<br />
            throw ex;<br />
        }<br />
    }<br />
}<br />
[/sourcecode]</p>
