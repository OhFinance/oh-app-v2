import { useState } from 'react';

export function useLocalStorage<T extends string>(key: string, initialValue?: T) {
  const [valueProxy, setValueProxy] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    const value = window.localStorage.getItem(key);
    return value ?? initialValue;
  });

  function setValue(value: T) {
    if (typeof window === 'undefined') {
      setValueProxy(value);
      return;
    }
    window.localStorage.setItem(key, value);
    setValueProxy(value);
  }

  return [valueProxy, setValue] as [T, (value: T) => void];
}
