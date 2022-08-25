import { ChangeEvent, useCallback } from 'react';
import { Box, Button, Container, Grid } from '@mui/material';
import localforage from 'localforage';
import { v4 } from 'uuid';
import { EquipmentRecord } from 'src/types';
import EquipmentCard from 'src/components/pages/epic7/equipment/EquipmentCard';
import ScoreCalcRule from 'src/components/pages/epic7/equipment/ScoreCalcRule';
import { readImageFileAsDataURL, readFileAsText } from 'src/utils/file';
import useLocalForage from 'src/hooks/useLocalForage';
import ImageUpload from 'src/components/shared/ImageUpload';

import { useSnackbar } from 'notistack';

const OcrView = () => {
  const [state, setState] = useLocalForage<string[]>('equipmentUrlList', []);
  const { enqueueSnackbar } = useSnackbar();

  const handleFileUpload = useCallback(
    async (urls: string[]) => {
      const handleFile = async (url: string) => {
        await localforage.setItem<EquipmentRecord>(url, {
          imageUrl: url,
          parseString: '',
        });
        return url;
      };
      await Promise.all(urls.map((url) => handleFile(url)));
      setState((pre) => {
        return [...urls, ...pre];
      });
    },
    [setState]
  );

  const handleDelete = useCallback(
    (imageUrl: string) => {
      setState((pre) => {
        return pre.filter((item) => {
          return item !== imageUrl;
        });
      });
      localforage.removeItem(imageUrl);
    },
    [setState]
  );

  return (
    <Container sx={{ p: 1 }}>
      <Box sx={{ mb: 1 }}>
        <ImageUpload multiple onOk={handleFileUpload} />
        <ScoreCalcRule />
      </Box>
      <Box>
        <Grid container spacing={1}>
          {state.map((imageUrl) => {
            return (
              <Grid xs={12} md={6} xl={4} item key={imageUrl}>
                <EquipmentCard handleDelete={handleDelete} imageUrl={imageUrl} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Container>
  );
};

export default OcrView;
