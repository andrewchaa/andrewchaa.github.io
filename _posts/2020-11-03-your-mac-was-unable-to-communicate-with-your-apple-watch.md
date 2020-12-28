---
title: Your Mac was unable to communicate with your Apple Watch
date: 2020-11-03T07:46:56
categories:
  - technical
classes: wide
---


Btw, to fix the issue, you have to

* Clean all Auto Unlock in your key chain
* Delete a couple of Auto Unlock files in the file system

The below is the tip from an answer from apple discussion [https://discussions.apple.com/thread/251826134](https://discussions.apple.com/thread/251826134)

> Steps \(follow at your own discretion\)
>
> 1. Open "Keychain Access"
> 2. In "View", enable "Show Invisible Items"
> 3. Search for "Auto Unlock"
> 4. You should see a whole bunch of application passwords for "Auto Unlock: XXXX's ..."
> 5. Select all records and delete \(this will reset/disable auto unlock on other Macs if you use multiple Macs\)
> 6. Whilst still in "Keychain Access", search for "AutoUnlock" \(no space\)
> 7. There should be 4 entries for "tlk" "tlk-nonsync" "classA" "classC"
> 8. Select 4 records and delete \(don't worry if they re-appear, the system repairs this automatically\)
> 9. Open "Finder" and navigate to "~/Library/Sharing/AutoUnlock"
> 10. There should be two files "ltk.plist" and "pairing-records.plist"
> 11. Delete both files
> 12. Open "System Preferences" and try enabling auto unlock. You may need to enable it twice, the first attempt will fail.

