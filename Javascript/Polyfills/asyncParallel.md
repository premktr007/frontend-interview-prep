```js
async function asyncParallel(tasks) {
  // Map each task to its execution promise immediately
  const promises = tasks.map(task => task());
  
  // Wait for all to complete
  return Promise.all(promises);
}

// Usage
const task1 = () => new Promise(res => setTimeout(() => res('A'), 1000));
const task2 = () => new Promise(res => setTimeout(() => res('B'), 500));

asyncParallel([task1, task2]).then(console.log); // ['A', 'B'] after ~1s
```
