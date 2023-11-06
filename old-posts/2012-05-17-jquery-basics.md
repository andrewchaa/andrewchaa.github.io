---
title: jQuery basics
date: 2012-05-17 15:55:30.000000000 +01:00
categories: []
tags:
- basics
- jquery
meta:
  _edit_last: '1907066'
  _wpas_done_linkedin: '1'
  publicize_results: a:1:{s:7:"twitter";a:1:{i:111615627;a:2:{s:7:"user_id";s:10:"andrewchaa";s:7:"post_id";s:18:"203151781004455936";}}}
  _wpas_done_twitter: '1'
  _oembed_d50aa93e0c657d68f9908e12cb3226ac: <div class="embed-vimeo"><iframe src="http://player.vimeo.com/video/18511621"
    width="640" height="352" frameborder="0" webkitAllowFullScreen mozallowfullscreen
    allowFullScreen></iframe></div>
  _oembed_597716efcee86a40b688cbb56e52a3e5: "{{unknown}}"
---
<p>This is the summary of "Fundamentals of Great jQuery Development", which is available at <a href="http://vimeo.com/18511621">http://vimeo.com/18511621</a>.</p>
<p>javascript is a functional language, not in a useful way, but because it treats function as its first-class citizen. It is also Object-oriented language, as it treats everything as object.</p>
<p><strong>function declaration</strong><br />
This is what people use most of the time.<br />
[sourcecode language="javascript"]<br />
function foo(p1) {<br />
    p1();<br />
}<br />
[/sourcecode]</p>
<p><strong>function expression</strong><br />
This doesn't have name and is anonymous.<br />
[sourcecode language="javascript"]<br />
foo(function () {});<br />
[/sourcecode]</p>
<p><strong>function expression with name</strong><br />
[sourcecode language="javascript"]<br />
foo(function f1(), &quot;test&quot; {});<br />
[/sourcecode]</p>
<p><strong>json literals</strong><br />
[sourcecode language="javascript"]<br />
var o = {<br />
    foo: 1,<br />
    bar: &quot;test&quot;,<br />
    alpha: {<br />
        damian: function () { }<br />
    }<br />
};</p>
<p>[/sourcecode]<br />
Here o is an object.</p>
<p><strong>constructor</strong><br />
"new" means you create a new object based on its protytype.<br />
If you mean a class, capitalise the first letter as convention.</p>
<p>[sourcecode language="javascript"]<br />
function Animal() {<br />
    this.breed = &quot;domestic tabby&quot;;<br />
    this.smellsLike = &quot;candy&quot;;<br />
}<br />
Animal.prototype = {<br />
    member1: function() { },<br />
    member2: &quot;&quot;<br />
};</p>
<p>var f = new Animal(); // create a new animal based on the prototype.<br />
f.member1<br />
var f = Animal(); // this makes breed and smellsLike global scope, possibly overriding other breed.<br />
[/sourcecode]</p>
<p><strong>Scope</strong><br />
In javascript, a variable's scope is function-level. A variable is accessible within a function, even though it is declared within a block</p>
<p>[sourcecode language="javascript"]<br />
function () {<br />
    var i = 0;<br />
    for (var j = 0; j &lt;= 10; j++) {<br />
        var x = 'test';<br />
    }<br />
    x = 20; //this x is visible outside of the for block<br />
}<br />
x = 20: // x is not visible outside of function<br />
[/sourcecode]</p>
<p>Global variable or function is bad, because you cannot guarantee that only your javascript would run in the browser. You have multiple javascript from 3rd party, grease-monkey plugins, ...</p>
<p>So, don't declare a function in the global scope. Instead, create anonymous function and immediately execute it.</p>
<p>[sourcecode language="javascript"]<br />
(function() {<br />
    var i = 'test'; //as long as you use 'var', it is safe.<br />
    this.alert('hi'); // this is global window</p>
<p>}())</p>
<p>//If you want to pass window object<br />
(function (w) {<br />
    var i = 'test';<br />
}(window))</p>
<p>[/sourcecode]</p>
<p><strong>this</strong></p>
<p>[sourcecode language="javascript"]<br />
function foo() {<br />
    this //this is an global object<br />
}</p>
<p>function Foo() {<br />
    this // not an global object, but this function.<br />
}<br />
var f = new Foo();</p>
<p>//this can be resued depending on the context.<br />
function foo() {<br />
    alert(this.hi); //In this case, this becomes the function, not global.<br />
}<br />
foo.call({ hi: 'test' });<br />
foo.call({ hi: 123 });<br />
[/sourcecode]</p>
<p><strong>Closure</strong><br />
A closure is a function that references a variable that isn't contained within its own immediate scope.</p>
<p>[sourcecode language="javascript"]<br />
// this variable is out of the scope;<br />
function foo() {<br />
    var myVar = 1;</p>
<p>    return function() {<br />
        return myVar.toString();<br />
    };<br />
}</p>
<p>var myFunc = foo();<br />
myFunc(); //This access myVar, which is outside of the function boundary. This looks trivial, but event handler takes advantage of closure.<br />
[/sourcecode]</p>
