---
title: How I use React Hooks
date: 2023-11-27
tags:
  - react
  - react-hook
---

## `memo`


In React, when you update a state using a state setter function (like `setSelectedNode` in your case), it triggers a re-render of the component. This is the expected behavior as per React's design for state changes. However, in some cases, where you want to avoid unnecessary re-renders, you can use `memo`.


**Use** **`React.memo`** **:**
Wrap your component with `React.memo`. This allows you to control the re-rendering behavior based on specific props or state changes.


	```javascript
	const ForceGraphMemoized = React.memo(ForceGraphComponent, (prevProps, nextProps) 
		=> {
	  // Return true if you want to prevent render, false if you want to allow render
	  return prevProps.someProp === nextProps.someProp;
	});
	```


	```typescript
	import { memo } from 'react'
	
	export default memo(
		Graph, 
		(prevProp, nextProp) => JSON.stringify(prevProp) === JSON.stringify(nextProp)
	)
	```


