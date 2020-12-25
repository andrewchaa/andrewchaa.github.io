---
title: Setting up ruby on rails on ubuntu
date: 2012-04-19 16:22:40.000000000 +01:00
type: post
published: true
status: publish
categories: []
tags:
- git
- nautilus open terminal
- rails
- rvm
- sublime text
meta:
  _edit_last: '1907066'
  _wpas_done_linkedin: '1'
  publicize_results: a:1:{s:7:"twitter";a:1:{i:111615627;a:2:{s:7:"user_id";s:10:"andrewchaa";s:7:"post_id";s:18:"193011745797832704";}}}
  _wpas_done_twitter: '1'
  _wp_old_slug: setting-up-ruby-on-rails-on-my-windows-7-work-machine
  _oembed_2a4dca2b3723e90000676c869661354c: "{{unknown}}"
  _oembed_2206cd8492529e9c6351a7350abb9400: "{{unknown}}"
author:
  login: simplelifeuk
  email: andrew.chaa@yahoo.co.uk
  display_name: Andy
  first_name: Andrew
  last_name: Chaa
---
<p>First of all, I am following on-line version of rails tutorial (<a href="http://ruby.railstutorial.org/ruby-on-rails-tutorial-book?version=3.2#top">http://ruby.railstutorial.org/ruby-on-rails-tutorial-book?version=3.2#top</a>). Michael recommends sublime text 2 as editor. I use textmate on my mac, but I wouldn't have the luxury of mac at work, so I am giving a try.</p>
<p>open a terminal here</p>
<p>Since I comes from windows background, I don't like navigating in terminal. This util will install a menu on nautilus file browser</p>
<p>[sourcecode language="bash"]<br />
$ sudo apt-get install nautilus-open-terminal<br />
[/sourcecode]</p>
<h3>sublime text</h3>
<p>You can download <a href="http://www.sublimetext.com/2">sublime text 2</a>. I did and it is now in download folder. Ah, I don't know how to install application ubuntu. Do I have to run setup file like windows or drag and drop to application folder like mac? <a href="http://www.sublimetext.com/forum/viewtopic.php?f=3&amp;p=7573">Sublime forum</a> says I can create an "apps" folder in /home/{user}/ and put it there. Luckily, the text seems to be a stand-alone files, so I copied the directory to /home/andrew/apps/.</p>
<h3>install Git</h3>
<p><a href="http://progit.org/book/ch1-4.html">The free chapter of Pro Git</a> is very helpful. I simply did</p>
<p>[sourcecode language="bash"]<br />
$ sudo apt-get install git-core<br />
[/sourcecode]</p>
<p><strong>Install Ruby</strong></p>
<p>I did $ruby -v, and it has ruby 1.9.1. It should be all right, but I want to use the latest available. Michael recommends <a href="http://www.mirceagoia.com/2011/11/ruby-on-rails-installation-ubuntu-linux-mint/">installing ruby by using RVM</a>, so I will go for it.</p>
<p>I will use "aptitude", following the instruction. To find out if you have "aptitude", you can do</p>
<p>[sourcecode language="bash"]<br />
$ sudo aptitude<br />
[/sourcecode]</p>
<p>If you get an error then, you need to install it by doing the below.</p>
<p>[sourcecode language="bash"]<br />
$ sudo apt-get update<br />
$ sudo apt-get upgrade<br />
$ sudo apt-get install aptitude<br />
[/sourcecode]</p>
<p>Let's install git core and curl</p>
<p>[sourcecode language="bash"]<br />
$ sudo aptitude install build-essential git-core curl<br />
[/sourcecode]</p>
<p>Then install RVM. This helps you manage multiple versions of ruby.</p>
<p>[sourcecode language="bash"]<br />
bash -s stable &lt; &lt;(curl -s https://raw.github.com/wayneeseguin/rvm/master/binscripts/rvm-installer )<br />
[/sourcecode]</p>
<p>This is a kind of weird command to me, a ubuntu beginner, but it seems to work. Once RVM is installed, you need to load it to terminal. By adding the following command, you can make it be loaded automatically each time you start bash shell.</p>
<p>[sourcecode language="bash"]<br />
$ echo '[[ -s &quot;$HOME/.rvm/scripts/rvm&quot; ]] &amp;&amp; source &quot;$HOME/.rvm/scripts/rvm&quot;' &gt;&gt; ~/.bashrc<br />
[/sourcecode]</p>
<p>Check if it is successfully installed. You may have to close your current terminal session and open again to load RVM. type</p>
<p>$ rvm notes</p>
<p>You should see the note if it is installed.</p>
<p>Now install several helpful ruby packages.</p>
<p>[sourcecode language="bash"]<br />
$ sudo aptitude install build-essential openssl libreadline6 libreadline6-dev zlib1g zlib1g-dev zlib libssl-dev libyaml-dev libsqlite3-0 libsqlite3-dev sqlite3 libxml2-dev libxslt-dev autoconf libc6-dev ncurses-dev automake libtool bison<br />
[/sourcecode]</p>
<p>Finally, you are ready to install ruby. So far, all packages were for ruby, not ruby.</p>
<p>[sourcecode language="bash"]<br />
$ rvm get head &amp;&amp; rvm reload<br />
$ rvm install 1.9.3<br />
[/sourcecode]</p>
<p><strong>Install Rails</strong></p>
<p>use gem to install rails. I had to use "sudo" due to permission issue on my ubuntu.</p>
<p>[sourcecode language="bash"]<br />
$ gem install rails -v 3.2.3<br />
$ sudo apt-get install libxslt-dev libxml2-dev libsqlite3-dev<br />
[/sourcecode]</p>
<p>Check the version by doing $ rails -v.</p>
<p>After I install rails in this way, I get an error saying "invalid gemspec invalid date format" It seems Ubuntu prefers installing rails through apt-get install gem</p>
<p>[sourcecode language="bash"]<br />
$ apt-get install gem<br />
[/sourcecode]</p>
<p>Please let me know if anything does not work in this post.</p>
<p>Afterward ...</p>
<h3>Errors</h3>
<p>It is quite frustrating that you go through quite a few errors. It makes me miss windows' simple msi installer!</p>
<p>"Could not find railties" error. For some reason, railties are not installed.</p>
<p>[sourcecode language="bash"]<br />
$ sudo gem install railties<br />
[/sourcecode]</p>
<p>"Gem::RemoteFetcher::FetchError: SSL_connect returned=1 errno=0 state=SSLv3 read server certificate B: certificate verify failed (https://bb-m.rubygems.org/gems/rack-1.4.1.gem)<br />
An error occured while installing rack (1.4.1), and Bundler cannot continue.<br />
Make sure that `gem install rack -v '1.4.1'` succeeds before bundling."</p>
<p>This one is self-explanatory, I think. Just install rack.</p>
<p>[sourcecode language="language="]<br />
$ sudo gem install rack -v 1.4.1<br />
[/sourcecode]</p>
<p>ruby version problem.<br />
I kept losing RVM whenever I start a new terminal session. Put this settings to your bash config</p>
<p>[sourcecode language="bash"]<br />
$ gedit .bashrc<br />
[/sourcecode]</p>
<p>Then put this at the end of the file.<br />
[[ -s "$HOME/.rvm/scripts/rvm" ]] &amp;&amp; . "$HOME/.rvm/scripts/rvm" # This loads RVM into a shell session.</p>
<p>Then RVM will be loaded automatically, and you will have the same version of ruby each time.</p>
<p><strong>not function. 'rvm use ...' will not work</strong><br />
If you run rvm use on ubuntu terminal, you get this message. It is because your bash shell is not login shell by default. Open the terminal settings and <a href="https://rvm.io//integration/gnome-terminal/">integrate rvm with gnome terminal</a>.</p>
