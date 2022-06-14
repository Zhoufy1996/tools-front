import { Box, Button, ButtonGroup, Container, TextField } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import MemoryInput from '../src/components/MemoryInput';
import MemoryReader from '../src/components/MemoryReader';

const Memory = () => {
  const [value, setValue] = useState('');
  const [code, setCode] = useState<string>('');
  const [type, setType] = useState<'read' | 'edit'>('edit');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const addCode = () => {
    setType('read');
    setCode(value);
  };

  const successCreateCallback = useCallback((v: string) => {
    setType('read');
    setCode(v);
  }, []);

  return (
    <Container sx={{ p: 1 }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <TextField sx={{ width: 150, mr: 1 }} size="small" onChange={handleChange} label="code" />
        <ButtonGroup size="small" variant="contained">
          <Button disabled={value === ''} onClick={addCode}>
            读取
          </Button>
          <Button
            onClick={() => {
              setType('edit');
            }}
          >
            新建
          </Button>
        </ButtonGroup>
      </Box>
      <Box sx={{ width: 300, mt: 1 }}>
        {type === 'edit' ? <MemoryInput successCallback={successCreateCallback} /> : <MemoryReader code={code} />}
      </Box>
    </Container>
  );
};

export default Memory;
