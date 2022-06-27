import localforage from 'localforage';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const validPaths = ['/memory', '/epic7/character', '/epic7/equipment'];

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    localforage.getItem<string>('lastPathname').then((res) => {
      if (res && validPaths.includes(res)) {
        router.push(res);
      } else {
        router.push('/memory');
      }
    });
  }, [router]);

  return null;
};

export default NotFound;
