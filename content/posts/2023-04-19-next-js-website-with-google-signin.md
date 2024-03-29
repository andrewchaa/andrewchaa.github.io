---
title: Next.js website with Google signin
date: 2023-04-19
tags:
  - nextjs
  - google cloud
  - amplify
---

### Install package


To set up Google Sign-In in a Next.js project, you can use the NextAuth.js library. Here's a step-by-step guide to implementing it:


First, install the necessary packages:


```bash
npm install next-auth
```


### […nextauth].js


Create a **`[...nextauth].js`** file inside the **`pages/api/auth`** directory. This file will handle authentication requests.


```typescript
// pages/api/auth/[...nextauth].js

import NextAuth from "next-auth/next"
import GoogleProvider from 'next-auth/providers/google'

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    })
  ],
  secret: process.env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions)
```


### Set up Google OAuth


Set up a Google OAuth 2.0 Client ID and secret by following these steps:


	a. Go to the [**Google Cloud Console**](https://console.cloud.google.com/).


	b. Create a new project or select an existing one.


	c. Navigate to "APIs & Services" > "Credentials" and click "Create credentials" > "OAuth client ID".


	d. Select "Web application" as the application type.


	e. Set "Authorized JavaScript origins" to your app's domain (e.g., **`http://localhost:3000`** for development or your production domain).


	f. Set "Authorized redirect URIs" to your app's domain followed by **`/api/auth/callback/google`** (e.g., **`http://localhost:3000/api/auth/callback/google`** for development or the equivalent for your production domain).


	g. Save the settings, and you'll get a client ID and secret.


### Environment variables


In your Next.js project, create a **`.env.local`** file in the root directory and add the Google client ID and secret as environment variables. You should also add a secret for NextAuth.js. Remember not to commit this file to your repository.


```bash
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_next_auth_secret
```


### useSession()


In your application, import the **`signIn`** and **`signOut`** functions from **`next-auth/react`** and use them to trigger the Google Sign-In and Sign-Out actions.


```javascript
import Head from 'next/head'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import styles from '@/styles/Home.module.css'

export default function Home() {
  const router = useRouter()
  const { data: session, status } = useSession()
  if (status === 'loading') {
    return (<h1>loading... please wait</h1>)
  }

  if (status === 'unauthenticated') {
    router.push('/signin')
    return null
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            Get started by editing&nbsp;
            <code className={styles.code}>src/pages/index.tsx</code>
          </p>
          <div>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{' '}
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                className={styles.vercelLogo}
                width={100}
                height={24}
                priority
              />
            </a>
          </div>
        </div>

        <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
          <div className={styles.thirteen}>
            <Image
              src="/thirteen.svg"
              alt="13"
              width={40}
              height={31}
              priority
            />
          </div>
        </div>
      </main>
    </>
  )
}
```


Now, your Next.js app should have Google Sign-In enabled. When users click the "Sign In with Google" button, they will be redirected to the Google Sign-In flow. After successful authentication, they will be redirected back to your app, and you can access their session data using the **`useSession`** hook


### Pass environmental variables in amplify build


```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - yarn install
    build:
      commands:
        - env | grep -e GOOGLE_ID -e GOOGLE_SECRET -e NEXTAUTH_SECRET >> .env.production
        - yarn run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```


