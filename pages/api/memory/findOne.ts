import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';
import { log } from '../../../src/utils/logger';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const res = await fetch(`${process.env.SERVER_BASE_URL}memory/findOne`, {
    method: 'POST',
    body: request.body,
    headers: { 'Content-Type': 'application/json' },
  });

  log(res);

  return response.status(res.status).json(await res.json());
}
