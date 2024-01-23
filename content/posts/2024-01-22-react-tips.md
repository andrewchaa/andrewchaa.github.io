---
title: React Tips
date: 2024-01-22
tags:
  - react
  - tips
---

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


