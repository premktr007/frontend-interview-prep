####Currying is a functional programming technique that transforms a function taking multiple arguments into a sequence of nested functions, each accepting a single argument. It converts a function \(f(a,b,c)\) into \(f(a)(b)(c)\).

##Example
```js
// your normal function
const add = (a, b) => {
  return a + b;
}

console.log(add(1,2)); // 3

// using currying
const add = (a) => {
  return (b) => {
    return a + b;
  }
}

console.log(add(1)(2)); // 3
```

##Implementation
```js
function curry(fn) {
  return function curried(...args) {
    // 1. If we have enough arguments, execute the original function
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } 
    
    // 2. Otherwise, return a new function to collect more arguments
    return function(...nextArgs) {
      return curried.apply(this, args.concat(nextArgs));
    };
  };
}

// --- Usage ---
const sum = (a, b, c) => a + b + c;
const curriedSum = curry(sum);

console.log(curriedSum(1)(2)(3)); // 6
console.log(curriedSum(1, 2)(3)); // 6
console.log(curriedSum(1)(2, 3)); // 6
```
