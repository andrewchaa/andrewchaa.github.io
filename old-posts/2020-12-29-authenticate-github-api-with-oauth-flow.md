---
title: Using Github APIs to pull posts and to convert them to blog posts
date: 2020-12-29T12:35:58
categories:
  - technical
tags:
  - github
---


First, create a [new personal access](https://github.com/settings/tokens) token to authenticate the api request. Otherwise, you will be hit by the rate limit. 

#### Documentation

Github has collections of [restful APIs](https://docs.github.com/en/free-pro-team@latest/rest), very well-documented. 

#### Get Repository Content

```text
curl --location --request GET 'https://api.github.com/repos/andrewchaa/iwrite/commits?path=building-a-simple-cli.md' \
```

This will get the content as Base64String. I used a library, Refit, to call the api in C\#

```csharp
public interface IGithubApi
{
    [Get("/repos/{owner}/{repo}/contents/{path}")]
    Task<IApiResponse<IEnumerable<PostResponse>>> GetRepositoryContents(string owner,
        string repo,
        string path);

    [Get("/repos/{owner}/{repo}/commits?path={path}")]
    Task<IApiResponse<IEnumerable<CommitResponse>>> ListCommits(string owner,
        string repo,
        string path);
}

```

