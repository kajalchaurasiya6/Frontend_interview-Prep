# 1. What is `useState()` and how does it work?

`useState()` is a React Hook that allows functional components to manage state.

It returns an array containing the current state value and a setter function used to update that state.

```jsx
const [count, setCount] = useState(0);
```
Here:

* `count` is the current state value.
* `setCount` is the function used to update the state.
* `0` is the initial state value.

When the setter function is called, React schedules a re-render of the component. During the re-render, React provides the updated state value and updates the UI if necessary.

```jsx
setCount(count + 1);
```

React does not immediately update the state variable. Instead, it schedules the update and re-renders the component with the new state.

When the next state depends on the previous state, we should use the functional update form:

```jsx
setCount(prev => prev + 1);
```

This ensures we always receive the latest state value and avoid stale state issues.

### Interview One-Liner

`useState()` is a React Hook that allows functional components to manage state by returning the current state value and a setter function that triggers re-renders when the state changes.





# 2 What is useState() in React?
# Answer

useState() is a React Hook that allows functional components to manage state.

It returns an array containing:

The current state value
A setter function used to update that state

When the setter function is called, React updates the state and re-renders the component.

# 3 What is `useState()` and how does it work?

`useState()` is a React Hook that allows functional components to manage state.

It returns an array containing the current state value and a setter function used to update that state.

```jsx
const [count, setCount] = useState(0);
```
Here:
* `count` is the current state value.
* `setCount` is the function used to update the state.
* `0` is the initial state value.

When the setter function is called, React schedules a re-render of the component. During the re-render, React provides the updated state value and updates the UI if necessary.

```jsx
setCount(count + 1);
```
React does not immediately update the state variable. Instead, it schedules the update and re-renders the component with the new state.

When the next state depends on the previous state, we should use the functional update form:

```jsx
setCount(prev => prev + 1);
```

This ensures we always receive the latest state value and avoid stale state issues.

### Interview One-Liner

`useState()` is a React Hook that allows functional components to manage state by returning the current state value and a setter function that triggers re-renders when the state changes.

# 4 Q. Why does React not update state immediately?

Because React batches state updates for performance optimization and schedules re-renders efficiently rather than updating the UI on every state change instantly.

# 5 What is useEffect() and why do we use it?
# Answer

useEffect() is a React Hook used to perform side effects in functional components.

Side effects are operations that interact with things outside the component rendering process, such as:

API calls
Timers (setTimeout, setInterval)
Event listeners
DOM manipulations
Subscriptions

useEffect runs after React has rendered the component.

## Syntax:
```JSX
useEffect(() => {
  // Side effect code

  return () => {
    // Cleanup code (optional)
  };
}, [dependencies]);
```
# When Does useEffect Run?
1. No Dependency Array
```JSX
useEffect(() => {
  console.log("Runs");
});
````
Runs:Initial render,Every rerender

# 2.  Empty Dependency Array

useEffect(() => {
  console.log("Runs once");
}, []);

Runs: Initial render only

# 3. Dependency array
useEffect(() => {
  console.log("Count changed");
}, [count]);
Runs:✓ Initial render
✓ Whenever count changes

Why Do We Need useEffect?
React components should remain pure during rendering.
Avoid:
function App() {
  fetch("/users");
}
Better:
useEffect(() => {
  fetch("/users");
}, []);
Runs only once when the component mounts.

Cleanup Function

Used to clean up resources when:

Component unmounts
Effect runs again
````JSX
useEffect(() => {
  const timer = setInterval(() => {
    console.log("Running");
  }, 1000);

  return () => {
    clearInterval(timer);
  };
}, []);
Prevents memory leaks
```
# Q. Why is the dependency array important?

# Answer:

It controls when the effect should re-run.

React compares dependency values between renders and executes the effect when any dependency changes.

# 6  Explain the React Component Lifecycle in Functional Components
# Answer

A React component goes through three main phases:

Mounting
Updating
Unmounting

In functional components, these lifecycle phases are handled using useEffect().
```JSX
1. Mounting

Mounting means:

Component is created and added to the DOM.

Equivalent class lifecycle:

componentDidMount()

Functional Component:

useEffect(() => {
  console.log("Mounted");
}, []);

Runs only once after the initial render.

2. Updating

Updating happens when:

State changes
Props change

Example:

const [count, setCount] = useState(0);
useEffect(() => {
  console.log("Count Updated");
}, [count]);

Runs:

Initial render
+
Whenever count changes

Equivalent class lifecycle:

componentDidUpdate()
3. Unmounting

Unmounting means:

Component is removed from the DOM.

Example:

useEffect(() => {
  return () => {
    console.log("Unmounted");
  };
}, []);

Equivalent class lifecycle:

componentWillUnmount()
| Class Component      | Functional Component                    |
| -------------------- | --------------------------------------- |
| componentDidMount    | useEffect(() => {}, [])                 |
| componentDidUpdate   | useEffect(() => {}, [deps])             |
| componentWillUnmount | useEffect(() => { return cleanup }, []) |
```
## 7 What causes a React component to re-render?
## Answer

A React component re-renders whenever React detects that the component may need to display updated data.

The most common causes are:

State changes
Props changes
Parent component re-renders
Context value changes
```jsx
Q. Does every state update cause a re-render?

Answer:

React schedules a re-render.

However, if the new state is equal to the previous state, React may skip unnecessary DOM updates.

Q. Does changing a ref cause a re-render?

Answer:

No.

useRef values persist across renders but updating them does not trigger a re-render.

Q. Does a child re-render when the parent re-renders?

Answer:

Yes, by default.

React will re-render child components unless optimization techniques like React.memo are used.

React Interview Trap
Q. Does React re-render the entire page?

Answer:

No.

React re-renders the component tree virtually and updates only the necessary parts of the Real DOM through reconciliation.
```
# 8 What is useRef() and why do we use it?
# Answer

useRef() is a React Hook that creates a mutable object whose value persists across component re-renders.

Unlike state, updating a ref does not trigger a re-render.
```jsx
Syntax: const ref = useRef(initialValue);
Returns : {
  current: initialValue
}

Common Interview Questions
Q. Why doesn't useRef trigger re-renders?

Answer:

Because React does not track changes to ref.current.

Updating a ref changes the object directly without notifying React.

Q. Does useRef persist across renders?

Answer:

Yes.

The same ref object is preserved between renders.

Q. Can useRef store previous values?

Answer:

Yes.

A very common pattern:

const prevCount = useRef();

useEffect(() => {
  prevCount.current = count;
}, [count]);
Q. When should you use useRef instead of useState?

Answer:

When the value needs to persist between renders but should not cause a UI update.

Examples:

Timer IDs
Previous values
DOM references

If I update a ref, will the UI update automatically?

Answer:

No.

Since ref updates do not trigger re-renders, the UI will not reflect the new value unless another render occurs.
``` 
## 9 What is the difference between useMemo, useCallback, and React.memo?
Answer

All three are performance optimization techniques in React, but they optimize different things.
| Feature       | What it Memoizes? |
| ------------- | ----------------- |
| `useMemo`     | Value             |
| `useCallback` | Function          |
| `React.memo`  | Component         |

1. useMemo
Purpose

Memoizes the result of an expensive computation.

Without useMemo, the calculation runs on every render.
Example:
```jsx
const expensiveValue = useMemo(() => {
  return calculateExpensiveValue(data);
}, [data]);
```
React recalculates only when data changes.
use case
```jsx
const sortedUsers = useMemo(() => {
  return users.sort((a, b) => a.name.localeCompare(b.name));
}, [users]);
```
2. useCallback
Purpose

Memoizes a function reference.

Without useCallback, a new function is created on every render.
Example
```jsx
const handleClick = useCallback(() => {
  console.log("Clicked");
}, []);
The same function reference is reused.
Without useCallback, child components may re-render because they receive a new function reference every render.

3. React.memo
Purpose

Prevents unnecessary re-renders of a component when props haven't' changed.
const Child = React.memo(({ name }) => {
  console.log("Child Rendered");

  return <h1>{name}</h1>;
});
Common Interview Questions
Q. Does useCallback prevent re-renders?

Answer:

No.

It only memoizes a function reference.

To prevent child re-renders, it is commonly used together with React.memo.

Q. Does useMemo prevent re-renders?

Answer:

No.

It memoizes a computed value, not a component render.

Q. Can useMemo be used for functions?

Answer:

Yes, but useCallback is the preferred and cleaner API.

Q. Is React.memo a replacement for useMemo?

Answer:

No.

They solve different problems:

React.memo → Component memoization
useMemo → Value memoization

Should we use useMemo and useCallback everywhere?

Answer:

No.

They also have a cost.

Use them only when:

Expensive calculations exist
Child re-renders are causing performance issues
Profiling shows a bottleneck

Premature optimization can make code harder to maintain.
```
Quick revision:
useMemo
    ↓
Memoize Value

useCallback
    ↓
Memoize Function

React.memo
    ↓
Memoize Component

# 10 What is Context API and when would you use it?
Answer

Context API is a React feature that allows data to be shared across multiple components without passing props manually through every level of the component tree.

It helps solve the problem of Prop Drilling.
# What is Prop Drilling?

** Suppose we have:**
App
 ↓
Header
 ↓
Navbar
 ↓
Profile
And Profile needs user data.

Without Context:
```jsx
<App user={user} />
<Header user={user} />
<Navbar user={user} />
<Profile user={user} />
Even though Header and Navbar don't need it. 
This is called: Prop Drilling


How Context API Solves It:
Context allows components to access shared data directly.
App
 ↓
Context Provider
 ↓
Any Child Component

No need to pass props through intermediate components.
Step 1: Create Context

import { createContext } from "react";

export const UserContext = createContext();

Step 2: Provide Context

<UserContext.Provider value={{ name: "Kajal" }}>
  <App />
</UserContext.Provider>

Step 3: Consume Context

import { useContext } from "react";

function Profile() {
  const user = useContext(UserContext);

  return <h1>{user.name}</h1>;
}

** Flow **
Provider
   ↓
Context Value
   ↓
useContext()
   ↓
Consumer Component

Comon use case
1. Authentication
user
token
permissions

2. Theme

light
dark

3. language
English
Hindi
French

4. Global App setting
preferences
feature flags

```
Q. What problem does Context API solve?

Answer:

It solves prop drilling by allowing data to be shared directly across components.

Q. Does Context replace Redux?

Answer:

Not completely.

Context is good for simple global state.

Redux is better for large and complex state management requirements.

Q. What happens when Context value changes?

Answer:

All components consuming that context re-render.

This is a very common interview question.

Q. Can multiple contexts be used?

Answer:

Yes.

Example:
<AuthProvider>
  <ThemeProvider>
    <App />
  </ThemeProvider>
</AuthProvider>

Q. Is Context API a state management library?

Answer:

No.

Context is a data-sharing mechanism.

You still need state (useState, useReducer, etc.) to manage the data.

# Q. What are Custom Hooks in React?
# Answer

A Custom Hook is a JavaScript function that uses one or more React Hooks and allows reusable stateful logic to be shared between components.

Custom Hooks help avoid code duplication and improve code reusability.

Why Do We Need Custom Hooks?

Imagine multiple components need:

API fetching
Window resize listener
Debouncing
Form handling
Local storage logic

Without Custom Hooks:

Duplicate Logic
      ↓
Harder Maintenance

With Custom Hooks:

Reusable Logic
      ↓
Cleaner Components
Naming Convention

A Custom Hook must start with:

use

Examples:

useFetch
useDebounce
useLocalStorage
usePrevious
Example: useDocumentTitle
Custom Hook
import { useEffect } from "react";

function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
Usage
function Profile() {
  useDocumentTitle("Profile");

  return <h1>Profile Page</h1>;
}
Example: usePrevious
import { useEffect, useRef } from "react";

function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

Usage:

const prevCount = usePrevious(count);
Example: useDebounce
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] =
    useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
Rules of Custom Hooks
✅ Valid
function useFetch() {
  const [data, setData] = useState([]);
}
❌ Invalid
function fetchData() {
  const [data, setData] = useState([]);
}

Hooks should start with:

use
Common Interview Questions
Q. What is the difference between a Custom Hook and a normal function?

Answer:

A Custom Hook can use React Hooks like:

useState
useEffect
useRef

A normal JavaScript function cannot use React Hooks.

Q. Does a Custom Hook share state between components?

Answer:

No.

Each component gets its own independent state.

Example:

const count1 = useCounter();
const count2 = useCounter();

These states are separate.

Q. Why use Custom Hooks?

Answer:

To reuse stateful logic across multiple components.

Interview Trap
Q. Is a Custom Hook a special React feature?

Answer:

No.

A Custom Hook is simply a JavaScript function that follows React Hook rules.