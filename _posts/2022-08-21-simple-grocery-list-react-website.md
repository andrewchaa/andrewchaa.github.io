---
title: Simple grocery list react website
date: 2022-08-21
tags:
  - react
  - typescript
---

This is a simple project for my coding assignment. I want to do the following things for this app but will see how it goes. 

- [x] TypeScript

- [ ] GraphQL

- [ ] Tailwind CSS

- [ ] Jest

- [ ] Custom type in TypeScript

Using TypeScript was easy with react. Just use `create-react-app` and give TypeScript template, like the below.  I named the app client as the repository will have two directories, `server` and `client`. 

```bash
npx create-react-app client --template typescript
cd client
yarn start
```

The initial commit is to have a list page with canned data.

```typescript
export default function List(
  { items }: { items: { name: string, done: boolean }[] }
) {

  const toggleDone = (name: string) => {
    console.log('toggleDone', name);
  }

  return (
    <ul>
      {items.map((item) => (
        <li
          key={item.name}
          onClick={() => toggleDone(item.name)}
          style={{ textDecoration: item.done ? 'line-through' : 'none' }}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
}
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

