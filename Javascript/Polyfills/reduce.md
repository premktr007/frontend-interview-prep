### normal polyfill
```js
Array.prototype.myReduce=function(callback,initial_value){
    let acc=initial_value;
    for(let i=0;i<this.length;i++)
    {
        acc=acc?callback(acc,this[i],i,this):this[i];
    }
    return acc;

}
```


### polyfill with handling edge cases
```js
// Array.prototype.reduce() polyfill
if (!Array.prototype.myReduce) {
  Array.prototype.myReduce = function(callback, initialValue) {
    if (this == null) {
      throw new TypeError('Array.prototype.myReduce called on null or undefined');
    }
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }

    let accumulator = initialValue;
    let startIndex = 0;

    // If no initial value, use first element and start from index 1
    if (arguments.length < 2) {
      if (this.length === 0) {
        throw new TypeError('Reduce of empty array with no initial value');
      }
      accumulator = this[0];
      startIndex = 1;
    }

    for (let i = startIndex; i < this.length; i++) {
        accumulator = callback(accumulator, this[i], i, this);
    }

    return accumulator;
  };
}

// Example usage:
const numbers = [1, 2, 3, 4];
const sum = numbers.myReduce((acc, curr) => acc + curr, 0); // 10

```
