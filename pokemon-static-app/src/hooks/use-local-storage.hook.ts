import { useCallback } from 'react';

import { LocalStorageMap } from '../types/common/local-storage-map.type';

export const useLocalStorage = <
  Map extends LocalStorageMap = LocalStorageMap
>() => {
  const get = useCallback(
    <Key extends keyof Map>(key: Key): Map[Key]['data'] | null => {
      const item = localStorage.getItem(key.toString());
      if (!item) return null;
      const data = JSON.parse(item) as Map[Key]['data'];
      return data;
    },
    []
  );

  const set = useCallback(
    <Key extends keyof Map>(key: Key, data: Map[Key]['data']): void => {
      const stringifiedItem = JSON.stringify(data);
      localStorage.setItem(key.toString(), stringifiedItem);
    },
    []
  );

  const deleteItem = useCallback(<Key extends keyof Map>(key: Key) => {
    localStorage.removeItem(key.toString());
  }, []);

  return { get, set, delete: deleteItem };
};
