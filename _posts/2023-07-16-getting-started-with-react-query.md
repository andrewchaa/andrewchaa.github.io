---
title: Getting Started with React Query
date: 2023-07-16
tags:
  - react query
---

[React Query](https://tanstack.com/query/v3/docs/react/overview) is a data-fetching library for React and for React Native. It makes fetching, caching, synchronising, and updating server state in your react application easier. 

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
const { isLoading, error, data: jobsResponse } = useQuery('jobs', async () => {
  return await apis.getJobs(companyId)
}, {
  enabled: !!companyId,
})
```

The unique key, `jobs`, is used internally for refetching, caching, and sharing your queries throughout the application. 

Sometimes, your `userQuery` can depend on the value of a variable which is a result of another async operation. In that case, you use `enabled` option. The `enabled` option is used to toggle the query on and off. When `enabled` is false, the query will not run even when `companyId` changes. 

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

Use `useMutation` to save or update data.

Do `refetch` after the mutation succeeds

```javascript
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
    <NativeBaseProvider
      initialWindowMetrics={{
        frame: {x: 0, y: 0, width: 0, height: 0},
        insets: {top: 0, left: 0, right: 0, bottom: 0},
      }}>
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
const queryClient = new QueryClient()
queryClient.setDefaultOptions({
  queries: {
    cacheTime: 0,
  }
})
```

- Clean the query cache after each test

```javascript
afterEach(() => { queryClient.clear() })
```

- use `jest.useFakeTimers()`

## Offline

I use React Query in my React Native mobile app to support offline feature. To test offline feature, you can install [Network Link Conditioner from Apple](https://developer.apple.com/download/more/?q=Additional%20Tools). 

