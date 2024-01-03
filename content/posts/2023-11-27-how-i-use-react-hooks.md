---
title: How I use React Hooks
date: 2023-11-27
tags:
  - react
  - react-hook
---

## `memo`


In React, when you update a state using a state setter function, it triggers a re-render of the component. This is the expected behavior as per React's design for state changes. However, in some cases, where you want to avoid unnecessary re-renders, you can use `memo`.


**Use** **`memo`**
Wrap your component with `memo` to get a memoized version of the component. This memoized version of the component will usually not be re-rendered when its parent component is re-rendered as long as its props have not changed. 


```typescript
import { memo } from 'react'

export default memo(
	Graph, 
	(prevProp, nextProp) => JSON.stringify(prevProp) === JSON.stringify(nextProp)
)
```


Sometimes, memoizing the component is not enough to skip rendering its content as the content changes internally but you don’t want to re-render the whole component. In this case, use `useMemo` your dataset.


```typescript
const graphData = useMemo(() => {
  const data = {
    nodes: nodes.map(x => ({...x})),
    links: links.map(x => ({...x})),
	}
	return data
}, [links, nodes])

return (
  <ForceGraph2D
    graphData={graphData}
  />
)
```


## `useCallback`


The `useCallback` hook in React is used to memoize callback functions. This hook returns a memoized version of the callback function that only changes if one of the dependencies has changed. This optimization helps to avoid unnecessary re-renders and can improve performance in certain situations.


**Syntax**: The `useCallback` hook takes two arguments. The first is the function you want to memoize, and the second is an array of dependencies. The hook returns the memoized function.


```javascript
const memoizedCallback = useCallback(
  () => {
    // Function logic here
  },
  [dependencies], // Array of dependencies
);

```


**Memoization**: Memoization is a programming technique where you save (cache) the results of expensive function calls and return the cached result when the same inputs occur again. In the context of `useCallback`, it memoizes the function itself rather than the result of the function.


**When to Use**: `useCallback` is useful when you have a component that is re-rendering frequently and you have a callback function that you don't want to be recreated every time the component renders. This is particularly important when passing callbacks to optimized child components that rely on reference equality to prevent unnecessary renders (like when using `React.memo` or `shouldComponentUpdate`).


**Example Use Case**:

- You have a parent component that renders a list.
- Each item in the list is a child component that receives a callback function from the parent.
- Without `useCallback`, the parent component would create a new instance of the callback function on every render, causing the child components to re-render unnecessarily because they would receive a "new" function prop each time.

**Performance Considerations**: While `useCallback` can help in optimizing performance, it's important to use it judiciously. Overusing it, especially when the dependencies change often or the computation cost of the callback is low, can lead to worse performance due to the overhead of maintaining the memoization cache.


**Relation to** **`useEffect`**: Like `useEffect`, the `useCallback` hook also relies on a dependency array to determine when to recompute the memoized function. If the dependencies haven't changed between renders, the same memoized function is returned, ensuring component subtree that relies on this function doesn’t re-render.


