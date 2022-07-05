import { Typography } from '@mui/material';
import { useMemo } from 'react';
import { fetcher } from 'src/utils/fetcher';
import useSWR from 'swr';
import JSEncrypt from 'jsencrypt';
import CryptoJS from 'crypto-js';

const encryptStr = (text: string, key: string) => {
  try {
    const encryptedData = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(text), key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encryptedData.toString();
  } catch (e) {
    return text;
  }
};

interface EncryptProps {
  text: string;
}

const Encrypt = ({ text }: EncryptProps) => {
  const { data, error } = useSWR<{ key: string }>('/api/secret', fetcher);
  const AESKey = useMemo(() => {
    if (data && data.key) {
      const RSAprivateKey = process.env.NEXT_PUBLIC_RSA_PRIVATE_KEY;
      if (RSAprivateKey) {
        const jsEncrypt = new JSEncrypt();
        jsEncrypt.setPrivateKey(RSAprivateKey);
        return jsEncrypt.decrypt(data.key);
      }
    }
    return '';
  }, [data]);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  if (!text) return null;
  if (!AESKey) return <div>failed to get key</div>;
  return <Typography sx={{ wordBreak: 'break-all' }}>{encryptStr(text, AESKey)}</Typography>;
};

export default Encrypt;
