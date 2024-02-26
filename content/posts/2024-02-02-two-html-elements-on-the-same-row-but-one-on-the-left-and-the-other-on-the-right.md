---
title: Two HTML elements on the same row but one on the left and the other on the right
date: 2024-02-02
tags:
  - css
---

I’m a full stack developer but honestly, I admit my CSS layout skill needs lots of improvement. And I’m improving it a lot recently because I’m designing a new page on my own!


Anyway today, I was building something similar to the following.


![Untitled.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/875308e8-8000-4329-b1aa-ffd95b33ba6e/feb3e03e-bb8f-410d-af4a-70260fc9012a/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240226T012416Z&X-Amz-Expires=3600&X-Amz-Signature=7a3f2db8975536c92c2dbab09de6bb5b4688ca54f4f9fc4d2dc222fc369fc9e0&X-Amz-SignedHeaders=host&x-id=GetObject)


So, on the same row, two HTML elements. One with icon and title and the other, just an icon.


How can I do that? `display: flex` and `justify-content: space-between` come handy


`display: flex`: This CSS property sets an element to use the Flexbox layout model, which allows you to layout, align, and distribute space among items within a container, even when their sizes are unknown or dynamic. The element becomes a flex container and its children become flex items.


`justify-content: space-between`: This aligns flex items along the horizontal line (in case of flex-direction: row, which is the default) of the current line of the flex container. The alignment is done after the lengths and auto margins are applied. The space-between value distributes items evenly, with the first item at the start and the last item at the end. If there are multiple items, the space between them will be the same.


So, the HTML code is like this


```javascript
<div style={{ display: 'flex', justifyContent: 'space-between' }}>
  <div><span className="fa fa-cloud"></span> Chat GPT</div>
  <div><span className="fa fa-pencil-square-o"></span></div>
</div>
```


