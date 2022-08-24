import localforage from 'localforage';
import { ChangeEvent, useCallback, useState } from 'react';
import { fileSave, readImageFileAsDataURL, readFileAsText } from 'src/utils/file';
import { v4 } from 'uuid';
import { Box, Container, Grid } from '@mui/material';
import CharacterCard from 'src/components/pages/epic7/character/CharacterCard';
import ImageUpload from 'src/components/shared/ImageUpload/index2';
import useLocalForage from 'src/hooks/useLocalForage';
import { CharacterRecord } from 'src/types';
import dayjs from 'dayjs';
import { useSnackbar } from 'notistack';
import SyncData from 'src/components/shared/SyncData';
import ImageViewer from 'src/components/shared/ImageViewer';

const Character = () => {
  const [state, setState] = useLocalForage<string[]>('characterUuidList', []);
  const handleFileUpload = useCallback(
    async (urls: string[]) => {
      const handleFile = async (url: string) => {
        const uuid = v4();
        await localforage.setItem<CharacterRecord>(uuid, {
          url,
          name: '',
        });
        return uuid;
      };
      const uuids = await Promise.all(urls.map((url) => handleFile(url)));
      setState((pre) => {
        return [...uuids, ...pre];
      });
    },
    [setState]
  );

  const handleDelete = useCallback(
    (uuid: string) => {
      setState((pre) => {
        return pre.filter((item) => {
          return item !== uuid;
        });
      });
      localforage.removeItem(uuid);
    },
    [setState]
  );

  const [gallerDefaultUuid, setGallerDefaultUuid] = useState<string | null>(null);
  const handleCloseViewer = useCallback(() => {
    setGallerDefaultUuid(null);
  }, []);

  return (
    <Container sx={{ p: 1 }}>
      <Box sx={{ mb: 1 }}>
        <ImageUpload onOk={handleFileUpload}>图片</ImageUpload>
      </Box>
      <Box>
        <Grid container spacing={1}>
          {state.map((uuid) => {
            return (
              <Grid xs={12} md={6} xl={4} item key={uuid}>
                <CharacterCard setGallerDefaultUuid={setGallerDefaultUuid} uuid={uuid} handleDelete={handleDelete} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
      {gallerDefaultUuid != null && (
        <ImageViewer onCancel={handleCloseViewer} gallerDefaultUuid={gallerDefaultUuid} uuids={state} />
      )}
    </Container>
  );
};

export default Character;
