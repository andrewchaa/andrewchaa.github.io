---
title: Generating a new blog post with a markdown file
date: 2020-07-23T07:19:41
categories:
  - technical
---


These are the packages I used to make it happen.

* slugify: [https://github.com/simov/slugify](https://github.com/simov/slugify), generate a slug based on the given text
* file system: [https://nodejs.org/api/fs.html](https://nodejs.org/api/fs.html), to create a file
* fs-extra: [https://github.com/jprichardson/node-fs-extra](https://github.com/jprichardson/node-fs-extra), handy functions with file system
* chalk: [https://github.com/chalk/chalk](https://github.com/chalk/chalk), to make terminal logging pretty
* rest.js: [https://github.com/octokit/rest.js/](https://github.com/octokit/rest.js/), github rest api sdk

And the source code.

```javascript
const { Octokit } = require('@octokit/rest')
const slugify = require('slugify')
const fs = require('fs-extra')

const owner = ':your_github_username'
const repo = ':github_repo'
const postsDirectory = '../blog/content/posts'
const oldPostsDirectory = '../blog/content/old-posts'

const octokit = new Octokit({
  baseUrl: 'https://api.github.com',
  auth: ":your_auth_token",
  log: {
    debug: () => {},
    info: () => {},
    warn: console.warn,
    error: console.error
  },
  request: {
    agent: undefined,
    fetch: undefined,
    timeout: 0
  }
})

const convertImagePath = (path) =>
  path.replace(/\.gitbook\/assets\/image\s?\(?([0-9]*)\)?\.png/g,
    'assets\/image$1\.png')
    .replace(/\.gitbook\/assets\/image%20%28([0-9]+)%29\.png/g,
    'assets\/image$1\.png'
    )

const getFiles = async (path) => {

  var response = await octokit.repos.getContent({
    owner: owner,
    repo: repo,
    path: path
  })

  var files = response.data
    .filter(x => !(['.gitbook', 'README.md', 'SUMMARY.md', 'drafts'].includes(x.path)))
    .map(x => ({
      name: x.name,
      slugName: slugify(x.name.slice(0, -3), { lower: true, strict: true }) + '.md',
      imageName: convertImagePath(x.path),
      sha: x.sha
    }))
  return files
}

const getDate = async (path) => {
  const listCommitsResponse = await octokit.repos.listCommits({
    owner: owner,
    repo: repo,
    path: path
  })

  const date = listCommitsResponse.data[0].commit.committer.date.split('T')[0]

  return {
    full: `${date}T00:00:00.000Z`,
    short: date
  }
}

const getContent = async (path) => {

  var contentResponse = await octokit.repos.getContent({
    owner: owner,
    repo: repo,
    path: path
  });

  const content = Buffer.from(contentResponse.data.content, 'base64').toString('utf-8')
  const lines = content.split('\n')
  const title = lines[0]
  const description = lines[2]

  lines.shift()
  const body = convertImagePath(lines.join('\n'))
  const date = await getDate(path)

  return {
    body: body,
    title: title.replace('# ', ''),
    description: description,
    date: date
  }
}

const getFrontMatter = async (title, date, description) => {
  const slug = slugify(title, {
      lower: true,
      strict: true
    })

  return `---
title: ${title}
date: "${date}"
template: "post"
category: "Development"
tags:
draft: false
slug: "/posts/${slug}/"
description: ""
socialImage: "/media/42-line-bible.jpg"
---
  `
}

const getImage = async (file) => {
  const response = await octokit.git.getBlob({
    owner: owner,
    repo: repo,
    file_sha: file.sha
  })

  return response.data.content
}

const generatePosts = async () => {

  await fs.emptyDir(postsDirectory)
  await fs.copy(oldPostsDirectory, postsDirectory)

  const documents = await getFiles('')
  documents.forEach(async (document) => {

    console.log(`Generating ${document.slugName} ...`)
    const content = await getContent(document.name)
    const frontMatter = await getFrontMatter(content.title,
        content.date.full,
        content.description)

    fs.outputFile(`${postsDirectory}/${content.date.short}---${document.slugName}`, `${frontMatter}\n${content.body}`)

  });

  const files = await getFiles('.gitbook/assets')
  files.forEach(async (file) => {

    console.log(`Transferring image ${file.imageName} ...`)
    const image = await getImage(file)
    await fs.outputFile(`${postsDirectory}/${file.imageName}`, image, { encoding: 'base64'})
  });

}


generatePosts()

```

