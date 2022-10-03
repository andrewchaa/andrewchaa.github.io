---
title: React Native Expo Tips
date: 2022-09-15
tags:
  - expo
  - react native
---

There are tips and tricks I use for React Native Development.

### Reactotron

[Reactotron](https://github.com/infinitered/reactotron) is a desktop app for inspecting your React JS and React Native projects

- [Debugging and Beyond with Reactotron](https://www.youtube.com/watch?v=UiPo9A9k7xc)

### Storing `string` data in Async Storage

[**Async Storage**](https://react-native-async-storage.github.io/async-storage/docs/usage) can only store `string` data, so in order to store object data you need to serialize it first. For data that can be serialized to JSON you can use `JSON.stringify()` when saving the data and `JSON.parse()` when loading the data.

```javascript
const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('@storage_Key', jsonValue)
  } catch (e) {
    // saving error
  }
}

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@storage_Key')
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    // error reading value
  }
}
```

### Upload an image from file system

`expo-file-system` provides [access to a file system](https://docs.expo.dev/versions/latest/sdk/filesystem/#filesystemuploadasyncurl-fileuri-options) stored locally on the device.

```typescript
import { uploadAsync } from 'expo-file-system'

export default async function uploadToS3(photo: Photo) {
  const signedUrlResponse = await apis.getSignedUrl(photo.shortFilename)

  if (signedUrlResponse.status === 201) {
    try {
      await uploadAsync(
        signedUrlResponse.data.signedUrl,
        photo.filename,
        {
          httpMethod: 'PUT',
        }
      )
    } catch(error) {
      console.log(error)
    }
  }
}
```

### Install package

Use `npx expo install <:package>`

```bash
npm expo install @sentry/react-native
```

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

