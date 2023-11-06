---
title: My take on Next.js
date: 2023-04-04
tags:
  - nextjs
  - react
---

I have been using create-react-app for a while for my side project. Since Next.js 13 was released and is gaining popularity, I decided to give it a try. I usually prefer to learn while doing.


Since I host all my APIs and websites on AWS, I needed to deploy the Next.js app to AWS. I found this helpful guide on how to do it: [**https://aws.amazon.com/blogs/mobile/amplify-next-js-13/**](https://aws.amazon.com/blogs/mobile/amplify-next-js-13/).


### Implementing Google Authentication


[https://www.telerik.com/blogs/how-to-implement-google-authentication-nextjs-app-using-nextauth](https://www.telerik.com/blogs/how-to-implement-google-authentication-nextjs-app-using-nextauth)


### Update query string to persist state across page reload or revisits

1. Use `useRouter` to add or update the query string
2. Use useSearchParams to [retrieve a value from the query string](https://nextjs.org/docs/app/api-reference/functions/use-search-params)

```typescript
'use client'
import { useRouter, useSearchParams } from 'next/navigation'

export default function RegistrationsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
	const [warrantyYear, setWarrantyYear] = useState('-1')
	const query = useQuery(['registrations', warrantyYear], async () => {
	  const resposne = await querybyWarrantyYear(warrantyYear)
	  return resposne.data
	}, { enabled: !!warrantyYear })
	
	useEffect(() => {
	  setWarrantyYear(searchParams?.get('warrantyYear') || '-1')
	}, [searchParams])
	
  return(
    ...
		<LabeledListBox
		  label='Warranty Year'
		  listOptions={warrantyYearListOptions}
		  selectedValue={warrantyYear}
		  onChange={(e) => {
		    setWarrantyYear(e)
		    router.push(`/warranty/registrations?warrantyYear=${e}`)
		  }}
		...
  )
```


### Parse query string


`useSearchParams` is a Client Component hook that lets you read the current URLR’s query string.


```typescript
'use client'
 
import { useSearchParams } from 'next/navigation'
 
export default function SearchBar() {
  const searchParams = useSearchParams()
 
  const search = searchParams.get('search')
 
  // URL -> `/dashboard?search=my-project`
  // `search` -> 'my-project'
  return <>Search: {search}</>
}
```


### Handle pagination


```typescript
const Pagination = (props: Props) => {
  const router = useRouter()
  const path = usePathname()
  const first = (props.page - 1) * props.pageSize + 1
  const last = first + props.count - 1

  const onClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    direction: 'next' | 'previous'
  ) => {
    e.preventDefault()
    let newPage = direction === 'next'
      ? props.page + 1
      : props.page - 1
    if (newPage < 1) newPage = 1

    const queryString = props.pageSize
      ? `page=${newPage}&pageSize=${props.pageSize}`
      : `page=${newPage}`

    router.push(`${path}?${queryString}`)
  }

  return (
		...
		<p className="text-sm text-gray-700">
      Showing <span className="font-medium">{first}</span> to <span className="font-medium">{last}</span> of{' '}
      <span className="font-medium">{props.total}</span> results
	  </p>
```


