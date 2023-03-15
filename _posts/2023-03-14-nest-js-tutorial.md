---
title: NestJS tutorial
date: 2023-03-14
tags:
  - node.js
  - nestjs
---

Nest (NestJS) is a framework for building efficient, scalable [**Node.js**](https://nodejs.org/) server-side applications. It uses progressive JavaScript, is built with and fully supports [**TypeScript**](http://www.typescriptlang.org/) (yet still enables developers to code in pure JavaScript) and combines elements of OOP (Object Oriented Programming), FP (Functional Programming), and FRP (Functional Reactive Programming).

### Resources

- [https://docs.nestjs.com/first-steps](https://docs.nestjs.com/first-steps)

Installation

```bash
npm i -g @nestjs/cli
nest new new-project

cd new-project
yarn start
$ nest start
[Nest] 42017  - 03/14/2023, 11:08:26 PM     LOG [NestFactory] Starting Nest application...
[Nest] 42017  - 03/14/2023, 11:08:26 PM     LOG [InstanceLoader] AppModule dependencies initialized +9ms
[Nest] 42017  - 03/14/2023, 11:08:26 PM     LOG [RoutesResolver] AppController {/}: +2ms
[Nest] 42017  - 03/14/2023, 11:08:26 PM     LOG [RouterExplorer] Mapped {/, GET} route +1ms
[Nest] 42017  - 03/14/2023, 11:08:26 PM     LOG [NestApplication] Nest application successfully started +1ms
```

Set up

```bash
src
 |- app.controller.spec.ts
 |- app.controller.ts
 |- app.module.ts
 |- app.service.ts
 |- main.ts
```

`app.controller.ts`|A basic controller with a single route.
---|---
`app.controller.spec.ts`|The unit tests for the controller.
`app.module.ts`|The root module of the application.
`app.service.ts`|A basic service with a single method.
`main.ts`|The entry file of the application which uses the core function `NestFactory` to create a Nest application instance.

