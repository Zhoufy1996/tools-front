import localforage from 'localforage';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { menusData } from 'src/utils/menus';

const validPaths: string[] = Object.entries(menusData)
  .map(([module, data]) => {
    return Object.keys(data).map((key) => {
      return `/${module}/${key}`;
    });
  })
  .flat();

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    localforage.getItem<string>('lastPathname').then((res) => {
      if (res && validPaths.includes(res)) {
        router.push(res);
      } else {
        router.push('/life');
      }
    });
  }, [router]);

  return null;
};

export default NotFound;
