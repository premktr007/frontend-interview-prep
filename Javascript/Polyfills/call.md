### using apply()
```js
Function.prototype.myCall = function(objContext, ...args) {
    const result = this.apply(objContext, args);
    return result;
  };
```
### without apply()
```js
Function.prototype.myCall = function(context, ...args) {
    context = context || globalThis;
    const fnSymbol = Symbol();
    context[fnSymbol] = this; // 'this' is the function to be called
    // Execute the function and capture the result
    const result = context[fnSymbol](...args);
    // Delete the temporary property
    delete context[fnSymbol];
    // Return the result of the function call
    return result;
  };
```
