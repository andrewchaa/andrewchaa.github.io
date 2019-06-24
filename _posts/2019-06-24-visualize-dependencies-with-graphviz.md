---
published: true
layout: post
title: Visualize your dependeicnes with graphviz
date: 2019-06-24T00:00:00.000Z
comments: true
categories: [tools]
tags: WILT, tools
meta: {}
author:
  display_name: Andy
  first_name: Andrew
  last_name: Chaa
---

[Graphviz](https://dreampuf.github.io/GraphvizOnline/) use simple markdown-like syntax to draw complex graphs. Initially I tried mermaid but it was more for flowchart, where things flow in one way. Graphviz was able to express complex web of objects much better.

```
digraph G {

  subgraph cluster_0 {
    style=filled;
    color=lightgrey;
    node [style=filled,color=white];
    a0 -> a1 -> a2 -> a3;
    label = "process #1";
  }

  subgraph cluster_1 {
    node [style=filled];
    b0 -> b1 -> b2 -> b3;
    label = "process #2";
    color=blue
  }
  start -> a0;
  start -> b0;
  a1 -> b3;
  b2 -> a3;
  a3 -> a0;
  a3 -> end;
  b3 -> end;

  start [shape=Mdiamond];
  end [shape=Msquare];
}
```

The above script generate this graph

![generated prath](/assets/images/graphviz.png)

### related resources

* dagre-d3: https://github.com/dagrejs/dagre-d3
* dagre.js: https://github.com/dagrejs
* online generator: http://viz-js.com/
* mermaid cli: https://github.com/mermaidjs/mermaid.cli
