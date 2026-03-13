#### Promise.race() takes an array of promises and settles (either resolves or rejects) as soon as the first promise in the array settles. It’s a literal "race"—the quickest one wins, and the others are ignored. network timeout is the real-world example

```js
Promise.myRace = function(promises) {
    // 1. Basic validation
    if (!Array.isArray(promises)) {
        throw new TypeError("Argument must be an array");
    }

    return new Promise((resolve, reject) => {
        promises.forEach((p) => {
            // 2. Wrap in Promise.resolve to handle raw values like strings/numbers
            Promise.resolve(p)
                .then(resolve) // Shortcut: directly pass resolve function
                .catch(reject); // Shortcut: directly pass reject function
        });
    });
};

// --- Test Case (Your exact scenario) ---

const fetchUser = () => {
  return new Promise((_, reject) => {
    setTimeout(() => reject('Error: fetching user failed'), 1000);
  });
};

const fetchPosts = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(["Post 1", "Post 2", "Post 3"]), 2000);
  });
};

Promise.myRace([fetchUser(), fetchPosts()])
  .then((res) => console.log("Result:", res))
  .catch((err) => console.log("Caught:", err)); 
  // Output after 1s: "Caught: Error: fetching user failed"
```
#### Instead of writing .then(res => resolve(res)), you can just write .then(resolve). Since resolve is already a function that takes one argument, the Promise engine passes the result directly into it.
