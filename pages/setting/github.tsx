import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { fetcher } from 'src/utils/fetcher';
import useLocalForage from 'src/hooks/useLocalForage';
import EditInput from 'src/components/app/EditInput';

const GithubSetting = () => {
  const [token, setToken, tokenHasInit] = useLocalForage('githubToken', '');
  const [gistId, setGistId, gistHasInit] = useLocalForage('gistId', '');
  const [repo, setRepo, repoHasInit] = useLocalForage('repo', '');
  const [profile, setProfile] = useLocalForage<{
    avatar_url: string;
    login: string;
  } | null>('profile', null);

  useEffect(() => {
    if (token) {
      fetcher<any>('https://api.github.com/user', {
        headers: {
          Authorization: `token ${token}`,
          accept: 'application/vnd.github.v3+json',
        },
      }).then((res) => {
        setProfile({
          avatar_url: res.avatar_url,
          login: res.login,
        });
      });
    }
  }, [token, setProfile]);

  useEffect(() => {
    if (token && repo && profile?.login) {
      fetcher<any>(`https://api.github.com/repos/${profile.login}/${repo}`, {
        headers: {
          Authorization: `token ${token}`,
          accept: 'application/vnd.github.v3+json',
        },
      }).then((res) => {
        // setProfile(res);
      });
    }
  }, [token, repo, profile]);

  return (
    <Container sx={{ p: 1 }}>
      {tokenHasInit && (
        <EditInput
          defaultValue={token}
          onOk={(v) => {
            setToken(v);
          }}
        />
      )}
      {gistHasInit && (
        <EditInput
          defaultValue={gistId}
          onOk={(v) => {
            setGistId(v);
          }}
        />
      )}
      {repoHasInit && (
        <EditInput
          defaultValue={repo}
          onOk={(v) => {
            setRepo(v);
          }}
        />
      )}
    </Container>
  );
};

export default GithubSetting;
