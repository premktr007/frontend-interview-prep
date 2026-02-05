##### Compose and Pipe are utility functions used to combine multiple functions into a single function.Composition works Right-to-Left and Pipe workds Left to Right.

```js
const pipe = (...fns) => (initialValue) => {
  return fns.reduce((acc, fn) => fn(acc), initialValue);
};
```

```js
const compose = (...fns) => (initialValue) => {
  return fns.reduceRight((acc, fn) => fn(acc), initialValue);
};
```
