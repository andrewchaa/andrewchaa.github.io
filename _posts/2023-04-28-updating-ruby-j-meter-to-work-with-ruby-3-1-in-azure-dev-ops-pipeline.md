---
title: Updating Ruby-JMeter to Work with Ruby 3.1 in Azure DevOps Pipeline
date: 2023-04-28
tags:
  - ruby
  - azure devops
---

You may have experienced issues with outdated dependencies when upgrading to newer versions of Ruby. Recently, I encountered such an issue when updating a job in Azure DevOps pipeline to Ruby 3.1. In this blog post, I'll share my experience of updating the **`ruby-jmeter`** gem to be compatible with Ruby 3.1, and how I learned more about gems, Bundler, and the GitHub Package Registry in the process.

## **Azure DevOps Pipeline and Ruby 2.7 Support**

My current pipeline setup, Azure DevOps pipeline, no longer supports Ruby 2.7. As a result, I updated the Ruby version of a job to Ruby 3.1, which subsequently caused issues with the **`ruby-jmeter`** gem.

## **Ruby-JMeter Breaks with Ruby 3.1**

Unfortunately, **`ruby-jmeter`** is no longer maintained and breaks when used with Ruby 3.1. To address this issue, I decided to fork the **`ruby-jmeter`** repository and update its code to be compatible with Ruby 3.1.

## **Updating Ruby-JMeter to Ruby 3.1**

While working on the update, I discovered that someone had already made the necessary changes to make **`ruby-jmeter`** compatible with Ruby 3.1. I used their commit as a reference: [**https://github.com/k5953837/ruby-jmeter/commit/a51f736377636f0c0a44d43fb668160e8b931cd4**](https://github.com/k5953837/ruby-jmeter/commit/a51f736377636f0c0a44d43fb668160e8b931cd4)

## **Publishing the Updated Gem to GitHub Package Registry**

After updating the code, I published the new gem to the GitHub Package Registry. To do this, I had to create a credentials file, **`~/.gem/credentials`**, and insert my GitHub Personal Access Token (PAT) in the following format:

```bash
---
    :github: <your PAT>
```

Next, I changed the permission of the file with the command:

```bash
chmod 0600 ~/.gem/credentials
```

To push the package from my machine, I ran:

```bash
gem push --key <PAT> --host https://rubygems.pkg.github.com/<Organization> ruby-jmeter-3.1.10.gem
```

## **Installing the Updated Gem in Azure DevOps Pipeline**

To install the updated gem in the Azure DevOps Pipeline, I had to authenticate with the GitHub Package Registry using Bundler. I ran the following command:

```bash
bundle config set --global rubygems.pkg.github.com $(TOKEN)
```

## **Conclusion**

Updating the **`ruby-jmeter`** gem to work with Ruby 3.1 in Azure DevOps Pipeline was a valuable learning experience. It not only allowed me to resolve the compatibility issue but also provided an opportunity to deepen my understanding of gems, Bundler, and the GitHub Package Registry. If you're a Ruby developer, I hope this post helps you navigate similar challenges in your projects

