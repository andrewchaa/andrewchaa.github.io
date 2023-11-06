require('dotenv').config()
const { Client } = require('@notionhq/client')
const { NotionToMarkdown } = require('notion-to-md')
const fs = require('fs')
const dayjs = require('dayjs')

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})
const n2m = new NotionToMarkdown({ notionClient: notion})
const kebabCase = str => str
        .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
        .join('-')
        .toLowerCase();

const run = async () => {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
  })

  const pages = response
    .results
    .filter(x => x?.object === 'page')

  const page = pages[0]
  console.log('page', page)

  const title = (await notion.pages.properties.retrieve({
    page_id: page.id,
    property_id: 'title',
  })).results[0].title.plain_text

  const tags = (await notion.pages.properties.retrieve({
    page_id: page.id,
    property_id: 'mntZ',
    }))
    .multi_select
    .map(t => `  - ${t.name}`)
    .join('\n')

  const publishedDate = dayjs(page.created_time).format('YYYY-MM-DD')
  const mdBlocks = await n2m.pageToMarkdown(page.id)
  const content = n2m.toMarkdownString(mdBlocks)
  const filename = kebabCase(title)
  const pageContent =
`---
title: ${title}
date: ${publishedDate}
tags:
${tags}
---
${content.parent}
`
  fs.writeFileSync(`./content/posts/${publishedDate}-${filename}.md`, pageContent);
}

run()
