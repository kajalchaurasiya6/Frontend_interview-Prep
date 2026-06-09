## 1 What are call(), apply(), and bind() in JavaScript?

## Answer

`call()`, `apply()`, and `bind()` are methods that allow us to explicitly set the value of `this` when invoking a function.

They are commonly used when we want to borrow methods from another object or control the execution context of a function.

## call()

The `call()` method invokes the function immediately and accepts arguments individually.

### Syntax

```javascript
functionName.call(thisArg, arg1, arg2, ...)
```

### Example

```javascript
function greet(city) {
  console.log(`Hello, I am ${this.name} from ${city}`);
}

const user = {
  name: "Kajal"
};

greet.call(user, "Mumbai");
```

Output:

```javascript
Hello, I am Kajal from Mumbai
```

## apply()

The `apply()` method invokes the function immediately and accepts arguments as an array.

### Syntax

```javascript
functionName.apply(thisArg, [arg1, arg2, ...])
```

### Example

```javascript
function greet(city, country) {
  console.log(`Hello, I am ${this.name} from ${city}, ${country}`);
}

const user = {
  name: "Kajal"
};

greet.apply(user, ["Mumbai", "India"]);
```

Output:

```javascript
Hello, I am Kajal from Mumbai, India
```

## bind()

The `bind()` method does not execute the function immediately.

Instead, it returns a new function with `this` permanently bound to the specified object.

### Syntax

```javascript
const newFunction = functionName.bind(thisArg);
```

### Example

```javascript
function greet() {
  console.log(`Hello, I am ${this.name}`);
}

const user = {
  name: "Kajal"
};

const boundGreet = greet.bind(user);

boundGreet();
```

Output:

```javascript
Hello, I am Kajal
```

## Key Differences

| Method  | Executes Immediately | Arguments              |
| ------- | -------------------- | ---------------------- |
| call()  | Yes                  | Passed individually    |
| apply() | Yes                  | Passed as an array     |
| bind()  | No                   | Returns a new function |

## Interview Answer (Short Version)

`call()`, `apply()`, and `bind()` are used to explicitly set the value of `this`. `call()` and `apply()` execute the function immediately, while `bind()` returns a new function with `this` bound to the provided object.

## Real-World Usage

### Event Handlers

```javascript
const handleClick = obj.handleClick.bind(obj);
```

### Function Borrowing

```javascript
const person1 = {
  name: "Kajal"
};

const person2 = {
  name: "John"
};

function greet() {
  console.log(this.name);
}

greet.call(person1);
greet.call(person2);
```

## Follow-Up Questions

1. What is explicit binding?
2. Why is `bind()` commonly used in React class components?
3. Can an arrow function's `this` be changed using `call`, `apply`, or `bind`?
4. What is function borrowing?
5. What is the difference between implicit and explicit binding?

## 2  What is the Event Loop in JavaScript?

## Answer

JavaScript is a single-threaded language, meaning it can execute only one task at a time.
However, JavaScript can still handle asynchronous operations such as API calls, timers, and user events using the Event Loop.

The Event Loop continuously checks whether the Call Stack is empty. If it is, it moves tasks from the Callback Queue or Microtask Queue to the Call Stack for execution.

## Components Involved

### 1. Call Stack

The Call Stack keeps track of function execution.

```javascript
function first() {
  console.log("First");
}

function second() {
  console.log("Second");
}

first();
second();
```

Execution Order:

```javascript
First
Second
```

Functions are pushed onto and popped off the Call Stack.

### 2. Web APIs

Browser features such as:

* setTimeout
* DOM Events
* fetch
* Geolocation

are handled outside the Call Stack by Web APIs.

## 3. Callback Queue (Macrotask Queue)

Callbacks from:

* setTimeout
* setInterval
* DOM Events

are placed in the Callback Queue.

### 4. Microtask Queue

Higher-priority queue containing:

* Promise callbacks (`then`, `catch`, `finally`)
* queueMicrotask()

Microtasks execute before macrotasks.

## Example

```javascript
console.log("Start");

setTimeout(() => {
  console.log("Timeout");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise");
});

console.log("End");
```

Output:

```javascript
Start
End
Promise
Timeout
```

## Step-by-Step Execution

### Step 1

```javascript
console.log("Start");
```

Output:

```javascript
Start
```

### Step 2

```javascript
setTimeout(...)
```

Timer is sent to Web APIs.

### Step 3

```javascript
Promise.resolve().then(...)
```

Promise callback goes to the Microtask Queue.

### Step 4

```javascript
console.log("End");
```

Output:

```javascript
End
```

### Step 5

Call Stack becomes empty.

Event Loop checks queues:

1. Microtask Queue
2. Callback Queue

Promise callback executes first:

```javascript
Promise
```

Then timeout callback:

```javascript
Timeout
```

## Interview Answer (Short Version)

The Event Loop is a mechanism that allows JavaScript to perform asynchronous operations. It continuously monitors the Call Stack and moves tasks from the Microtask Queue and Callback Queue to the Call Stack when it becomes empty. Microtasks have higher priority than macrotasks.

## Real-World Usage

The Event Loop is involved whenever you use:

```javascript
fetch(...)
```

```javascript
setTimeout(...)
```

```javascript
Promise.then(...)
```

```javascript
async/await
```

## Follow-Up Questions

1. What is the Call Stack?
2. What is the difference between Microtask Queue and Callback Queue?
3. Why does Promise execute before setTimeout?
4. Is JavaScript truly asynchronous?
5. How does async/await use the Event Loop internally?

## Common Mistakes

❌ Thinking `setTimeout(fn, 0)` executes immediately.

```javascript
setTimeout(() => {
  console.log("Hello");
}, 0);
```

It still waits until:

* Current Call Stack is empty
* All Microtasks are completed

❌ Assuming Promise callbacks go into the Callback Queue.

Promises go into the **Microtask Queue**, which has higher priority.

## 3 What is a Promise in JavaScript?

## Answer

A Promise is an object that represents the eventual completion or failure of an asynchronous operation.

It allows us to handle asynchronous code in a cleaner and more readable way compared to callbacks.

A Promise can be in one of three states:

1. Pending
2. Fulfilled (Resolved)
3. Rejected

## Promise States

### Pending

Initial state.

```javascript
const promise = new Promise((resolve, reject) => {
  // async operation
});
```

### Fulfilled

The operation completed successfully.

```javascript
const promise = new Promise((resolve) => {
  resolve("Success");
});
```

### Rejected

The operation failed.

```javascript
const promise = new Promise((resolve, reject) => {
  reject("Something went wrong");
});
```

## Creating a Promise

```javascript
const fetchData = new Promise((resolve, reject) => {
  const success = true;

  if (success) {
    resolve("Data fetched successfully");
  } else {
    reject("Failed to fetch data");
  }
});
```

## Consuming a Promise

```javascript
fetchData
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });
```

Output:

```javascript
Data fetched successfully
```

## Promise Chaining

Promises can be chained using multiple `.then()` calls.

```javascript
Promise.resolve(10)
  .then(num => num * 2)
  .then(num => num + 5)
  .then(result => console.log(result));
```

Output:

```javascript
25
```

Each `.then()` returns a new Promise.

## Why Were Promises Introduced?

Callbacks often lead to deeply nested code known as Callback Hell.

```javascript
getUser(user => {
  getOrders(user.id, orders => {
    getPayment(orders[0].id, payment => {
      console.log(payment);
    });
  });
});
```

Promises make the code easier to read and maintain.

## Interview Answer (Short Version)

A Promise is an object that represents the eventual completion or failure of an asynchronous operation. It has three states: Pending, Fulfilled, and Rejected. Promises help manage asynchronous code and avoid callback hell.

## Real-World Usage

### API Calls

```javascript
fetch("/api/users")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

### React Applications

* API requests
* Authentication
* File uploads
* Data fetching libraries

## Follow-Up Questions

1. What are Promise states?
2. What happens when a Promise is resolved?
3. What happens if a Promise is rejected?
4. What is Promise chaining?
5. How do Promises solve Callback Hell?
6. What is the difference between Promises and Async/Await?

## Common Mistakes

❌ Forgetting to return a value inside `.then()`.

```javascript
Promise.resolve(10)
  .then(num => {
    num * 2;
  })
  .then(console.log);
```

Output:

```javascript
undefined
```

Because nothing was returned.

Correct:

```javascript
Promise.resolve(10)
  .then(num => num * 2)
  .then(console.log);
```

❌ Not handling rejections.

```javascript
Promise.reject("Error");
```

Always use `.catch()` to handle errors.

## 4 What is Promise Chaining in JavaScript?

## Answer

Promise chaining is a technique where multiple `.then()` methods are connected together so that the output of one Promise becomes the input of the next Promise.

Each `.then()` returns a new Promise, allowing asynchronous operations to be executed sequentially.

## Example

```javascript
Promise.resolve(10)
  .then(num => {
    console.log(num);
    return num * 2;
  })
  .then(num => {
    console.log(num);
    return num + 5;
  })
  .then(num => {
    console.log(num);
  });
```

Output:

```javascript
10
20
25
```

## How It Works

### First then()

```javascript
.then(num => {
  return num * 2;
})
```

Receives:

```javascript
10
```

Returns:

```javascript
20
```

### Second then()

Receives:

```javascript
20
```

Returns:

```javascript
25
```

### Third then()

Receives:

```javascript
25
```

and logs it.

## Returning a Promise

A `.then()` can also return another Promise.

```javascript
Promise.resolve(10)
  .then(num => {
    return Promise.resolve(num * 2);
  })
  .then(result => {
    console.log(result);
  });
```

Output:

```javascript
20
```

The next `.then()` waits for the returned Promise to resolve.

## Error Handling in Chaining

```javascript
Promise.resolve(10)
  .then(num => {
    throw new Error("Something went wrong");
  })
  .catch(error => {
    console.log(error.message);
  });
```

Output:

```javascript
Something went wrong
```

Errors automatically propagate down the chain until a `.catch()` handles them.

## Why Use Promise Chaining?

Instead of:

```javascript
getUser()
  .then(user => {
    getOrders(user.id)
      .then(orders => {
        getPayment(orders[0].id)
          .then(payment => {
            console.log(payment);
          });
      });
  });
```

Use:

```javascript
getUser()
  .then(user => getOrders(user.id))
  .then(orders => getPayment(orders[0].id))
  .then(payment => console.log(payment))
  .catch(error => console.log(error));
```

This is cleaner, more readable, and easier to maintain.

## Interview Answer (Short Version)

Promise chaining is the process of connecting multiple `.then()` methods, where the result of one Promise is passed to the next. Since each `.then()` returns a new Promise, asynchronous operations can be executed sequentially and errors can be handled centrally using `.catch()`.

## Follow-Up Questions

1. Does `.then()` return a new Promise?
2. What happens if a Promise is returned from `.then()`?
3. How does error propagation work in Promise chains?
4. What is Promise Flattening?
5. How is Promise chaining different from nested callbacks?

## Common Mistakes

❌ Forgetting to return a value.

```javascript
Promise.resolve(10)
  .then(num => {
    num * 2;
  })
  .then(console.log);
```

Output:

```javascript
undefined
```

Because nothing was returned.

Correct:

```javascript
Promise.resolve(10)
  .then(num => {
    return num * 2;
  })
  .then(console.log);
```
## 5 What is Promise.all() in JavaScript?

## Answer

`Promise.all()` is a Promise utility method that takes an array of Promises and returns a single Promise.

It waits for **all Promises to resolve** successfully.

If any Promise rejects, `Promise.all()` immediately rejects with that error.

## Syntax

```javascript
Promise.all([promise1, promise2, promise3]);
```

## Example

```javascript
const p1 = Promise.resolve("A");
const p2 = Promise.resolve("B");
const p3 = Promise.resolve("C");

Promise.all([p1, p2, p3])
  .then(result => {
    console.log(result);
  });
```

Output:

```javascript
["A", "B", "C"]
```

## Important Point

The results are returned in the same order as the input Promises, regardless of which Promise resolves first.

```javascript
const p1 = new Promise(resolve =>
  setTimeout(() => resolve("A"), 3000)
);

const p2 = new Promise(resolve =>
  setTimeout(() => resolve("B"), 1000)
);

Promise.all([p1, p2])
  .then(console.log);
```

Output:

```javascript
["A", "B"]
```

Even though `p2` resolves first.

## Rejection Behavior

If any Promise rejects, the entire `Promise.all()` rejects immediately.

```javascript
const p1 = Promise.resolve("A");
const p2 = Promise.reject("Error");
const p3 = Promise.resolve("C");

Promise.all([p1, p2, p3])
  .then(console.log)
  .catch(console.log);
```

Output:

```javascript
Error
```

The successful results are discarded.

## Real-World Example

Fetching multiple APIs simultaneously:

```javascript
Promise.all([
  fetch("/users"),
  fetch("/posts"),
  fetch("/comments")
])
  .then(responses => {
    console.log(responses);
  });
```

Instead of waiting for each request one after another, all requests start in parallel.

## Interview Answer (Short Version)

`Promise.all()` takes an array of Promises and returns a single Promise that resolves when all Promises resolve successfully. If any Promise rejects, it immediately rejects with that error.

## Advantages

* Executes asynchronous tasks in parallel.
* Improves performance.
* Returns all results together.

## Disadvantages

* Fails fast.
* One rejection causes the entire operation to fail.

## Follow-Up Questions

1. What happens if one Promise rejects?
2. Does Promise.all execute Promises sequentially?
3. In what order are results returned?
4. What is the difference between Promise.all and Promise.allSettled?
5. When should Promise.all be used?

## Common Mistakes

❌ Assuming results come in completion order.

```javascript
Promise.all([p1, p2]);
```

Results always follow the input order.

❌ Assuming successful Promises are returned after one rejection.

```javascript
Promise.all([
  Promise.resolve("A"),
  Promise.reject("Error")
]);
```

The entire Promise rejects immediately.
## 6 What is Promise.allSettled() in JavaScript?

## Answer

`Promise.allSettled()` is a Promise utility method that takes an array of Promises and waits for all of them to settle, regardless of whether they are fulfilled or rejected.

Unlike `Promise.all()`, it does not fail if one of the Promises rejects. Instead, it returns the result of every Promise along with its status.

## Syntax

```javascript
Promise.allSettled([promise1, promise2, promise3]);
```

## Example

```javascript
const p1 = Promise.resolve("A");
const p2 = Promise.reject("B");
const p3 = Promise.resolve("C");

Promise.allSettled([p1, p2, p3])
  .then(result => {
    console.log(result);
  });
```

## Output

```javascript
[
  {
    status: "fulfilled",
    value: "A"
  },
  {
    status: "rejected",
    reason: "B"
  },
  {
    status: "fulfilled",
    value: "C"
  }
]
```

## How It Works

* Waits for all Promises to complete.
* Does not stop if a Promise rejects.
* Returns an array of result objects.
* Each object contains:

  * `status`
  * `value` (for fulfilled Promises)
  * `reason` (for rejected Promises)

## Promise.all() vs Promise.allSettled()

| Feature                         | Promise.all() | Promise.allSettled() |
| ------------------------------- | ------------- | -------------------- |
| Waits for all Promises          | ✅             | ✅                    |
| Fails if one Promise rejects    | ✅             | ❌                    |
| Returns results of all Promises | ❌             | ✅                    |
| Provides status of each Promise | ❌             | ✅                    |

## Real-World Usage

Suppose a dashboard loads data from multiple APIs:

```javascript
Promise.allSettled([
  fetchUsers(),
  fetchOrders(),
  fetchNotifications()
])
.then(results => {
  console.log(results);
});
```

Even if one API fails, the results from the other APIs are still available.

## Interview Answer (Short Version)

`Promise.allSettled()` waits for all Promises to complete, regardless of whether they are fulfilled or rejected, and returns an array containing the status and result of each Promise.

## Follow-Up Questions

1. What is the difference between Promise.all() and Promise.allSettled()?
2. When should Promise.allSettled() be preferred?
3. Does Promise.allSettled() reject if one Promise fails?
4. What properties are available in the result object?

## Common Mistakes

❌ Expecting `Promise.allSettled()` to reject when a Promise fails.

```javascript
Promise.allSettled([
  Promise.resolve("A"),
  Promise.reject("B")
]);
```

It still resolves and returns the status of both Promises.

❌ Assuming every result object contains a `value`.

Rejected Promises contain:

```javascript
{
  status: "rejected",
  reason: "Error"
}
```

instead of a `value`.
## 7 What is Promise.race() in JavaScript?

## Answer

`Promise.race()` takes an array of Promises and returns a Promise that settles as soon as the first Promise settles (either fulfilled or rejected).

It does not wait for the remaining Promises to complete.

## Syntax

```javascript 
Promise.race([promise1, promise2, promise3]);
```

## Example (Resolved First)

```javascript 
const p1 = new Promise(resolve =>
  setTimeout(() => resolve("A"), 1000)
);

const p2 = new Promise(resolve =>
  setTimeout(() => resolve("B"), 2000)
);

Promise.race([p1, p2])
  .then(console.log);
```

## Output

```javascript 
A
```

Because `p1` resolves first.

## Example (Rejected First)

```javascript 
const p1 = new Promise((resolve, reject) =>
  setTimeout(() => reject("Error"), 1000)
);

const p2 = new Promise(resolve =>
  setTimeout(() => resolve("Success"), 2000)
);

Promise.race([p1, p2])
  .then(console.log)
  .catch(console.log);
```

## Output

```javascript 
Error
```

Because the first settled Promise was rejected.

## Important Point

`Promise.race()` does not care whether the first Promise is fulfilled or rejected.

It simply returns the result of the first Promise that settles.

## Real-World Usage

### API Request Timeout

```javascript 
const fetchData = fetch("/users");

const timeout = new Promise((_, reject) =>
  setTimeout(() => reject("Request Timeout"), 5000)
);

Promise.race([fetchData, timeout])
  .then(console.log)
  .catch(console.log);
```

If the API takes longer than 5 seconds, the timeout Promise wins.

## Promise.all vs Promise.race

| Feature                        | Promise.all() | Promise.race()                 |
| ------------------------------ | ------------- | ------------------------------ |
| Waits for all Promises         | ✅             | ❌                              |
| Returns first settled Promise  | ❌             | ✅                              |
| Rejects if one Promise rejects | ✅             | Depends on which settles first |
| Returns array of results       | ✅             | ❌                              |

## Interview Answer (Short Version)

`Promise.race()` takes multiple Promises and returns the result of the first Promise that settles, whether it is fulfilled or rejected.

## Follow-Up Questions

1. Does Promise.race() wait for all Promises?
2. What happens if the first settled Promise rejects?
3. What is a real-world use case for Promise.race()?
4. What is the difference between Promise.race() and Promise.any()?

## Common Mistakes

❌ Assuming `Promise.race()` returns the first fulfilled Promise.

```javascript 
Promise.race([
  Promise.reject("Error"),
  Promise.resolve("Success")
]);
```

Output:

```javascript 
Error
```

Because rejection settled first.

## 8 What is Promise.any() in JavaScript?

## Answer

`Promise.any()` takes an array of Promises and returns a Promise that resolves as soon as the first Promise is fulfilled (resolved).
It rejects only if all Promises are rejected.

## Syntax

```javascript
Promise.any([promise1, promise2, promise3]);
```

## Example

```javascript
const p1 = Promise.reject("A");
const p2 = Promise.resolve("B");
const p3 = Promise.resolve("C");

Promise.any([p1, p2, p3])
  .then(console.log)
  .catch(console.log);
```

## Output

```javascript
B
```

Even though `p1` rejects, `Promise.any()` ignores it and returns the first fulfilled Promise.

---

## Example: All Promises Reject

```javascript
Promise.any([
  Promise.reject("A"),
  Promise.reject("B"),
  Promise.reject("C")
])
.catch(error => {
  console.log(error);
});
```

## Output

```javascript
AggregateError
```

Because no Promise was fulfilled.

## How It Works

### Case 1: At Least One Promise Resolves

```javascript
Promise.any([
  Promise.reject("Error"),
  Promise.resolve("Success")
]);
```

Output:

```javascript
Success
```

### Case 2: All Promises Reject

```javascript
Promise.any([
  Promise.reject("A"),
  Promise.reject("B")
]);
```

Output:

```javascript
AggregateError
```

## Promise.any() vs Promise.race()

| Feature                         | Promise.any() | Promise.race() |
| ------------------------------- | ------------- | -------------- |
| Returns first fulfilled Promise | ✅             | ❌              |
| Returns first settled Promise   | ❌             | ✅              |
| Ignores rejected Promises       | ✅             | ❌              |
| Rejects when all reject         | ✅             | ❌              |

## Real-World Usage

### Multiple API Endpoints

```javascript
Promise.any([
  fetch("server1.com"),
  fetch("server2.com"),
  fetch("server3.com")
])
.then(response => {
  console.log(response);
});
```

The first successful response is used.

This improves reliability and performance.

## Interview Answer (Short Version)

`Promise.any()` returns the first fulfilled Promise and ignores rejected Promises. It rejects only when all Promises are rejected.

## Follow-Up Questions

1. What is the difference between Promise.any() and Promise.race()?
2. When does Promise.any() reject?
3. What is AggregateError?
4. What are the use cases of Promise.any()?

## Common Mistakes

❌ Thinking Promise.any() returns the first settled Promise.

```javascript
Promise.any([
  Promise.reject("A"),
  Promise.resolve("B")
]);
```

Output:

```javascript
B
```

The rejection is ignored.

❌ Assuming it behaves like Promise.all().
 ## quick comparison
Promise.all()        → All must succeed
Promise.allSettled() → Wait for all
Promise.race()       → First settled wins

## 9 What is Async/Await in JavaScript?

## Answer

`async/await` is a syntax introduced in ES2017 that makes asynchronous code look and behave more like synchronous code.

It is built on top of Promises and provides a cleaner, more readable way to work with asynchronous operations.

## async Function

The `async` keyword makes a function always return a Promise.

```javascript
async function greet() {
  return "Hello";
}

greet().then(console.log);
```

Output:

```javascript
Hello
```

Even though we return a string, JavaScript automatically wraps it in:

```javascript
Promise.resolve("Hello");
```

## await Keyword

The `await` keyword pauses the execution of an async function until a Promise settles.

```javascript
function fetchData() {
  return Promise.resolve("Data Received");
}

async function getData() {
  const data = await fetchData();
  console.log(data);
}

getData();
```

Output:

```javascript
Data Received
```

---

## Equivalent Promise Version

Using Promises:

```javascript
fetchData()
  .then(data => {
    console.log(data);
  });
```

Using Async/Await:

```javascript
const data = await fetchData();
console.log(data);
```

Async/await is simply syntactic sugar over Promises.

---

## Error Handling

With Promises:

```javascript
fetchData()
  .then(data => console.log(data))
  .catch(error => console.log(error));
```

With Async/Await:

```javascript
async function getData() {
  try {
    const data = await fetchData();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
```

---

## Real-World Example

```javascript
async function getUsers() {
  try {
    const response = await fetch("/users");
    const users = await response.json();

    console.log(users);
  } catch (error) {
    console.log(error);
  }
}
```

This is much easier to read than multiple `.then()` chains.

---

## Interview Answer (Short Version)

Async/await is a cleaner way to work with Promises. The `async` keyword makes a function return a Promise, while `await` pauses execution until a Promise resolves or rejects.

---

## Key Points

### async

Always returns a Promise.

```javascript
async function test() {
  return 10;
}
```

Equivalent to:

```javascript
function test() {
  return Promise.resolve(10);
}
```

---

### await

Can only be used inside an async function.

```javascript
async function test() {
  const value = await Promise.resolve(10);
  console.log(value);
}
```

---

## Follow-Up Questions

1. Does async always return a Promise?
2. Can await be used without async?
3. Is async/await synchronous or asynchronous?
4. How does async/await work internally?
5. What happens if a Promise rejects?

---

## Common Mistakes

❌ Forgetting `await`

```javascript
async function getData() {
  const data = fetchData();

  console.log(data);
}
```

Output:

```javascript
Promise { ... }
```

Because `fetchData()` returns a Promise.

Correct:

```javascript
const data = await fetchData();
```

---

❌ Using `await` outside an async function

```javascript
function test() {
  const data = await fetchData();
}
```

Results in:

```javascript
SyntaxError
```
## 10  What is a Prototype?

In JavaScript, every object has an internal property called `[[Prototype]]`.

This prototype is another object from which properties and methods can be inherited.

It allows objects to share functionality without copying methods into each object.

## Example

```javascript
const obj = {
  name: "Kajal"
};
```
Internally:
obj → [[Prototype]] → Object.prototype → null
```
## 11 What is Prototype Chain?

The prototype chain is the sequence JavaScript follows to look for a property or method.

### Example

```javascript 
const user = {
  name: "John"
};

console.log(user.toString());
```

Even though `toString()` is not in `user`, JavaScript finds it in the prototype chain.

## How Lookup Works

user
 ↓ (not found)
Object.prototype
 ↓ (found)
execute toString()
```
## Example using Object.create()

```javascript 
const person = {
  greet() {
    return "hello";
  }
};

const student = Object.create(person);

console.log(student.greet());
```
### Output

```
hello
```

---

## Why it works?

* `student` does not have `greet`
* JavaScript looks up the prototype
* Finds `greet` in `person`

---

## Important Methods

### Object.create()

Creates a new object with a specified prototype.

```javascript
const child = Object.create(parent);
```

### Object.getPrototypeOf()

Gets the prototype of an object.
```javascript 
Object.getPrototypeOf(child);
```

### Object.setPrototypeOf()

Sets prototype of an object.

```javascript 
Object.setPrototypeOf(child, parent);
```

## Key Interview Points

* Prototype enables inheritance in JavaScript
* Methods are not copied, they are shared via prototype chain
* Lookup happens until `null`


## Interview One-Liner

> Prototype is an object from which another object inherits properties and methods through the prototype chain.

## Common Interview Questions

1. What is a prototype in JavaScript?
2. What is prototype chain?
3. What happens when a property is not found in an object?
4. Difference between `__proto__` and prototype?
5. How does Object.create work internally?

## 12  Execution Context & Call Stack in JavaScript

# What is Execution Context?

An **execution context** is the environment in which JavaScript code is executed.

It contains:

* Variables
* Functions
* Scope chain
* `this` binding

# Types of Execution Context

## 1. Global Execution Context (GEC)

Created when the program starts.

## 2. Function Execution Context (FEC)

Created whenever a function is called.


# Call Stack

JavaScript uses a **Call Stack** to manage execution contexts.

> It follows LIFO (Last In First Out)

# Example

```javascript 
function first() {
  console.log("First");
  second();
}

function second() {
  console.log("Second");
}

first();
```

# Step-by-step Execution

### 1. Global context created

Call Stack: [Global]
```
### 2. first() called

Call Stack: [Global, first()]

### 3. second() called inside first()

Call Stack: [Global, first(), second()]
```

### 4. second() finishes

Call Stack: [Global, first()]

### 5. first() finishes

Call Stack: [Global]

### 6. Program ends

Call Stack: []

# Key Concept

> JavaScript executes code using a stack of execution contexts.

# Phases of Execution Context

## 1. Creation Phase

* Variables are hoisted
* Memory is allocated
* `this` is set

## 2. Execution Phase

* Code runs line by line

# Example (Hoisting Connection)

```javascript 
console.log(a);
var a = 10;
```
Internally:

```text 
Creation Phase: a = undefined
Execution Phase: console.log(undefined)
```
# Why this matters

This explains:

* hoisting
* TDZ (let/const)
* closures memory behavior
* call stack overflow

# Interview One-Liner

> Execution context is the environment where JavaScript code runs, and the call stack manages these contexts in LIFO order.

# React Connection

* React rendering uses call stack heavily
* Recursive renders can cause stack overflow
* Hooks rely on execution order within context

## 13  Constructor Functions & `new` Keyword in JavaScript

# What is a Constructor Function?

A constructor function is a **normal function used to create multiple similar objects** using the `new` keyword.

By convention, it starts with a capital letter.

# Example

```javascript 
function Person(name, age) {
  this.name = name;
  this.age = age;
}
```

# Using `new`

const p1 = new Person("Kajal", 25);

console.log(p1.name);
### Output

Kajal

# What does `new` actually do?

When you write:

new Person("Kajal", 25);

JavaScript internally performs 4 steps:

## 1. Creates a new empty object

const obj = {};

## 2. Links prototype

obj.__proto__ = Person.prototype;

## 3. Executes constructor function

Person.call(obj, "Kajal", 25);

## 4. Returns object
return obj;

# Final Internal Flow
new Person()
↓
create empty object
↓
link prototype
↓
bind this
↓
return object

# Prototype Connection

Person.prototype is shared across all instances.

# Example

function Person(name) {
  this.name = name;
}

Person.prototype.greet = function () {
  console.log("Hello " + this.name);
};

const p1 = new Person("A");
const p2 = new Person("B");

p1.greet();
p2.greet();
```

### Output

```javascript id="cf12"
Hello A
Hello B
```

---

# Why this works?

Both objects share the same prototype:

p1 → Person.prototype
p2 → Person.prototype

So memory is optimized.

# Constructor Property

console.log(p1.constructor === Person);

### Output

true

# Common Interview Trap

## What happens if you forget `new`?

function Person(name) {
  this.name = name;
}

const p = Person("Kajal");

console.log(p);

### Output

undefined

And `this.name` goes to global object (in non-strict mode).
# Strict Mode Fix

"use strict";

Now `this` becomes `undefined` and prevents bugs.

# Interview One-Liner

> The `new` keyword creates an object, links it to the constructor’s prototype, binds `this`, and returns the object automatically.

# React Connection

* React class components use constructor internally
* Hooks replaced constructor-based state logic
* Prototype understanding helps in class-based patterns


## 14 ES6 Classes vs Constructor Functions in JavaScript

# What is a Class in JavaScript?

A `class` in JavaScript is a **syntactic sugar over constructor functions and prototypes**.

It makes object-oriented programming easier to read and write.

---

# Class Example

```javascript id="cl1"
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log("Hello " + this.name);
  }
}

const p1 = new Person("Kajal", 25);

p1.greet();
```

### Output

```javascript id="cl2"
Hello Kajal
```

---

# Constructor Function Equivalent

```javascript id="cl3"
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.greet = function () {
  console.log("Hello " + this.name);
};

const p1 = new Person("Kajal", 25);

p1.greet();
```

### Output

```javascript id="cl4"
Hello Kajal
```

---

# Key Insight

> Classes in JavaScript are just a cleaner way to write prototype-based constructor functions.

---

# How Class Works Internally

When you write:

```javascript id="cl5"
class Person {
  greet() {}
}
```

JavaScript internally does:

```text id="cl6"
Person.prototype.greet = function () {}
```

---

# Important Differences

## 1. Hoisting

### Function

```javascript id="cl7"
const p = new Person(); // works after declaration
```

### Class

```javascript id="cl8"
// ReferenceError
const p = new Person();
class Person {}
```

---

## 2. Strict Mode

Classes always run in **strict mode**.

```javascript id="cl9"
class A {
  constructor() {
    this.value = 10;
  }
}
```

---

## 3. Cannot be called without `new`

```javascript id="cl10"
class Person {}

Person(); // ❌ Error
```

---

## 4. Methods are NOT enumerable

```javascript 
class Person {
  greet() {}
}
```
Methods in class prototype are non-enumerable by default.

# Prototype Connection

```javascript 
const p = new Person("A", 1);

console.log(p.__proto__ === Person.prototype);
```

### Output

```javascript 
true
```

---

# Class Inheritance

```javascript 
class Animal {
  eat() {
    console.log("Eating");
  }
}

class Dog extends Animal {
  bark() {
    console.log("Barking");
  }
}

const d = new Dog();

d.eat();
d.bark();
```

### Output

```javascript 
Eating
Barking
```

# Internally

```text 
Dog → Animal → Object.prototype → null
```
# Key Interview Insight

> `class` is not a new OOP system in JavaScript. It is built on top of prototypes.

# React Connection

* React class components use ES6 classes
* `extends React.Component` uses prototype inheritance
* Hooks replaced most class-based logic

# Interview One-Liner

> JavaScript classes are syntactic sugar over prototype-based inheritance using constructor functions.

# Common Interview Questions

1. Difference between class and constructor function?
2. Is class hoisted in JavaScript?
3. How does inheritance work in classes?
4. What is `super()` in class?
5. Are classes functions internally?

## 15  Inheritance in JavaScript (Prototype-based Inheritance)

# What is Inheritance?

Inheritance allows one object or class to **reuse properties and methods** of another object.

In JavaScript, inheritance is mainly achieved through the **prototype chain**.


# 1. Prototype-based Inheritance

## Example

```javascript id="in1"
const animal = {
  eats: true,
  walk() {
    console.log("Animal walking");
  }
};

const dog = Object.create(animal);

dog.barks = true;

console.log(dog.eats);
dog.walk();
```

### Output

```javascript id="in2"
true
Animal walking
```

## Why it works?

```text id="in3"
dog → animal → Object.prototype → null
```
So missing properties are looked up in the prototype chain.

# 2. Constructor Function Inheritance

## Example

```javascript id="in4"
function Animal(name) {
  this.name = name;
}

Animal.prototype.eat = function () {
  console.log(this.name + " is eating");
};

function Dog(name) {
  Animal.call(this, name);
}

Dog.prototype = Object.create(Animal.prototype);

const d = new Dog("Tommy");

d.eat();
```

### Output

```javascript id="in5"
Tommy is eating
```

---

## Internal Flow

```text id="in6"
Dog instance
  ↓
Dog.prototype
  ↓
Animal.prototype
  ↓
Object.prototype
  ↓
null
```

---

# 3. ES6 Class Inheritance

```javascript id="in7"
class Animal {
  constructor(name) {
    this.name = name;
  }

  eat() {
    console.log(this.name + " is eating");
  }
}

class Dog extends Animal {
  bark() {
    console.log("Barking");
  }
}

const d = new Dog("Tommy");

d.eat();
d.bark();
```

### Output

```javascript id="in8"
Tommy is eating
Barking
```

---

# 4. What happens internally in `extends`?

```text id="in9"
Dog.prototype → Animal.prototype → Object.prototype
```

And constructor flow:

```text id="in10"
Dog constructor → Animal constructor (via super)
```

---

# 5. Role of `super`

```javascript id="in11"
class Animal {
  constructor(name) {
    this.name = name;
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name);
  }
}
```

---

## Why `super` is needed?

* Calls parent class constructor
* Initializes parent properties

Without it:

```javascript id="in12"
// ReferenceError
```

---

# 6. Key Differences

| Feature            | Constructor Function | ES6 Class            |
| ------------------ | -------------------- | -------------------- |
| Syntax             | Complex              | Clean                |
| Inheritance        | Manual               | Built-in (`extends`) |
| Prototype handling | Explicit             | Automatic            |
| `super` support    | Manual (`call`)      | Built-in             |

---

# 7. Interview Trap

```javascript id="in13"
const obj = {
  a: 10
};

const child = Object.create(obj);

child.a = 20;

console.log(obj.a);
```

### Output

```javascript id="in14"
10
```

---

## Why?

* `child.a` is a new property
* prototype (`obj`) is not modified

---

# 8. Important Insight

> In JavaScript, inheritance is not class-based like Java or C++, it is prototype-based.

Classes are just syntactic sugar over prototypes.

# Interview One-Liner

> JavaScript inheritance works through the prototype chain, where objects or classes delegate property lookup to their prototype.

# React Connection

* `React.Component` uses prototype inheritance
* Lifecycle methods come from prototype chain
* Hooks replaced most inheritance-based patterns


