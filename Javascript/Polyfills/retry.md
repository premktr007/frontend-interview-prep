```js
/**
 * Retries an async function with exponential backoff.
 * @param {Function} fn - The async function to execute (should return a Promise).
 * @param {number} retries - Maximum number of retry attempts.
 * @param {number} delay - Initial delay in milliseconds.
 */
async function retryFetch(fn, retries = 3, delay = 1000) {
  try {
    const response = await fn();

    // fetch() only throws on network failure, not 4xx/5xx errors.
    // We must manually check response.ok to trigger a retry for server errors.
    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    // If no retries left, throw the error to the caller
    if (retries <= 0) {
      throw error;
    }

    console.warn(`Retrying... Attempts left: ${retries}. Error: ${error.message}`);

    // Wait for the specified delay
    await new Promise(resolve => setTimeout(resolve, delay));

    // Recursive call with decremented retries and doubled delay (backoff)
    return retryFetch(fn, retries - 1, delay * 2);
  }
}

// Example Usage:
const fetchData = () => fetch('https://example.com');

retryFetch(fetchData)
  .then(data => console.log('Success:', data))
  .catch(err => console.error('Final Failure:', err.message));
```
