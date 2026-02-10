### normal polyfill
```js
Array.prototype.ourFilter = function (callBack) {
  let output = [];
  for (let i = 0; i < this.length; i++) {
    if (callBack(this[i])) {
      output.push(this[i]);
    }
  }
  return output;
};
```

### using call supporting thisArg in filter()
```js
Array.prototype.myFilter = function(fn, context) {
  const array = this;
  const result = [];

  for(let i=0; i<array.length; i++) {
    if(fn.call(context, array[i], i, array)) {
      result.push(array[i]);
    }
  }
  return result;
}

const evenNumber = [1,2,3,4].myFilter((num) => num%2 === 0);
console.log(evenNumber)
```
