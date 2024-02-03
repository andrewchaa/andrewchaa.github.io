---
title: position: sticky
date: 2024-02-02
tags:
  - css
---

The `position: sticky` and `position: fixed` CSS properties are used to position an element, but they behave differently. 


`position: sticky`: A sticky element toggles between relative and fixed positioning, depending on the scroll position. It's positioned relative to the nearest scrolling ancestor (or the nearest block-level ancestor if no scrolling ancestor is found). A sticky element "sticks" to its position within its parent as you scroll past it, and it will only move with the scroll after reaching a certain position (defined by top, right, bottom, or left).


`position: fixed`: A fixed element is positioned relative to the viewport, which means it always stays in the same place even if the page is scrolled. The top, right, bottom, and left properties are used to position the element. A fixed element does not leave a gap in the page where it would normally have been located.


I’m building a Chat GPT like user interface where people can ask questions to LLMs. The page has two columns, one with conversation history and the other with questions and answers. I wanted to put chat prompt textbox always on top and started with `position: fixed`. Yet it didn’t work as soon as I added a column for conversations as it didn’t respect its parent element. `position: sticky` came as a rescue.


My CSS is like this


```css
.container {
	display: flex;
	justify-content: space-between;
	height: 100%;
}

.conversations {
	width: 20%;
	overflow-y: auto;
	border-right: 1px solid #ccc;
}

.chat {
	width: 80%;
	padding-left: 5rem;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 100vh;
}

.prompt {
	width: 100%;
	position: sticky;	
	bottom: 0;
	z-index: 1;
	textarea {
		height: 5rem;
	}	
}
```


