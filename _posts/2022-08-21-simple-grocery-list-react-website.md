---
title: Simple grocery list react website
date: 2022-08-21
tags:
  - react
  - typescript
---

The app will be based on 

- graphql

- typescript

- tailwind css

- jest

Create a typescript react website

```bash
npx create-react-app my-app --template typescript
```

Follow [the tailwindcss installation instruction for create-react-app](https://tailwindcss.com/docs/guides/create-react-app)

```bash
yarn add --dev tailwindcss postcss autoprefixer
yarn tailwindcss init -p
```

tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

index.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

