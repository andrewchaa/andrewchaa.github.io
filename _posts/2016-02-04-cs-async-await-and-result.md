---
title: C#'s async, await, and .Result
date: 2016-02-04 18:46:38.000000000 +00:00
type: post
published: true
status: publish
categories:
- Programming
tags:
- c#
meta:
  _rest_api_published: '1'
  _rest_api_client_id: "-1"
  _publicize_job_id: '19466530511'
  _publicize_done_external: a:1:{s:7:"twitter";a:1:{i:1752093;s:56:"https://twitter.com/andrewchaa/status/695317559403487232";}}
  _publicize_done_2230353: '1'
  _wpas_done_1752093: '1'
  publicize_twitter_user: andrewchaa
author:
  login: simplelifeuk
  email: andrew.chaa@yahoo.co.uk
  display_name: Andy
  first_name: Andrew
  last_name: Chaa
---
<p>In Market Invoice, there are many places where async and await are used. Recently, I introduced a bug that an operation gets deadlocked by replacing await with .Result. I was bitten hard :-)</p>
<h3>Non-blocking execution</h3>
<p>When using async and await, C# run time generates a state machine in the background</p>
<p>[sourcecode language="csharp"]<br />
public async Task CallingMethodAsync()<br />
{<br />
    Task&lt;int&gt; longRunningTask = LongRunningOperationAsync(); // 1)<br />
    // independent work which doesn't need the result of LongRunningOperationAsync can be done here</p>
<p>    //and now we call await on the task<br />
    int result = await longRunningTask; // 2)</p>
<p>    //use the result<br />
    Console.WriteLine(result);<br />
}</p>
<p>public async Task&lt;int&gt; LongRunningOperationAsync()<br />
{<br />
    await Task.Delay(1000); //1 seconds delay<br />
    return 1;<br />
}<br />
[/sourcecode]</p>
<p>1) LongRunningOperationAsync is running. But it doesn't block the execution of CallingMethodAsync, until the execution point reaches 2)</p>
<p>Now the execution point reached 2). If LongRunningOperationAsync() is fully done, the result will be ready, and it will be assigned to result straight away. However, if LongRunningOperationAsync() is still running, the execution of CallingMethodAsync will stop there, waiting until LongRunningOperationAsync() finishes. Once it finishes, CallingMethodAsync will resume the execution.</p>
<h3>Call-back without its hell</h3>
<p>Let's look at <a href="https://msdn.microsoft.com/en-us/magazine/hh456401.aspx">Eric's Serve Breakfast example</a>.</p>
<p>[sourcecode language="csharp"]<br />
void ServeBreakfast(Customer diner)<br />
{<br />
    var order = ObtainOrder(diner);<br />
    var ingredients = ObtainIngredients(order);<br />
    var recipe = ObtainRecipe(order);<br />
    var meal = recipe.Prepare(ingredients);<br />
    diner.Give(meal);<br />
}<br />
[/sourcecode]</p>
<p>In this example, every customer must wait until the previous customer's breakfast is fully prepared and served. You can see people would get angry very soon.</p>
<p>In order to receive orders while preparing for breakfast, you have to take orders in an asynchronous manner. It will bring it javascript' call-back hell.</p>
<p>[sourcecode language="csharp"]<br />
void ServeBreakfast(Diner diner)<br />
{<br />
  ObtainOrderAsync(diner, order =&gt;<br />
  {<br />
    ObtainIngredientsAsync(order, ingredients =&gt;<br />
    {<br />
      ObtainRecipeAsync(order, recipe =&gt;<br />
      {<br />
        recipe.PrepareAsync(ingredients, meal =&gt;<br />
        {<br />
          diner.Give(meal);<br />
        })})})});<br />
}<br />
[/sourcecode]</p>
<p>The code is not very readable. Computers may like it, but humans are not good at following up the callbacks.</p>
<p>This can be rewritten in the new style, reads much more nicely.</p>
<p>[sourcecode language="csharp"]<br />
async void ServeBreakfast(Diner diner)<br />
{<br />
  var order = await ObtainOrderAsync(diner);<br />
  var ingredients = await ObtainIngredientsAsync(order);<br />
  var recipe = await ObtainRecipeAsync(order);<br />
  var meal = await recipe.PrepareAsync(ingredients);<br />
  diner.Give(meal);<br />
}<br />
[/sourcecode]</p>
<p>Now, the methods, ObtainOrderAsync() doesn't return order. It returns Task&lt;Order&gt;. It's a callback pointer. When the execution finishes, it return the result, and order is passed into ObtainIngredientsAsync()</p>
<h3>await or .Result</h3>
<p><a href="http://blog.stephencleary.com/">Stephen Cleary</a> recommends using await over Result.</p>
<p>First, await doesn't wrap the exception in an <a href="https://msdn.microsoft.com/en-us/library/system.aggregateexception(v=vs.110).aspx">AggregateException</a>, which represents one or more errors that occur during application execution. So, you will see the real exception, not the bland AggregateException. .Result wrap an exceptions that happens in the async method into AggregateException.</p>
<p>[sourcecode language="csharp"]<br />
try {<br />
    details = await _service.GetDetails(personId);<br />
    ...<br />
} catch (ApplicationException) { // this catch will work, as await pass the exception as it is.<br />
    ...<br />
}<br />
[/sourcecode]</p>
<p>For <strong>.Result</strong>, you have to catch AggregateException.</p>
<p>Second, Result / Wait <a href="http://blog.stephencleary.com/2012/07/dont-block-on-async-code.html">can cause deadlocks</a>. The async method will continue to run, and the task will be returned to it. When the task comes back, and if it's not completed yet, it will hang in the current context.</p>
<p>[sourcecode language="csharp"]<br />
public class CompanyDetailsController : ApiController<br />
{<br />
    public string Get()<br />
    {<br />
       var task = GetCompanyDetails(...);<br />
       return task.Result.ToString(); // if task hasn't been completed, this will block the thread.<br />
    }<br />
}</p>
<p>public static async Task&lt;CompanyDetails&gt; GetCompanyDetails(Uri uri)<br />
{<br />
    using (var client = new HttpClient())<br />
    {<br />
        var jsonString = await client.GetStringAsync(uri);<br />
        return CompanyDetails.Parse(jsonString);<br />
    }<br />
}<br />
[/sourcecode]</p>
<h3>Preventing the deadlock</h3>
<p><strong>ConfigureAwait</strong></p>
<p>[sourcecode language="csharp"]<br />
await Task.Delay(1000).ConfigureAwait(<br />
    continueOnCapturedContext: false);<br />
  // Code here runs without the original context. (if the original context is UI thread, then UI thread context)<br />
[/sourcecode]</p>
<p>By using ConfigureAwait, you enable parallelism that the asynchrounous code can run in parallel with the thread the original context is in. As a result, you can avoid the deadlock</p>
<h4>avoid Result / Wait</h4>
<p>As Result causes deadlocks, don't use it. Instead, favour await and use async on the method all they down or up.</p>
<p>&nbsp;</p>
<h3>Resources</h3>
<ul>
<li><a href="http://stackoverflow.com/questions/14455293/how-to-and-when-use-async-and-await">http://stackoverflow.com/questions/14455293/how-to-and-when-use-async-and-await</a></li>
<li><a href="https://msdn.microsoft.com/en-us/magazine/hh456401.aspx">https://msdn.microsoft.com/en-us/magazine/hh456401.aspx</a></li>
</ul>
<p>&nbsp;</p>
