---
title: a few things I learned in 3 hour python hacking
date: 2013-04-23 15:42:46.000000000 +01:00
categories:
- Programming
tags:
- python
meta:
  _edit_last: '1907066'
  publicize_reach: a:2:{s:7:"twitter";a:1:{i:1752093;i:167;}s:2:"wp";a:1:{i:0;i:7;}}
  publicize_twitter_user: andrewchaa
  _wpas_done_1752093: '1'
  _publicize_done_external: a:1:{s:7:"twitter";a:1:{i:111615627;b:1;}}
  tagazine-media: a:7:{s:7:"primary";s:0:"";s:6:"images";a:0:{}s:6:"videos";a:0:{}s:11:"image_count";i:0;s:6:"author";s:7:"1907066";s:7:"blog_id";s:7:"1833431";s:9:"mod_stamp";s:19:"2013-04-23
    15:42:46";}
---
<p>I don't usually use python. My daily language is C#, so it was a nice, refreshing time to code in python.</p>
<p>A couple of weeks ago, I wrote a small plug in with <a href="http://www.linkedin.com/pub/emily-skitek/7/ab1/ab3">Emily</a>, that checks the disk free space in servers where rabbit-mq is installed. We had failing tests because rabbit-mq mal-functioned due to the storage shortage. Writing in python was a very nice experience and I learned several pythony things, the way python deals with problem. We finished coding and proudly deployed the plug-in, thinking it's done now. You know the fulfilling emotion when you deploy your stuff.</p>
<p>After a day or two, Richard came back saying Watchdog, our service monitoring tool, crashed, because there was a moment those network drives were not available and it crashed the plugin, and the crashed plugin actually stopped the website. Again, developers were only good at happy paths in testing.</p>
<p>The fix was simple. I just added "try ... except". Also added a couple of unit tests to test the scenario when the network drive is not available. But again, I learned several things doing it. Nothing deep, but just a list of surprises a python newbie had during the hack.</p>
<h3>Module and class are two different things.</h3>
<p>A module is a <a href="http://docs.python.org/2/tutorial/modules.html">"a file containing Python definitions and statements"</a>. In my unittest, in order to use a class, I had to reference module and then the class name, like poll_services.ServiceChecker()</p>
<p>[sourcecode language="python"]<br />
import sys<br />
sys.path.append('.\sentinels')<br />
import poll_services<br />
import unittest</p>
<p>class TestDiskFreeSpace(unittest.TestCase):<br />
    ''' test disk free space features '''</p>
<p>    def test_when_the_network_drive_is_available(self):<br />
        sc = poll_services.ServiceChecker()<br />
        diskSpace = sc.get_free_disk_space_in_gb('localhost', 'C$')</p>
<p>        self.assertTrue(diskSpace &gt; 0)<br />
[/sourcecode]</p>
<h3><a href="http://stackoverflow.com/questions/4383571/importing-files-from-different-folder-in-python">Importing files from different folder</a> isn't supported out of the box</h3>
<p>I used sys.path.append('.\sentinels'). It's a shame that I can't reference it more gracefully.</p>
<h3>Unit-test runs itself</h3>
<p>.NET, you have a test-runner like NUnit. with python, unittest is a included package, so you have run tests in the test module.</p>
<p>[sourcecode language="python"]<br />
if __name__ == '__main__':<br />
    unittest.main()<br />
[/sourcecode]</p>
<h3>Don't pass self to a method</h3>
<p>I have a method "def get_free_disk_space_in_gb(self, machine, drive):" but when you call the method you do like "self.get_free_disk_space_in_gb(machine, rabbit_drive)". I keep forgetting that I don't pass self. It's like C#'s extension method.</p>
<p>Private methods has __ prefix in the method name. Initially, I thought it's just a convention and presummed that I can access those methods in my unit tests. It turned out that methods with __ translate self to the calling class. So, it ended up doing something like "TestDiskFreeSpace.__get_free_disk_space_in_gb(...)" and it errored that the module doesn't have that attribute. It was interesting. I made the method public for test's sake for now.</p>
<h3>Clearing all keys in redis</h3>
<p>You can do "flushdb" or "flushall" for all databases. Handy commands.</p>
<p>It can go on, but should be enough for now.</p>
