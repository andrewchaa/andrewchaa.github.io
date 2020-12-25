---
title: PolicyConfig encountered an error when you build on VS 2008
date: 2008-10-23 15:29:59.000000000 +01:00
categories: []
tags: []
meta:
  _edit_last: '1907066'
---
<p>I spent about 15 mins to figure this out and gave up. I asked a bat man (not the cool dark knight, but bat man for our scrum team). It was simply because UserAdmin.dll.config was read-only.</p>
<p>I created a new business project and added to TFS. Unfortunately, TFS added bin and obj folder which had dlls and dll.configs. I just removed those folders from TFS and now the error message disappeared.</p>
<p>I moved to TFS from SourceSafe about 4 months ago, and still find TFS is a bit error-prone. Maybe I am too used to SourceSafe. Well. I had used it for nearly 8 years.</p>
<p>Hope this helps. When I had the error "PolicyConfig ..., " I googled it but found no helpful articile. It may be too dumb mistake and people don't bother to post their experience.</p>
