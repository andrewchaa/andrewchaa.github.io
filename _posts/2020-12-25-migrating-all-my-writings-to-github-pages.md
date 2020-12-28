---
title: Migrating all my writings to Github pages
date: 2020-12-25T10:37:00
categories:
  - technical
tags:
  - jekyll
---


### Installations

* Ruby
* Gem
* Bundler

#### Installing / Updating ruby

from [https://jekyllrb.com/docs/installation/macos/](https://jekyllrb.com/docs/installation/macos/) 

```bash
brew upgrade ruby
```

For some reason, it didn't succeed. I had to run a couple of more commands. It complained that `homebrew-core` and `homebrew-case` are shallow clones

```bash
git -C /usr/local/Homebrew/Library/Taps/homebrew/homebrew-cask fetch --unshallow
git -C /usr/local/Homebrew/Library/Taps/homebrew/homebrew-cask fetch --unshallow
```

Then I added the ruby path to my ~/.zshrc

```bash
export PATH="/usr/local/opt/ruby/bin:$PATH"
export PATH="$HOME/.gem/ruby/X.X.0/bin:$PATH"
```

#### Install jekyll

```bash
gem install --user-install bundler jekyll
```

#### Install bundler \([https://bundler.io/](https://bundler.io/)\)

```bash
gem install bundler
```



#### Create a new jekyll site

```bash
>> jekyll -v 
   jekyll 4.2.0
   
>> jekyll 4.2.0 new .
```

Open a gem file and enable gitub pages.

```text
# comment this
# gem "jekyll", "~> 4.2.0"

# uncomment this
gem "github-pages", group: :jekyll_plugins
```

now run the site 

```bash
bundle exec jekyll serve
```



