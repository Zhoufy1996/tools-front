import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetcher } from 'src/utils/fetcher';
import { githubOptions } from 'src/utils/github';
import localforage from 'localforage';

export const Token = () => {
  const router = useRouter();
  useEffect(() => {
    if (router.query.code) {
      fetcher<{ access_token: string }>('/api/github/getAccessToken', {
        method: 'post',
        body: JSON.stringify({
          ...githubOptions,
          code: router.query.code as string,
        }),
      })
        .then((res) => {
          localforage.setItem('github_access_token', res.access_token).then(() => {
            router.push('/setting/github');
          });
        })
        .catch(() => {
          router.push('/setting/github');
        });
    }
  }, [router]);

  return '正在获取access_token中，请稍等...';
};

export default Token;
