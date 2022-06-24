---
title: Using React Google Login
date: 2022-05-30
tags:
  - react
---

Recently, I added a google sign in to a website I looked after. I wanted to enable user login and permission check and I myself uses google sign in in many websites, so I gave it a try. 

There’s a handy [react-google-login](https://www.npmjs.com/package/react-google-login) package as usual. You have to [set up a client on Google cloud](http://console.cloud.google.com/apis/credentials) as pre-requisite.

```javascript
import { profile } from 'console'
import { OAuth2Client, TokenPayload } from 'google-auth-library'
import configs from '../../../configs'
import { ProfileData } from '../../../types'

const client = new OAuth2Client(configs.googleClientId)

export const getProfileData = async (response: any)
  : Promise<ProfileData | undefined> => {

  try {
    const ticket = await client.verifyIdToken({
      idToken: response.tokenId,
      audience: configs.googleClientId
    })

    const payload : TokenPayload | undefined = ticket.getPayload()
    if (!payload) {
      return undefined
    }

    return {
      name: payload.given_name || '',
      email: payload.email || '',
      picture: payload.picture || ''
    }
  } catch (error) {
    console.log(error)
    return undefined
  }

}
```

```javascript
import { OAuth2Client, TokenPayload } from 'google-auth-library'
import React, { useState } from 'react'
import GoogleLogin from 'react-google-login'
import configs from '../../../configs'
import { getProfileData } from './googleAuth'

const client = new OAuth2Client(configs.googleClientId)

const Profile : React.FC = () => {
  const [loginData, setLoginData] = useState(
    localStorage.getItem('loginData')
      ? JSON.parse(localStorage.getItem('loginData') || '')
      : null
    )

    const handleSignInFailure = (result: any) => {
      console.log(result)
    }

    const handleSignIn = async (response: any) => {
      const profileData = await getProfileData(response)
      if (!profileData) {
        return
      }

      setLoginData(profileData)
      localStorage.setItem('loginData', JSON.stringify(profileData))
      window.location.reload()
    }


  return (
    <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
      <a href="/profile" className="flex-shrink-0 w-full group block">
          { loginData ? (
            <div className="flex items-center">
              <div>
                <img
                  className="inline-block h-9 w-9 rounded-full"
                  src={loginData.picture}
                  alt=""
                />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  {loginData.name}
                </p>
                <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                  View profile
                </p>
              </div>
            </div>
          ): (
            <GoogleLogin
              clientId={configs.googleClientId}
              buttonText='Sign in'
              onSuccess={handleSignIn}
              onFailure={handleSignInFailure}
              cookiePolicy='single_host_origin'
              isSignedIn={true}
            ></GoogleLogin>

          )}
      </a>
    </div>
  )
}

export default Profile
```

