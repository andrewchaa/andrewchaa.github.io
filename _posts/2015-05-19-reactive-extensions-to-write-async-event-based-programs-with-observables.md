---
layout: post
title: Reactive Extensions, to write async, event-based programs with observables
date: 2015-05-19 17:16:01.000000000 +01:00
type: post
published: true
status: publish
categories:
- Programming
tags:
- Reactive Extensions
meta:
  sharing_disabled: '1'
  _rest_api_published: '1'
  _rest_api_client_id: "-1"
  publicize_twitter_user: andrewchaa
  publicize_twitter_url: http://t.co/XlqKwcchZv
  _wpas_done_1752093: '1'
  _publicize_done_external: a:1:{s:7:"twitter";a:1:{i:111615627;b:1;}}
author:
  login: simplelifeuk
  email: andrew.chaa@yahoo.co.uk
  display_name: Andy
  first_name: Andrew
  last_name: Chaa
---
<h4>Hello World in Reactive way</h4>
<p>Reactive Programming is "<a href="http://en.wikipedia.org/wiki/Reactive_programming">a programming paradigm oriented around data flows and the propagation of change</a>" (wikipedia)</p>
<p>With <a href="https://github.com/Reactive-Extensions/Rx.NET">Reactive Extensions (Rx)</a>, you can write asynchronous and event-based programs using observable sequences. Rx let you represent<em><strong> </strong></em>asynchronous data streams with <a href="http://msdn.microsoft.com/library/dd990377.aspx">Observables</a>, (push-based notifications) and query asynchronous data streams using <a href="http://msdn.microsoft.com/en-us/library/hh242983.aspx">LINQ</a>, Simply put "Rx = Observables + LINQ + Schedulers".</p>
<p>You can install <a href="https://www.nuget.org/packages/Rx-Main/">the package</a> via nuget.</p>
<pre>pm&gt; Install-Package Rx-Main</pre>
<p>Channel9 has a concise introduction video: <a href="http://channel9.msdn.com/Series/Rx-Workshop/Rx-Workshop-Introduction">Rx Workshop Introduction</a>. The simplest "Hello, World" can be done in this way.</p>
<pre>class Program
{
    static void Main(string[] args)
    {
        var streamOfChars = "Hello, World".ToObservable();
        streamOfChars.Subscribe(c =&gt; Console.WriteLine(c));
    }
}</pre>
<p>Another simple example is to enumerate from 1 to 10 and subscribe to it.</p>
<pre>IObservable&lt;int&gt; source = Observable.Range(1, 10);
IDisposable subscription = source.Subscribe(
   x =&gt; Console.WriteLine("OnNext: {0}", x),
   ex =&gt; Console.WriteLine("OnError: {0}", ex.Message),
   () =&gt; Console.WriteLine("OnCompleted"));

Console.WriteLine("Press ENTER to unsubscribe...");
Console.ReadLine();
subscription.Dispose();</pre>
<h4>Cold vs. Hot Observables</h4>
<p>Cold observables start running on subscription, that is, it starts pushing values to the observables when Subscribe is called. This doesn't fit in the real-world case, like stock tickers, which should be producing values even before a subscription is active. The observer that subscribes to a hot observable sequence, get the current value in the stream.</p>
<pre>Console.WriteLine("Current Time: " + DateTime.Now);
var source = Observable.Interval(TimeSpan.FromSeconds(1));
//creates a sequence

IConnectableObservable&lt;long&gt; hot = Observable.Publish&lt;long&gt;(source);  
// convert the sequence into a hot sequence

IDisposable subscription1 = hot.Subscribe(                        
    x =&gt; Console.WriteLine("Observer 1: OnNext: {0}", x),
    ex =&gt; Console.WriteLine("Observer 1: OnError: {0}", ex.Message),
    () =&gt; Console.WriteLine("Observer 1: OnCompleted"));
Console.WriteLine("Current Time after 1st subscription: " + DateTime.Now);
Thread.Sleep(3000);  //idle for 3 seconds
hot.Connect();       
// hot is connected to source and starts pushing value to subscribers 

Console.WriteLine("Current Time after Connect: " + DateTime.Now);
Thread.Sleep(3000);  //idle for 3 seconds
Console.WriteLine("Current Time just before 2nd subscription: " + DateTime.Now);

// value will immediately be pushed to 2nd subscription
IDisposable subscription2 = hot.Subscribe(     
    x =&gt; Console.WriteLine("Observer 2: OnNext: {0}", x),
    ex =&gt; Console.WriteLine("Observer 2: OnError: {0}", ex.Message),
    () =&gt; Console.WriteLine("Observer 2: OnCompleted"));
Console.ReadKey();</pre>
<p>An example from <a href="https://msdn.microsoft.com/en-us/library/hh242977(v=vs.103).aspx">MSDN</a>.</p>
