---
title: Sending errors in a roll up digest email with log4net
date: 2013-01-07 12:39:08.000000000 +00:00
type: post
published: true
status: publish
categories:
- Programming
tags:
- log4net
meta:
  _edit_last: '1907066'
  publicize_reach: a:2:{s:7:"twitter";a:1:{i:1752093;i:158;}s:2:"wp";a:1:{i:0;i:7;}}
  tagazine-media: a:7:{s:7:"primary";s:0:"";s:6:"images";a:0:{}s:6:"videos";a:0:{}s:11:"image_count";i:0;s:6:"author";s:7:"1907066";s:7:"blog_id";s:7:"1833431";s:9:"mod_stamp";s:19:"2013-01-07
    12:39:08";}
  publicize_twitter_user: andrewchaa
  _wpas_done_1752093: '1'
  _publicize_done_external: a:1:{s:7:"twitter";a:1:{i:111615627;b:1;}}
  _oembed_1c01ee08dff283a033243403ab9c1ef7: "{{unknown}}"
author:
  login: simplelifeuk
  email: andrew.chaa@yahoo.co.uk
  display_name: Andy
  first_name: Andrew
  last_name: Chaa
---
<p>On production, there are many alerts in a short period. It's nice to get error emails, but you would want to avoid receiving hundreds of emails in a few minutes, when something fails. Also, people get used to alert emails and later nobody would care about the blizzard of emails. </p>
<p>So what we want are</p>
<ol>
<li>Roll up notifications of faults occurring in a short period into a summary email</li>
<li>But the first fault should be emailed straight away</li>
<li>The thresholds are two. First, it waits for certain number of faults. Second, though the buffer is not full, after a certain period of time, the logger sends all the faults in the buffer. Practically, it will wait for 5 minutes. Even within 5 minutes, if the nubmer of faults exceeds 100, then the batch will be sent.</li>
<li>Include contextual events. We also want to see 10 preceding events before the error to understand the context of the fault.</li>
</ol>
<p>We will use <a href="http://logging.apache.org/log4net/">log4net</a>, a superb logging framework that handles the most of the features we want, just out of box.</p>
<p>Let me go straight to the code.</p>
<p>[sourcecode language="csharp"]<br />
public class SmtpCachingAppender : SmtpAppender<br />
{<br />
    private bool _timedFlush;<br />
    System.Threading.Timer _timer;<br />
    private string _originalSubject;<br />
    private readonly IList&lt;LoggingEvent&gt; _thresholdEvents;<br />
    private readonly List&lt;LoggingEvent&gt; _allEvents;</p>
<p>    public SmtpCachingAppender()<br />
    {<br />
        FlushCount = 20;<br />
        FlushInterval = new TimeSpan(0, 5, 0);<br />
        _thresholdEvents = new List&lt;LoggingEvent&gt;();<br />
        _allEvents = new List&lt;LoggingEvent&gt;();<br />
    }</p>
<p>    public TimeSpan FlushInterval { get; set; }<br />
    public int FlushCount { get; set; }</p>
<p>    /// &lt;summary&gt;<br />
    /// Create a timer that fires to force flushing cached log events<br />
    /// via SMTP at a specified interval.<br />
    /// &lt;/summary&gt;<br />
    public override void ActivateOptions()<br />
    {<br />
        if (FlushInterval &gt; TimeSpan.Zero)<br />
            _timer = new System.Threading.Timer(OnTimer, null, FlushInterval, FlushInterval); </p>
<p>        base.ActivateOptions();<br />
    }</p>
<p>    protected override void SendBuffer(LoggingEvent[] events)<br />
    {<br />
        _thresholdEvents.Add(events.Last());<br />
        _allEvents.AddRange(events);</p>
<p>        bool isFirstError = _thresholdEvents.Count == 1;<br />
        if (isFirstError)<br />
            Send(_allEvents);</p>
<p>        bool isBatchReady = ((FlushCount != 0) &amp;&amp; (_thresholdEvents.Count &gt;= FlushCount)) || _timedFlush;<br />
        if (isBatchReady)<br />
        {<br />
            Send(_allEvents);<br />
            ResetCacheBuffer();<br />
        }<br />
    }</p>
<p>    private void Send(IEnumerable&lt;LoggingEvent&gt; events)<br />
    {<br />
        _originalSubject = Subject;</p>
<p>        PrepareSubject();<br />
        base.SendBuffer(events.ToArray());</p>
<p>        Subject = _originalSubject;<br />
    }</p>
<p>    private void ResetCacheBuffer()<br />
    {<br />
        _thresholdEvents.Clear();<br />
        _allEvents.Clear();<br />
        _timedFlush = false;<br />
    }</p>
<p>    private void PrepareSubject()<br />
    {</p>
<p>        var matches = Regex.Matches(Subject, @&quot;%property{(\w+)}&quot;);<br />
        foreach (Match match in matches)<br />
        {<br />
            if (!_thresholdEvents[0].Properties.Contains(match.Groups[1].Value))<br />
                continue;</p>
<p>            Subject = Subject.Replace(match.Value, _thresholdEvents[0].Properties[match.Groups[1].Value].ToString());<br />
        }</p>
<p>        if (_thresholdEvents.Count &gt; 1)<br />
        {<br />
            Subject = &quot;SUMMARY &quot; + Subject + &quot; - &quot; + _thresholdEvents.Count + &quot; errors&quot;;<br />
        }<br />
    }</p>
<p>    private void OnTimer(Object stateInfo)<br />
    {<br />
        _timedFlush = true;<br />
        Flush(true);<br />
    }</p>
<p>}</p>
<p>[/sourcecode]</p>
<p>SmtpCachingAppender inherits SmtpAppender. SmtpAppender already has feature for contextual events. So we can benefit from it.</p>
<p>When the logger logs any event, SendBuffer(LoggingEvent[] events) is called. why is the parameter events collection? It's because of "buffersize" setting. if "buffersize" is set to 0, only 1 event is passed. If it is 10, 10 events are passed, and the last event is the threshold event (in this case, it will be error) and all previous events are contextual ones.</p>
<p>There are two lists, _thresholdEvents and _allEvents. _allEvents will have all events including all previous events even though they are not ERROR event (there would be some DEBUG, INFO, WARN, ...). The batch will only consider the number threshold events, so we need a separate list, _thresholdEvents.</p>
<p>When either of the two conditions are met, we call base.SendBuffer(...), FlushInterval is done or the number of threshold events exceed the specified FlushCount. </p>
<p>The setup for this appender is like this.</p>
<p>[sourcecode language="xml"]<br />
  &lt;appender name=&quot;RollUpErrorEmail&quot; type=&quot;SmtpCachingAppender&quot;&gt;<br />
    &lt;to value=&quot;operation@andrewchaa.me.uk&quot; /&gt;<br />
    &lt;from value=&quot;backend@yourreader.net&quot; /&gt;<br />
    &lt;subject value=&quot;Your Service ERROR (local from homemachine)&quot; /&gt;<br />
    &lt;smtpHost value=&quot;SMTP-HOST&quot; /&gt;<br />
    &lt;bufferSize value=&quot;10&quot; /&gt;<br />
    &lt;lossy value=&quot;true&quot; /&gt;<br />
    &lt;FlushInterval value=&quot;00:05:00&quot; /&gt;<br />
    &lt;FlushCount value=&quot;100&quot; /&gt;</p>
<p>    &lt;evaluator type=&quot;log4net.Core.LevelEvaluator&quot;&gt;<br />
      &lt;threshold value=&quot;ERROR&quot;/&gt;<br />
    &lt;/evaluator&gt;</p>
<p>    &lt;layout type=&quot;log4net.Layout.PatternLayout&quot;&gt;<br />
      &lt;conversionPattern value=&quot;%utcdate [%thread] %-5level %logger user=%property{user} - %message%n&quot; /&gt;<br />
    &lt;/layout&gt;<br />
  &lt;/appender&gt;</p>
<p>[/sourcecode]</p>
<p>The usage of each configuration values are</p>
<ul>
<li>bufferSize: the number events you want to see, including the contextual ones</li>
<li>lossy: true. If lossy is false, every 10 event (by the buffersize) will be logged. so if you want to see the threshold event at the end of the list, lossy should be false. Then it ignore any non-threshold events but include only 9 preceding events from ERROR event</li>
<li>threshold: set the event type. it can be DEBUG, WARN, INFO, ERROR, ...</li>
<li>FlushInterval: it is currently set to 5 minutes</li>
<li>FlushCount: currently set to 100. if the number of faults becomes 100, the email will be sent.</li>
</ul>
<p>There was <a href="http://mail-archives.apache.org/mod_mbox/logging-log4net-user/200805.mbox/%3C6D3CA9B0BEA31640B4E6338360C84740023C49C1%40entdc1ms02.corp.gomez.com%3E">a sample code for cachingsmtpappender</a>. I added the first email bit and also changed it a little bit. Hope this helps anyone interested.</p>
