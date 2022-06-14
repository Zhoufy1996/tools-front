import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method?.toLowerCase() === 'post') {
    const res = await fetch(`${process.env.SERVER_BASE_URL}memory`, {
      method: 'POST',
      body: request.body,
      headers: { 'Content-Type': 'application/json' },
    });
    return response.status(res.status).json(await res.json());
  }

  return response.status(500).json({
    message: '不存在的路由',
  });
}
