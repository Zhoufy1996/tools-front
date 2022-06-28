import { ChangeEvent, useCallback } from 'react';
import { UploadFileOutlined } from '@mui/icons-material';
import { Box, Button, Container, Grid } from '@mui/material';
import localforage from 'localforage';
import { v4 } from 'uuid';
import { EquipmentRecord } from 'src/types';
import EquipmentCard from 'src/components/pages/epic7/equipment/EquipmentCard';
import ScoreCalcRule from 'src/components/pages/epic7/equipment/ScoreCalcRule';
import { fileSave, readImageFileAsDataURL, readFileAsText } from 'src/utils/file';
import useLocalForage from 'src/hooks/useLocalForage';
import ImageUpload from 'src/components/shared/ImageUpload';
import SyncData from 'src/components/shared/SyncData';
import dayjs from 'dayjs';
import { useSnackbar } from 'notistack';

const OcrView = () => {
  const [state, setState] = useLocalForage<string[]>('equipmentUuidList', []);
  const { enqueueSnackbar } = useSnackbar();

  const handleFileUpload = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) {
        return;
      }
      const handleFile = async (file: File) => {
        const base64 = await readImageFileAsDataURL(file);
        const uuid = v4();
        await localforage.setItem<EquipmentRecord>(uuid, {
          imageBase64: base64,
          parseString: '',
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
    const result: { [uuid: string]: EquipmentRecord } = {};
    for (let uuid of state) {
      const data = await localforage.getItem<EquipmentRecord>(uuid);
      if (data != null) {
        result[uuid] = data;
      }
    }

    fileSave(
      JSON.stringify({
        uuids: state,
        data: result,
      }),
      `equipment-${dayjs().format('YYYY-MM-DD HH:mm:ss')}`
    );
  }, [state]);

  const handleImport = useCallback(
    async (file: File) => {
      const data = await readFileAsText<{
        uuids: string[];
        data: { [uuid: string]: EquipmentRecord };
      }>(file);
      if (data.uuids && data.uuids.length > 0) {
        setState(data.uuids);
      }

      if (data.data) {
        for (let uuid in data.data) {
          await localforage.setItem(uuid, data.data[uuid]);
        }
        enqueueSnackbar('导入成功');
      }
    },
    [setState, enqueueSnackbar]
  );

  return (
    <Container sx={{ p: 1 }}>
      <Box sx={{ mb: 1 }}>
        <ImageUpload multiple onChange={handleFileUpload}>
          图片
        </ImageUpload>
        <ScoreCalcRule />
        <SyncData popupId="equipment" onExport={handleExport} onImport={handleImport} />
      </Box>
      <Box>
        <Grid container spacing={1}>
          {state.map((uuid) => {
            return (
              <Grid xs={12} md={6} xl={4} item key={uuid}>
                <EquipmentCard handleDelete={handleDelete} uuid={uuid} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Container>
  );
};

export default OcrView;
