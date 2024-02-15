---
title: React Tips
date: 2024-01-22
tags:
  - react
  - tips
---

### Append the new data to the existing state


Use function in `set` state


```typescript
useEffect(() => {
  if (graphData) {
    setNodes(prevNodes => [...prevNodes, ...graphData.nodes]);
    setLinks(graphData.links);
  }
}, [graphData]);
```


## Conditionally join class names


Use `classnames`: [https://github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)


```javascript
classNames('foo', 'bar'); // => 'foo bar'
classNames('foo', { bar: true }); // => 'foo bar'
classNames({ 'foo-bar': true }); // => 'foo-bar'
classNames({ 'foo-bar': false }); // => ''
classNames({ foo: true }, { bar: true }); // => 'foo bar'
classNames({ foo: true, bar: true }); // => 'foo bar'
```


