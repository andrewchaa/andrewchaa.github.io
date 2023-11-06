---
title: Using Sentry in React Native Expo application
date: 2022-09-17
tags:
  - sentry
  - expo
---

[Sentry](http://getsentry.com/) is a crash reporting platform. [Setting up Sentry for an Expo app](https://docs.expo.dev/guides/using-sentry/) is slight different than for a React Native one. 

### Installation

```bash
npx expo install sentry-expo
npx expo install expo-application expo-constants expo-device expo-updates @sentry/react-native
npx expo install @sentry/react-native
```

### **Initialisation**

Add the following to your app's main file such as `App.js`:

```javascript
import * as Sentry from 'sentry-expo';

Sentry.init({
  dsn: 'YOUR DSN HERE',
  enableInExpoDevelopment: true,
  debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
});
```

### Usage

Depending on which platform you are on (mobile or web), use the following methods to access any `@sentry/*` methods for instrumentation, performance, capturing exceptions and so on:

- For React Native, access any `@sentry/react-native` exports with `Sentry.Native.*`

- For web, access any `@sentry/browser` exports with `Sentry.Browser.*`

```plain text
// Access any @sentry/react-native exports via:
// Sentry.Native.*

// Access any @sentry/browser exports via:
// Sentry.Browser.*

// The following example uses `captureException()` from Sentry.Native.* to capture errors:
try {
  // your code
} catch (error) {
  Sentry.Native.captureException(error);
}
```

### **Configure a** **`postPublish`** **hook**

Add `expo.hooks` to your project's `app.json` (or `app.config.js`) file:

```plain text
{
  "expo": {
    // ... your existing configuration
    "hooks": {
      "postPublish": [
        {
          "file": "sentry-expo/upload-sourcemaps",
          "config": {
            "organization": "your sentry organization slug here",
            "project": "your sentry project name here",
            "authToken": "your auth token here"
          }
        }
      ]
    }
  }
}
```

### **Add the Config Plugin**

Add `expo.plugins` to your project's `app.json` (or `app.config.js`) file:

```plain text
{
  "expo": {
    // ... your existing configuration
    "plugins": ["sentry-expo"]
  }
}
```

