---
title: display currently running application pools with appcmd list wp
date: 2013-04-08 14:25:08.000000000 +01:00
categories:
- Programming
tags:
- appcmd
- IIS
meta:
  _edit_last: '1907066'
  publicize_reach: a:2:{s:7:"twitter";a:1:{i:1752093;i:166;}s:2:"wp";a:1:{i:0;i:7;}}
  _publicize_done_external: a:1:{s:7:"twitter";a:1:{i:111615627;b:1;}}
  tagazine-media: a:7:{s:7:"primary";s:64:"http://simplelifeuk.files.wordpress.com/2013/04/vsprocesses1.jpg";s:6:"images";a:1:{s:64:"http://simplelifeuk.files.wordpress.com/2013/04/vsprocesses1.jpg";a:6:{s:8:"file_url";s:64:"http://simplelifeuk.files.wordpress.com/2013/04/vsprocesses1.jpg";s:5:"width";i:870;s:6:"height";i:586;s:4:"type";s:5:"image";s:4:"area";i:509820;s:9:"file_path";b:0;}}s:6:"videos";a:0:{}s:11:"image_count";i:1;s:6:"author";s:7:"1907066";s:7:"blog_id";s:7:"1833431";s:9:"mod_stamp";s:19:"2013-04-08
    14:25:08";}
  publicize_twitter_user: andrewchaa
  _wpas_done_1752093: '1'
---
<p>When you try to debug your website locally, often Visual Studio shows more than one w3p.exe processes, if you run multiple application pools. Attaching to all of them is a bit annoying.</p>
<p><a href="http://simplelifeuk.files.wordpress.com/2013/04/vsprocesses1.jpg"><img class="aligncenter size-full wp-image-1507" alt="vsprocesses" src="{{ site.baseurl }}/assets/vsprocesses1.jpg" width="640" height="431" /></a></p>
<p>In this case, this command comes handy.</p>
<p>[sourcecode language="bash"]<br />
appcmd list wp<br />
[/sourcecode]</p>
