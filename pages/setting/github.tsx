import { Button, Container } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { getGithubToken, githubOptions } from 'src/utils/github';
import { useRouter } from 'next/router';
import { fetcher } from 'src/utils/fetcher';
import useLocalForage from 'src/hooks/useLocalForage';
import Image from 'next/image';
import EditInput from 'src/components/app/EditInput';

const GithubSetting = () => {
  const [accessToken, setAccessToken, hasInit] = useLocalForage('github_access_token', '');
  const [gistId, setGistId, gistHasInit] = useLocalForage('gistId', '');
  const [profile, setProfile] = useState<{
    avatar_url: string;
    login: string;
  } | null>(null);

  useEffect(() => {
    if (accessToken) {
      fetcher<any>('https://api.github.com/user', {
        headers: {
          Authorization: `token ${accessToken}`,
          accept: 'application/vnd.github.v3+json',
        },
      }).then((res) => {
        setProfile(res);
      });
    }
  }, [accessToken]);

  return (
    <Container sx={{ p: 1 }}>
      {profile ? (
        <div>
          <Image width={80} height={80} src={profile.avatar_url} alt={profile.login} />
        </div>
      ) : (
        <Button onClick={getGithubToken}>login</Button>
      )}
      {gistHasInit && (
        <EditInput
          defaultValue={gistId}
          onOk={(v) => {
            setGistId(v);
          }}
        />
      )}
    </Container>
  );
};

export default GithubSetting;
