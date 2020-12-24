---
layout: post
title: git cherry-pick
date: 2015-05-19 09:34:34.000000000 +01:00
type: post
published: true
status: publish
categories:
- Programming
tags:
- git
meta:
  sharing_disabled: '1'
  _rest_api_published: '1'
  _rest_api_client_id: "-1"
  publicize_twitter_user: andrewchaa
  publicize_twitter_url: http://t.co/GgMKGLLQWy
  _wpas_done_1752093: '1'
  _publicize_done_external: a:1:{s:7:"twitter";a:1:{i:111615627;b:1;}}
author:
  login: simplelifeuk
  email: andrew.chaa@yahoo.co.uk
  display_name: Andy
  first_name: Andrew
  last_name: Chaa
---
<p>Git commit's id is a hash of its contents and its history, and becomes a unique id for a specific commit. Even if it contains the same change, as the parent would be different, it'll have a different id.</p>
<p>"git cherry-pick" takes a commit from somewhere else, and "play it back" where you are right now. Git will build a new commit with a different hash, as the parents are different, though the contents are the same. One thing to note is that git hash is branch agnostic. in Git, an branch is simply "a lightweight movable pointer to one of these commits" (from <a href="https://git-scm.com/book/no-nb/v1/Git-Branching-What-a-Branch-Is">git branching</a>)</p>
<p>The other day, I rebuilt a release branch for release (of course!). I had to fix one issue, so committed the fix to the release branch. I made a few other changes and revoked the change, as they were not really necessary. Now I wanted to cheery-pick the commit for the fix.</p>
<p>I did git log.</p>
<pre>C:\Users\andrew.chaa\Documents\Projects\PopOpen [release]&gt; git log
commit 36bfde24c821f36f84c6ec88c796ae6edac17286
Author: andrewchaa &lt;&gt;
Date: Wed May 13 15:45:34 2015 +0100
the version is updated to 0.8.6

commit 8c803f203a03b9bd11faca7a754e0f1f4c8ab1b3
Author: andrewchaa &lt;&gt;
Date: Tue May 5 11:23:34 2015 +0100
Added Logging. No more fixed time looping. Use MainWindowTitle and check if the found window has the same fil</pre>
<p>I know the commit hash, 8c803f203a03b9bd11faca7a754e0f1f4c8ab1b3.</p>
<pre>git checkout master
git cherry-pick 8c803f203a03b9bd11faca7a754e0f1f4c8ab1b3</pre>
<p>Then the change is on top of the last commit on the master branch. I can push the change to the server.</p>
