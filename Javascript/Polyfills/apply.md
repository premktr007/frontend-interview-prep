### using call()
```js
Function.prototype.apply = function(objContext, args) {
    const result = this.call(objContext, ...args);
    return result;
  };
```

### without using call()
```js
Function.prototype.myApply = function (context, argsArray) {
  // 1. Handle null/undefined context (default to global object)
  context = context ?? globalThis;
  argsArray = argsArray || [];
  // 2. Ensure we can't overwrite existing properties by using a Symbol
  const fnSymbol = Symbol('temporaryFunction');

  // 3. 'this' is the function being called. 
  // We attach it to the context object temporarily.
  context[fnSymbol] = this;

  // 4. Execute the function. 
  // We spread the args so they are passed individually, not as one array.
  const result = context[fnSymbol](...argsArray);

  // 5. Cleanup: Remove the temporary property to avoid polluting the object
  delete context[fnSymbol];

  return result;
};


function greet(city, country) {
  return `${this.name} from ${city}, ${country}`;
}

const user = { name: "Prem" };

const res = greet.myApply(user, ["Bangalore", "India"]);
console.log(res);
// Prem from Bangalore, India
```

## 🧠 How This Works (Explain This in Interview)
### Step-by-step mental model

+ Functions are objects, so we temporarily attach the function to the context

+  Calling context.fn() makes this === context

+ We spread arguments from the array

+ Remove the temporary property to avoid side effects

+ Return the result

+ This mirrors how call/apply work internally.

## Interview Questions
+ null or undefined context
```js
  fn.apply(null, args);
```
we are handling using **context ?? globalThis;**. In strict mode 'this' will be undefined otherwise it will point to global object

+ Why use Symbol?
Using Symbol makes the key unique and safe.
