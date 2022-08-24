import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';
import queryString from 'query-string';
import * as qiniu from 'qiniu';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  var mac = new qiniu.auth.digest.Mac(qiniuK.AK, qiniuK.SK);

  var options = {
    scope: bucket,
    expires: 72000,
  };

  var putPolicy = new qiniu.rs.PutPolicy(options);
  var uploadToken = putPolicy.uploadToken(mac);
  return response.status(200).json({ uploadToken });
}
