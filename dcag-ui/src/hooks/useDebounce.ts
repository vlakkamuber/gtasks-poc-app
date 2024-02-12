import { useCallback } from 'react';

const useDebounce = (func, delay) => {
  let timeoutId;
  return useCallback((...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  }, []);
};

export default useDebounce;
