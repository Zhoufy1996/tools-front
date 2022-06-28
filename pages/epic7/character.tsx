import localforage from 'localforage';
import { ChangeEvent, useCallback, useState } from 'react';
import { fileSave, readImageFileAsDataURL, readFileAsText } from 'src/utils/file';
import { v4 } from 'uuid';
import { Box, Container, Grid } from '@mui/material';
import CharacterCard from 'src/components/pages/epic7/character/CharacterCard';
import ImageUpload from 'src/components/shared/ImageUpload';
import useLocalForage from 'src/hooks/useLocalForage';
import { CharacterRecord } from 'src/types';
import dayjs from 'dayjs';
import { useSnackbar } from 'notistack';
import SyncData from 'src/components/shared/SyncData';
import ImageViewer from 'src/components/shared/ImageViewer';

const Character = () => {
  const [state, setState] = useLocalForage<string[]>('characterUuidList', []);
  const { enqueueSnackbar } = useSnackbar();
  const handleFileUpload = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) {
        return;
      }
      const handleFile = async (file: File) => {
        const base64 = await readImageFileAsDataURL(file);
        const uuid = v4();
        await localforage.setItem<CharacterRecord>(uuid, {
          imageBase64: base64,
          name: '',
        });
        return uuid;
      };
      const uuids = await Promise.all(Array.from(e.target.files).map((file) => handleFile(file)));
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

  const handleExport = useCallback(async () => {
    const result: { [uuid: string]: CharacterRecord } = {};
    for (let uuid of state) {
      const data = await localforage.getItem<CharacterRecord>(uuid);
      if (data != null) {
        result[uuid] = data;
      }
    }

    fileSave(
      JSON.stringify({
        uuids: state,
        data: result,
      }),
      `character-${dayjs().format('YYYY-MM-DD HH:mm:ss')}`
    );
  }, [state]);

  const handleImport = useCallback(
    async (file: File) => {
      const data = await readFileAsText<{
        uuids: string[];
        data: { [uuid: string]: CharacterRecord };
      }>(file);
      if (data.uuids && data.uuids.length > 0) {
        setState(data.uuids);
      }
      if (data.data) {
        Promise.all(
          Object.entries(data.data).map(([uuid, item]) => {
            return localforage.setItem(uuid, item);
          })
        ).then(() => {
          enqueueSnackbar('导入成功');
        });
      }
    },
    [setState, enqueueSnackbar]
  );

  const [gallerDefaultUuid, setGallerDefaultUuid] = useState<string | null>(null);
  const handleCloseViewer = useCallback(() => {
    setGallerDefaultUuid(null);
  }, []);

  return (
    <Container sx={{ p: 1 }}>
      <Box sx={{ mb: 1 }}>
        <ImageUpload multiple onChange={handleFileUpload}>
          图片
        </ImageUpload>
        <SyncData popupId="character" onExport={handleExport} onImport={handleImport} />
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
