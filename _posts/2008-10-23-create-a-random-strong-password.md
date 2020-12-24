---
layout: post
title: Create a random strong password
date: 2008-10-23 15:33:31.000000000 +01:00
type: post
published: true
status: publish
categories: []
tags:
- c# programming
meta:
  _edit_last: '1907066'
author:
  login: simplelifeuk
  email: andrew.chaa@yahoo.co.uk
  display_name: Andy
  first_name: Andrew
  last_name: Chaa
---
<p>This is to create a random strong password. I don't want to make it too strong, for example password with special character. 1 number and 1 upper case will be sufficient.</p>
<p>There are a few good articles. I get the idea from these posts.</p>
<ul>
<li><a href="http://www.obviex.com/Samples/Password.aspx">How To: Generate a Random Password (C#/VB.NET)</a></li>
<li><a href="http://www.4guysfromrolla.com/webtech/122999-1.shtml">4 Guys from Rolla, Generating Random Password</a></li>
<li><a href="http://www.aspnettutorials.com/tutorials/advanced/generatepassword-csharp.aspx">4 Guys from Rolla, Generating password in asp.net</a></li>
</ul>
<p>If you use ASP.Net 2, you can use System.Web.Security: MemberShip.GeneratePassword(...). <span style="text-decoration:line-through;">This will be handy, readily available method</span>. This password this method generate actually include special characters and punction letters such as (, {, ; :, and so on. This didn't cause an issue to me, but in some cases like you want to generate DB connection string automatically, it will be a problem because ; will break it.</p>
<p>Anyway, the method wasn't cool as I expected, and I wrote my own method. Well, it is not really my original one. I used a part of example codes from MSDN.</p>
<p>[sourcecode language='csharp']<br />
const string UPPERCASESET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";<br />
const string LOWERCASESET = "abcdefghijklmnopqrstuvwxyz";<br />
const string NUMBERSET = "1234567890";<br />
const int SALTLENGTH = 8;</p>
<p>public static string CreateNewPasswordSalt()<br />
{<br />
    return GeneratePasswordSet(SALTLENGTH, UPPERCASESET + NUMBERSET);<br />
}</p>
<p>public static string GenerateRandomStrongPassword(int length, int numberOfUppercaseChar, int numberOfNumeric)<br />
{<br />
    return GeneratePasswordSet(numberOfUppercaseChar, UPPERCASESET) +<br />
        GeneratePasswordSet(length - (numberOfUppercaseChar + numberOfNumeric), UPPERCASESET + LOWERCASESET + NUMBERSET) +<br />
        GeneratePasswordSet(numberOfNumeric, NUMBERSET);<br />
}</p>
<p>private static string GeneratePasswordSet(int length, string ALPHANUMERICSET)<br />
{<br />
    string password = string.Empty;<br />
    int position;<br />
    byte[] data = new byte[length];</p>
<p>    RandomNumberGenerator random = RandomNumberGenerator.Create();<br />
    random.GetBytes(data);</p>
<p>    for (int i = 0; i &lt; length; i++)<br />
    {<br />
        position = (data[i] % ALPHANUMERICSET.Length);<br />
        password = password + ALPHANUMERICSET.Substring(position, 1);<br />
    }<br />
    return password;<br />
}<br />
[/sourcecode]</p>
