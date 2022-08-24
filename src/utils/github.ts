export const githubOptions = {
  client_id: '850dc664daed95614ca5',
  client_secret: 'a2524db5969d0cd078aac5a75dbe4eee064a7e7b',
};

export const getGithubToken = () => {
  return new Promise((resolve, reject) => {
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${githubOptions.client_id}&scope=gist,user`;
    window.open(authUrl, '_blink');
  });
};
