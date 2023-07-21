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

React Query works by means of hooks. Writing unit tests for the custom hooks can be done by means of the [react-hooks-testing-library](https://react-hooks-testing-library.com/). 

## Offline

I use React Query in my React Native mobile app to support offline feature. To test offline feature, you can install [Network Link Conditioner from Apple](https://developer.apple.com/download/more/?q=Additional%20Tools). 

