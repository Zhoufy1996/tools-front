import useSWR from 'swr';
import { findOneMemory } from '../services/memory';
import { Button, Card, CardActions, CardContent, CardHeader, TextField, Typography } from '@mui/material';
import copy from 'copy-to-clipboard';

interface MemoryReaderProps {
  code: string;
}

const MemoryReader = ({ code }: MemoryReaderProps) => {
  const { data, error } = useSWR(`memory/findOne/${code}`, () => findOneMemory(code));

  if (error) {
    return <div>{error.message}</div>;
  }
  if (data) {
    return (
      <Card sx={{ width: 300 }}>
        <CardHeader
          title={
            <div>
              <Typography>{data.code}</Typography>
              <Button
                onClick={() => {
                  copy(data.code);
                }}
              >
                copy
              </Button>
            </div>
          }
        />
        <CardContent sx={{ height: 300 }}>
          <Button
            onClick={() => {
              copy(data.content);
            }}
          >
            copy
          </Button>
          <Typography>{data.content}</Typography>
        </CardContent>
      </Card>
    );
  }

  return <div>加载中</div>;
};
export default MemoryReader;
