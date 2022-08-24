import { Button, ButtonProps, SxProps, Theme } from '@mui/material';
import { UploadFileOutlined } from '@mui/icons-material';
import { ChangeEvent, useCallback } from 'react';
import * as qiniu from 'qiniu-js';
import useSWR from 'swr';
import { fetcher } from 'src/utils/fetcher';

interface ImageUploadProps {
  onOk: (urls: string[]) => void;
  children?: React.ReactNode;
}

const ImageUpload = ({ onOk, children }: ImageUploadProps) => {
  const { data } = useSWR<{ uploadToken: string }>('/api/qiniu/getToken', fetcher);
  const handleFileUpload = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) {
        return;
      }

      if (!data?.uploadToken) {
        return;
      }

      const handleFile = (file: File) => {
        const observable = qiniu.upload(file, `${new Date().getTime()}`, data?.uploadToken);
        // or
        return new Promise((resolve, reject) => {
          const subscription = observable.subscribe(
            (v) => {
              console.log(v);
            },
            null,
            (v) => {
              console.log(v);
              resolve(v);
            }
          ); // 这样传参形式也可以
        });
      };

      await Promise.all(Array.from(e.target.files).map((file) => handleFile(file)));
    },
    [data]
  );

  return (
    <Button component="label" variant="outlined" startIcon={<UploadFileOutlined />}>
      <input type="file" multiple={false} accept=".png,.gif,.jpeg,.jpg" hidden onChange={handleFileUpload} />
      {children}
    </Button>
  );
};

export default ImageUpload;
