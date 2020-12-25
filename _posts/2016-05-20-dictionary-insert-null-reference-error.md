---
title: Dictionary.Insert Null reference error
date: 2016-05-20 10:05:40.000000000 +01:00
type: post
published: true
status: publish
categories:
- Programming
tags:
- OAuth
meta:
  _oembed_ca6d269c69d4de33f9fe970d6d5a50fa: "{{unknown}}"
  _oembed_812df23bec31a13980aeae4204a80bd6: "{{unknown}}"
  _rest_api_published: '1'
  _rest_api_client_id: "-1"
  _publicize_job_id: '22999808956'
  _oembed_61334e87228e0ccec8360c2b0c34ee08: "{{unknown}}"
  _publicize_done_external: a:1:{s:7:"twitter";a:1:{i:1752093;s:56:"https://twitter.com/andrewchaa/status/733599565920641026";}}
  _publicize_done_2230353: '1'
  _wpas_done_1752093: '1'
  publicize_twitter_user: andrewchaa
author:
  login: simplelifeuk
  email: andrew.chaa@yahoo.co.uk
  display_name: Andy
  first_name: Andrew
  last_name: Chaa
---
<p>최근에 OAuth를 이용한 로그인 시스템을 구현하면서 login client를 NuGet Package로 만들었었다. 다른 개발자들이 쉽게 로그인 기능을 이용할 수 있도록. 그런데 자꾸만 acquired token을 저장하는 static Dicionary에서 Null Reference error가 나는게 아닌가. Dictionary.Insert에서...<br />
Dictionary.Get에서 나면 몰라도 Insert에서 Null error가 나서 쫌 구글해보니, StackOverflow의 어느 고수께서 이미 답변. Threading 이슈라고.<br />
http://stackoverflow.com/…/how-did-i-get-this-nullreference…</p>
<p>그 아래 다른분은 ConcurrentDictionary를 쓰라고 친절하고 부연 설명까지.</p>
