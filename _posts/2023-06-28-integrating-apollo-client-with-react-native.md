---
title: Integrating Apollo Client with React Native
date: 2023-06-28
tags:
  - graphql
  - react native
---

### Resources

- [https://www.apollographql.com/docs/react/integrations/react-native/](https://www.apollographql.com/docs/react/integrations/react-native/)

Install it with `npm` or `yarn`

```bash
yarn add @apollo/client graphql
```

Then wrap your application in the `ApolloProvider` component

```typescript
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: graphqlUrl,
  cache: new InMemoryCache(),
  headers: {
    'x-api-key': apiKey,
  },
});

function App() {
  ...
	return (
    <NativeBaseProvider theme={extendedTheme} config={config}>
      <NavigationContainer>
        <ApolloProvider client={client}>
          {signedIn ? <MainContainer /> : <AuthContainer />}
        </ApolloProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  )
}
```

