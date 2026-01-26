import { useState, useEffect } from "react";

/**
 * useSessionStorage
 *
 * Persists state in sessionStorage.
 * Works like useState, but syncs value with browser sessionStorage.
 */
const useSessionStorage = (key, initialState) => {
  // Read from sessionStorage on first render
  const getStoredData = () => {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : initialState;
  };

  // Lazy initialization to avoid reading storage on every render
  const [value, setValue] = useState(getStoredData);

  // Sync state changes to sessionStorage
  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useSessionStorage;
