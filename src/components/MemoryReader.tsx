import useSWR from 'swr';
import { Card, CardActions, CardContent, CardHeader, Typography } from '@mui/material';
import { fetcher } from '../utils/fetcher';
import CopyButton from './CopyButton';
import { Box } from '@mui/system';
interface MemoryReaderProps {
  code: string;
}

const MemoryReader = ({ code }: MemoryReaderProps) => {
  const { data, error } = useSWR<MemoryRecord>(`/api/memory/${code}`, fetcher);
  if (error) {
    return (
      <Card>
        <CardHeader title="出错啦" />
        <CardContent>{error.message}</CardContent>
      </Card>
    );
  }

  if (data) {
    return (
      <Card sx={{ width: '100%' }}>
        <CardHeader
          title={
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h5">{data.code}</Typography>
              <CopyButton text={data.code} />
            </Box>
          }
        />
        <CardContent sx={{ height: 200, overflow: 'auto' }}>
          <Typography>{data.content}</Typography>
        </CardContent>
        <CardActions>
          <CopyButton text={data.content} />
        </CardActions>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader title="读取中..." />
    </Card>
  );
};
export default MemoryReader;
