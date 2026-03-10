```js
async function asyncSeries(tasks) {
  const results = [];
  
  for (const task of tasks) {
    // Wait for the current task to finish before moving to the next
    const result = await task();
    results.push(result);
  }
  
  return results;
}

// Usage
const task1 = () => new Promise(res => setTimeout(() => res('A'), 1000));
const task2 = () => new Promise(res => setTimeout(() => res('B'), 500));
asyncSeries([task1, task2]).then(console.log); // ['A', 'B'] after ~1.5s
```
