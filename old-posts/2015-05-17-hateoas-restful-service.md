---
title: HATEOAS RESTful service
categories: [programming]
tags: [api, rest]
description: Sample placeholder post.
date: 2015-05-17 10:25:28.000000000 +01:00
---
<p>HATEOAS stands for Hypermedia as the Engine of Application State. It's a concept I encountered about 5 years ago, in an after work technical talk that was held in the old ThoughtWorks London office near Holborn.</p>
<p>HATEOAS is one of REST application architecture constraints that a client should interacts with a network application entirely through <a title="Hypermedia" href="http://en.wikipedia.org/wiki/Hypermedia">hypermedia</a> provided dynamically by application servers.</p>
<p>cf). REST has the following 4 constraints.</p>
<ul>
<li>Identification of Resource (typically by using a URI)</li>
<li>Manipulation of Resources through Representation</li>
<li>Self-descriptive message</li>
<li>Hypermedia as the engine of the Application STate</li>
</ul>
<p>This an example of HATEOAS-based response.</p>
<div class="highlight highlight-json">
<pre>{
    <span class="pl-s"><span class="pl-pds">"</span>name<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"Mad Max</span><span class="pl-pds">"</span></span>,
    <span class="pl-s"><span class="pl-pds">"</span>links<span class="pl-pds">"</span></span>: [ {
        <span class="pl-s"><span class="pl-pds">"</span>rel<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>self<span class="pl-pds">"</span></span>,
        <span class="pl-s"><span class="pl-pds">"</span>href<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>http://localhost:8080/customer/1<span class="pl-pds">"</span></span>
    } ]
}</pre>
</div>
<p>A REST client needs no prior knowledge about how to interact with any particular application or server beyond a generic understanding of hypermedia. By contrast, in a <a title="Service-oriented architecture" href="http://en.wikipedia.org/wiki/Service-oriented_architecture">service-oriented architecture</a> (SOA), clients and servers interact through a fixed <a title="Interface (computing)" href="http://en.wikipedia.org/wiki/Interface_(computing)">interface</a> shared through documentation or an <a title="Interface description language" href="http://en.wikipedia.org/wiki/Interface_description_language">interface description language</a>(IDL).</p>
<ul class="task-list">
<li><strong>rel</strong> means relationship. In this case, it's a self-referencing hyperlink.</li>
<li><strong>href</strong> is a complete URL that uniquely defines the resource.</li>
</ul>
<p>Although the example shown is in JSON, XML is also a standard response format. HATEOAS doesn't impose the requirement of either format. The hypermedia links are the focus.</p>
<p>Let's look at more complex relationships. (from <a href="https://github.com/SpringSource/spring-data-book">Spring Data Book</a>)</p>
<pre>{
    <span class="pl-s"><span class="pl-pds">"</span>content<span class="pl-pds">"</span></span>: [ {
        <span class="pl-s"><span class="pl-pds">"</span>price<span class="pl-pds">"</span></span>: <span class="pl-c1">499.00</span>,
        <span class="pl-s"><span class="pl-pds">"</span>description<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>Apple tablet device<span class="pl-pds">"</span></span>,
        <span class="pl-s"><span class="pl-pds">"</span>name<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>iPad<span class="pl-pds">"</span></span>,
        <span class="pl-s"><span class="pl-pds">"</span>links<span class="pl-pds">"</span></span>: [ {
            <span class="pl-s"><span class="pl-pds">"</span>rel<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>self<span class="pl-pds">"</span></span>,
            <span class="pl-s"><span class="pl-pds">"</span>href<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>http://localhost:8080/product/1<span class="pl-pds">"</span></span>
        } ],
        <span class="pl-s"><span class="pl-pds">"</span>attributes<span class="pl-pds">"</span></span>: {
            <span class="pl-s"><span class="pl-pds">"</span>connector<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>socket<span class="pl-pds">"</span></span>
        }
    }, {
        <span class="pl-s"><span class="pl-pds">"</span>price<span class="pl-pds">"</span></span>: <span class="pl-c1">49.00</span>,
        <span class="pl-s"><span class="pl-pds">"</span>description<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>Dock for iPhone/iPad<span class="pl-pds">"</span></span>,
        <span class="pl-s"><span class="pl-pds">"</span>name<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>Dock<span class="pl-pds">"</span></span>,
        <span class="pl-s"><span class="pl-pds">"</span>links<span class="pl-pds">"</span></span>: [ {
            <span class="pl-s"><span class="pl-pds">"</span>rel<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>self<span class="pl-pds">"</span></span>,
            <span class="pl-s"><span class="pl-pds">"</span>href<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>http://localhost:8080/product/3<span class="pl-pds">"</span></span>
        } ],
        <span class="pl-s"><span class="pl-pds">"</span>attributes<span class="pl-pds">"</span></span>: {
            <span class="pl-s"><span class="pl-pds">"</span>connector<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>plug<span class="pl-pds">"</span></span>
        }
    } ],
    <span class="pl-s"><span class="pl-pds">"</span>links<span class="pl-pds">"</span></span>: [ {
        <span class="pl-s"><span class="pl-pds">"</span>rel<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>product.search<span class="pl-pds">"</span></span>,
        <span class="pl-s"><span class="pl-pds">"</span>href<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>http://localhost:8080/product/search<span class="pl-pds">"</span></span>
    } ]
}
</pre>
<p><a href="http://martinfowler.com/articles/richardsonMaturityModel.html">Richardson Maturity Model</a> states that HATEOAS is Level 3, the final level of REST</p>
