---
title: Show and hide hidden files on mac
date: 2011-12-27 14:38:13.000000000 +00:00
categories: []
tags:
- lion
- mac
- mac os x
meta:
  _edit_last: '1907066'
  _wpas_done_linkedin: '1'
  publicize_results: a:1:{s:7:"twitter";a:1:{i:111615627;a:2:{s:7:"user_id";s:10:"andrewchaa";s:7:"post_id";s:18:"151673266338140160";}}}
  _wpas_done_twitter: '1'
  _wpas_skip_1752093: '1'
---
<p>This should be a simple matter, but it troubled me so much.</p>
<p>Simply, you need to the followings, but be warned that there are slight incorrect version of command on internet, at least which didnt' work for me on Lion.</p>
<p>On Mavericks<br />
[sourcecode language="bash"]<br />
defaults write com.apple.finder AppleShowAllFiles TRUE<br />
[/sourcecode]</p>
<p>On Mountain Lion<br />
[sourcecode language="bash"]<br />
defaults write com.apple.Finder AppleShowAllFiles TRUE<br />
[/sourcecode]</p>
<p>Then</p>
<p>[sourcecode language="bash"]<br />
killall Finder<br />
[/sourcecode]</p>
<p>But personally, I wouldn't want to see all hidden files in Finder. Rather, in bash, I can<br />
[sourcecode language="bash"]<br />
ls -al</p>
<p>drwxr-xr-x+ 56 andrewchaa  staff   1904 25 Oct 03:41 .<br />
drwxr-xr-x   6 root        admin    204 23 Oct 00:48 ..<br />
-rw-------   1 andrewchaa  staff      3 26 Oct  2011 .CFUserTextEncoding<br />
-rw-r--r--@  1 andrewchaa  staff  39940 25 Oct 03:32 .DS_Store<br />
drwx------   2 andrewchaa  staff     68 24 Oct 22:45 .Trash<br />
...<br />
[/sourcecode]</p>
