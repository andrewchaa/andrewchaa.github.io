---
title: "Stop Your Mac from Sleeping While Reading: Introducing `caffeinate`"
date: 2024-02-29
tags:
  - tools
  - bash
---
[]()
![image](./Pasted%20image%2020240229091105.png)

Ever been engrossed in a long read only to find your Mac screen suddenly locked? Frustrating, right? Worry not, fellow reader, for there's a simple solution using a built-in macOS tool called `caffeinate`.

### Preventing Sleep with `caffeinate`

Open your Terminal app and type the following command, replacing `3600` with the desired number of seconds you want your Mac to stay awake:

```
caffeinate -u -t 3600
```

This will prevent your Mac from entering sleep mode for one hour (3600 seconds).

### Keeping the Display On

If you also want to prevent the display from dimming or going to sleep, use the `-d` flag:

```
caffeinate -d -t 3600
```

Remember to adjust the `3600` value for your desired timeframe.

### What is `caffeinate`?

`caffeinate` is not a third-party application but a **native command-line utility** built into macOS. It allows you to temporarily disable sleep and screen dimming functionalities.

`caffeinate` creates "assertions" that modify your system's sleep behavior. By default, it considers factors like display sleep, system idle time, disk activity, and user inactivity. These assertions expire when the `caffeinate` command finishes running.

### Enjoy Uninterrupted Reading

So, the next time you're diving into a long read, use `caffeinate` to keep your Mac awake and your screen lit for as long as needed. Happy reading!
