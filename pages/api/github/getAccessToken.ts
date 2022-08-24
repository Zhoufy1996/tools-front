import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';
import queryString from 'query-string';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const res = await fetch(`https://github.com/login/oauth/access_token`, {
    method: 'POST',
    body: request.body,
    headers: { 'Content-Type': 'application/json' },
  });
  let access_token;
  try {
    access_token = queryString.parse(await res.text()).access_token;
  } finally {
  }

  return response.status(res.status).json({ access_token });
}
