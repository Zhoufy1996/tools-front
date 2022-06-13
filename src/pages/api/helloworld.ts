import fetch from 'node-fetch';

export default async function handler(request: any, response: any) {
  try {
    const res = await fetch('http://110.40.224.170:4800/api/memory/findOne', {
      method: 'POST',
      body: JSON.stringify({
        code: 'd136',
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    return response.status(200).json(data);
  } catch (e) {
    console.log(e);
  }
}
