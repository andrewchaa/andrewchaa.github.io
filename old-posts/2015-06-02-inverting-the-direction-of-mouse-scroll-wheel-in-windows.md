---
title: Inverting the direction of mouse scroll wheel in Windows
date: 2015-06-02 15:28:03.000000000 +01:00
categories:
- Programming
tags:
- mouse
meta:
  sharing_disabled: '1'
  _rest_api_published: '1'
  _rest_api_client_id: "-1"
  _publicize_job_id: '11263067794'
  _publicize_done_external: a:1:{s:7:"twitter";a:1:{i:1752093;s:56:"https://twitter.com/andrewchaa/status/605757789848207361";}}
  _publicize_done_2230353: '1'
  _wpas_done_1752093: '1'
  publicize_twitter_user: andrewchaa
---
<p>Why would you do that?</p>
<p>It's because since in Mac OS X Lion, they've reversed the wheel scroll direction. I've always reversed it back in system preference. Then I've upgraded it to Yosemite and didn't bother to change it. I just change myself to follow it. A few days later, the Mac mouse scroll wheel direction became natural to me.</p>
<p>Now I have a problem with my work PC, which is Windows Server 2012. Whenever I scroll the page with the mouse, the page goes in the opposite direction and it really annoys and confuses me.</p>
<p>So, now you need to reverse the mouse wheel scroll in windows. How can you do that?</p>
<p>You have to <a href="http://superuser.com/questions/310681/inverting-direction-of-mouse-scroll-wheel">edit a registry</a>, unfortunately, but there's a powershell script that does it for you. Of course, you shouldn't run any script you find on Internet in your admin elevated powershell shell. But I took the risk and did it. This is the script.</p>
<pre><code>Get-ItemProperty HKLM:\SYSTEM\CurrentControlSet\Enum\HID\*\*\Device` Parameters FlipFlopWheel -EA 0 | ForEach-Object { Set-ItemProperty $_.PSPath FlipFlopWheel 1 }</code></pre>
<p>Good luck and enjoy the inverted direction of the mouse scroll wheel.</p>
