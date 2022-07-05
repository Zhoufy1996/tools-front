import JSEncrypt from 'nodejs-jsencrypt';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const aesKey = process.env.AES_KEY;
  const rsaPublicKey = process.env.RSA_PUBLIC_KEY;
  if (aesKey == null || rsaPublicKey == null) {
    return response.status(500).json({
      message: '缺少密钥',
    });
  }
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(rsaPublicKey);
  return response.status(200).json({ key: encrypt.encrypt(aesKey) });
}
