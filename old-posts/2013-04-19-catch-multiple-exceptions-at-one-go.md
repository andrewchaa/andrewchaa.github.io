---
title: Catch multiple Exceptions at one go
date: 2013-04-19 14:48:52.000000000 +01:00
categories:
- Programming
tags:
- Exception
meta:
  _edit_last: '1907066'
  publicize_reach: a:2:{s:7:"twitter";a:1:{i:1752093;i:167;}s:2:"wp";a:1:{i:0;i:7;}}
  tagazine-media: a:7:{s:7:"primary";s:0:"";s:6:"images";a:0:{}s:6:"videos";a:0:{}s:11:"image_count";i:0;s:6:"author";s:7:"1907066";s:7:"blog_id";s:7:"1833431";s:9:"mod_stamp";s:19:"2013-04-19
    14:48:52";}
  publicize_twitter_user: andrewchaa
  _wpas_done_1752093: '1'
  _publicize_done_external: a:1:{s:7:"twitter";a:1:{i:111615627;b:1;}}
  _oembed_9d11cf4fc5aecef915ebda4de53d3f7f: "{{unknown}}"
  _oembed_84815189340720aaa28270156834b451: "{{unknown}}"
  _oembed_866e6993f763f077505e6e1841dd536f: "{{unknown}}"
  _oembed_d85103f7df1dfe905485837cd43b72f1: "{{unknown}}"
---
<p>It is not a good practice to catch System.Exception, as the catch block will be executed with unexpected exceptions and it will hide the real error. But sometimes, you want to catch multiple exceptions in order to avoid unnecessary repetitive code. For example,</p>
<p>[sourcecode language="csharp"]<br />
try<br />
{<br />
    var rsponse = lginService.Login(username, password);<br />
    Log(user.ID);<br />
    CreateCookie(tokenResponse.TokenResponse);<br />
    return user;<br />
}<br />
catch (AuthenticationException)<br />
{<br />
    return null;<br />
}<br />
catch (MultipleFailedLoginAttemptsException)<br />
{<br />
    return null;<br />
}<br />
catch (UserStatusException)<br />
{<br />
    return null;<br />
}<br />
catch (PaymentFailedException)<br />
{<br />
    return null;<br />
}<br />
[/sourcecode]</p>
<p>In this case, you can catch System.Exception but limit the impact with if statement (<a href="http://stackoverflow.com/questions/136035/catch-multiple-exceptions-at-once">http://stackoverflow.com/questions/136035/catch-multiple-exceptions-at-once</a>)</p>
<p>[sourcecode language="csharp"]<br />
catch (Exception ex)<br />
{<br />
    if (ex is AuthenticationException ||<br />
        ex is MultipleFailedLoginAttemptsException ||<br />
        ex is UserStatusException ||<br />
        ex is PaymentFailedException)<br />
        return null;</p>
<p>    throw;<br />
}<br />
[/sourcecode]</p>
<p>"is" statement is nice as the code reads like plain English.<br />
Make sure you "throw", rather than "throw ex", as it will generate a new exception with an empty call stack. "throw" simply throws the existing exception.</p>
