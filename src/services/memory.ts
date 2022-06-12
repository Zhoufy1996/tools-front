import { MemoryRecord } from '../types';
import { request } from '../utils/fetch';

const baseUrl = 'memory/';

export const findOneMemory = (code: string): Promise<MemoryRecord> => {
  return request(`${baseUrl}findOne`, {
    method: 'post',
    body: JSON.stringify({
      code,
    }),
  });
};

export const createOneMemory = (content: string): Promise<string> => {
  return request(`${baseUrl}createOne`, {
    method: 'post',
    body: JSON.stringify({
      content,
    }),
  });
};
