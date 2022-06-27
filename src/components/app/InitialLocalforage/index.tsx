import localforage from 'localforage';
import { useEffect } from 'react';

const InitialLocalforage = () => {
  useEffect(() => {
    localforage.getItem('characterUuidList').then((res) => {
      if (res == null) {
        localforage.setItem('characterUuidList', []);
      }
    });
    localforage.getItem('equipmentUuidList').then((res) => {
      if (res == null) {
        localforage.setItem('equipmentUuidList', []);
      }
    });
  }, []);
  return null;
};

export default InitialLocalforage;
