---
title: My CSS Notes
date: 2023-09-25
tags:
  - css
---

### grid template columns


The CSS property [grid-template-columns](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns) is used within the CSS Grid Layout, which is a powerful two-dimensional layout system designed to handle both rows and columns.


**`grid-template-columns`** defines the columns of a grid container and specifies the widths of the columns.


Here are some basics of how to use it:


**Fixed-Size Columns**:


You can set each column to a fixed size.


```css
.grid-container {
    display: grid;
    grid-template-columns: 100px 200px 300px;
}
```


This will create a grid with three columns where the first column is 100 pixels wide, the second is 200 pixels, and the third is 300 pixels.


**Fractional Units**:


You can use the **`fr`** unit, which represents a fraction of the available space.


```css
cssCopy code
.grid-container {
    display: grid;
    grid-template-columns: 1fr 2fr;
}


```


In this example, the grid has two columns. The first column will occupy 1/3 (or 33.33%) of the space, and the second column will occupy 2/3 (or 66.66%).


**Repeat Function**:


If you want to create multiple columns of the same size, you can use the **`repeat()`** function.


This will create a grid with three columns, each occupying an equal portion of the space.


```css
.grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
}
```


**Auto-fill and Auto-fit**:


You can create as many columns as can fit in the container using **`auto-fill`** or **`auto-fit`**.


```css
.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
}
```


This will create columns with a minimum width of 100 pixels and as many columns as can fit inside the container.


**Using Different Units**:


You can use different units like **`px`**, **`%`**, **`em`**, etc., within the same grid.


```css
.grid-container {
    display: grid;
    grid-template-columns: 15% 1fr 200px;
}
```


**Grid Lines**


The lines separating the columns (and rows) in a grid are referred to as grid lines. They start at 1 from the left (for LTR languages) and can be used for positioning grid items.


**Responsive Grids**:


You can also combine **`grid-template-columns`** with media queries to create responsive grid layouts that adjust based on viewport sizes.


The **`grid-template-columns`** property provides a powerful way to control the layout of items in a grid container. With practice, you can create complex layouts with ease using this property.


