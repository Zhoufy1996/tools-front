import b64toBlob from 'b64-to-blob';

export const readBase64AsObjectUrl = (dataBase64: string) => {
  const blob = b64toBlob(dataBase64.substring(dataBase64.indexOf(',') + 1));
  const blobUrl = URL.createObjectURL(blob);
  return blobUrl;
};
