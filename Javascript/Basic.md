## 1  What is the difference between var, let, and const? 
Ans:-  var, let, and const are used to declare variables in JavaScript, but they differ in terms of scope, hoisting, redeclaration, and reassignment.
. var is function-scoped, whereas let and const are block-scoped.
. Variables declared with var can be redeclared and reassigned.
. Variables declared with let cannot be redeclared in the same scope, but they can be reassigned.
. Variables declared with const cannot be redeclared or reassigned after initialization.

## Example
var a = 10;
var a = 20; // Allowed

let b = 10;
// let b = 20; // Error: Cannot redeclare

b = 30; // Allowed

const c = 10;
// c = 20; // Error: Cannot reassign

Hoisting
All three (var, let, and const) are hoisted in JavaScript.

var is hoisted and initialized with undefined.
let and const are hoisted but remain in the Temporal Dead Zone (TDZ) until the execution reaches their declaration.
console.log(a); // undefined
var a = 10;

console.log(b); // ReferenceError
let b = 20;

## Interview Answer (Short Version)

var is function-scoped and can be redeclared and reassigned. let and const are block-scoped. let can be reassigned but not redeclared, while const can neither be redeclared nor reassigned. Although all three are hoisted, let and const stay in the Temporal Dead Zone until their declaration is reached.

Follow-Up Questions
What is the Temporal Dead Zone (TDZ)?
How does hoisting work with var?
Why are let and const preferred over var?
Can objects declared with const be modified?
Common Mistakes

❌ Assuming const makes an object immutable.

const user = {
  name: "Kajal"
};

user.name = "John"; // Allowed

const prevents reassignment of the variable, not modification of the object's properties.

## 2  What is Hoisting in JavaScript? 
Ans:-    Hoisting is JavaScript's behavior of moving declarations to the top of their scope during the memory creation phase before the code is executed.
This means variables and functions can be referenced before their declaration in the code.
However, only the declarations are hoisted, not the initializations.
## Example 
Example
console.log(a); // undefined

var a = 10;

console.log(a); // 10

JavaScript internally treats it like:

var a;

console.log(a); // undefined

a = 10;

console.log(a); // 10
Hoisting with let and const

Variables declared with let and const are also hoisted, but they remain in the Temporal Dead Zone (TDZ) until the execution reaches their declaration.

console.log(a); // ReferenceError

let a = 10;
Hoisting with Functions

Function declarations are fully hoisted, so they can be called before their declaration.

greet();

function greet() {
  console.log("Hello");
}

Output:

Hello
Function Expression Example
greet();

var greet = function () {
  console.log("Hello");
};

Output:

TypeError: greet is not a function

This happens because only the variable declaration is hoisted, not the function assignment.

## Interview Answer (Short Version)
Hoisting is JavaScript's default behavior of moving declarations to the top of their scope during the memory creation phase. var variables are hoisted and initialized with undefined, while let and const are hoisted but remain in the Temporal Dead Zone until their declaration is reached. Function declarations are fully hoisted.

## Real-World Usage

Understanding hoisting helps avoid unexpected bugs caused by accessing variables before they are initialized.

It also explains why function declarations can be called before they appear in the code.

## Follow-Up Questions
What is the Temporal Dead Zone (TDZ)?
Why does var return undefined instead of throwing an error?
Are function expressions hoisted?
What happens when we access a let variable before declaration?

## 3  What is Scope in JavaScript?
Ans:- Scope determines the accessibility or visibility of variables, functions, and objects in different parts of a program.
In JavaScript, a variable can only be accessed within the scope in which it is declared.
JavaScript has three main types of scope:
*  Global Scope
*  Function Scope
*  Block Scope
# Global Scope

Variables declared outside any function or block are in the global scope and can be accessed from anywhere in the program.

let name = "Kajal";

function greet() {
  console.log(name);
}

greet(); // Kajal
# Function Scope

Variables declared with var inside a function are only accessible within that function.

function test() {
  var message = "Hello";
  console.log(message);
}

test();

// console.log(message); // ReferenceError
# Block Scope

Variables declared with let and const are limited to the block in which they are declared.

if (true) {
  let age = 25;
  const city = "Mumbai";
}

// console.log(age); // ReferenceError
// console.log(city); // ReferenceError

# Interview Answer (Short Version)

Scope defines where variables can be accessed in a program. JavaScript has global scope, function scope, and block scope. Variables declared with var are function-scoped, while let and const are block-scoped.

# Real-World Usage

Scope helps prevent variable conflicts and keeps data isolated, making applications easier to maintain and debug.
# Follow-Up Questions
What is Lexical Scope?
What is Scope Chain?
What is the difference between Global Scope and Local Scope?
Why is let preferred over var?
How does scope relate to closures?

## 4 What is a Closure in JavaScript?
Ans:- A closure is a function that remembers and can access variables from its outer scope even after the outer function has finished executing.
Closures are created whenever a function is defined inside another function.

## Example
function outer() {
  let count = 0;

  function inner() {
    count++;
    console.log(count);
  }

  return inner;
}

const counter = outer();

counter(); // 1
counter(); // 2
counter(); // 3

In the above example, the `inner` function remembers the `count` variable even after the `outer` function has completed execution.

## Why Does Closure Work?

When a function is returned from another function, JavaScript preserves the variables that the inner function depends on.

As a result, the inner function continues to have access to those variables even after the outer function has finished executing.

## Interview Answer (Short Version)

A closure is a function that retains access to variables from its outer lexical scope even after the outer function has finished execution.

## Real-World Usage

### Data Privacy

function createCounter() {
  let count = 0;

  return {
    increment() {
      return ++count;
    },
    getCount() {
      return count;
    }
  };
}

The `count` variable cannot be accessed directly from outside the function.

### React Example

Closures are heavily used in:

* Event handlers
* useEffect
* useCallback
* Custom hooks

## Follow-Up Questions

1. What is Lexical Scope?
2. How do closures work internally?
3. What are the advantages of closures?
4. Can closures cause memory leaks?
5. How are closures used in React?

## Common Mistakes

❌ Thinking closures store a copy of variables.

Closures maintain a reference to variables, not a copy.
let count = 0;

function increment() {
  count++;
}

increment();

console.log(count); // 1

The closure accesses the latest value of `count`.

## 5 What are Primitive and Non-Primitive Data Types in JavaScript?

Ans:- 
JavaScript data types are broadly classified into two categories:
1. Primitive Data Types
2. Non-Primitive (Reference) Data Types

The main difference is how they are stored and copied in memory.

## Primitive Data Types

Primitive data types store actual values and are immutable.

JavaScript has 7 primitive data types:

* String
* Number
* Boolean
* Undefined
* Null
* Symbol
* BigInt

### Example

```javascript
let name = "Kajal";
let age = 25;
let isDeveloper = true;
let city;
let salary = null;
```

## Non-Primitive Data Types

Non-primitive data types are stored by reference.

Examples:

* Object
* Array
* Function

### Example

```javascript
const user = {
  name: "Kajal",
  age: 25
};

const skills = ["React", "JavaScript"];

function greet() {
  console.log("Hello");
}
```

## Primitive Copy Example

When a primitive value is copied, a new copy is created.

```javascript
let a = 10;
let b = a;

b = 20;

console.log(a); // 10
console.log(b); // 20
```

Changing `b` does not affect `a`.

## Non-Primitive Copy Example

When a non-primitive value is copied, the reference is copied.

```javascript
const user1 = {
  name: "Kajal"
};

const user2 = user1;

user2.name = "John";

console.log(user1.name); // John
console.log(user2.name); // John
```

Both variables point to the same object in memory.

## Interview Answer (Short Version)

Primitive data types store actual values and are copied by value. JavaScript primitives are String, Number, Boolean, Undefined, Null, Symbol, and BigInt. Non-primitive data types such as Objects, Arrays, and Functions are stored by reference and copied by reference.

## Real-World Usage

Understanding primitive and reference types is important when:

* Updating React state
* Comparing objects
* Cloning data
* Debugging unexpected mutations

## Follow-Up Questions

1. Why are objects compared by reference?
2. What is the difference between shallow copy and deep copy?
3. Why is `typeof null` equal to `"object"`?
4. How are arrays stored in memory?
5. How does React detect state changes?

## Common Mistakes

❌ Assuming objects are copied by value.

```javascript
const obj1 = { name: "Kajal" };
const obj2 = obj1;

obj2.name = "John";
```

Changes to `obj2` also affect `obj1` because both reference the same object.

❌ Thinking arrays are primitive types.

```javascript
typeof [];
// "object"
```

Arrays are non-primitive objects in JavaScript.

## 6 # What is the difference between == and === in JavaScript?
 Ans:-

Both `==` and `===` are comparison operators used to compare two values, but they differ in how they perform the comparison.

* `==` (Loose Equality) compares values after performing type coercion if necessary.
* `===` (Strict Equality) compares both value and data type without performing type coercion.

Because of this, `===` is generally preferred in modern JavaScript.

## Example

### Loose Equality (==)

```javascript
console.log(5 == "5"); // true
```

Before comparison, JavaScript converts the string `"5"` to the number `5`.

### Strict Equality (===)

```javascript
console.log(5 === "5"); // false
```

The values are the same, but the data types are different (`number` vs `string`).

## More Examples

```javascript
console.log(true == 1); // true

console.log(true === 1); // false
```

```javascript
console.log(null == undefined); // true

console.log(null === undefined); // false
```

## Interview Answer (Short Version)

`==` checks equality after performing type conversion if required, whereas `===` checks both value and type without type conversion. Therefore, `===` is safer and preferred in most cases.

## Real-World Usage

Always prefer `===` because it avoids unexpected results caused by implicit type coercion.

```javascript
if (userId === 1) {
  // safer comparison
}
```

## Follow-Up Questions

1. What is type coercion?
2. Why is `===` preferred over `==`?
3. What are some surprising results of loose equality?
4. What is implicit type conversion in JavaScript?

## coomon interview examples 
console.log(0 == false);      // true
console.log(0 === false);     // false

console.log("" == false);     // true
console.log("" === false);    // false

console.log(null == undefined);   // true
console.log(null === undefined);  // false

## 7 What is the difference between null and undefined?

## Answer

Both `null` and `undefined` represent the absence of a value, but they are used in different situations.

* `undefined` means a variable has been declared but has not been assigned a value.
* `null` is an intentional assignment that represents the absence of a value.

In simple terms:

* `undefined` → value is missing.
* `null` → value is intentionally empty.

## Example

### Undefined

```javascript
let name;

console.log(name); // undefined
```

The variable is declared but no value has been assigned.

### Null

```javascript
let user = null;

console.log(user); // null
```

The developer has explicitly assigned `null`.

## Type Check

```javascript
console.log(typeof undefined); // "undefined"
console.log(typeof null); // "object"
```

⚠️ `typeof null` returns `"object"` due to a historical bug in JavaScript that has been kept for backward compatibility.

## Equality Comparison

```javascript
console.log(null == undefined); // true
console.log(null === undefined); // false
```

* `==` considers them equal after type coercion.
* `===` compares both value and type, so they are different.

## Interview Answer (Short Version)

`undefined` means a variable has been declared but not assigned a value, whereas `null` is an intentional assignment representing no value. `typeof undefined` is `"undefined"` while `typeof null` is `"object"` due to a legacy JavaScript bug.

## Real-World Usage

### API Response

```javascript
const user = {
  middleName: null
};
```

The field exists but currently has no value.

### Missing Property

```javascript
console.log(user.lastName); // undefined
```

The property does not exist.

## Follow-Up Questions

1. Why does `typeof null` return `"object"`?
2. What is the difference between `null == undefined` and `null === undefined`?
3. When should you use `null`?
4. Can a function return `undefined`?

## Common Mistakes

❌ Assuming `null` and `undefined` are the same.

```javascript
console.log(null === undefined); // false
```

❌ Thinking `typeof null` returns `"null"`.

```javascript
console.log(typeof null); // "object"
```

This is one of JavaScript's well-known historical quirks.
## javascript wierd behaviour
typeof null === "object"
null == undefined // true
[] == false // true
{} + [] //"[object Object]"
[] + [] // ""
[1, 2] + [3, 4] // 1,23,4

## 8 What are Truthy and Falsy Values in JavaScript?
## Answer

In JavaScript, every value is either **truthy** or **falsy** when evaluated in a boolean context such as an `if` statement.

* **Truthy values** are treated as `true`.
* **Falsy values** are treated as `false`.

## Falsy Values

JavaScript has only 8 falsy values:

```javascript
false
0
-0
0n
""
null
undefined
NaN
```

### Example

```javascript
if (0) {
  console.log("Executed");
} else {
  console.log("Not Executed");
}
```

Output:

```javascript
Not Executed
```

## Truthy Values

Everything that is not falsy is truthy.

Examples:

```javascript
"hello"
[]
{}
42
-1
"false"
"0"
function(){}
```

### Example

```javascript
if ("hello") {
  console.log("Executed");
}
```

Output:

```javascript
Executed
```

## Common Interview Traps

### Empty Array

```javascript
if ([]) {
  console.log("Truthy");
}
```

Output:

```javascript
Truthy
```

### Empty Object

```javascript
if ({}) {
  console.log("Truthy");
}
```

Output:

```javascript
Truthy
```

Even though they are empty, arrays and objects are truthy because they are objects.

## Interview Answer (Short Version)

Truthy values are values that evaluate to `true` in a boolean context, while falsy values evaluate to `false`. JavaScript has only eight falsy values: `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, and `NaN`. Everything else is truthy.

## Real-World Usage

Truthy and falsy values are commonly used in:

```javascript
if (user) {
  // user exists
}
```

```javascript
const name = userName || "Guest";
```

```javascript
const value = input ?? "Default";
```

## Follow-Up Questions

1. Is an empty array truthy or falsy?
2. Is an empty object truthy or falsy?
3. What is the difference between `||` and `??`?
4. Why is `"0"` truthy but `0` falsy?
5. How does JavaScript perform boolean conversion?

## Common Mistakes

❌ Assuming an empty array is falsy.

```javascript
Boolean([]); // true
```

❌ Assuming an empty object is falsy.

```javascript
Boolean({}); // true
```

❌ Confusing `"0"` with `0`.

```javascript
Boolean("0"); // true
Boolean(0);   // false
```

## 9  What is a Callback Function in JavaScript?
## Answer

A callback function is a function that is passed as an argument to another function and is executed later when a specific task or operation is completed.

Since JavaScript is single-threaded and asynchronous, callbacks are commonly used to handle tasks such as user events, API requests, and timers.

## Example

```javascript
function greet(name, callback) {
  console.log(`Hello ${name}`);
  callback();
}

function sayBye() {
  console.log("Goodbye");
}

greet("Kajal", sayBye);
```

Output:

```javascript
Hello Kajal
Goodbye
```

Here, `sayBye` is passed as a callback function to `greet`.

## Why Do We Need Callbacks?

Callbacks allow us to execute code after a task has finished.

Example using `setTimeout`:

```javascript
setTimeout(() => {
  console.log("Executed after 2 seconds");
}, 2000);
```

The arrow function is a callback that runs after the timer completes.

## Real-World Example

### Event Handling

```javascript
button.addEventListener("click", () => {
  console.log("Button clicked");
});
```

The arrow function is executed only when the click event occurs.

### Array Methods

```javascript
const numbers = [1, 2, 3];

const result = numbers.map((num) => num * 2);
```

The function passed to `map()` is a callback.

## Interview Answer (Short Version)

A callback function is a function passed as an argument to another function and executed later after a specific operation or event is completed.

## Advantages

* Enables asynchronous programming
* Makes code reusable
* Useful for event handling
* Allows execution of code after a task completes

## Disadvantages

When multiple asynchronous operations depend on each other, callbacks can lead to deeply nested code known as **Callback Hell**.

```javascript
getUser(function(user) {
  getOrders(user.id, function(orders) {
    getPayment(orders[0].id, function(payment) {
      console.log(payment);
    });
  });
});
```

This becomes difficult to read and maintain.

Promises and Async/Await were introduced to solve this problem.

## Follow-Up Questions

1. What is Callback Hell?
2. What are Higher-Order Functions?
3. How do Promises solve Callback Hell?
4. What is the difference between synchronous and asynchronous callbacks?
5. Is `setTimeout` a callback?

## Common Mistakes

❌ Executing the callback instead of passing it.

```javascript
greet("Kajal", sayBye());
```

This executes `sayBye` immediately.

Correct:

```javascript
greet("Kajal", sayBye);
```

Pass the function reference, not the function call.

## 10  What is an Arrow Function in JavaScript?

## Answer

An arrow function is a shorter syntax introduced in ES6 for writing functions.

It uses the `=>` operator and provides a more concise way to define functions.

## Syntax

### Regular Function

```javascript
function add(a, b) {
  return a + b;
}
```

### Arrow Function

```javascript
const add = (a, b) => {
  return a + b;
};
```

### Implicit Return

If the function body contains only one expression, the `return` keyword can be omitted.

```javascript
const add = (a, b) => a + b;
```

## Key Differences Between Arrow Functions and Regular Functions

### 1. Syntax

Arrow functions are shorter and cleaner.

```javascript
const greet = () => {
  console.log("Hello");
};
```

### 2. `this` Keyword

Regular functions have their own `this` value.

Arrow functions do not have their own `this`; they inherit `this` from the surrounding lexical scope.

#### Regular Function

```javascript
const user = {
  name: "Kajal",
  greet: function () {
    console.log(this.name);
  }
};

user.greet(); // Kajal
```

#### Arrow Function

```javascript
const user = {
  name: "Kajal",
  greet: () => {
    console.log(this.name);
  }
};

user.greet(); // undefined
```

Because the arrow function does not create its own `this`.

### 3. Cannot Be Used as Constructors

Regular functions can be used with `new`.

```javascript
function Person(name) {
  this.name = name;
}

const p1 = new Person("Kajal");
```

Arrow functions cannot.

```javascript
const Person = (name) => {
  this.name = name;
};

new Person("Kajal"); // TypeError
```

### 4. No `arguments` Object

Regular functions have access to the `arguments` object.

```javascript
function test() {
  console.log(arguments);
}
```

Arrow functions do not have their own `arguments`.

## Interview Answer (Short Version)

Arrow functions are a concise way to write functions in JavaScript. Unlike regular functions, they do not have their own `this`, cannot be used as constructors, and do not provide an `arguments` object.

## Real-World Usage

Arrow functions are commonly used for:

```javascript
const numbers = [1, 2, 3];

const doubled = numbers.map(num => num * 2);
```

React event handlers:

```javascript
const handleClick = () => {
  console.log("Clicked");
};
```

Promises:

```javascript
fetchData()
  .then(data => console.log(data))
  .catch(error => console.log(error));
```

## Follow-Up Questions

1. What is lexical `this`?
2. Why does an arrow function not have its own `this`?
3. Can arrow functions be used as constructors?
4. What is implicit return?
5. When should you use a regular function instead of an arrow function?

## Common Mistakes

❌ Using an arrow function as an object method.

```javascript
const user = {
  name: "Kajal",
  greet: () => {
    console.log(this.name);
  }
};
```

`this.name` will not refer to the object.

❌ Forgetting parentheses when returning an object.

```javascript
const getUser = () => {
  name: "Kajal";
};
```

Returns `undefined`.

Correct:

```javascript
const getUser = () => ({
  name: "Kajal"
});
```
## 11  What is the `this` Keyword in JavaScript?

## Answer

The `this` keyword refers to the object that is currently executing the function.

The value of `this` is determined by **how a function is called**, not where it is defined.

Its value can change depending on the execution context.

## Global Context

```javascript
console.log(this);
```

In browsers, `this` refers to the global object (`window`) in the global scope.

## Inside an Object Method

```javascript
const user = {
  name: "Kajal",
  greet() {
    console.log(this.name);
  }
};

user.greet();
```

Output:

```javascript
Kajal
```

Here, `this` refers to the `user` object because `greet()` is called using `user.greet()`.

## Regular Function

```javascript
function greet() {
  console.log(this);
}

greet();
```

In strict mode:

```javascript
undefined
```

Without strict mode (browser):

```javascript
window
```

## Arrow Function

Arrow functions do not have their own `this`.

They inherit `this` from their surrounding lexical scope.

```javascript
const user = {
  name: "Kajal",
  greet: () => {
    console.log(this.name);
  }
};

user.greet();
```

Output:

```javascript
undefined
```

The arrow function uses the surrounding `this`, not the `user` object.

## Explicit Binding

JavaScript allows us to explicitly set `this` using:

* `call()`
* `apply()`
* `bind()`

```javascript
function greet() {
  console.log(this.name);
}

const user = {
  name: "Kajal"
};

greet.call(user);
```

Output:

```javascript
Kajal
```

## Interview Answer (Short Version)

`this` refers to the object that is executing the current function. Its value depends on how the function is invoked. Regular functions get their own `this`, whereas arrow functions inherit `this` from their surrounding scope.

## Real-World Usage

Commonly used in:

* Object methods
* Event handlers
* Classes
* call/apply/bind
* React class components

## Follow-Up Questions

1. How does `this` behave in arrow functions?
2. What is lexical `this`?
3. What are call, apply, and bind?
4. What is explicit binding?
5. What is the value of `this` in strict mode?

## Common Mistakes

❌ Assuming `this` refers to the function itself.

❌ Thinking arrow functions create their own `this`.

```javascript
const obj = {
  name: "Kajal",
  greet: () => {
    console.log(this.name);
  }
};
```

Output:

```javascript
undefined
```

because the arrow function inherits `this` from its surrounding scope.

## 12 What is the difference between == and === in JavaScript?
# Answer 
JavaScript provides two equality operators:

Loose Equality (==)
* Compares values after performing type conversion (type coercion).
* If the types are different, JavaScript tries to convert them into a common type before comparing.

Strict Equality (===)
* Compares both value and type.
* No type conversion is performed.

## Interview Answer (Short Version)
== compares values after type coercion, whereas === compares both value and type without coercion. In modern JavaScript, === is generally preferred because it avoids unexpected results.

## Common Interview Questions
* console.log([] == false); //true
* console.log("" == 0); //true
* console.log(null == undefined); //true
* null == undefined  // true
* null == 0          // false
* null == false      // false
* undefined == 0     // false
* undefined == false // false
* console.log(1 + "2" + 3); //123  If ANY operand is a string, + becomes string concatenation.
* console.log("1" - 1); //0  - * / % always trigger numeric coercion
* console.log(true + true); //2 boolean converts to number
* console.log([] == ![]); //true 
* console.log({} + []); //"[object Object]" or sometimes 0
## Note :- 
NaN === NaN is false because, by specification, NaN is the only JavaScript value that is not equal to itself. Use Number.isNaN() to check for NaN.