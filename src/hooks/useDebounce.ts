import { useEffect, useMemo, useState } from 'react';
import debounce from 'lodash.debounce';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  const debouncedCallback = useMemo(
    () => debounce(setDebouncedValue, delay),
    [delay],
  );

  useEffect(() => {
    debouncedCallback(value);

    return () => {
      debouncedCallback.cancel();
    };
  }, [value, debouncedCallback]);

  return debouncedValue;
}
