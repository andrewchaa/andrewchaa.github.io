---
title: Moving blog engine to Hugo
date: 2020-12-12T10:10:46
categories:
  - technical
tags:
  - golang
---


I used brew to [install hugo](https://gohugo.io/getting-started/quick-start/).

```bash
brew install hugo
```

Creating a new site is a breeze.

```bash
hugo new site hugo-blog
```

Then add a theme using git sub-module

```bash
cd hugo-blog
git init
git submodule add https://github.com/budparr/gohugo-theme-ananke.git themes/ananke
```

Don't forget to add the theme to the site configuration.

```bash
echo 'theme = "ananke"' >> config.toml
```

Add a new post. 

```bash
hugo new posts/hello-world.md
```

You will see that a file is generated with front-matter.

```text
---
title: "Hello World"
date: 2020-11-15T19:45:09Z
draft: true
---
```

Now, start the Hugo server.

```bash
hugo server -D                                                                             master ✚ ◼
Start building sites … 

                   | EN  
-------------------+-----
  Pages            |  7  
  Paginator pages  |  0  
  Non-page files   |  1  
  Static files     |  6  
  Processed images |  0  
  Aliases          |  0  
  Sitemaps         |  1  
  Cleaned          |  0  

Built in 10 ms
Watching for changes in /Users/andrewchaa/dev/hugo-blog/{archetypes,content,data,layouts,static,themes}
Watching for config changes in /Users/andrewchaa/dev/hugo-blog/config.toml
Environment: "development"
Serving pages from memory
Running in Fast Render Mode. For full rebuilds on change: hugo server --disableFastRender
Web Server is available at http://localhost:1313/ (bind address 127.0.0.1)
Press Ctrl+C to stop

```



