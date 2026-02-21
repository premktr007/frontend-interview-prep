```js
Promise.myAllSettled = function (promises) {
  return new Promise((resolve) => {
    // 1. Handle non-array or empty array input
    if (!Array.isArray(promises)) {
      throw new TypeError("Argument must be an array");
    }
    if (promises.length === 0) {
      return resolve([]);
    }

    const results = [];
    let completedCount = 0;

    promises.forEach((promise, index) => {
      // 2. Wrap in Promise.resolve to handle non-promise values
      Promise.resolve(promise)
        .then((value) => {
          // 3. On success, store the 'fulfilled' status object
          results[index] = { status: "fulfilled", value: value };
        })
        .catch((error) => {
          // 4. On failure, store the 'rejected' status object (don't reject main promise!)
          results[index] = { status: "rejected", reason: error };
        })
        .finally(() => {
          // 5. Track progress and resolve once EVERY promise has settled
          completedCount++;
          if (completedCount === promises.length) {
            resolve(results);
          }
        });
    });
  });
};
```
#### If you place resolve(results) outside the forEach loop, it will execute immediately, before any of the asynchronous operations have actually finished.
