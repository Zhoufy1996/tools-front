import { Button, Card, CardActions, CardContent, CardHeader, TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { fetcher } from 'src/utils/fetcher';

interface MemoryInputProps {
  successCallback: (v: string) => void;
}

export const MemoryInput = ({ successCallback }: MemoryInputProps) => {
  const [content, setContent] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const createContent = async () => {
    try {
      const res = await fetcher<{ code: string }>('/api/memory', {
        method: 'post',
        body: JSON.stringify({
          content,
        }),
      });
      enqueueSnackbar('保存成功');
      successCallback(res.code);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Card sx={{ width: '100%' }}>
      <CardHeader title="新建文本" />
      <CardContent sx={{ height: 200 }}>
        <TextField
          id="memory"
          minRows={6}
          maxRows={6}
          label="文本"
          value={content}
          onChange={handleChange}
          multiline
          sx={{
            width: '100%',
          }}
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
