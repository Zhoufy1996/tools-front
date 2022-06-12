import { Button, Card, CardActions, CardContent, CardHeader, TextField } from '@mui/material';
import { useState } from 'react';
import { createOneMemory } from '../services/memory';

interface MemoryInputProps {
  successCallback: (v: string) => void;
}

export const MemoryInput = ({ successCallback }: MemoryInputProps) => {
  const [content, setContent] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const createContent = async () => {
    try {
      const res = await createOneMemory(content);
      successCallback(res);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Card sx={{ width: 300 }}>
      <CardHeader title="创建文本" />
      <CardContent sx={{ height: 300 }}>
        <TextField
          id="memory"
          minRows={8}
          maxRows={8}
          label="记忆文本"
          value={content}
          onChange={handleChange}
          multiline
        />
      </CardContent>
      <CardActions>
        <Button disabled={content === ''} onClick={createContent} size="small">
          保存
        </Button>
      </CardActions>
    </Card>
  );
};

export default MemoryInput;
