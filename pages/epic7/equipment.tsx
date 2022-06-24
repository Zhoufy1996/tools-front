import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { UploadFileOutlined } from '@mui/icons-material';
import { Box, Button, Container, Grid } from '@mui/material';
import localforage from 'localforage';
import { v4 } from 'uuid';
import { EquipmentRecord } from '../../src/types';
import EquipmentCard from '../../src/components/EquipmentCard';
import LZString from 'lz-string';
import Compressor from 'compressorjs';
import ScoreCalcRule from '../../src/components/ScoreCalcRule';

const OcrView = () => {
  const [state, setState] = useState<{
    hasInit: boolean;
    equipmentData: EquipmentRecord[];
  }>({
    hasInit: false,
    equipmentData: [],
  });

  const handleGetData = useCallback(() => {
    localforage.getItem('epic7-equipment').then((data) => {
      setState({
        hasInit: true,
        equipmentData:
          (data as EquipmentRecord[])?.map((item) => {
            return {
              ...item,
              imageBase64: LZString.decompress(item.imageBase64) || '',
            };
          }) || [],
      });
    });
  }, []);

  useEffect(() => {
    handleGetData();
  }, [handleGetData]);

  useEffect(() => {
    if (state.hasInit) {
      localforage.setItem(
        'epic7-equipment',
        state.equipmentData.map((item) => {
          return {
            ...item,
            imageBase64: LZString.compress(item.imageBase64),
          };
        })
      );
    }
  }, [state]);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    new Compressor(file, {
      quality: 0.6,

      // The compression process is asynchronous,
      // which means you have to access the `result` in the `success` hook function.
      success(result) {
        const reader = new FileReader();
        reader.readAsDataURL(result);
        reader.onload = () => {
          setState((pre) => {
            return {
              ...pre,
              equipmentData: [
                {
                  uuid: v4(),
                  imageBase64: reader.result as string,
                },
                ...pre.equipmentData,
              ],
            };
          });
        };
        reader.onerror = (err) => {
          console.log(err);
        };
      },
      error(err) {
        console.log(err.message);
      },
    });
  };

  const handleEditData = useCallback((parseString: string, uuid: string) => {
    setState((pre) => {
      return {
        ...pre,
        equipmentData: pre.equipmentData.map((item) => {
          if (item.uuid === uuid) {
            return {
              ...item,
              parseString,
            };
          }
          return item;
        }),
      };
    });
  }, []);

  const handleDelete = useCallback((uuid: string) => {
    setState((pre) => {
      return {
        ...pre,
        equipmentData: pre.equipmentData.filter((item) => {
          return item.uuid !== uuid;
        }),
      };
    });
  }, []);

  return (
    <Container sx={{ p: 1 }}>
      <Box sx={{ mb: 1 }}>
        <Button component="label" variant="outlined" startIcon={<UploadFileOutlined />} sx={{ marginRight: '1rem' }}>
          图片
          <input type="file" accept=".png,.gif,.jpeg,.jpg" hidden onChange={handleFileUpload} />
        </Button>
        <ScoreCalcRule />
      </Box>
      <Box>
        <Grid container spacing={1}>
          {state.equipmentData.map((data) => {
            return (
              <Grid xs={12} md={6} xl={4} item key={data.uuid}>
                <EquipmentCard
                  handleEditData={handleEditData}
                  handleDelete={handleDelete}
                  imageBase64={data.imageBase64}
                  parseString={data.parseString}
                  uuid={data.uuid}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Container>
  );
};

export default OcrView;