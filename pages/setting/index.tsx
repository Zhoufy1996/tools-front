import { useRouter } from 'next/router';
import { useEffect } from 'react';

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/setting/github');
  }, [router]);

  return null;
};

export default NotFound;
