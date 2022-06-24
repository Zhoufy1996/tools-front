import { NextApiRequest, NextApiResponse } from 'next';
import * as tencentcloud from 'tencentcloud-sdk-nodejs';

const OcrClient = tencentcloud.ocr.v20181119.Client;

const client = new OcrClient({
  credential: {
    secretId: process.env.SECRETID,
    secretKey: process.env.SECRETKEY,
  },
  region: 'ap-beijing',
  profile: {
    httpProfile: {
      endpoint: 'ocr.tencentcloudapi.com',
    },
  },
});

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  try {
    const res = await client.GeneralAccurateOCR({
      ImageBase64: JSON.parse(request.body).imageBase64,
    });

    return response.status(200).json(res.TextDetections);
  } catch (e) {
    return response.status(500).json({ error: e });
  }
}
