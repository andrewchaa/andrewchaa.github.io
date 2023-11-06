---
title: Making async api call in React useEffect
date: 2022-09-10
tags:
  - react
  - async
---

`async` is the default for api calls in most of the cases. useEffect() is not an async function, so you need to handle promise to make an async api call inside. 

```typescript
const [jobItems, setJobItems] = useState<IJobItem[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await apis.getJobs('20102918293')
      setJobItems(response.data)
    }

    fetchData().catch(console.error)
  }, [])
```

