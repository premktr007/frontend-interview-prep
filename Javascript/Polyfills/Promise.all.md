```js
Promise.myAll = function (promises) {
  let result = [];
  let completed = 0; // Track how many actually finished

  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      // Use Promise.resolve in case the input isn't a promise (e.g. a number)
      Promise.resolve(promise)
        .then((res) => {
          result[index] = res; // 1. Maintain Order
          completed++;

          // 2. Only resolve when EVERY promise is done
          if (completed === promises.length) {
            resolve(result);
          }
        })
        .catch(reject); // 3. Fail-fast on first error
    });

    // Handle empty array edge case
    if (promises.length === 0) resolve([]);
  });
};
```
