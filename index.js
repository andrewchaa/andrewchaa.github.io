import { Client } from '@notionhq/client'
import dotenv from 'dotenv'
import { NotionToMarkdown } from 'notion-to-md'
import * as fs from 'fs'

dotenv.config()
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})
const n2m = new NotionToMarkdown({ notionClient: notion})
const kebabCase = str => str
        .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
        .join('-')
        .toLowerCase();

const response = await notion.databases.query({
  database_id: process.env.NOTION_DATABASE_ID,
})

// console.log(response)
const pages = response
  .results
  .filter(x => x.properties.Name.title.length > 0)

pages.map(async x => {
  console.dir(x, {depth: null})

  const mdBlocks = await n2m.pageToMarkdown(x.id)
  const content = n2m.toMarkdownString(mdBlocks)

  const createdDate = x.created_time.split('T')[0]
  const createdTime = x.created_time
  const title = kebabCase(x.properties.Name.title[0].plain_text)
  const tags = x.properties.Tags.multi_select
    .map(x => `  - ${x.name}`)
    .join('\n')
  const pageContent =
`
---
title: ${title}
date: ${createdTime}
tags:
${tags}
---
${content}
`
  // ---
  // title: Customise VS Code Javascript Formatter
  // date: 2022-03-5T10:10:00
  // categories:
  //   - technical
  // tags:
  //   - javascript
  //   - vs code
  // ---

  fs.writeFile(`./_posts/${createdDate}-${title}.md`, pageContent, (err) => {
    console.log(err);
  });

  // console.log(mdString)
  // const blockResponse = await notion.blocks.children.list({
  //   block_id:x.id
  // })
  // const blocks = blockResponse.results
  // blocks.map(x => {
  //   console.dir(x, {depth: null``})


  //   return
  // })


  return
});
