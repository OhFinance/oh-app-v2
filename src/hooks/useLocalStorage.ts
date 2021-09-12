import { useState } from 'react';

export function useLocalStorage<T extends string>(key: string, initialValue?: T) {
  const [valueProxy, setValueProxy] = useState(() => {
    try {
      const value = window.localStorage.getItem(key);
      return value ?? initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  function setValue(value: T) {
    try {
      window.localStorage.setItem(key, value);
      setValueProxy(value);
    } catch (error) {
      console.log(error);
      setValueProxy(value);
    }
  }

  return [valueProxy, setValue] as [T, (value: T) => void];
}
