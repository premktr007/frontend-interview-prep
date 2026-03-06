```js
function withTimeout(promise, ms = 5000) {
  let timerId;
  
  const timeoutPromise = new Promise((_, reject) => {
    // Correctly wrap reject in an anonymous function
    timerId = setTimeout(() => reject(new Error('Operation timed out')), ms);
  });

  // Pass a function to finally to ensure it runs after the race ends
  return Promise.race([promise, timeoutPromise])
    .finally(() => clearTimeout(timerId));
}

// Usage: Note we pass the fetch promise directly
const getUsers = fetch('https://example.com');

withTimeout(getUsers, 3000)
  .then(res => console.log("Success:", res))
  .catch(error => console.error("Error:", error));
```
