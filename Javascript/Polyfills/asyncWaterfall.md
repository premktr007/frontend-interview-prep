```js
/**
 * Executes an array of async functions in series, 
 * passing the result of one to the next.
 * @param {Array<Function>} tasks - Array of functions returning promises.
 * @param {*} initialValue - Optional starting value for the first task.
 */
async function asyncWaterfall(tasks, initialValue) {
  return tasks.reduce(async (previousPromise, currentTask) => {
    // 1. Wait for the previous task to resolve
    const previousResult = await previousPromise;
    
    // 2. Pass its result into the current task
    return currentTask(previousResult);
  }, Promise.resolve(initialValue));
}

// --- Example Usage ---

const step1 = (val) => new Promise(res => {
  console.log("Step 1: Adding 10 to", val);
  setTimeout(() => res(val + 10), 1000);
});

const step2 = (val) => new Promise(res => {
  console.log("Step 2: Multiplying", val, "by 2");
  setTimeout(() => res(val * 2), 1000);
});

const step3 = (val) => new Promise(res => {
  console.log("Step 3: Subtracting 5 from", val);
  setTimeout(() => res(val - 5), 1000);
});

// Run the waterfall starting with 5
asyncWaterfall([step1, step2, step3], 5)
  .then(finalResult => console.log("Final Result:", finalResult)) // Output: 25 after ~3s
  .catch(err => console.error("Waterfall failed at some step:", err));
```
