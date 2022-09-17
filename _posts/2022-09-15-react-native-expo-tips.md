---
title: React Native Expo Tips
date: 2022-09-15
tags:
  - expo
  - react native
---

Tips I use

### To use an image from the local project folder

Use `require`

```javascript
<Avatar
  source={require('../../assets/images/navien-logo-new-w.png')}
  width={{ base: 20, md: 40 }}
```

### Expo

`shft + i` on terminal: you can select simulator iPhone version

`npx expo start --ios` to run the app on the simulator. 

