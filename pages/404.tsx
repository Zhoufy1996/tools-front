import localforage from 'localforage';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    localforage.getItem('lastPathname').then((res) => {
      router.push((res as string) || '/memory');
    });
  }, [router]);

  return null;
};

export default NotFound;
