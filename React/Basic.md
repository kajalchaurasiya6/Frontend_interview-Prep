# 1 What is React?
# Ans:
 React is an open-source JavaScript library for building user interfaces, particularly Single Page Applications (SPAs).

It uses a component-based architecture, allowing developers to build reusable and maintainable UI components.

React was developed by Meta Platforms.
# Key Features
Component-Based Architecture
Virtual DOM
One-Way Data Flow
Declarative UI
Reusable Components
# Example:
```Javascript
function App() {
  return <h1>Hello World</h1>;
}
```
# Interview one liner:
React is a declarative, component-based JavaScript library used for building efficient and reusable user interfaces.

# 2. What is Virtual DOM in React?
# Answer

The Virtual DOM (VDOM) is a lightweight JavaScript representation of the Real DOM.

Instead of updating the browser's DOM directly, React first updates the Virtual DOM, compares it with the previous Virtual DOM, identifies the changes, and then updates only the necessary parts of the Real DOM.

This process improves performance by minimizing expensive DOM manipulations.

# Why Do We Need Virtual DOM?

Updating the Real DOM is expensive because:

DOM operations are slow compared to JavaScript operations
Repainting and reflowing the UI can impact performance
Frequent updates can make applications sluggish

React optimizes this by using the Virtual DOM

# How Virtual DOM Works
## Step 1: Initial Render

React creates: Virtual DOM Tree
and renders it to:Real DOM

## Step 2: State Change
setCount(count + 1);
React creates a new Virtual DOM tree.

## Step 3: Diffing
React compares:
Old Virtual DOM
        vs
New Virtual DOM
to find differences.
This process is called: Diffing

## Step 4: Update Real DOM

React updates only the changed nodes instead of re-rendering the entire page.

## Common Interview Questions
```javascript
Q. Is Virtual DOM faster than Real DOM?

Answer:

Not exactly.

The Real DOM itself is not slower than the Virtual DOM.

React is faster because it minimizes unnecessary Real DOM updates through diffing and batching.

Q. Does React update the entire DOM on every state change?

Answer:

No.

React compares the old and new Virtual DOM trees and updates only the changed parts.

Q. What algorithm does React use with Virtual DOM?

Answer:

React uses a Diffing Algorithm during the Reconciliation process to identify changes efficiently.

Q. Is Virtual DOM a React feature?

Answer:

No.

Virtual DOM is a concept. React is one implementation that uses it.

React Interview Trap
Q. Does Virtual DOM eliminate Real DOM updates?

Answer:

No.

The Real DOM is still updated.

The Virtual DOM only helps React decide what needs to be updated.

Interview One-Liner

Virtual DOM is a lightweight JavaScript representation of the Real DOM that React uses to efficiently detect changes and update only the necessary parts of the UI.
```
# 3 What is Reconciliation in React?
# Answer

Reconciliation is the process React uses to compare the old Virtual DOM with the new Virtual DOM and determine the minimum number of changes needed to update the Real DOM.

Its goal is to update the UI efficiently without re-rendering the entire page.

# 4 Q. Why are Keys Important in React?
# Answer

Keys are special attributes used by React to uniquely identify elements in a list.

They help React efficiently determine which items have been:

Added
Removed
Updated
Reordered
during the reconciliation process.
Keys help React uniquely identify list items during reconciliation, enabling efficient DOM updates and preventing unnecessary re-renders.