---
title: Adding facebook login to my own website
date: 2014-03-25 20:54:02.000000000 +00:00
categories:
- Programming
tags:
- facebook
- login
- OAuth
meta:
  _edit_last: '1907066'
  publicize_twitter_url: http://t.co/WVxdNzdItb
  publicize_twitter_user: andrewchaa
  _wpas_done_1752093: '1'
  _publicize_done_external: a:1:{s:7:"twitter";a:1:{i:111615627;b:1;}}
  _oembed_ef79b9fcadd51ca2b9a0c5dd0782cc9e: "{{unknown}}"
  _oembed_8b4b39d71684948bb22241bf9cc0e1f5: "{{unknown}}"
---
<p>The official document (<a href="https://developers.facebook.com/docs/facebook-login/login-flow-for-web">https://developers.facebook.com/docs/facebook-login/login-flow-for-web</a>) is the best tutorial. But when you follow it, there's a few things you have to take notice.</p>
<p>First, you need to get your app id, if you don't have it. You can create an app by visiting app dashboard (<a href="https://developers.facebook.com/apps/">https://developers.facebook.com/apps/</a>). Fill all the details but make sure you set it to "Website" by clicking "+ Add Platform"</p>
<p>Then, you will try your test code. Unfortunately, it will be likely to fail, as you didn't set "App Domains" for your website. If you are smart enough to set it at the first time, then no problem.</p>
<p><a href="http://simplelifeuk.files.wordpress.com/2014/03/facebook_error1.jpg"><img class="aligncenter size-full wp-image-1590" src="{{ site.baseurl }}/assets/facebook_error1.jpg" alt="facebook_error" width="590" height="276" /></a></p>
<p>&nbsp;</p>
<p>The error message is like the above. So, you have to set app domains. You can set your production domain like "yourdomain.com" but you would also need to test it on your local dev machine. For me, I use host file (C:\Windows\System32\drivers\etc\hosts)</p>
<p>[sourcecode language="bash"]</p>
<p>127.0.0.1    www.your_production_domain.local</p>
<p>[/sourcecode]</p>
<p>And add the test domain to your app settings in the app dashboard.</p>
<p>Then it's done. It should log you successfully. If it doesn't, please let me know.</p>
<p>&nbsp;</p>
