---
title: Git, Merging from Remote Branch
date: 2012-03-29 08:37:18.000000000 +01:00
categories: []
tags:
- git
- github
meta:
  _edit_last: '1907066'
  _wpas_done_linkedin: '1'
  publicize_results: a:1:{s:7:"twitter";a:1:{i:111615627;a:2:{s:7:"user_id";s:10:"andrewchaa";s:7:"post_id";s:18:"185284488253800448";}}}
  _wpas_done_twitter: '1'
---
<p>I did this on Bash on Windows 7 (64bit) against my github account.</p>
<p>I tried to push my change to github, and found it's not possible.</p>
<p>[sourcecode language="bash"]</p>
<p>$ git push -u origin master</p>
<p>[/sourcecode]</p>
<p>Enter passphrase for key ....:<br />
To git@github.com:andrewchaa/JonSkeetCSharp4Examples.git<br />
! [rejected] master -&gt; master (non-fast-forward)<br />
error: failed to push some refs to 'git@github.com:andrewchaa/JonSkeetCSharp4Examples.git<br />
To prevent you from losing history, non-fast-forward updates were rejected<br />
Merge the remote changes (e.g. 'git pull') before pushing again. See the<br />
'Note about fast-forwards' section of 'git push --help' for details.</p>
<p>So, I need to merge the change. I remembered I committed some code last night at home.</p>
<p>[sourcecode language="bash"]</p>
<p>$ git fetch origin</p>
<p>[/sourcecode]</p>
<p>Then</p>
<p>[sourcecode language="bash"]</p>
<p>$ git checkout --track -b originmaster origin/master<br />
[/sourcecode]</p>
<p>Branch originmaster set up to track remote branch master from origin. Switched to a new branch 'originmaster'</p>
<p>Now you check out your master branch (local)</p>
<p>[sourcecode language="bash"]</p>
<p>$ git checkout master<br />
[/sourcecode]</p>
<p>Switched to branch 'master'<br />
Your branch and 'origin/master' have diverged,<br />
and have 1 and 1 different commit(s) each, respectively.</p>
<p>And also checkout (get latest in TFS terms) originmaster</p>
<p>[sourcecode language="bash"]</p>
<p>$ git checkout originmaster<br />
[/sourcecode]</p>
<p>Switched to branch 'originmaster'</p>
<p>Now point to master back to start merge</p>
<p>[sourcecode language="bash"]</p>
<p>$ git checkout master<br />
[/sourcecode]</p>
<p>Switched to branch 'master'<br />
Your branch and 'origin/master' have diverged,<br />
and have 1 and 1 different commit(s) each, respectively.</p>
<p>In the mean time, I had to set up beyondcompare for git.</p>
<p>[sourcecode language="bash"]</p>
<p>$ git config --global diff.tool bc3</p>
<p>$ git config --global difftool.bc3.path &quot;C:/Program Files (x86)/Beyond Compare 3/bcomp.exe&quot;</p>
<p>$ git config --global merge.tool bc3</p>
<p>$ git config --global mergetool.bc3.path &quot;C:/Program Files (x86)/Beyond Compare 3/bcomp.exe&quot;<br />
[/sourcecode]</p>
<p>You can see on which branch you are</p>
<p>[sourcecode language="bash"]</p>
<p>$ git branch<br />
[/sourcecode]</p>
<p>* master</p>
<p>originmaster</p>
<p>Now, finally merge</p>
<p>[sourcecode language="bash"]</p>
<p>$ git merge originmaster<br />
[/sourcecode]</p>
<p>Merge made by recursive.</p>
<p>Examples/ArrayExample.cs | 41 ++++++++++++++++++++++++++++++++++++++++<br />
Examples/CollectionsExample.cs | 40 +++++++++++++++++++++++++++++++++++++++<br />
Examples/Examples.csproj | 2 +<br />
3 files changed, 83 insertions(+), 0 deletions(-)<br />
create mode 100644 Examples/ArrayExample.cs<br />
create mode 100644 Examples/CollectionsExample.cs</p>
<p>Then, it's done.</p>
<p>[sourcecode language="bash"]</p>
<p>$ git status<br />
[/sourcecode]</p>
<p># On branch master<br />
# Your branch is ahead of 'origin/master' by 2 commits.<br />
#<br />
nothing to commit (working directory clean)</p>
<p>Then, push back to githum</p>
<p>[sourcecode language="bash"]</p>
<p>$ git push -u origin master<br />
[/sourcecode]</p>
<p>Enter passphrase for key '.....':<br />
Counting objects: 12, done.<br />
Delta compression using up to 2 threads.<br />
Compressing objects: 100% (7/7), done.<br />
Writing objects: 100% (7/7), 1.31 KiB, done.<br />
Total 7 (delta 4), reused 0 (delta 0)<br />
To git@github.com:andrewchaa/JonSkeetCSharp4Examples.git<br />
cf1a6ea..59b280f master -&gt; master<br />
Branch master set up to track remote branch master from origin.</p>
<p>To summarise, I use the following commands</p>
<p>[sourcecode language="bash"]</p>
<p>$ git fetch origin<br />
$ git checkout --track -b originmaster origin/master<br />
$ git checkout master<br />
$ git checkout originmaster<br />
$ git checkout master<br />
$ git config --global diff.tool bc3<br />
$ git config --global difftool.bc3.path &quot;C:/Program Files (x86)/Beyond Compare 3/bcomp.exe&quot;<br />
$ git config --global merge.tool bc3<br />
$ git config --global mergetool.bc3.path &quot;C:/Program Files (x86)/Beyond Compare 3/bcomp.exe&quot;<br />
$ git branch<br />
$ git merge originmaster<br />
$ git status<br />
$ git push -u origin master</p>
<p>[/sourcecode]</p>
