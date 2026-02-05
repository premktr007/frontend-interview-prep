##Normal memoize
```js
function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}
```

##memoizing functions and objects
```js
function universalMemoize(fn) {
  // 1. Create two separate storage areas
  const primitiveCache = new Map();
  const objectCache = new WeakMap();

  return function(arg) {
    // Determine which cache to use based on the type
    const isObject = (typeof arg === 'object' && arg !== null) || typeof arg === 'function';
    const currentCache = isObject ? objectCache : primitiveCache;

    // Check if we've seen this specific argument before
    if (currentCache.has(arg)) {
      console.log('Cache Hit');
      return currentCache.get(arg);
    }

    // Execute and store
    const result = fn.call(this, arg);
    currentCache.set(arg, result);
    return result;
  };
}

// --- Usage ---
const processData = universalMemoize((data) => {
  return Array.isArray(data) ? data.length : typeof data;
});

processData(10);        // Primitive Cache
processData({id: 1});   // Object Cache (Safe from memory leaks)
```

