import localforage from 'localforage';
import LZString from 'lz-string';
import { CharacterRecord } from '../../src/types';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { readFile } from '../../src/utils/file';
import { v4 } from 'uuid';
import { Box, Button, Container, Grid } from '@mui/material';
import CharacterCard from '../../src/components/CharacterCard';
import { UploadFileOutlined } from '@mui/icons-material';

const Character = () => {
  const [state, setState] = useState<{
    hasInit: boolean;
    characterData: CharacterRecord[];
  }>({
    hasInit: false,
    characterData: [],
  });

  const handleGetData = useCallback(() => {
    localforage.getItem('epic7-character').then((data) => {
      setState({
        hasInit: true,
        characterData:
          (data as CharacterRecord[])?.map((item) => {
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
        state.characterData.map((item) => {
          return {
            ...item,
            imageBase64: LZString.compress(item.imageBase64),
          };
        })
      );
    }
  }, [state]);

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    const base64 = await readFile(file);
    setState((pre) => {
      return {
        ...pre,
        characterData: [
          {
            uuid: v4(),
            imageBase64: base64 as string,
            name: file.name,
          },
          ...pre.characterData,
        ],
      };
    });
  };

  const handleEditData = useCallback((name: string, uuid: string) => {
    setState((pre) => {
      return {
        ...pre,
        characterData: pre.characterData.map((item) => {
          if (item.uuid === uuid) {
            return {
              ...item,
              name,
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
        characterData: pre.characterData.filter((item) => {
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
      </Box>
      <Box>
        <Grid container spacing={1}>
          {state.characterData.map((data) => {
            return (
              <Grid xs={12} md={6} xl={4} item key={data.uuid}>
                <CharacterCard
                  handleEditData={handleEditData}
                  handleDelete={handleDelete}
                  imageBase64={data.imageBase64}
                  name={data.name}
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

export default Character;
