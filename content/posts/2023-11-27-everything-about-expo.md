---
title: Everything about Expo
date: 2023-11-27
tags:
  - expo
  - react native
---

## Resources

- [EAS Get started](https://docs.expo.dev/eas-update/getting-started/)
- [EAS Update tutorial](https://www.youtube.com/watch?v=HYh3UqxYzpA)
- [Github Actions](https://docs.expo.dev/eas-update/github-actions/)

## EAS Build


Install the latest EAS CLI


```shell
npm install -g eas-cli
```


Log in to Expo account


```shell
eas login
```


If you haven’t configured the project, do it


```shell
eas build:configure
```


Run a build


```shell
eas build --platform ios
```


Once the build is complete, submit the build to the App Store


```shell
eas submit -p ios
```


## EAS Update


Install `expo-updates`


```shell
npx expo install expo-updates
```


Add the plugin to `app.json`


```json
"plugins": [
  [
    "expo-updates",
    {
      "username": "deepeyes"
    }
  ]
],
```


Import `expo-updates` in `App.tsx` and check the update


```typescript
import * as Updates from 'expo-updates'

const onFetchUpdate = async () => {
  const { isAvailable } = await Updates.checkForUpdateAsync()
  if (isAvailable) {
    await Updates.fetchUpdateAsync()
    await Updates.reloadAsync()
  }
}

useEffect(() => {
  onFetchUpdate()
}, [])
```


Log in to Expo account


```shell
eas login
eas update:configure

💡 The following process will configure your project to use EAS Update. These changes only apply to your local project files and you can safely revert them at any time.
✔ Configured updates.url to "https://u.expo.dev/..."
✔ Configured runtimeVersion for Android and iOS with "{"policy":"sdkVersion"}"

All builds of your app going forward will be eligible to receive updates published with EAS Update.

✔ Configured eas.json.

🎉 Your app is configured to use EAS Update!
```


Publish an update


