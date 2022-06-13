import { Button, TextField } from '@mui/material';
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
    <div>
      <div>
        <TextField size="small" onChange={handleChange} label={value} />
        <Button disabled={value === ''} onClick={addCode} size="small" variant="contained">
          读取
        </Button>
        <Button
          onClick={() => {
            setType('edit');
          }}
          size="small"
          variant="contained"
        >
          创建
        </Button>
      </div>
      {type === 'edit' ? <MemoryInput successCallback={successCreateCallback} /> : <MemoryReader code={code} />}
    </div>
  );
};

export default Memory;
