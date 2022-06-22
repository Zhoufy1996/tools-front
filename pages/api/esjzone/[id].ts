import { NextApiRequest, NextApiResponse } from 'next';
import getNovelContent from '../../../src/utils/esjzone';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method?.toLowerCase() === 'get') {
    const { id } = request.query;
    try {
      const content = await getNovelContent(Number(id as string));
      return response.status(200).json(content);
    } catch (e) {
      console.log(e);
      return response.status(500).json({ error: e });
    }
  }

  return response.status(500).json({
    message: '不存在的路由',
  });
}
