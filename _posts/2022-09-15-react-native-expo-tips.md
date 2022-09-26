---
title: React Native Expo Tips
date: 2022-09-15
tags:
  - expo
  - react native
---

## Tips I use

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

