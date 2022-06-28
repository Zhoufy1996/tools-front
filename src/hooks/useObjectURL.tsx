import { useEffect, useState } from 'react';
import { readBase64AsObjectUrl } from 'src/utils/image';

const useObjectURL = (dataBase64: string): string => {
  const [objectURL, setObjectURL] = useState<string>('');

  useEffect(() => {
    if (dataBase64 !== '') {
      const blobUrl = readBase64AsObjectUrl(dataBase64);
      setObjectURL(blobUrl);
      return () => {
        setObjectURL('');
        URL.revokeObjectURL(blobUrl);
      };
    }
    return () => {};
  }, [dataBase64]);

  return objectURL;
};

export default useObjectURL;
