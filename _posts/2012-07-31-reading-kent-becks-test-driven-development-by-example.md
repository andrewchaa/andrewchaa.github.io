---
title: Reading Kent Beck's "Test-Driven Development By Example"
date: 2012-07-31 15:53:51.000000000 +01:00
type: post
published: true
status: publish
categories:
- Programming
tags:
- Kent Beck
- TDD
meta:
  _edit_last: '1907066'
  tagazine-media: a:7:{s:7:"primary";s:0:"";s:6:"images";a:0:{}s:6:"videos";a:0:{}s:11:"image_count";i:0;s:6:"author";s:7:"1907066";s:7:"blog_id";s:7:"1833431";s:9:"mod_stamp";s:19:"2012-07-31
    17:01:51";}
  _wpas_skip_twitter: '1'
  _wpas_skip_linkedin: '1'
  _oembed_7412f5051eb3269f37ae5b2b7e248939: "{{unknown}}"
  _oembed_386945b1485452fac715e9a77c882f48: "{{unknown}}"
  _oembed_c671a74a2429ef30b3157a9b497839e3: "{{unknown}}"
author:
  login: simplelifeuk
  email: andrew.chaa@yahoo.co.uk
  display_name: Andy
  first_name: Andrew
  last_name: Chaa
---
<p>This is my third time read. When I read it first time, I didn't know much of TDD and wanted to grasp its concept. Now, it's been several years since I learned and practised TDD. TDD is the part of development culture and mandatory pactices. I am thrilled what this book can give me this time. I hope I would catch everything I missed years ago.</p>
<h3>"Clean code that works"</h3>
<p>This is the goal of Test-Driven Development (TDD). He suggests two very short but practical ways (as usual) to achieve it.</p>
<ul>
<li>Write new code only if an automated test has failed</li>
<li>Eliminate duplication</li>
</ul>
<p>"Test infested" means you learn TDD and find your programming changed for good. This is true. Since I learned TDD, I made it a habit to write small and manageable chunk of code and test it, even when I am not writing any unit test. I love the idea of "baby step" and actually apply it to everywhere possible in my life, even when I do any DIY.</p>
<p>Another thing I like about this book is it is an easy read. It is pleasant to read not because it is simple, but he writes as if he talks to a friend next him. I don't like manual-style book that tries to cram knowledge in an ordered list where context is lost. Kent Beck gives plenty of context each time.</p>
<h3>dollar class</h3>
<p>The first test in the first chapter is this.</p>
<p>[sourcecode language="csharp"]<br />
[TestFixture]<br />
public class TestMultiplication<br />
{<br />
	[Test]<br />
	public void Test_Multiplication()<br />
	{<br />
		var five = new Dollar(5);<br />
		five.Times(2);</p>
<p>		Assert.AreEqual(10, five.Amount);<br />
	}<br />
}</p>
<p>[/sourcecode]</p>
<p>Surprisingly (actually, you wouldn't be surprised if you are good at DDD), he makes a class of "Dollar". Dollar is a domain class here. If I write code, usually I would go for "Currency" class, making it more generic. But "Dollar" makes more sense, as it is a domain class. It also has nice Times method and Amount property and it makes the code easier to understand. Business or product people would also use terms like dollar, not currency. </p>
<h3>Coding in java</h3>
<p>The code example in this book is written in Java. Most of time, I use C# and javascript and C# and java are not very different from each other, so it is not a problem for me to convert the example to C#. But, maybe it's better to practice coding java. I can re-learn java (I worked hard on Java at Uni, though didn't have chance to use it commercially) and TDD. It'll be fun to have a break from a language I use everyday at work. </p>
<p>I know JetBrains make good tools. I use two of their products everyday, ReSharper and TeamCity, so I <a href="http://www.jetbrains.com/idea/">downloaded IntelliJ IDEA</a> (community edition). Also, I use IntelliJ Resharper mapping, so it wouldn't be difficult to use it.</p>
<p>.. a few days later </p>
<p>I managed to run the first test in java and junit. Thank God! So, all the examples from now would be in java. This is <a href="http://andrewchaa.me.uk/2012/08/07/programming-in-java-after-10-years-of-break/">my recounter</a> with java after 10 years of breakup.</p>
<h3>TDD Cycle</h3>
<ol>
<li>Write a test</li>
<li>Make it compile</li>
<li>Run it to see that it fails</li>
<li>Make it run</li>
<li>Remove duplication</li>
</ol>
<p>Regarding  4. Make it run, you can use two methods.</p>
<ul>
<li>Fake It - Return a constant and gradually replace constants with variables until you have the real code</li>
<li>Use Obvious Implementation - Type in the real implementation</li>
</ul>
<p>This is his regular rhythm of TDD. Fake it with constants if you are not sure. If you are relatively confident, just do the obvious implementation. In fact, I benefited from "Fake It" a lot. Quite often, when I fake it, I discover a kind of pattern in the code and then can replace with variables or methods.</p>
<h3>Value object</h3>
<p>Value objects refers to a value, like 5 dollar. Once the value is set, it shouldn't change. So passing the value into constructor makes sense.</p>
<ul>
<li>value is set from constructor</li>
<li>all operations return a new object </li>
<li>should implement equals()</li>
</ul>
<p>[sourcecode language="java"]<br />
public class Dollar {<br />
    public int amount;</p>
<p>    public Dollar(int amount) {<br />
        this.amount = amount;<br />
    }</p>
<p>    public Dollar times(int multiplier) {<br />
        return new Dollar(amount * multiplier);<br />
    }</p>
<p>    public boolean equals(Object object) {</p>
<p>        Dollar dollar =  (Dollar)object;<br />
        return amount == dollar.amount;<br />
    }<br />
}</p>
<p>[/sourcecode]</p>
<h3>Triangulation</h3>
<p>Generalise the code when we have two examples or more, ignoring the duplication between test and model code. "If the second example demands a more general solution, then and only then do we generalise."</p>
<p>[sourcecode language="java"]<br />
    @Test<br />
    public void testEquality() {<br />
        assertTrue(new Dollar(5).equals(new Dollar(5)));<br />
        assertFalse(new Dollar(6).equals(new Dollar(5)));<br />
    }</p>
<p>[/sourcecode]</p>
<h3>Test refactorings</h3>
<p>Quite often, Kent didn't plan it but when he refactored the tests and simplified them, it became easier to reuse them. He cleaned up Dollar tests and now he creates Franc mulitiplication tests and it is much easier.</p>
<p>[sourcecode language="java"]<br />
// old test<br />
@Test<br />
public void testMultiplication() {<br />
	Dollar five = new Dollar(5);<br />
	Dollar product = five.times(2);</p>
<p>	assertEquals(10, product.amount);</p>
<p>	product = five.times(3);<br />
	assertEquals(15), product.amount);<br />
}</p>
<p>//simplified test<br />
@Test<br />
public void testMultiplication() {<br />
	Dollar five = new Dollar(5);</p>
<p>	assertEquals(new Dollar(10), five.times(2));<br />
	assertEquals(new Dollar(15), five.times(3));<br />
}</p>
<p>// new franc test based on the simplified ones.<br />
@Test<br />
public void testFrancMultiplication() {<br />
	Franc five = new Franc(5);</p>
<p>	assertEquals(new Franc(10), five.times(2));<br />
	assertEquals(new Franc(15), five.times(3));<br />
}</p>
<p>[/sourcecode]</p>
<p>So, refactoring test is as important as cleaning up model code.</p>
<h3>Domain-centered code</h3>
<p>Here is a test that compares Franc to Dollar.</p>
<p>[sourcecode language="java"]</p>
<p>@Test<br />
public void testEquality() {<br />
    assertTrue(new Dollar(5).equals(new Dollar(5)));<br />
    assertFalse(new Dollar(6).equals(new Dollar(5)));</p>
<p>    assertTrue(new Franc(5).equals(new Franc(5)));<br />
    assertFalse(new Franc(6).equals(new Franc(5)));</p>
<p>    assertFalse(new Franc(6).equals(new Dollar(6)));</p>
<p>}</p>
<p>[/sourcecode]</p>
<p>The test fails, as we just compare the amount. It things Franc(6) is the same with Dollar(6), which is obviously wrong. The simplest thing to fix it is to check the class type like this.</p>
<p>[sourcecode language="java"]<br />
public boolean equals(Object object) {</p>
<p>	Money money =  (Money)object;<br />
	return amount == money.amount &amp;&amp; getClass().equals(money.getClass());<br />
}</p>
<p>[/sourcecode]</p>
<p>This works, but not elegant. Why? It's because we would like to use <strong>"a criterion that makes sense in the domain of finance, not in the domain of Java objects"</strong> (bold by me, not by the author of the book)</p>
<h3>Use factory method to hide class in test code</h3>
<p>By hiding a class in the test code, you have more flexibility to do anything with that class. You can avoid referencing a concrete class by using a factory method.</p>
<p>[sourcecode language="java"]</p>
<p>// before<br />
@Test<br />
public void testEquality() {<br />
    assertTrue(new Dollar(5).equals(new Dollar(5)));<br />
    assertFalse(new Dollar(6).equals(new Dollar(5)));</p>
<p>    assertTrue(new Franc(5).equals(new Franc(5)));<br />
    assertFalse(new Franc(6).equals(new Franc(5)));</p>
<p>    assertFalse(new Franc(6).equals(new Dollar(6)));</p>
<p>}</p>
<p>// after<br />
    @Test<br />
    public void testEquality() {<br />
        assertTrue(Money.dollar(5).equals(Money.dollar(5)));<br />
        assertFalse(Money.dollar(6).equals(Money.dollar(5)));</p>
<p>        assertTrue(Money.franc(5).equals(Money.franc(5)));<br />
        assertFalse(Money.franc(6).equals(Money.franc(5)));</p>
<p>        assertFalse(Money.franc(6).equals(Money.dollar(6)));</p>
<p>    }</p>
<p>[/sourcecode]</p>
<h3>Start from concrete classes and abstract them over time</h3>
<p>"Start small and simple" is a maxim you often hear in life, and Kent begins with simple classes like Dollar and Franc. He doesn't try to design Money class from the beginning. They have different state (like rate and currency), though share the same behaviour (times). Over a period of time, he abstract them into one Money class. The resulting class looks like the perfect "Money" class to me, I mean, you can subtract any from it any more. It doesn't have anything unnecessary. During the process, he employs a few techniques like Factory method. This is inspirational to me. How often, I struggle with big idea up front, and coding a complex class is a painful process, as you have to go at lengths without tests. Often, the class turns out to have more things stuffed than it requires.</p>
<p>Gradually removing duplication in written code over time guided and verified by tests is much simpler and more pleasant than trying to implement a class that handles different states and behaviour, constantly analysing in your head.</p>
<p>"confidence-giving tests and carefully factored code give us preparation for insight, and preparation for applying that insight when it comes"</p>
<h3>The last responsible moment in code</h3>
<blockquote><p>
Concurrent software development means starting development when only partial requirements are known and developing in short iterations that provide the feedback that causes the system to emerge. Concurrent development makes it possible to delay commitment until the last responsible moment, that is, the moment at which failing to make a decision eliminates an important alternative. If commitments are delayed beyond the last responsible moment, then decisions are made by default, which is generally not a good approach to making decisions.
</p></blockquote>
<p> from <a href="http://www.amazon.co.uk/Lean-Software-Development-Agile-Toolkit/dp/0321150783/ref=sr_1_1?ie=UTF8&amp;qid=1346167214&amp;sr=8-1">Lean Software Development</a></p>
<p>You can make a better decision by delaying the decision. This is now well known practice in agile world. In my opinion, Kent does a similar thing in his code. The code never does calculation until it is absolutely necessary. Let's have a look at the example of "reduce", which is a method that converts an amount to the amount of the target currency.</p>
<p>This is the test code. </p>
<p>[sourcecode language="java"]<br />
@Test<br />
public void testMixedAddition() {<br />
	Money fiveBucks = Money.dollar(5);<br />
	Money tenFrancs = Money.franc(10);</p>
<p>	Bank bank = new Bank();<br />
	bank.addRate(&quot;CHF&quot;, &quot;USD&quot;, 2);</p>
<p>	Money result = bank.reduce(fiveBucks.plus(tenFrancs), &quot;USD&quot;);</p>
<p>	assertEquals(Money.dollar(10), result);</p>
<p>}<br />
[/sourcecode]</p>
<p>fiveBucks.plus(tenFrancs) should be Money.dollar(10). Usually, I expect "plus" method will do the magic, or job. But it doesn't. Look at the method body.</p>
<p>[sourcecode language="java"]<br />
public Expression plus(Money addend) {<br />
	return new Sum(this, addend);<br />
}<br />
[/sourcecode]</p>
<p>It just passes the parameters over into "Sum" object. The constructor of the "Sum" only stored those values.</p>
<p>[sourcecode language="java"]<br />
public class Sum implements Expression{<br />
    Money augend;<br />
    Money addend;</p>
<p>    public Sum(Money augend, Money addend) {<br />
        this.augend = augend;<br />
        this.addend = addend;<br />
    }<br />
    ....</p>
<p>[/sourcecode]</p>
<p>Then later, only when "reduce" is called, it actually process the amounts of the currencies and return the value in the target currency.</p>
<p>[sourcecode language="java"]<br />
public class Sum implements Expression{<br />
    ....</p>
<p>    public Money reduce(Bank bank, String to) {<br />
        int amount = augend.reduce(bank, to).amount + addend.reduce(bank, to).amount;<br />
        return new Money(amount, to);<br />
    }<br />
}<br />
[/sourcecode]</p>
<p>So, by delaying the actual calculation, relevant objects store state. It just stores the currencies and amount of the "from" and "to" money. The state never changes, so you can do other operations easily. Those objects are immutable. In Kent's code, most of the objects are immutable entity. The entity object has methods that emits value, upon request. This is a learning for me. When I design an object, I often hastily change the status, by performing the operation in the method. If I wrote the above code, probably, I would have performed the sum in Money object, returning Money.dollar(10). But it is more useful to have Sum object, as it knows about from and to currencies and amount. </p>
<h3>Domain objects in money example</h3>
<ul>
<li><strong>Bank</strong>: add exchange rates and return a rate of a conversion. "reduce" delegates its real operation to other objects like Money. </li>
<li><strong>Money</strong>: </li>
<li></li>
<li></li>
<li></li>
<li></li>
</ul>
