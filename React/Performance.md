# What is React.memo and how does it work internally?
Answer

React.memo is a Higher Order Component (HOC) that memoizes a functional component.

It prevents unnecessary re-renders by comparing the current props with the previous props.

If the props have not changed, React reuses the previous rendered result instead of re-rendering the component.

# syntax
```jsx
const Child = React.memo(function Child(props) {
  return <h1>{props.name}</h1>;
});
```

# Q. What is Lazy Loading and Code Splitting in React?
# Answer

Code Splitting is a technique that breaks a large JavaScript bundle into smaller chunks.

Lazy Loading is a technique that loads those chunks only when they are needed.

Together, they improve application performance by reducing the initial bundle size and speeding up page load times.

Problem Without Code Splitting

Imagine your application has:

Problem Without Code Splitting
Imagine your application has:

Home
Products
Profile
Settings
Admin

Without code splitting:

App Load
   ↓
Download Entire Bundle
   ↓
User Sees Page

Even if the user only visits the Home page.

Solution

Load only what's needed.

Home Bundle
     ↓
User Visits Profile
     ↓
Profile Bundle Downloaded
This is Lazy Loading.

React Implementation
Normal Import

import Profile from "./Profile";
Loaded immediately.

Lazy Import
import React, { lazy } from "react";

const Profile = lazy(() =>
  import("./Profile")
);
Loaded only when required.

Using Suspense

React needs a fallback UI while the component is loading.
```jsx
import { Suspense, lazy } from "react";

const Profile = lazy(() =>
  import("./Profile")
);

function App() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Profile />
    </Suspense>
  );
}
```
Flow
User Visits Route
       ↓
Lazy Component Requested
       ↓
Chunk Downloaded
       ↓
Component Rendered

Real World Example
Route-Based Splitting

```jsx
const Home = lazy(() =>
  import("./pages/Home")
);

const Profile = lazy(() =>
  import("./pages/Profile")
);

const Settings = lazy(() =>
  import("./pages/Settings")
);

``` 
Only the visited page is downloaded.

Benefits
Faster Initial Load

Smaller JavaScript bundle.

Better Performance

Less code downloaded initially.

Better User Experience

Users don't wait for features they haven't accessed.

# Common Interview Questions
Q. Difference between Code Splitting and Lazy Loading?

Answer:

Code Splitting:

Split Bundle Into Chunks

Lazy Loading:

Load Chunks On Demand
Q. Why do we need Suspense?

Answer:

Because lazy-loaded components take time to download.

Suspense provides a fallback UI during loading.

Q. Can lazy() be used without Suspense?

Answer:

No.

Lazy components must be wrapped in Suspense.

Q. What is the most common use case?

Answer:

Route-based code splitting.

Example:

Home
Profile
Settings

Each route is loaded only when visited.

Interview Trap
Q. Does lazy loading reduce the total bundle size?

Answer:

No.

The total application code remains the same.

It reduces the initial bundle size by loading code later.

# What are Error Boundaries in React?
Answer

Error Boundaries are React components that catch JavaScript errors occurring in their child component tree and display a fallback UI instead of crashing the entire application.

They help improve application stability and user experience.
Problem

Without Error Boundaries:
```jsx
function Profile() {
  throw new Error("Something went wrong");
}
```
Result:
Entire React Application Crashes

# Solution:
Wrap components with an Error Boundary.
Error Occurs
      ↓
Error Boundary Catches It
      ↓
Fallback UI Displayed

# Example:
```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, info) {
    console.log(error);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong</h1>;
    }

    return this.props.children;
  }
}
```
Usage:
<ErrorBoundary>
  <Profile />
</ErrorBoundary>
What Can Error Boundaries Catch?

✅ Rendering Errors
throw new Error();
✅ Lifecycle Method Errors

✅ Constructor Errors
What Can't They Catch?

❌ Event Handlers
```jsx
<button
  onClick={() => {
    throw new Error();
  }}
>
❌ Async Code
setTimeout(() => {
  throw new Error();
});
❌ API Errors
❌ Server Side Rendering Errors

Common Interview Questions
Q. Can Error Boundaries be created using functional components?

Answer:

No.

Traditionally, Error Boundaries must be class components because they rely on:
getDerivedStateFromError()
componentDidCatch()
However, libraries like react-error-boundary provide functional patterns.

Q. Do Error Boundaries catch errors in themselves?

Answer:

No.

They only catch errors in their child component tree.

Q. Why are Error Boundaries important?

Answer:

They prevent the entire React application from crashing due to errors in a specific component subtree.