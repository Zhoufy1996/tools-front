export const log = async (res: any) => {
  console.log(`status: ${res.status}`);
  console.log(`data: ${await res.json()}`);
};
