# 1 Context API vs Redux — When would you use each?
Answer

Both Context API and Redux are used to share data across components, but they solve different levels of state management problems.

Context API is suitable for simple global state, whereas Redux is designed for large-scale and complex state management.
```jsx
| Context API                 | Redux                          |
| --------------------------- | ------------------------------ |
| Built into React            | External library               |
| Solves prop drilling        | Full state management solution |
| Simple to set up            | More setup required            |
| Best for small-medium apps  | Best for large apps            |
| All consumers may re-render | More optimized updates         |
| Limited debugging tools     | Excellent DevTools support     |
```

Context API Example:
```jsx
const ThemeContext = createContext();

<ThemeContext.Provider value="dark">
  <App />
</ThemeContext.Provider>
```

Redux Example

```jsx
const userSlice = createSlice({
  name: "user",
  initialState: {
    name: ""
  },
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload;
    }
  }
});
```
Redux Data Flow

Component
    ↓
Dispatch Action
    ↓
Reducer
    ↓
Store Updated
    ↓
UI Re-renders

Common Interview Questions
Q. Can Context API replace Redux?

Answer:

For small applications, yes.

For large applications with complex state management, Redux is generally a better choice.

Q. Why does Redux perform better in large applications?

Answer:

Redux allows components to subscribe to specific slices of state, reducing unnecessary re-renders.

Q. What is Redux Toolkit?

Answer:

Redux Toolkit (RTK) is the official recommended way to write Redux code.

It reduces boilerplate and simplifies store, reducer, and action creation.

Interview Trap
Q. Should I use Redux for every application?

Answer:

No.

Many applications work perfectly with:

useState
useReducer
Context API

..........................................................................................................................

## Redux Tool Kit

Q. What is Redux Toolkit (RTK) and why was it introduced?
Answer

Redux Toolkit (RTK) is the official, recommended way to write Redux applications.

It was introduced to reduce Redux boilerplate code and simplify state management.

Before Redux Toolkit, developers had to manually create:

Action Types
Action Creators
Reducers
Store Configuration

RTK automates much of this process.

Problem with Traditional Redux

To update user data:

Action Type
```jsx
const SET_USER = "SET_USER";
```

Action Creator

```jsx

const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});
```

Reducer

```jsx
function userReducer(state = {}, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}
```
Lots of boilerplate code.

## Redux toolkit solution

```jsx
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
  },
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
Much cleaner.
```
# Main Features of RTK
1. createSlice()

Creates:

Reducer
Actions
Action Types

Automatically.

2. configureStore()

Creates Redux store with sensible defaults.
```jsx
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
```
3. createAsyncThunk()

Handles async operations.

```jsx
export const fetchUsers = createAsyncThunk(
  "users/fetch",
  async () => {
    const response = await fetch("/users");
    return response.json();
  }
);
```
4. Immer Integration

RTK uses Immer internally.

You can write:

state.name = "Kajal";

Even though Redux state remains immutable behind the scenes.

# Typical folder structure:
```jsx
src/
 ├── app/
 │    └── store.js
 │
 ├── features/
 │    └── user/
 │         ├── userSlice.js
 │         └── userAPI.js
 ```

 Common Interview Questions
Q. Why was Redux Toolkit introduced?

Answer:

To reduce Redux boilerplate, simplify configuration, and provide best practices out of the box.

Q. What does createSlice do?

Answer:

It automatically generates:

Reducers
Actions
Action Types

from a single configuration object.

Q. Can we mutate state inside createSlice?

Answer:

Yes, it appears mutable:
state.name = "Kajal";
But RTK uses Immer internally to maintain immutability.

Q. What is the recommended way to use Redux today?

Answer:

Redux Toolkit.

The Redux team recommends RTK for all new Redux applications.


## 2 . Explain createSlice() in Redux Toolkit

# answer
createSlice() is a Redux Toolkit function that automatically generates:

Reducer
Action Creators
Action Types

from a single configuration object.

It helps reduce Redux boilerplate significantly.

# syntax
```jsx
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {},
});
```

Example

```jsx
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",

  initialState: {
    name: "",
  },

  reducers: {
    setUser: (state, action) => {
      state.name = action.payload;
    },

    clearUser: (state) => {
      state.name = "";
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
```

# What Does createSlice Generate?

From:
```jsx
reducers: {
  setUser: (state, action) => {
    state.name = action.payload;
  }
}
```
## RTK automatically generates:

# Action Type
"user/setUser"

# Action Creator
setUser("Kajal");

# returns:
{
  type: "user/setUser",
  payload: "Kajal"
}

# Reducer
userSlice.reducer

## Understanding the Configuration
name
```javascript
name: "user"
```
Used as a prefix for generated action types.
Example:
user/setUser
user/clearUser

initialState
initialState: {
  name: ""
}
Defines the default state.

reducers

Contains functions that update state.

reducers: {
  setUser: () => {}
}
Each reducer automatically creates an action creator.

Dispatch Example
dispatch(setUser("Kajal"));

Generated action:
{
  type: "user/setUser",
  payload: "Kajal"
}

Why Can We Mutate State?

This confuses many interview candidates.

Example:

state.name = "Kajal";

Normally Redux requires immutable updates.

RTK uses Immer internally.

Behind the scenes:
return {
  ...state,
  name: "Kajal",
}; is generated automatically.

Common Interview Questions
Q. What are the three main properties of createSlice?

Answer:

name
initialState
reducers
Q. Does createSlice create actions automatically?

Answer:

Yes.

RTK automatically generates action creators and action types.

Q. What is action.payload?

Answer:

The data passed during dispatch.

Example:

dispatch(setUser("Kajal"));
action.payload === "Kajal"
Q. Can createSlice handle async operations?

Answer:

Not directly.

Async operations are typically handled using:

createAsyncThunk()

or RTK Query.

Interview Trap
Q. Is state actually mutated inside createSlice?

Answer:

No.

It only appears mutable.

Immer converts the mutations into immutable updates behind the scenes.

## Q. What is Redux Store and how does data flow in Redux?
Answer

The Redux Store is the central place where the entire application state is stored.

It acts as a single source of truth for the application.

Components can:

Read data from the store using useSelector
Update data by dispatching actions using useDispatch

# What is Stored in Redux Store?
Example:
{
  user: {
    name: "Kajal"
  },
  cart: {
    items: []
  },
  theme: {
    mode: "dark"
  }
}
The store contains all Redux state.

Creating a Store

```jsx
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
```

Providing Store to React

```jsx
import { Provider } from "react-redux";
import { store } from "./store";

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
```
Now every component can access Redux state.

# Redux data flow:
```jsx
Component
    ↓
Dispatch Action
    ↓
Reducer
    ↓
Store Updated
    ↓
Component Re-renders
```

Example
Dispatch Action
dispatch(setUser("Kajal"));

Generated Action:

{
  type: "user/setUser",
  payload: "Kajal"
}
Reducer Executes
setUser: (state, action) => {
  state.name = action.payload;
}
Store Updates
{
  user: {
    name: "Kajal"
  }
}
Component Re-renders
const user = useSelector(
  state => state.user.name
);

Component receives updated value.

useSelector

Used to read data from the store.

const user = useSelector(
  state => state.user
);
useDispatch

Used to dispatch actions.

const dispatch = useDispatch();

dispatch(setUser("Kajal"));
Common Interview Questions
Q. Why is Redux Store called a Single Source of Truth?

Answer:

Because the entire application state is maintained in one centralized store.

Q. Can components modify the store directly?

Answer:

No.

Components must dispatch actions.

Reducers update the store.

Q. What triggers Redux store updates?

Answer:

Dispatched actions processed by reducers.

Q. Does Redux store itself cause re-renders?

Answer:

Not directly.

Components subscribed via useSelector re-render when the selected state changes.

Interview Trap
Q. What is the correct Redux flow?

❌ Wrong

Component
↓
Reducer
↓
Action
↓
Store

✅ Correct

Component
↓
Dispatch Action
↓
Reducer
↓
Store Updated
↓
UI Updated

## What is CSR (Client-Side Rendering) vs SSR (Server-Side Rendering)?
Answer

CSR and SSR are two different approaches for rendering web applications.

The main difference is where the HTML is generated.

CSR → HTML is generated in the browser.
SSR → HTML is generated on the server.
CSR (Client-Side Rendering)
How It Works
Browser
   ↓
Downloads HTML
   ↓
Downloads JS Bundle
   ↓
React Executes
   ↓
UI Rendered
Example

Typical React application created using:

Vite
Create React App

Initial HTML:

<div id="root"></div>

React builds the UI in the browser.

Advantages of CSR

✅ Rich user interactions

✅ Good SPA experience

✅ Less server load

✅ Faster client-side navigation

Disadvantages of CSR

❌ Slower first page load

❌ SEO challenges

❌ User may see blank screen while JS loads

SSR (Server-Side Rendering)
How It Works
Request
    ↓
Server Generates HTML
    ↓
Browser Receives HTML
    ↓
Page Visible Immediately
    ↓
React Hydrates
Example

Frameworks:

Next.js
Remix

Server sends:

<h1>Products</h1>

instead of:

<div id="root"></div>
Advantages of SSR

✅ Better SEO

✅ Faster First Contentful Paint

✅ Better performance on slower devices

✅ Better social media previews

Disadvantages of SSR

❌ Increased server load

❌ More complex architecture

❌ Slower server response times

CSR vs SSR
Feature	CSR	SSR
Rendering Location	Browser	Server
Initial Load	Slower	Faster
SEO	Poorer	Better
Server Cost	Lower	Higher
First Contentful Paint	Slower	Faster
Client Navigation	Faster	Usually Fast
Real Example
CSR
Gmail
Dashboard Apps
Internal Portals
Admin Panels
SSR
E-commerce
Blogs
News Websites
Marketing Pages

Examples include:

Amazon
Flipkart
Common Interview Questions
Q. Why is SSR better for SEO?

Answer:

Because search engines receive fully rendered HTML from the server instead of waiting for JavaScript execution.

Q. Why is CSR slower on the first load?

Answer:

The browser must download and execute JavaScript before rendering the UI.

Q. Is Next.js CSR or SSR?

Answer:

Both.

Next.js supports:

CSR
SSR
SSG
ISR
Interview Trap
Q. Does SSR eliminate JavaScript?

Answer:

No.

React JavaScript is still downloaded.

The server only renders the initial HTML.

React then attaches event handlers on the client.

This process is called:

Hydration

Q. What is Hydration in React?

Interviewers often ask this immediately after SSR.

Expected flow:

SSR
  ↓
Browser Receives HTML
  ↓
Hydration
  ↓
Interactive React App


### Q. What is Hydration in React?
Answer

Hydration is the process where React attaches event listeners and React logic to HTML that was already rendered on the server.

After hydration, the static HTML becomes a fully interactive React application.

Why Do We Need Hydration?

In SSR:

Server sends HTML like:

<button>Increment</button>

The button is visible immediately.

However:

No React State
No Event Handlers
No Interactivity

yet.

React must connect its component tree to the existing HTML.

This process is called:

Hydration
Flow
Request
   ↓
Server Renders HTML
   ↓
Browser Receives HTML
   ↓
Page Visible
   ↓
React JS Downloads
   ↓
Hydration
   ↓
Interactive Application
Example
Server Output
<h1>Count: 0</h1>

<button>
  Increment
</button>

User sees the content immediately.

But clicking won't work until React hydrates the page.

After Hydration

React attaches:

onClick={() => setCount(count + 1)}

Now:

Button Works
State Works
Hooks Work
CSR vs SSR + Hydration
CSR
Download JS
      ↓
Render UI
      ↓
Interactive
SSR
Server HTML
      ↓
Page Visible
      ↓
Download JS
      ↓
Hydration
      ↓
Interactive
Why Is Hydration Important?

Without hydration:

Static HTML Only

With hydration:

Fully Interactive React Application
Common Interview Questions
Q. Does hydration render the page again?

Answer:

Not exactly.

React reuses the server-rendered HTML and attaches event listeners and internal React state to it.

Q. Why is hydration needed in SSR?

Answer:

Because server-rendered HTML is static.

Hydration makes it interactive by connecting React to the existing DOM.

Q. What happens if server HTML and client HTML don't match?

Answer:

React may show:

Hydration Mismatch Warning

Example:

Date.now()
Math.random()

can generate different values on server and client.

Hydration Mismatch Example

❌ Problem

<p>{Date.now()}</p>

Server:

100

Client:

105

React detects different content.

Interview Trap
Q. Is hydration the same as rendering?

Answer:

No.

Rendering creates HTML.

Hydration attaches React behavior to already existing HTML.