---
title: Automatically scrolling div element to the bottom
date: 2023-09-27
tags:
  - react
---

To automatically scroll a `<div />` element to the bottom when new content is added in React, you can use a combination of React refs and the `useEffect` hook.

### Using Functional Component with `useEffect`:

```javascript
import React, { useRef, useEffect } from 'react';

const ScrollableDiv = ({ content }) => {
  const divRef = useRef(null);

  useEffect(() => {
    const div = divRef.current;
    div.scrollTop = div.scrollHeight;
  }, [content]);  // Only run the effect when `content` changes

  return (
    <div ref={divRef} style={{ height: '300px', overflowY: 'scroll' }}>
      {content}
    </div>
  );
}
```

In the examples above:

- A React ref (`divRef`) is created to directly interact with the DOM element.

- When the component updates (new content is added), we set the `scrollTop` of the `<div />` to its `scrollHeight`. This action scrolls the `<div />` to the bottom.

- The `<div />` is styled with a fixed height and `overflowY: 'scroll'` to make it scrollable.

To use this component, just pass the content as a prop:

```javascript
<ScrollableDiv content={yourContent} />
```

Remember, the effect will run whenever the `content` prop changes, thus scrolling the div to the bottom. Adjust as needed based on your application's requirements.

