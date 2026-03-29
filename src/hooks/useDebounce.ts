import { useEffect, useState } from 'react';

// Delays updating the value until the user stops typing.
// Prevents filtering on every single keystroke.
export const useDebounce = <T>(value: T, delay = 300): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: if value changes again before delay expires,
    // clear the old timer and start a new one.
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};
