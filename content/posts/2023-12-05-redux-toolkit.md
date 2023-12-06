---
title: Redux Toolkit
date: 2023-12-05
tags:
  - redux
  - rtk
---

Redux Toolkit is a toolset for efficient Redux development. It is intended to be the standard way to write Redux logic, addressing common concerns and simplifying most Redux tasks. 


**Simplification of Store Setup**: Redux Toolkit simplifies the process of setting up the Redux store. With functions like `configureStore()`, you can easily configure reducers, middleware, and Redux DevTools with sensible defaults.


**Creating Reducers and Actions**: The `createSlice()` function automates the process of creating reducers and corresponding actions. A "slice" is a collection of Redux reducer logic and actions for a single feature in your app. `createSlice` automatically generates action creators and action types that correspond to the reducers and state.


**Immutable State Updates**: Redux Toolkit uses Immer library internally, allowing you to write simpler immutable updates with normal mutable code. This means you can directly modify the state in your reducers without having to use spread operators or other immutability helpers.


**Asynchronous Logic with createAsyncThunk**: Redux Toolkit provides the `createAsyncThunk` API for handling asynchronous logic. This function automatically generates action types for different stages of an async request (pending, fulfilled, rejected) and returns a thunk that handles the request.


**Simplified Redux Data Fetching**: Redux Toolkit offers the `createEntityAdapter` for managing normalized data in the store. It provides utility functions for managing normalized data in a more straightforward way.


**Enhanced Developer Experience**: It integrates well with Redux DevTools, providing features like action traceability and state diffing, which are valuable for debugging.


**Opinionated Configuration**: Redux Toolkit comes with pre-configured settings that work well for most applications, such as default inclusion of commonly used middleware like Redux Thunk for async actions.


**Reduced Boilerplate**: It significantly reduces the amount of boilerplate code you need to write for a Redux application. The API is designed to be more straightforward and easier to understand, which is particularly beneficial for those new to Redux.


## Basic example


```typescript
/* App.js */
import { IceCream } from "react-kawaii";
import { useDispatch, useSelector } from "react-redux";
import { updateCatMood, MOODS } from "./mood";

import "./App.css";

function App() {
  const dispatch = useDispatch();
  const currentMood = useSelector((state) => state.mood);

  const handleMoodUpdate = (evt) => {
    const mood = evt.target.dataset.type;
    dispatch(updateCatMood(mood));
  };

  return (
    <div className="App">
      <IceCream size={320} mood={currentMood} color="#FDA7DC" />
      <section>
        {Object.values(MOODS).map((mood) => (
          <button
            data-type={mood}
            key={mood}
            className={`${currentMood === mood ? "selected" : ""}`}
            onClick={handleMoodUpdate}
          >
            {mood}
          </button>
        ))}
      </section>
    </div>
  );
}

export default App;
```


```typescript
/* index.js */
import React from "react";
import ReactDOM from "react-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import moodReducer from "./mood";
import App from "./App";


//store
const store = configureStore({ reducer: moodReducer });

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```


```typescript
/* mood.js */
import { createSlice } from "@reduxjs/toolkit";

//action type
export const UPDATE_MOOD = "UPDATE_MOOD";

export const MOODS = {
  SAD: "sad",
  SHOCKED: "shocked",
  HAPPY: "happy",
  BLISSFUL: "blissful",
  LOVESTRUCK: "lovestruck",
  EXCITED: "excited",
  KO: "ko",
};
const INITIAL_STATE = { mood: MOODS.SAD };

const flappyMoodSlice = createSlice({
  name: "mood",
  initialState: INITIAL_STATE,
  reducers: {
    updateCatMood: (state, action) => {
      state.mood = action.payload;
    },
  },
});

export const { updateCatMood } = flappyMoodSlice.actions;
export default flappyMoodSlice.reducer;
```


## `merge`


`merge` can be provided to merge an incoming response value into the current cache data. If supplied, no automatic structural sharing will be applied - it's up to you to update the cache appropriately.


Since RTKQ normally replaces cache entries with the new response, you will usually need to use this with the `serializeQueryArgs` or  `forceRefetch` options to keep an existing cache entry so that it can be updated.


Since this is wrapped with Immer, you may either mutate the `currentCacheValue` directly, or return a new value, but _not_ both at once.


Will only be called if the existing `currentCacheData` is _not_ `undefined` - on first response, the cache entry will just save the response data directly.


```typescript
import {
  createApi,
  fetchBaseQuery,
  defaultSerializeQueryArgs,
} from '@reduxjs/toolkit/query/react'
interface Post {
  id: number
  name: string
}

createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (build) => ({
    listItems: build.query<string[], number>({
      query: (pageNumber) => `/listItems?page=${pageNumber}`,
      // Only have one cache entry because the arg always maps to one string
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        currentCache.push(...newItems)
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
    }),
  }),
})
```


The `serializeQueryArgs` function is used for caching and invalidation purposes. In RTK Query, each unique set of arguments for a query endpoint generates a separate cache entry. This behavior is crucial for ensuring that different arguments (like different page numbers in a paginated API) don't overwrite each other in the cache. The `serializeQueryArgs` function is what determines how these arguments are turned into a unique cache key.


In this example, the `serializeQueryArgs` function is returning only the `endpointName` as the cache key. This is an unusual usage because it means that all queries to this endpoint, regardless of their actual arguments (like different page numbers), will share the same cache entry. This approach is not typical for most use cases, especially when dealing with paginated or parameterized queries, as it would lead to all different queries being treated as if they were the same.are cached separately.


Since `serializeQueryArgs` returns only the `endpointName`, it means the cache does not differentiate between different pages of the API response. This approach is suitable here because you always want to fetch and merge all pages of data into a single cache entry (as indicated by your `merge` function).


