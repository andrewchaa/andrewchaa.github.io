---
title: Display Selected value with Html.DropDownList in ASP.Net MVC
date: 2009-09-21 17:15:49.000000000 +01:00
type: post
published: true
status: publish
categories:
- Programming
tags:
- ASP.Net MVC
meta:
  _edit_last: '1907066'
author:
  login: simplelifeuk
  email: andrew.chaa@yahoo.co.uk
  display_name: Andy
  first_name: Andrew
  last_name: Chaa
---
<p>I wrote ToastManager about two months ago, and not try to covert it into ASP.Net. What ToastManager does is to collect people's toast order for the morning toast run.</p>
<p>Why? I just think MVC is cool. It separate programming logic into 3 different layers nicely.</p>
<p>The first problem I encountered in writing MVC code was to find a way to display a dropdownlist with a selected value. It is funny. I feel like I am a complete novice when I use MVC.</p>
<p>Simply, you need to pass the selected value in creating SelectList. (from <a href="http://stackoverflow.com/questions/624828/asp-net-mvc-html-dropdownlist-selectedvalue">ASP.NET MVC Html.DropDownList SelectedValue</a>) </p>
<p>for example,<br />
[sourcecode language="csharp"]<br />
    Slices = new SelectList(new int[] {1, 2, 3, 4}, 2);<br />
[[/sourcecode]</p>
<p>The below is the code for my OrderFormViewModel class</p>
<p>[sourcecode language="csharp"]</p>
<p>public Models.Order Order { get; private set; }<br />
public string[] Spread { get; private set; }<br />
public SelectList Slices { get; private set; }</p>
<p>public OrderFormViewModel(Order order)<br />
{<br />
    Order = order;<br />
    Spread = new[] { &quot;Butter&quot;, &quot;Jam&quot;, &quot;Peanut Butter&quot;, &quot;Bovril&quot;, &quot;Honey&quot;, &quot;Marmalade&quot;, &quot;Marmite&quot;, &quot;Vegemite&quot; };<br />
    int[] sliceList = new int[] {1, 2, 3, 4};<br />
    Slices = new SelectList(sliceList, Order.Slice);<br />
}</p>
<p>[/sourcecode]</p>
