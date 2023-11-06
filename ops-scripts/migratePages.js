const { Client } = require('@notionhq/client')
const dotenv = require('dotenv')
const { NotionToMarkdown } = require('notion-to-md')
const fs = require('fs')
const dayjs = require('dayjs')

dotenv.config()
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})
const n2m = new NotionToMarkdown({ notionClient: notion})
const kebabCase = str => str
        .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
        .join('-')
        .toLowerCase();

const getPages = async () => {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
  })

  const pages = response
    .results
    .filter(x => x?.object === 'page')

  return pages
}

const getTitle = async (pageId) => {
  const title = (await notion.pages.properties.retrieve({
    page_id: pageId,
    property_id: 'title',
  })).results[0].title.plain_text

  return title
}

const getTags = async (pageId) => {
  const tags = (await notion.pages.properties.retrieve({
    page_id: pageId,
    property_id: 'mntZ',
    }))
    .multi_select
    .map(t => `  - ${t.name}`)
    .join('\n')

  return tags
}

const getPageContent = async (
  pageId,
  title,
  publishedDate,
  tags
) => {
  const mdBlocks = await n2m.pageToMarkdown(pageId)
  const contentString = n2m.toMarkdownString(mdBlocks).parent

  const pageContent =
`---
title: ${title}
date: ${publishedDate}
tags:
${tags}
---
${contentString}
`
  return pageContent
}

const run = async () => {
  const pages = await getPages()

  pages.forEach(async x => {
    const title = await getTitle(x.id)
    const tags = await getTags(x.id)
    const publishedDate = dayjs(x.created_time).format('YYYY-MM-DD')
    // const mdBlocks = await n2m.pageToMarkdown(x.id)
    const filename = kebabCase(title)
    const pageContent = await getPageContent(x.id, title, publishedDate, tags)
  //   const contentString = n2m.toMarkdownString(mdBlocks).parent
  //   const pageContent =
  // `---
  // title: ${title}
  // date: ${publishedDate}
  // tags:
  // ${tags}
  // ---
  // ${contentString}
  // `
    fs.writeFileSync(`./content/posts/${publishedDate}-${filename}.md`, pageContent);
  });
}

run()
