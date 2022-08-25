import localforage from 'localforage';
import { useCallback, useState } from 'react';
import { Box, Container, Grid } from '@mui/material';
import CharacterCard from 'src/components/pages/epic7/character/CharacterCard';
import ImageUpload from 'src/components/shared/ImageUpload';
import useLocalForage from 'src/hooks/useLocalForage';
import { CharacterRecord } from 'src/types';
import ImageViewer from 'src/components/shared/ImageViewer';

const Character = () => {
  const [state, setState] = useLocalForage<string[]>('characterUrlList', []);
  const handleFileUpload = useCallback(
    async (urls: string[]) => {
      const handleFile = async (url: string) => {
        await localforage.setItem<CharacterRecord>(url, {
          imageUrl: url,
          name: '',
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

  const [gallerDefaultImageUrl, setGallerDefaultImageUrl] = useState<string | null>(null);
  const handleCloseViewer = useCallback(() => {
    setGallerDefaultImageUrl(null);
  }, []);

  return (
    <Container sx={{ p: 1 }}>
      <Box sx={{ mb: 1 }}>
        <ImageUpload multiple onOk={handleFileUpload} />
      </Box>
      <Box>
        <Grid container spacing={1}>
          {state.map((imageUrl) => {
            return (
              <Grid xs={12} md={6} xl={4} item key={imageUrl}>
                <CharacterCard
                  setGallerDefaultImageUrl={setGallerDefaultImageUrl}
                  imageUrl={imageUrl}
                  handleDelete={handleDelete}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
      {gallerDefaultImageUrl != null && (
        <ImageViewer onCancel={handleCloseViewer} gallerDefaultUuid={gallerDefaultImageUrl} uuids={state} />
      )}
    </Container>
  );
};

export default Character;
