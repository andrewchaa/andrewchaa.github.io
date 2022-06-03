---
title: Customise VS Code JavaScript Formatter
date: 2022-03-05T15:13:00.000Z
tags:
  - vs code
---

VS Code formatting can help you write your javascript in a consistent format. 

I recently started not adding semi-colon (;) at the end of the line, as javascript works ok without it and it make the code cleaner. Yet each time I format the document with my shortcut (`shft + cmd + p` and choose format document), the semi-colons were added back. I wasn’t happy.

How can I change this behaviour? I checked the settings (`cmd + ,`)to find out what formatter it uses. It was using prettier.

```javascript
"[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
```

Ok, then I need to install prettier and configure prettier settings.

```javascript
yarn add --dev prettier
```

Then I created a file, `.prettierrc`

```javascript
{
  "arrowParens": "avoid",
  "bracketSpacing": false,
  "useTabs": false,
  "jsxBracketSameLine": true,
  "semi": false,
  "singleQuote": true,
  "trailingComma": "all",
  "tabWidth": 2
}
```

Now VS javascript code formatter uses this setting. I do `shft + cmd + p` and format document. It removes all trailing semi-colons!

