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

const pages = response
  .results
  .filter(x => x?.properties.Name.title.length > 0)

pages.map(async x => {
  console.dir(x, {depth: null})
  const mdBlocks = await n2m.pageToMarkdown(x.id)
  const content = n2m.toMarkdownString(mdBlocks)

  const publishedDate = x.properties['Published Date'].date.start
  const title = x.properties.Name.title[0].plain_text
  const filename = kebabCase(title)
  const tags = x.properties.Tags.multi_select
    .map(x => `  - ${x.name}`)
    .join('\n')
  const pageContent =
`---
title: ${title}
date: ${publishedDate}
tags:
${tags}
---
${content}
`
  fs.writeFile(`./_posts/${publishedDate}-${filename}.md`, pageContent, (err) => {
    console.log(err);
  });
  return
});
