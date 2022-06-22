import { Box, Button, Container, TextField } from '@mui/material';
import { useState } from 'react';
import { fetcher } from '../src/utils/fetcher';

const Esjzone = () => {
  const [value, setValue] = useState('1581942520');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleDownload = async () => {
    await fetcher(`api/esjzone/${value}`);
  };

  return (
    <Container sx={{ p: 1 }}>
      <Box>
        <TextField value={value} onChange={handleChange} sx={{ width: 200, mr: 1 }} size="small" />
        <Button onClick={handleDownload}>下载</Button>
      </Box>
    </Container>
  );
};

export default Esjzone;
