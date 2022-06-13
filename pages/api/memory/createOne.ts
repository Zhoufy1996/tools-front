import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const res = await fetch(`${process.env.SERVER_BASE_URL}memory/createOne`, {
    method: 'POST',
    body: request.body,
    headers: { 'Content-Type': 'application/json' },
  });

  return response.status(res.status).json(await res.json());
}
