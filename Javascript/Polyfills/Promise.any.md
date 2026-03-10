```js
Promise.myAny = function(promises) {
    return new Promise((resolve, reject) => {
        if (promises.length === 0) {
            // SPEC: Reject with AggregateError for empty iterables
            return reject(new AggregateError([], "All promises were rejected"));
        }

        const errors = [];
        let rejectedCount = 0;

        promises.forEach((promise, index) => {
            Promise.resolve(promise)
                .then(resolve) // The first success wins immediately
                .catch((error) => {
                    errors[index] = error;
                    rejectedCount++;

                    // Only reject if ALL have failed
                    if (rejectedCount === promises.length) {
                        reject(new AggregateError(errors, "All promises were rejected"));
                    }
                });
        });
    });
};
```
