---
title: Favour composition over inheritance
date: 2008-09-08 16:08:41.000000000 +01:00
categories: []
tags: []
meta:
  _edit_last: '1907066'
---
<p>I am reading Head First Design Pattern again and want to summarise a few things I need to remember. I forget things so easily.</p>
<p>The Strategy Pattern defines a family of algorithms, encapsulate each one, and makes them interchangeable. Strategy lets the algorithm vary independently from clients from using it.</p>
<p>Abstract class Duck has MallardDuck and RubberDuck.Duck has two behaviours, IQuackBehaviour and IFlyBehaviour. The two behaviours vary, depending on the type of duck. IQuackBehaviour has Quack, MuteQuack, and Squeak. IFlyBehaviour has FlyNoWay, FlyWithWings, and FlyRocketPowered.</p>
