```js
function reqTimeout(promise, timeout = 3000) {
  let timerId;

  const timeoutPromise = new Promise((_, reject) => {
    // Standard practice: Reject with an Error object, not just a string
    timerId = setTimeout(() => reject(new Error('Request Timeout')), timeout);
  });

  // Ensure 'promise' is treated as a Promise
  return Promise.race([Promise.resolve(promise), timeoutPromise])
    .finally(() => {
      // Correctly pass a function reference to finally
      clearTimeout(timerId);
    });
}

// Usage
reqTimeout(fetch('https://example.com'), 5000)
  .then(res => console.log(res))
  .catch(err => console.error(err.message));

```
