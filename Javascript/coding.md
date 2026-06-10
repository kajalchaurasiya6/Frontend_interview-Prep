## Q1: Reverse a string
Problem: Reverse a given string.
Input: "hello"
Output: "olleh"

## built-in solution
```javascript
const reverseString = (str = "") =>
  str.split("").reverse().join("");

## without built-ins
function reverseString(str) {
  let result = "";

  for (let i = str.length - 1; i >= 0; i--) {
    result += str[i];
  }

  return result;
}
```
## Two-pointer approach
```javascript
function reverseString(str) {
  let arr = str.split("");
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }

  return arr.join("");
}
```
## Q2: Palindrome check
```javascript
    function isPalindrome(str) {
  let left = 0;
  let right = str.length - 1;

  while (left < right) {
    if (str[left] !== str[right]) {
      return false;
    }

    left++;
    right--;
  }

  return true;
}
```
## Q3 :# Implement a Generic Curry Function

# Problem Statement

Implement a generic `curry()` function that converts a normal function into a curried function.

## Example

```javascript
function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);

console.log(curriedAdd(1)(2)(3));     // 6
console.log(curriedAdd(1, 2)(3));     // 6
console.log(curriedAdd(1)(2, 3));     // 6
console.log(curriedAdd(1, 2, 3));     // 6
```
# Approach

1. Check how many arguments the original function expects using:

```javascript
fn.length
```
2. Collect arguments until we have enough.
3. Once enough arguments are collected, execute the original function.
4. Otherwise return another function to collect remaining arguments.

# Solution

```javascript
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    }

    return function (...nextArgs) {
      return curried(...args, ...nextArgs);
    };
  };
}
```

# Dry Run

```javascript
function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);

curriedAdd(1)(2)(3);
```

### Step 1

```javascript
curriedAdd(1);
```

Collected arguments:

```javascript
[1]
```
Not enough arguments, return another function.

### Step 2

```javascript
(2)
```
Collected arguments:

```javascript
[1, 2]
```
Still not enough, return another function.

### Step 3

```javascript
(3)
```
Collected arguments:

```javascript
[1, 2, 3]
```
Now:

```javascript
args.length === fn.length
```

Execute:

```javascript
add(1, 2, 3);
```

Result:

```javascript
6
```

---

# Why does it work?

Because every returned function forms a closure and remembers previously supplied arguments.

Example:

```javascript
curriedAdd(1)
```

remembers:

```javascript
a = 1
```

Then:

```javascript
curriedAdd(1)(2)
```

remembers:

```javascript
a = 1
b = 2
```

Until all arguments are collected.

---

# Time Complexity

```text
O(n)
```

Where:

```text
n = number of arguments
```

---

# Interview One-Liner

> A generic curry function keeps collecting arguments through closures until the required number of arguments is reached, then executes the original function.

# Common Follow-Up Questions

1. What is `fn.length`?
2. How does closure help currying?
3. Difference between currying and partial application?
4. Can a curried function accept multiple arguments at once?
5. Implement infinite currying.

## Q4. Implement a Polyfill for Array.prototype.map()
## Expected usage : 
``` javascript
const arr = [1, 2, 3];
const result = arr.myMap(num => num * 2);
console.log(result);
```
## Solution:
```javascript
Array.prototype.myMap = function (callback) {
  const result = [];

  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this));
  }

  return result;
};
```

## Q5. Implement a Polyfill for Array.prototype.filter()
## solution:
      ```javascript
      Array.prototype.myFilter = function (callback) {
  const result = [];

  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      result.push(this[i]);
    }
  }

  return result;
};
```

## Q6. Implement a Polyfill for Array.protyotype.reduce();
## Answer:-
    ```javascript
    Array.prototype.myReduce = function (callback, initialValue) {
  let acc = initialValue;
  let startIndex = 0;

  if (initialValue === undefined) {
    acc = this[0];
    startIndex = 1;
  }

  for (let i = startIndex; i < this.length; i++) {
    acc = callback(acc, this[i], i, this);
  }

  return acc;
};
```
## Q7. Implement a Polyfill for Function.prototype.bind()?
## Syntax : function.bind(thisArg, arg1, arg2, ...)
## Answer:-
  ```javascript
   Function.prototype.myBind = function (
  context,
  ...bindArgs
) {
  const fn = this;

  return function (...callArgs) {
    return fn.apply(
      context,
      [...bindArgs, ...callArgs]
    );
  };
};
```
## Q8.  Implement a Memoize Function
## solution:
```javascript
function memoize(fn) {
  const cache = {};

  return function (...args) {
    const key = JSON.stringify(args);

    if (key in cache) {
      return cache[key];
    }

    const result = fn(...args);

    cache[key] = result;

    return result;
  };
}
```
## Q9. flatten an array without using flat().
# Solution:
```javascript
function flatten(arr) {
  const result = [];

  for (const item of arr) {
    if (Array.isArray(item)) {
      result.push(...flatten(item));
    } else {
      result.push(item);
    }
  }

  return result;
}
```
## Alternative Solution:
```javascript
function flatten(arr) {
  return arr.reduce((acc, curr) => {
    return acc.concat(
      Array.isArray(curr)
        ? flatten(curr)
        : curr
    );
  }, []);
}
```














