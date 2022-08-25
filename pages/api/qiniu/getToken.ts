import { NextApiRequest, NextApiResponse } from 'next';
import * as qiniu from 'qiniu';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  var mac = new qiniu.auth.digest.Mac(process.env.QINIU_AK, process.env.QINIU_SK);

  var options = {
    scope: process.env.QINIU_OSS_BUCKET,
    expires: 72000,
  };

  var putPolicy = new qiniu.rs.PutPolicy(options);
  var uploadToken = putPolicy.uploadToken(mac);
  return response.status(200).json({ uploadToken });
}
