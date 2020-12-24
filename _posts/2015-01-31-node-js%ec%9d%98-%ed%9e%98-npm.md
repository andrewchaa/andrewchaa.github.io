---
layout: post
title: Node.js의 힘, npm
date: 2015-01-31 21:05:41.000000000 +00:00
type: post
published: true
status: publish
categories:
- Programming
tags:
- korean
- node
meta:
  sharing_disabled: '1'
  _wpas_skip_facebook: '1'
  _wpas_skip_google_plus: '1'
  _wpas_skip_linkedin: '1'
  _wpas_skip_tumblr: '1'
  _wpas_skip_path: '1'
  _rest_api_published: '1'
  _rest_api_client_id: "-1"
  publicize_twitter_user: andrewchaa
  publicize_twitter_url: http://t.co/c2PSVVKaqt
  _wpas_done_1752093: '1'
  _publicize_done_external: a:1:{s:7:"twitter";a:1:{i:111615627;b:1;}}
  _oembed_8c62bd85e4fcf3c4aedee10d901ac278: "{{unknown}}"
author:
  login: simplelifeuk
  email: andrew.chaa@yahoo.co.uk
  display_name: Andy
  first_name: Andrew
  last_name: Chaa
---
<p><a href="http://nodejs.org/">Node.js</a>, 이제는 모르는 사람이 없는 서버쪽 자바 스크립트 프로그래밍 언어 및 환경.</p>
<p>작년부터 Node.js를 개인 프로젝트에 조금씩 써보다가 이제는 거기에 꽂혀서 모든 개인 프로젝트를 Node.js로 하고 있다. 그런데 계속 쓰다보니, 이 <a href="https://www.npmjs.com/">npm</a>이란 놈이 여간 기특하지 않은거다. Node Package Manager, 말 그대로 Node 관련 모든 패키지들이 모인 곳인데, 그야말로 무궁무진한 패키지들이 있다. 전에 <a href="https://www.ruby-lang.org/en/">Ruby</a> 개발자들과 만나서 얘기할 때, 그 친구들이 농담식으로 "코드짜다는 일의 대부분이 패키지를 찾아서 설치하고 그걸 이용하는 것" 이라고 말하는 걸 들었는데, Node를 쓰면서 정말 실감이 난다. 웹 프로그래밍을 하려면 <a href="http://expressjs.com/">Express.js</a>를 찾아 설치하고, 각종 미들웨어들을 설치한다. 로깅이 필요하면, <a href="https://github.com/trentm/node-bunyan">bunyan</a>이나 <a href="https://github.com/flatiron/winston">winston</a>을 설치하고, <a href="http://azure.microsoft.com/en-gb/documentation/articles/storage-dotnet-how-to-use-tables/">azure-table storage</a>를 설치해서 데이터를 저장하고 (회사 <a href="https://msdn.microsoft.com/en-us/default.aspx">MSDN</a> 계정에서 매달 <a href="http://azure.microsoft.com/en-gb/">Azure</a>를 공짜로 쓸 수 있는 금액을 충전해줘서) 등등.</p>
<p>그런데 계속해서 npm에서 이것 저것 찾아서 쓰다보니, 점점 내가 만드느 코드들도 패키지 비슷하게 되어간다. C#에서는 그냥 Helper나 Util 등의 폴더에 넣어 쓰고말 코드를 패키지처럼 만들게 되고, 또 만들다 보면, 이걸 npm에 올려 공유하고 싶어진다. 함수가 어느정도 복잡해지면, 이제 이를 패키지로 만들고 싶어진다. 패키지가 일반적인 <a href="http://en.wikipedia.org/wiki/Abstraction_%28computer_science%29">추상화 (Abstraction)</a>의 패턴이 된다. 이는 C#으로 코딩할 때는 깨닫지 못하던 패턴이다.</p>
<p><a href="https://rubygems.org/">RubyGems</a>와 Ruby가 한 몸 이듯이 npm이 없다면 Node.js 역시 없다는 생각이 든다</p>
