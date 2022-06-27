import localforage from 'localforage';
import { useCallback, useEffect, useState } from 'react';

const useLocalForage = <T,>(key: string, defaultValue: T): [T, (v: T | ((pre: T) => T)) => void] => {
  const [state, setState] = useState<{ hasInit: boolean; data: T }>({
    hasInit: false,
    data: defaultValue,
  });

  useEffect(() => {
    const id = setInterval(() => {
      localforage.getItem(key).then((data) => {
        if (data != null) {
          clearInterval(id);
          setState({
            hasInit: true,
            data: data as T,
          });
        }
      });
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, [key]);

  useEffect(() => {
    if (state.hasInit) {
      localforage.setItem(key, state.data);
    }
  }, [key, state]);

  const onChange = useCallback((v: T | ((pre: T) => T)) => {
    if (typeof v === 'function') {
      setState((pre) => {
        return {
          ...pre,
          data: (v as (pre: T) => T)(pre.data),
        };
      });
    } else {
      setState((pre) => {
        return {
          ...pre,
          data: v,
        };
      });
    }
  }, []);

  return [state.data, onChange];
};

export default useLocalForage;
