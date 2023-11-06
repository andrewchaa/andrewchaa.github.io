---
title: Publish Notion page as blog post
date: 2022-06-03
tags:
  - javascript
  - notion
  - github actions
  - markdown
---

I have github page blog. It’s a static website based on Jekyll and hosted on the github. A nice solution, free of charge and fast. The only downside was I had to write a markdown page, git commit, and push. I find it disruptive to my writing. 

Notion now has [APIs](https://developers.notion.com/docs/getting-started) and even [JavaScript client](https://github.com/makenotion/notion-sdk-js). It looks pretty easy to use Notion as headless CMS. 

In the root directory of my github blog repository, I created package.json and installed NPM packages. 

```json
"scripts": {
    "start": "node index",
  },
  "dependencies": {
    "@notionhq/client": "^1.0.4",
    "dotenv": "^16.0.1",
    "notion-to-md": "^2.3.3"
  }
```

- @notionhq/client: notion sdk

- [dotenv](https://github.com/motdotla/dotenv): environment variables loader

- [notion-to-md](https://github.com/souvikinator/notion-to-md): convert notion pages to markdown


First, [create a notion integration](https://developers.notion.com/docs/getting-started) to get Notion API Key. You need the database id of the page you want to access. The new integration wouldn’t have access to any page by default. So you have to share the page to your integration, by clicking “Share” link on the top right page. 

```bash
https://www.notion.so/myworkspace/a8aec43384f447ed84390e8e42c2e089?v=...
                                  |--------- Database ID --------|
```

Once you have the API key and the Database ID. query the database to retrieve all pages in there. 

```javascript
import { Client } from '@notionhq/client'
import dotenv from 'dotenv'

dotenv.config()
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

const response = await notion.databases.query({
  database_id: process.env.NOTION_DATABASE_ID,
})
```

Btw, I used `console.dir(response, { depth: null })`to understand the response structure.

Now, get the content of the each page and write it as markdown file. In Notion SDK, a page [consists of blocks](https://developers.notion.com/docs/working-with-page-content#conclusion) and you have to convert each block to the relevant markdown. I used `notion-to-md` for the job. 

```javascript
import { NotionToMarkdown } from 'notion-to-md'
import * as fs from 'fs'

...

const n2m = new NotionToMarkdown({ notionClient: notion})
const kebabCase = str => str
        .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
        .join('-')
        .toLowerCase();
const pages = response
  .results
  .filter(x => x.properties.Name.title.length > 0)

pages.map(async x => {
  const mdBlocks = await n2m.pageToMarkdown(x.id)
  const content = n2m.toMarkdownString(mdBlocks)

  const createdDate = x.created_time.split('T')[0]
  const createdTime = x.created_time
  const title = x.properties.Name.title[0].plain_text
  const filename = kebabCase(title)
  const tags = x.properties.Tags.multi_select
    .map(x => `  - ${x.name}`)
    .join('\n')
  const pageContent =
`---
title: ${title}
date: ${createdTime}
tags:
${tags}
---
${content}
`
  fs.writeFile(`./_posts/${createdDate}-${filename}.md`, pageContent, (err) => {
    console.log(err);
  });
  return
});
```

It generates markdown files according to Jekyll’s frontmatter format. Lastly, I created a github action that runs once a day to retrieve the Notion posts, generate the markdown files, and push the new files to the repository. 

```yaml
name: Build Notion Posts

on:
  schedule:
  - cron: "0 1 * * *"

  workflow_dispatch:

jobs:
  build_posts:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 15.x
      - name: Run a multi-line script
        run: |
          touch .env
          echo 'NOTION_TOKEN=${{ secrets.NOTION_TOKEN }}' >> .env
          echo 'NOTION_DATABASE_ID=${{ secrets.NOTION_DATABASE_ID }}' >> .env
          yarn
          yarn start
      - uses: stefanzweifel/git-auto-commit-action@v4
        with:
          commit_message: build pages from notion
```

Lastly, all the resources I used for this job.

- [https://github.com/stefanzweifel/git-auto-commit-action](https://github.com/stefanzweifel/git-auto-commit-action)

- [https://www.cyberciti.biz/faq/create-a-file-in-linux-using-the-bash-shell-terminal/](https://www.cyberciti.biz/faq/create-a-file-in-linux-using-the-bash-shell-terminal/)

- [https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-nodejs](https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-nodejs)

- [https://developers.notion.com/reference/intro](https://developers.notion.com/reference/intro)

- [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)

- [https://www.geeksforgeeks.org/how-to-convert-a-string-into-kebab-case-using-javascript/](https://www.geeksforgeeks.org/how-to-convert-a-string-into-kebab-case-using-javascript/)

- [https://stackoverflow.com/questions/43622337/using-import-fs-from-fs](https://stackoverflow.com/questions/43622337/using-import-fs-from-fs)

- [https://github.com/souvikinator/notion-to-md](https://github.com/souvikinator/notion-to-md)

- [https://stackoverflow.com/questions/10729276/how-can-i-get-the-full-object-in-node-jss-console-log-rather-than-object](https://stackoverflow.com/questions/10729276/how-can-i-get-the-full-object-in-node-jss-console-log-rather-than-object)

- [https://www.youtube.com/watch?v=TlsGflZVIec](https://www.youtube.com/watch?v=TlsGflZVIec)

