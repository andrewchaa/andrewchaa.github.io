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
eas submit --platform ios
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


```shell
eas update --branch production --message "Test-updating the app"
```


## Errors


### `undefined is not a function` with `getRandomValues()`


```shell
TypeError: undefined is not a function
    at getRandomBase64 (address at /data/user/0/com.navienapp/files/.expo-internal/dd11be6f17c8cdcc4fc2cdcb541ac3fd:1:5840084)
    at getRandomValues (address at /data/user/0/com.navienapp/files/.expo-internal/dd11be6f17c8cdcc4fc2cdcb541ac3fd:1:5840386)
    at anonymous (address at /data/user/0/com.navienapp/files/.expo-internal/dd11be6f17c8cdcc4fc2cdcb541ac3fd:1:4949155)
    at anonymous (address at /data/user/0/com.navienapp/files/.expo-internal/dd11be6f17c8cdcc4fc2cdcb541ac3fd:1:4949207)
    at [Symbol.replace] (native)
    at replace (native)
    at uuid4 (address at /data/user/0/com.navienapp/files/.expo-internal/dd11be6f17c8cdcc4fc2cdcb541ac3fd:1:4949062)
    at captureException (address at /data/user/0/com.navienapp/files/.expo-internal/dd11be6f17c8cdcc4fc2cdcb541ac3fd:1:5020307)
    at anonymous (address at /data/user/0/com.navienapp/files/.expo-internal/dd11be6f17c8cdcc4fc2cdcb541ac3fd:1:5009819)
    at withScope (address at /data/user/0/com.navienapp/files/.expo-internal/dd11be6f17c8cdcc4fc2cdcb541ac3fd:1:5020158)
    at anonymous (address at /data/user/0/com.navienapp/files/.expo-internal/dd11be6f17c8cdcc4fc2cdcb541ac3fd:1:5009658)
    at reportFatalError (address at /data/user/0/com.navienapp/files/.expo-internal/dd11be6f17c8cdcc4fc2cdcb541ac3fd:1:162151)
    at __guard (address at /data/user/0/com.navienapp/files/.expo-internal/dd11be6f17c8cdcc4fc2cdcb541ac3fd:1:182465)
    at callFunctionReturnFlushedQueue (address at /data/user/0/com.navienapp/files/.expo-internal/dd11be6f17c8cdcc4fc2cdcb541ac3fd:1:18146
```


The error you're encountering in your React Native Expo app when generating UUIDs seems to be related to the `getRandomValues` function, which is a part of the Web Crypto API. The specific error message `TypeError: undefined is not a function` at `getRandomBase64` suggests that the function necessary for generating random values (used in UUID generation) is not available or not functioning as expected in the environment on the OnePlus 10 Pro NE2213 device.


**Understanding the Error**

1. **Crypto API Availability**: The Web Crypto API, which includes `getRandomValues`, is a standard in modern browsers and environments but might not be available or fully compatible in all JavaScript environments, especially in certain mobile contexts.
2. **Device-Specific Issue**: Since this issue is occurring on specific devices like the OnePlus 10 Pro NE2213, it could be due to the way the JavaScript environment or the React Native bridge is set up on those devices.

**Solution**


**Use a Polyfill**: If `getRandomValues` is not available, you can use a polyfill to provide an alternative implementation. This can ensure compatibility across different devices. For instance, you can use a library like `react-native-get-random-values`, which is a polyfill for the Web Crypto API in React Native.


```shell
npm install react-native-get-random-values
```


Then, import it at the top of your entry file (e.g., `index.js`):


```javascript
import 'react-native-get-random-values';
```


