import { IconButton } from '@mui/material';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { fetcher } from 'src/utils/fetcher';
import { getSuffix, readImageFileAsDataURL } from 'src/utils/file';
import { v4 } from 'uuid';
import localforage from 'localforage';
import { useSnackbar } from 'notistack';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
interface ImageUploadProps {
  onOk?: (urls: string[]) => {};
  multiple?: boolean;
}

const ImageUpload = ({ onOk, multiple = false }: ImageUploadProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const handleFileUpload = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) {
        return;
      }

      const profile = await localforage.getItem<{
        avatar_url: string;
        login: string;
      } | null>('profile');
      const repo = await localforage.getItem<string>('repo');
      const token = await localforage.getItem<string>('githubToken');

      if (!profile?.avatar_url || !repo || !token) {
        enqueueSnackbar('缺少配置');
        return;
      }

      const handleFile = async (file: File) => {
        const base64 = await readImageFileAsDataURL(file);
        const uuid = v4();
        const list = base64.split(',');
        const filename = `${uuid}.${getSuffix(file.name)}`;
        const res = await fetcher<{
          content: {
            download_url: string;
          };
        }>(`https://api.github.com/repos/${profile?.login}/${repo}/contents/files/${filename}`, {
          headers: {
            Authorization: `token ${token}`,
            accept: 'application/vnd.github.v3+json',
          },
          method: 'put',
          body: JSON.stringify({
            message: uuid,
            content: list[list.length - 1],
          }),
        });
        return res.content.download_url;
      };

      const urls = await Promise.all(Array.from(e.target.files).map((file) => handleFile(file)));
      onOk && onOk(urls);
    },
    [enqueueSnackbar, onOk]
  );

  return (
    <IconButton color="primary" aria-label="upload picture" component="label">
      <AddPhotoAlternateIcon />
      <input type="file" multiple={multiple} accept=".png,.gif,.jpeg,.jpg" hidden onChange={handleFileUpload} />
    </IconButton>
  );
};

export default ImageUpload;
