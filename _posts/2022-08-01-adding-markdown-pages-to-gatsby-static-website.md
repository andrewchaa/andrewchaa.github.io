---
title: Adding Markdown Pages to Gatsby static website
date: 2022-08-01
tags:
  - gatsby
  - static website
---

One of my customers wanted to post their announcements on the website. My friend and I wanted to try Notion as Headless CMS and Gatsby as the static website generator. We chose Gatsby as we are relatively comfortable with react. 

[To add Markdown support](https://www.gatsbyjs.com/docs/how-to/routing/adding-markdown-pages/), you need to install two plugins.

- [`gatsby-source-filesystem`](https://www.gatsbyjs.com/plugins/gatsby-source-filesystem/#gatsby-source-filesystem)

- `gatsby-transformer-remark`

With [`gatsby-source-filesystem`](https://www.gatsbyjs.com/plugins/gatsby-source-filesystem/#gatsby-source-filesystem), you read files from the file system and with `gatsby-transformer-remark`, you convert the markdown file to HTML.

```bash
yarn add gatsby-source-filesystem
yarn add gatsby-transformer-remark
```

