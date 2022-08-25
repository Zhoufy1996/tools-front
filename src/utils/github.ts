import localforage from 'localforage';
import { CharacterRecord, EquipmentRecord } from 'src/types';
import { fetcher } from './fetcher';

export const githubOptions = {
  client_id: '850dc664daed95614ca5',
  client_secret: 'a2524db5969d0cd078aac5a75dbe4eee064a7e7b',
};

export const getAllLocalData = async () => {
  const characterUrlList = await localforage.getItem<string[]>('characterUrlList');
  const equipmentUrlList = await localforage.getItem<string[]>('equipmentUrlList');
  const data: {
    [url: string]: CharacterRecord | EquipmentRecord;
  } = {};
  for (let url in characterUrlList) {
    const record = await localforage.getItem<CharacterRecord>(url);
    if (record) {
      data[url] = record;
    }
  }

  for (let url in equipmentUrlList) {
    const record = await localforage.getItem<EquipmentRecord>(url);
    if (record) {
      data[url] = record;
    }
  }

  return {
    characterUrlList,
    equipmentUrlList,
    data,
  };
};

export const uploadGist = async () => {
  const data = {
    description: 'config',
    public: false,
    files: {
      config: {
        filename: 'config',
        content: JSON.stringify(await getAllLocalData()),
      },
    },
  };

  const gistId = await localforage.getItem('gistId');
  const token = await localforage.getItem('token');
  if (gistId && token) {
    await fetcher(`https://api.github.com/gists/${gistId}`, {
      headers: {
        Authorization: `token ${token}`,
        accept: 'application/vnd.github.v3+json',
      },
      method: 'patch',
      body: JSON.stringify(data),
    });
  }
};

export const getGist = async () => {
  const gistId = await localforage.getItem('gistId');
  const token = await localforage.getItem('token');
  if (gistId && token) {
    const res = await fetcher<any>(`https://api.github.com/gists/${gistId}`, {
      headers: {
        Authorization: `token ${token}`,
        accept: 'application/vnd.github.v3+json',
      },
    });
    const remoteData = JSON.parse(res.data.files.config.content);
    const { characterUrlList, equipmentUrlList, data } = remoteData;
    const mergeCharacterUrlList = [
      ...characterUrlList,
      ...((await localforage.getItem<string[]>('characterUrlList')) || []),
    ];
    const mergeEquipmentUrlList = [
      ...equipmentUrlList,
      ...((await localforage.getItem<string[]>('characterUrlList')) || []),
    ];
    for (let url in mergeCharacterUrlList) {
      const record = data[url];
      if (record) {
        await localforage.setItem(url, record);
      }
    }

    for (let url in mergeEquipmentUrlList) {
      const record = data[url];
      if (record) {
        await localforage.setItem(url, record);
      }
    }
  }
};
