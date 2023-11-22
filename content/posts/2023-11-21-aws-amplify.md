---
title: AWS Amplify
date: 2023-11-21
tags:
  - javascript
---

## Authentication and Authorization

- Use `toString()` when you handle the error and use the error message

```typescript
try {
  const signUpResult = await Auth.signUp({
    username: accountDetails.email,
    password: accountDetails.password || '',
    attributes: {
      given_name: accountDetails.firstname,
      family_name: accountDetails.lastname,
      email: accountDetails.email,
    },
  })
  userId = signUpResult.userSub
} catch (error) {
  console.log('error', JSON.stringify(error))
  toast.show({
    render: () => (
      <ToastMessage
        type='error'
        title='Account creation failed'
        description={(error as any).toString()}
      />
    ),
  })
  return
}
```


