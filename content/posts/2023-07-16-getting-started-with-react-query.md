---
title: Getting Started with React Query
date: 2023-07-16
tags:
  - react query
---

[React Query](https://tanstack.com/query/v3/docs/react/overview) is a data-fetching library for React and for React Native. It makes fetching, caching, synchronising, and updating server state in your react application easier. 


### Table of Contents


Install the package


```bash
yarn add @tanstack/react-query 
yarn add -D @tanstack/react-query-devtools 
yarn add @tanstack/react-query-persist-client 

# if it's React
yarn add @tanstack/query-sync-storage-persister 

# if it's React Native
yarn add @tanstack/query-async-storage-persister
```


## Query


A query is a declarative dependency on an asynchronous source of data that is tied to a unique key. 


```typescript
const { isLoading, data, isError, error } = useQuery('jobs', async () => {
  return await apis.getJobs(companyId)
}, {
  enabled: !!companyId,
})
```


The unique key, `jobs`, is used internally for refetching, caching, and sharing your queries throughout the application. 


Sometimes, your `userQuery` can depend on the value of a variable which is a result of another async operation. In that case, you use `enabled` option. The `enabled` option is used to toggle the query on and off. When `enabled` is false, the query will not run even when `companyId` changes. 


### Handling error


```typescript
const { isLoading, data, isError, error } = useQuery('jobs', async () => {
  return await apis.getJobs(companyId)
}

if (isLoading) {
	return <h2>Loading...</h2>
}

if (isError) {
	return <h2>{error.message}</h2>
}
```


### ReactQueryDevTools


Install `@tanstack/react-query-devtools`


```typescript
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* The rest of your application */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
```


Devtools are excluded in production builds. However, it might be desirable to lazy load the devtools in production:


```typescript
import * as React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Example } from './Example'

const queryClient = new QueryClient()

const ReactQueryDevtoolsProduction = React.lazy(() =>
  import('@tanstack/react-query-devtools/build/lib/index.prod.js').then(
    (d) => ({
      default: d.ReactQueryDevtools,
    }),
  ),
)

function App() {
  const [showDevtools, setShowDevtools] = React.useState(false)

  React.useEffect(() => {
    // @ts-ignore
    window.toggleDevtools = () => setShowDevtools((old) => !old)
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <Example />
      <ReactQueryDevtools initialIsOpen />
      {showDevtools && (
        <React.Suspense fallback={null}>
          <ReactQueryDevtoolsProduction />
        </React.Suspense>
      )}
    </QueryClientProvider>
  )
}

export default App
```


With this, calling **`window.toggleDevtools()`** will download the devtools bundle and show them.


### refetch


On my mobile app, I implemented a gesture that you pull down the list and it refetches the data again. `useQuery` support `refetch`


```typescript
const { 
	isLoading : isJobLoading, 
	data: jobs, 
	refetch: jobsRefetch 
} = useQuery('jobs', async () => {
    const jobsResponse = await apis.getJobs(user?.companyId || '')
    return jobsResponse.data
  }, {
    enabled: !!user?.companyId,
})
...
<JobItems
  items={jobs || []}
  refetch={jobsRefetch}
/>

```


```typescript
type JobItemsProps = {
  items: Job[]
  refetch: () => Promise<QueryObserverResult<Job[] | undefined, unknown>>
}

const JobItems = (props: JobItemsProps)  => {
  const { items, refetch } = props
	...
	<KeyboardAwareScrollView
    contentContainerStyle={{ flexGrow: 1 }}
    refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={() => void refetch().then()}
      />
    }
  >
```


## Mutation

- Use `useMutation` to save or update data.
- Do `refetch` after the mutation succeeds
- Use `onError` and `onSuccess`

```typescript
const updateMutation = useMutation({
  mutationKey: [QueryKeys.updateRegistration, registration.registrationId],
  mutationFn: async (registration: RegistrationRequest) => {
    const response = await createRegistration(registration)
    if (response.status !== 200 && response.status !== 201) {
      throw new Error(response.message)
    }
  },
  onSuccess: () => {
    toast.show({
      render: () => <ToastMessage
        type='success'
        description={'Registration created successfully.'}
      />
    })
		toast.show({
      render: () => <ToastMessage
        type='success'
        description={'Registration created successfully.'}
      />
	  })

    initializeRegistration()
    navigation.navigate(RouteNames.RegistrationList)
  },
  onError: (error) => {
    console.log('error', error)
    toast.show({
      render: () => (
        <ToastMessage
          type='error'
          title='Failed to create a registration'
          description={(error as any).toString()}
        />
      ),
    })
  }
})
```


```typescript
const completeMutation = useMutation(async (job: Job) => {
  const response = await apis.updateJob({
    ...job,
    jobStatus: JobStatus.COMPLETED,
  })

  if (response.status !== 200) {
    toast.show({
      title: 'Job failed to update into the app server',
      status: 'error',
      description: response.message,
    })

    throw new Error('Job failed to update into the app server')
  }

  toast.show({
    title: 'Successfuly updated',
    status: 'success',
    description: `Job status has been successfully updated to '${response.data.jobStatus}.'`,
  })

  await getJobQuery.refetch()
  return response
})

const handleComplete = (job?: Job) => {
  setShowCompletedModal(false)

  if (!job) {
    return
  }

  ...
  completeMutation.mutate(job)
}
```


## Reusing `react query`


```typescript
export function useUserQuery() {
  return useQuery([QueryKeys.user], async () => {
    const loginUser = await apis.getStoredUser()
    const user = await getUser(loginUser.userId)
    return user.data
  })
}

const userQuery = useUserQuery()
```


## Testing


React Query works by means of hooks. Unit tests for custom hooks can be written using the [react-hooks-testing-library](https://react-hooks-testing-library.com/). 


Alternatively, you can mock API calls within the query hook. This will allow your Jest tests to test all the features of react query as if it were running in production. This is a better approach because you are testing your code, not mocks. 


### wrapper


To test components, you need to wrap them with `<ReactClientProvider />`. I have a wrapper function for this. Here is the code.


```javascript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NativeBaseProvider } from 'native-base'
import React from 'react'

const queryClient = new QueryClient()
queryClient.setDefaultOptions({
  queries: {
    cacheTime: 0,
  }
})

type Props = {
  children: React.ReactNode;
}

const wrapper = ({children}: Props) => (
  <QueryClientProvider client={queryClient}>
    <NativeBaseProvider>
      {children}
    </NativeBaseProvider>
  </QueryClientProvider>
)

export default wrapper
```


```javascript
describe('JobDetails', () => {
  apis.getJob = jest.fn().mockImplementation(() => {
    return getJobResponse
  })

  apis.updateJob = jest.fn()

  it('should render JobDetails successfully', async () => {
    render(<JobDetails />, {wrapper})

    await waitFor(() => expect(screen.getByText('Job Details')).toBeTruthy())

    const completeButton = await waitFor(() => screen.getByRole('button', {name: 'COMPLETE'}))
    expect(completeButton).toBeTruthy()
  })
```


This will ensure that your component is always wrapped in `<ReactClientProvider />`. 


### Jest did not exit one second after the test run has completed


The issue is caused by the `react-query` garbage collection timer running, which defaults to 5 minutes: [https://stackoverflow.com/questions/71881322/react-native-jest-did-not-exit-one-second-after-the-test-run-has-completed-wi](https://stackoverflow.com/questions/71881322/react-native-jest-did-not-exit-one-second-after-the-test-run-has-completed-wi)


To sort it, do one the followings

- Set `cacheTime` to 0 for the test.

```javascript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NativeBaseProvider } from 'native-base'
import React from 'react'

export const queryClient = new QueryClient()
queryClient.setDefaultOptions({
  queries: {
    cacheTime: 0,
    retry: false,
  },
  mutations: {
    retry: false,
    cacheTime: 0,
  },
})

type Props = {
  children: React.ReactNode;
}

const wrapper = ({children}: Props) => (
  <QueryClientProvider client={queryClient}>
    <NativeBaseProvider
      initialWindowMetrics={{frame: {x: 0, y: 0, width: 0, height: 0}, insets: {top: 0, left: 0, right: 0, bottom: 0} }}
			>
      {children}
    </NativeBaseProvider>
  </QueryClientProvider>
)

export default wrapper
```

- `clear()` the `queryClient` after each test run.

```javascript
describe('Activate account', () => {
  ...
  afterEach(() => {
    queryClient.clear()
  })

  it('should render ActivateAccount', () => {
    render(<ActivateAccount />, { wrapper })

    expect(screen.getByText(email)).toBeTruthy()
    expect(screen.getByTestId('activation-code')).toBeTruthy()
    expect(screen.getByTestId('resend-code')).toBeTruthy()
    expect(screen.getByTestId('activate-button')).toBeTruthy()
  })
```

- use `jest.useFakeTimers()`

## Offline


I use React Query in my React Native mobile app to support offline feature. To test offline feature, you can install [Network Link Conditioner from Apple](https://developer.apple.com/download/more/?q=Additional%20Tools). Check the version of you Xcode and download “Additional Tools for XCode your version”. “Network Link Conditioner.prefPane” is in “Hardware” directory of the downloaded package.


### QueryClient with AsyncStoragePersister


To benefit from offline support, you have to use `queryClient` with `AsyncStorage`. 


Install the following 2 packages

- `@tanstack/query-async-storage-persister`
- `@tanstack/react-query-persist-client`

```typescript
import { MutationCache, QueryClient } from '@tanstack/react-query'

type UpdateJobContext = {
  original: Job | undefined
  new: Job
}

const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onSuccess: (data) => {
      // toast.success('Success')
    },
    onError: (error) => {
      // toast.error((error as Error).message)
      Sentry.Native.captureException(error)
    },
  }),
})

queryClient.setDefaultOptions({
  queries: {
    retry: 0,
    cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    staleTime: 2000,
    networkMode: 'offlineFirst',
  },
  mutations: {
    retry: 3,
    networkMode: 'offlineFirst',
  },

})

queryClient.setMutationDefaults([QueryKeys.updateJob], {
  mutationFn: async (job: Job) => {
    const response = await apis.updateJob(job)
    return response.data || {} as Job
  },
  onMutate: async (variables: Job): Promise<UpdateJobContext> => {
    await queryClient.cancelQueries({ queryKey: [QueryKeys.jobs]})
    await queryClient.cancelQueries({ queryKey: [QueryKeys.job, variables.jobNo]})

    // replace the old job with the optimistic new one
    const original = queryClient.getQueryData([QueryKeys.job, variables.jobNo]) as Job
    queryClient.setQueryData([QueryKeys.job, variables.jobNo], () => {
      return variables
    })
    queryClient.setQueryData([QueryKeys.jobs], (old: Job[] | undefined) =>
      old?.map(j => j.jobNo === variables.jobNo ? variables : j)
    )
    return { original, new: variables }
  },
  onError: (error, variables: Job, context: UpdateJobContext) => {
    // rollback to the old job
    queryClient.setQueryData([QueryKeys.job, variables.jobNo], context.original)
    queryClient.setQueryData([QueryKeys.jobs], (olds: Job[] | undefined) => {
      if (!olds) return []
      return olds.map(
        x => x.jobNo === variables.jobNo
          ? context.original || x
          : x
      )
    })
    Sentry.Native.captureException(error)
  },
  retry: 3,
})

export default queryClient
```


```typescript
const asyncPersist = createAsyncStoragePersister({
  storage: AsyncStorage,
})

function App() {
  ...
return (
	<PersistQueryClientProvider
	  client={queryClient}
	  persistOptions={{
	    maxAge: 1000 * 60 * 60 * 24, // 24 hours
	    persister: asyncPersist,
	  }}
	  onSuccess={() => {
	    console.log('Persisted query client successfully')
	    void queryClient
	      .resumePausedMutations()
	      .then(() => queryClient.invalidateQueries())
	  }}
	>
	  {signedIn ? <MainContainer /> : <AuthContainer />}
	</PersistQueryClientProvider>
	)
}
```


### Persisting Offline mutations


If you [persist offline mutations](https://tanstack.com/query/v4/docs/react/guides/mutations#persisting-offline-mutations) with the [**persistQueryClient plugin**](https://tanstack.com/query/v4/docs/react/plugins/persistQueryClient), mutations cannot be resumed when the page is reloaded unless you provide a default mutation function.


This is because when persisting to an external storage, only the state of mutations is persisted, as functions cannot be serialized. After hydration, the component that triggers the mutation might not be mounted, so calling **`resumePausedMutations`** might yield an error: **`No mutationFn found`**.


