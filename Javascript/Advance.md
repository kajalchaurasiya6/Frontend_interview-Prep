## 1  How Does Async/Await Work Internally in JavaScript?

## Answer

`async/await` is syntactic sugar built on top of Promises.

Internally, JavaScript converts async/await code into Promise-based code.

When JavaScript encounters an `await` statement:

1. It pauses the execution of the current async function.
2. It does not block the main thread.
3. Control is returned to the Event Loop.
4. The remaining code after `await` is scheduled as a Microtask.
5. Once the Promise settles, execution resumes from where it was paused.

---

## Example

```javascript 
async function test() {
  console.log("A");

  const result = await Promise.resolve("B");

  console.log(result);

  console.log("C");
}

test();

console.log("D");
```

Output:

```javascript 
A
D
B
C
```

## What Happens Internally?

### Async/Await Version

```javascript
async function test() {
  const result = await Promise.resolve("B");

  console.log(result);
}
```
### Rough Promise Equivalent

```javascript 
function test() {
  return Promise.resolve("B")
    .then(result => {
      console.log(result);
    });
}
```
The JavaScript engine transforms async/await into Promise chains behind the scenes.

## Execution Flow

### Step 1

```javascript 
console.log("A");
```

Output:

```javascript 
A
```
### Step 2
```javascript 
await Promise.resolve("B");
```
The Promise is already resolved.

However, execution does not continue immediately.

Instead:

* Current async function pauses.
* Remaining code is placed in the Microtask Queue.

### Step 3

JavaScript continues executing synchronous code.

```javascript 
console.log("D");
```
Output:

```javascript 
D
```
### Step 4

Call Stack becomes empty.

Microtask Queue executes.

```javascript 
console.log("B");
console.log("C");
```
Output:

```javascript 
B
C
```
## Important Concept

### await Does Not Block the Thread

Many developers think:

```javascript 
await fetchData();
```
blocks JavaScript.

It does not.

Only the current async function is paused.

The rest of the application continues running normally.

## Async Function Always Returns a Promise

```javascript 
async function getValue() {
  return 10;
}
```

Internally:

```javascript 
function getValue() {
  return Promise.resolve(10);
}
```

Output:

```javascript 
getValue(); // Promise<10>
```
## Error Handling Internally

```javascript 
async function test() {
  throw new Error("Error");
}
```
Internally:

```javascript 
function test() {
  return Promise.reject(
    new Error("Error")
  );
}
```

## Interview Answer (Short Version)

Async/await is syntactic sugar over Promises. When JavaScript encounters `await`, it pauses the current async function, returns control to the Event Loop, and schedules the remaining code as a microtask. Once the Promise settles, execution resumes from the point where it was paused.

---

## Follow-Up Questions

1. Is async/await synchronous or asynchronous?
2. Does await block the Event Loop?
3. Why does await use the Microtask Queue?
4. What does async return internally?
5. How is async/await related to Promises?

---

## Common Mistakes

❌ Thinking `await` blocks JavaScript.

```javascript 
await fetchData();
```

Only the current async function pauses.

The main thread continues executing.

---

❌ Thinking async functions return normal values.

```javascript 
async function test() {
  return 100;
}
```

Actually returns:

```javascript 
Promise.resolve(100)
```
## 2  Closures & Memory Leaks in JavaScript (React-Relevant)


# What is a Memory Leak?

A memory leak happens when **unused memory is not released**, causing performance issues over time.

In JavaScript, garbage collection handles memory automatically — but closures and references can accidentally prevent cleanup.

# 1. Closure Causing Memory Retention

## Example

```javascript id="m1"
function outer() {
  let bigData = new Array(1000000).fill("data");

  return function inner() {
    console.log("Hello");
  };
}
const fn = outer();
```
## What happens?

Even though `bigData` is not used in `inner()`, it is still kept in memory.

Why?

👉 Because `inner()` is a **closure**, it retains access to `outer()` scope.

# 2. Why this becomes a problem?

If large objects are captured unintentionally:

* Memory usage increases
* Garbage collector cannot free memory
* App performance degrades

# 3. React Example (Very Important)

```javascript id="m2"
function Component() {
  const largeData = new Array(1000000).fill("x");

  function handleClick() {
    console.log("Clicked");
  }

  return <button onClick={handleClick}>Click</button>;
}
```

---

## Problem?

Even though `largeData` is not used in `handleClick`, closure still keeps it in memory.

---

# 4. Event Listener Memory Leak

## Example

```javascript id="m3"
function attachListener() {
  const element = document.getElementById("btn");

  element.addEventListener("click", function () {
    console.log("clicked");
  });
}
```

---

## Problem

If event listeners are not removed:

* DOM element stays referenced
* memory is not freed

---

## Fix

```javascript id="m4"
function attachListener() {
  const element = document.getElementById("btn");

  function handler() {
    console.log("clicked");
  }

  element.addEventListener("click", handler);

  return () => {
    element.removeEventListener("click", handler);
  };
}
```

---

# 5. React useEffect Memory Leak

## Problem Example

```javascript id="m5"
useEffect(() => {
  const interval = setInterval(() => {
    console.log("Running");
  }, 1000);
}, []);
```

---

## Issue

Interval keeps running even after component unmount.

---

## Fix

```javascript id="m6"
useEffect(() => {
  const interval = setInterval(() => {
    console.log("Running");
  }, 1000);

  return () => clearInterval(interval);
}, []);
```

---

# 6. Why Closures Cause Leaks?

Closures retain references to outer scope variables.

```text id="m7"
inner function
   ↓
outer scope variables kept alive
   ↓
garbage collector cannot clean them
```

---

# 7. How Garbage Collection Works (Simple View)

JavaScript frees memory when:

* No references exist to an object

If closure keeps reference → object is NOT collected.

---

# 8. Best Practices

* Avoid storing large objects in closures unnecessarily
* Cleanup event listeners in React `useEffect`
* Clear intervals/timeouts
* Avoid capturing unused variables in closures

# 9. Interview Insight

> Closures do not cause memory leaks by themselves, but **unintended references inside closures can prevent garbage collection.**

# Interview One-Liner

> Memory leaks in JavaScript often occur when closures unintentionally keep references to unused variables, preventing garbage collection.

# React Connection

* useEffect cleanup is essential
* event listeners must be removed
* stale closures can retain state
* performance issues often come from retained references

## 3 # Higher-Order Functions (HOF) in JavaScript

# What is a Higher-Order Function?

A **Higher-Order Function (HOF)** is a function that:

1. Takes another function as an argument, OR
2. Returns another function

# 1. Function as Argument

## Example

```javascript id="h1"
function greet(name) {
  return `Hello ${name}`;
}

function processUser(callback) {
  console.log(callback("Kajal"));
}

processUser(greet);
```

### Output

```javascript id="h2"
Hello Kajal
```
# 2. Function Returning Function

## Example

```javascript id="h3"
function multiplier(x) {
  return function (y) {
    return x * y;
  };
}

const double = multiplier(2);

console.log(double(5));
```

### Output

```javascript id="h4"
10
```
# Why this works?

```text id="h5"
multiplier(2)
→ returns function (y)
→ remembers x = 2 (closure)
```

So HOF + Closure often work together.

# 3. Built-in Higher Order Functions

## map()

```javascript id="h6"
const nums = [1, 2, 3];

const result = nums.map((n) => n * 2);

console.log(result);
```

### Output

```javascript id="h7"
[2, 4, 6]
```

---

## filter()

```javascript id="h8"
const nums = [1, 2, 3, 4];

const result = nums.filter((n) => n % 2 === 0);

console.log(result);
```

### Output

```javascript id="h9"
[2, 4]
```

---

## reduce()

```javascript id="h10"
const nums = [1, 2, 3, 4];

const sum = nums.reduce((acc, curr) => acc + curr, 0);

console.log(sum);
```

### Output

```javascript id="h11"
10
```

---

# 4. Why HOFs are important?

They help in:

* Functional programming
* Cleaner code
* Reusability
* Data transformation

---

# 5. React Connection (VERY IMPORTANT)

React heavily uses HOFs:

## Example

```javascript id="h12"
const List = ({ items }) => {
  return items.map(item => <li>{item}</li>);
};
```

---

## Event handlers

```javascript id="h13"
<button onClick={() => console.log("Clicked")}>
  Click
</button>
```

---

# 6. HOF + Closure Combined Example

```javascript id="h14"
function logger(prefix) {
  return function (message) {
    console.log(prefix + ": " + message);
  };
}

const logInfo = logger("INFO");

logInfo("System started");
```

### Output

```javascript id="h15"
INFO: System started
```

---

# 7. Interview Trap

```javascript id="h16"
const arr = [1, 2, 3];

const result = arr.map(n => {
  if (n > 1) return n;
});

console.log(result);
```

### Output

```javascript id="h17"
[undefined, 2, 3]
```

---

# Why?

Missing return → `undefined` for some elements.

---

# Interview One-Liner

> A Higher-Order Function is a function that takes another function as an argument or returns a function as output.

## 4 # Functional Programming in JavaScript

# What is Functional Programming?

Functional Programming (FP) is a programming style where code is written using **pure functions, immutability, and function composition**.

It focuses on **what to do**, not **how to do it step-by-step**.

# 1. Pure Function

## Definition

A function is pure if:

* Same input → same output
* No side effects

---

## Example

```javascript id="fp1"
function add(a, b) {
  return a + b;
}

console.log(add(2, 3));
```

### Output

```javascript id="fp2"
5
```

---

## Impure Function

```javascript id="fp3"
let count = 0;

function increment() {
  count++;
  return count;
}
```

### Why impure?

* Depends on external variable
* Changes external state (side effect)

---

# 2. Immutability

## Definition

Data should NOT be modified directly.

---

## Bad Example

```javascript id="fp4"
const arr = [1, 2, 3];

arr.push(4);

console.log(arr);
```

### Output

```javascript id="fp5"
[1, 2, 3, 4]
```

---

## Good Example

```javascript id="fp6"
const arr = [1, 2, 3];

const newArr = [...arr, 4];

console.log(newArr);
```

### Output

```javascript id="fp7"
[1, 2, 3, 4]
```

---

# 3. Side Effects

## Definition

A side effect is when a function modifies something outside itself.

Examples:

* API calls
* DOM manipulation
* Logging
* modifying global variables

---

# 4. Function Composition

## Definition

Combining small functions to build complex logic.

---

## Example

```javascript id="fp8"
function add(a) {
  return a + 2;
}

function multiply(a) {
  return a * 3;
}

const result = multiply(add(5));

console.log(result);
```

### Output

```javascript id="fp9"
21
```

---

# 5. Functional Programming in Arrays

## map

```javascript id="fp10"
const nums = [1, 2, 3];

const doubled = nums.map(n => n * 2);
```

---

## filter

```javascript id="fp11"
const nums = [1, 2, 3, 4];

const evens = nums.filter(n => n % 2 === 0);
```

---

## reduce

```javascript id="fp12"
const sum = [1, 2, 3].reduce((acc, curr) => acc + curr, 0);
```

---

# 6. Why Functional Programming is Important?

* Predictable code
* Easier debugging
* Better testability
* No unexpected side effects

---

# 7. React Connection (VERY IMPORTANT)

React is heavily based on functional programming:

## State immutability

```javascript id="fp13"
setState(prev => [...prev, newItem]);
```

---

## Pure rendering concept

React components should behave like pure functions:

```javascript id="fp14"
function Component(props) {
  return <h1>{props.name}</h1>;
}
```

---

## No side effects in render

Side effects are handled in:

* `useEffect`
* event handlers

---

# 8. Interview Trap

```javascript id="fp15"
const obj = { count: 0 };

function update(o) {
  o.count = o.count + 1;
  return o;
}

const newObj = update(obj);

console.log(obj === newObj);
```

### Output

```javascript id="fp16"
true
```

---

## Why?

Same object reference was modified → not immutable.

---

# Interview One-Liner

> Functional programming is a style where code is written using pure functions, immutability, and avoids side effects to make programs predictable and easier to maintain.

## 5 Debouncing vs Throttling in JavaScript

# Why do we need them?

In real applications, some events fire **too frequently**, such as:

* search input typing
* window resize
* scroll events
* API calls on keypress

If we call functions every time, it causes:

* performance issues
* unnecessary API calls

So we use:

* Debouncing
* Throttling

---

# 1. Debouncing

## Definition

Debouncing ensures that a function is executed **only after a delay has passed since the last call**.

---

## Real-life example

👉 Search bar suggestions (Google search)

---

## How it works

If user keeps typing:

* reset timer every keystroke
* execute only after user stops typing

---

## Code Example

```javascript id="db1"
function debounce(fn, delay) {
  let timer;

  return function (...args) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
```

---

## Usage

```javascript id="db2"
const search = debounce((text) => {
  console.log("API Call for:", text);
}, 500);

search("r");
search("re");
search("rea");
search("react");
```

---

## Output

```text id="db3"
API Call for: react
```

✔ Only last call executes

---

# 2. Throttling

## Definition

Throttling ensures a function is executed **at most once in a fixed time interval**.

---

## Real-life example

👉 Scroll event (loading more content)

---

## How it works

* Function runs immediately
* Then ignores calls until time interval passes

---

## Code Example

```javascript id="th1"
function throttle(fn, limit) {
  let inThrottle;

  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;

      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}
```
## Usage

```javascript id="th2"
const handleScroll = throttle(() => {
  console.log("Scroll event triggered");
}, 1000);

window.addEventListener("scroll", handleScroll);
```

---

## Output

```text id="th3"
Runs once every 1 second
```

---

# 3. Debouncing vs Throttling

| Feature   | Debouncing             | Throttling         |
| --------- | ---------------------- | ------------------ |
| Execution | After delay            | At fixed intervals |
| Frequency | Only last call         | Regular intervals  |
| Use case  | Search input           | Scroll / resize    |
| Behavior  | Waits until user stops | Runs periodically  |

---

# 4. Key Difference (Simple)

* Debounce → waits for **pause**
* Throttle → ensures **regular execution**

---

# 5. React Connection (VERY IMPORTANT)

## Debounce in React

```javascript id="db3"
useEffect(() => {
  const handler = setTimeout(() => {
    console.log(searchText);
  }, 500);

  return () => clearTimeout(handler);
}, [searchText]);
```

---

## Throttle in React

Used for:

* scroll listeners
* resize handlers

---

# 6. Interview Trap

### Q: What happens if we don’t use debounce in search?

* API called on every keystroke
* performance issue
* backend overload

---

# 7. Interview One-Liner

> Debouncing delays function execution until after a pause in events, while throttling ensures a function runs at most once in a fixed interval.

---

## 6  Event Delegation in JavaScript

# What is Event Delegation?

Event delegation is a technique where you attach an event listener to a **parent element instead of individual child elements**, and handle events using event bubbling.

# Why is it used?

* Better performance (fewer event listeners)
* Handles dynamic elements automatically
* Cleaner code

---

# 1. Without Event Delegation (Bad Approach)

```javascript id="ed1"
const items = document.querySelectorAll(".item");

items.forEach(item => {
  item.addEventListener("click", () => {
    console.log("Clicked");
  });
});
```

---

## Problem

* Adds multiple event listeners
* Poor performance if many elements
* Doesn’t handle dynamically added elements

---

# 2. With Event Delegation (Good Approach)

```javascript id="ed2"
document.getElementById("parent").addEventListener("click", (e) => {
  if (e.target.classList.contains("item")) {
    console.log("Clicked");
  }
});
```

---

## How it works?

Instead of attaching event to each child:

* attach to parent
* detect which child triggered event using `event.target`

---

# 3. Event Bubbling Flow

```text id="ed3"
Child → Parent → Document → Window
```

Events move upward in DOM tree.

---

# 4. Example DOM Structure

```html id="ed4"
<div id="parent">
  <button class="item">A</button>
  <button class="item">B</button>
</div>
```

Clicking button triggers parent listener.

---

# 5. Why Event Delegation Works?

Because of **event bubbling**:

* Event starts from target element
* Moves upward through ancestors
* Parent can catch it

---

# 6. Advantages

## ✔ Performance

Only one event listener

## ✔ Dynamic elements

Works even if new elements are added later

```javascript id="ed5"
document.getElementById("parent").innerHTML += `
  <button class="item">New</button>
`;
```

No need to attach new listener

---

# 7. React Connection (VERY IMPORTANT)

React uses a similar concept called:

> Synthetic Event System

* React attaches events at root level
* Uses delegation internally
* Improves performance

Example:

```javascript id="ed6"
<button onClick={handleClick}>
  Click
</button>
```

Even though it looks like per-element listener, React optimizes it.

---

# 8. Event Delegation vs Direct Binding

| Feature          | Direct Binding | Event Delegation |
| ---------------- | -------------- | ---------------- |
| Listeners        | Multiple       | Single           |
| Performance      | Low            | High             |
| Dynamic elements | No support     | Supported        |
| Memory usage     | High           | Low              |

---

# 9. Interview Trap

### Q: Will event delegation work if event bubbling is stopped?

```javascript id="ed7"
event.stopPropagation();
```

### Answer:

❌ No — bubbling is required for delegation to work.

---

# 10. Interview One-Liner

> Event delegation is a technique where a single event listener is attached to a parent element to handle events from its child elements using event bubbling.

---

## 7  Event Bubbling vs Event Capturing in JavaScript

# Why do we need this?

When an event occurs on an element, JavaScript needs to decide:

> In what order should ancestors and child elements receive the event?

This is handled in **3 phases of event flow**.

# 1. Event Flow Phases

## There are 3 phases:

### 1. Capturing Phase (Trickling down)

Event moves from top → target

### 2. Target Phase

Event reaches the actual element

### 3. Bubbling Phase

Event moves from target → top

---

# 2. Event Flow Diagram

```text id="ef1"
Window
  ↓ (Capturing)
Document
  ↓
HTML
  ↓
Body
  ↓
Parent
  ↓
Target Element   ← Event happens here
  ↑
Parent
  ↑ (Bubbling)
Body
  ↑
Document
  ↑
Window
```

---

# 3. Event Bubbling (Default Behavior)

## Example

```javascript id="ef2"
document.getElementById("parent").addEventListener("click", () => {
  console.log("Parent clicked");
});

document.getElementById("child").addEventListener("click", () => {
  console.log("Child clicked");
});
```

---

## Output when clicking child

```text id="ef3"
Child clicked
Parent clicked
```

---

## Why?

Because event bubbles upward from child → parent

---

# 4. Event Capturing

## Syntax

```javascript id="ef4"
element.addEventListener("click", handler, true);
```

`true` = capturing phase

---

## Example

```javascript id="ef5"
document.getElementById("parent").addEventListener("click", () => {
  console.log("Parent");
}, true);

document.getElementById("child").addEventListener("click", () => {
  console.log("Child");
}, true);
```

---

## Output

```text id="ef6"
Parent
Child
```

---

# 5. Key Difference

| Feature   | Bubbling       | Capturing      |
| --------- | -------------- | -------------- |
| Direction | Child → Parent | Parent → Child |
| Default   | Yes            | No             |
| Usage     | Most common    | Rare           |

---

# 6. stopPropagation()

## Example

```javascript id="ef7"
child.addEventListener("click", (e) => {
  e.stopPropagation();
  console.log("Child clicked");
});
```

---

## Effect

* Stops event from moving further (up or down depending on phase)

---

# 7. stopImmediatePropagation()

Stops:

* other listeners on same element
* further propagation

---

# 8. Real-world Use Case

### Bubbling

Used in:

* event delegation
* parent-level event handling

### Capturing

Used in:

* rare debugging cases
* intercepting events before child executes

---

# 9. React Connection (VERY IMPORTANT)

React uses:

> Event delegation + bubbling internally

So:

* Events are handled at root
* React simulates bubbling behavior
* Improves performance

---

# 10. Interview Trap

### Q: Which phase is used in event delegation?

✔ Answer:

> Bubbling phase

Because parent catches child events after they occur.

---

# 11. Interview One-Liner

> Event propagation has three phases: capturing (top-down), target, and bubbling (bottom-up). By default, JavaScript uses bubbling.

## 8  Async JavaScript: setTimeout vs Promises (Microtask vs Macrotask)

# Why this topic matters?

JavaScript is:

> Single-threaded but asynchronous

So it uses:

* Call Stack
* Web APIs
* Task Queue (Macrotasks)
* Microtask Queue

# 1. Basic Execution Model

```text id="as1"
Code → Call Stack → Web APIs → Queues → Event Loop → Call Stack
```

# 2. Two Important Queues

## 1. Macrotask Queue (Task Queue)

Examples:

* setTimeout
* setInterval
* setImmediate (Node)


## 2. Microtask Queue

Examples:

* Promise.then / catch / finally
* queueMicrotask
* MutationObserver


# 3. Key Rule (VERY IMPORTANT)

> Microtasks always run before Macrotasks


# 4. Example 1

```javascript id="as2"
console.log("1");

setTimeout(() => console.log("2"), 0);

Promise.resolve().then(() => console.log("3"));

console.log("4");
```

---

## Execution Order

### Step-by-step:

1. Synchronous code runs first

```text id="as3"
1
4
```

2. Microtask queue

```text id="as4"
3
```

3. Macrotask queue

```text id="as5"
2
```

---

## Final Output

```text id="as6"
1
4
3
2
```

---

# 5. Example 2 (Tricky)

```javascript id="as7"
console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

Promise.resolve()
  .then(() => console.log("C"))
  .then(() => console.log("D"));

console.log("E");
```

---

## Output

```text id="as8"
A
E
C
D
B
```

---

# 6. Why Promises run before setTimeout?

Because:

| Type       | Queue     | Priority |
| ---------- | --------- | -------- |
| Promise    | Microtask | High     |
| setTimeout | Macrotask | Lower    |

Event loop always clears:

> Microtasks BEFORE Macrotasks

---

# 7. Nested Microtasks Example

```javascript id="as9"
Promise.resolve()
  .then(() => {
    console.log("1");
    return Promise.resolve();
  })
  .then(() => console.log("2"));
```

---

## Output

```text id="as10"
1
2
```

Microtasks keep re-queueing before moving to macrotasks.

---

# 8. setTimeout(0) is NOT immediate

```javascript id="as11"
setTimeout(() => console.log("X"), 0);
```

It still waits for:

* current stack to finish
* microtasks to complete
* then executes

---

# 9. Real-world Use Cases

## Microtasks

* API response handling
* state updates batching

## Macrotasks

* UI rendering delays
* polling
* animations timing

---

# 10. React Connection (VERY IMPORTANT)

React internally uses:

* microtask batching for state updates
* scheduling updates before paint

That’s why multiple `setState` calls are batched.

# 11. Common Interview Trap

### Q: What will run first?

```javascript id="as12"
setTimeout(() => console.log("A"), 0);

Promise.resolve().then(() => console.log("B"));

console.log("C");
```
✔ Answer:

```text id="as13"
C
B
A
```
# 12. Interview One-Liner

> Microtasks (Promises) always execute before Macrotasks (setTimeout) because the event loop prioritizes the microtask queue after each synchronous execution.


 





