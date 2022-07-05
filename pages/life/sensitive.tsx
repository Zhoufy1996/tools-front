import {
  Card,
  CardContent,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import Hash from 'src/components/pages/life/sensitive/hash';

const Encrypt = dynamic(() => import('src/components/pages/life/sensitive/encrypt'), {
  ssr: false,
});

const Sensitive = () => {
  type Method = 'hash' | 'encrypt';
  const [method, setMethod] = useState<Method>('hash');
  const [value, setValue] = useState<string>('');
  return (
    <Container>
      <FormControl fullWidth sx={{ mb: 1 }}>
        <InputLabel>散列/加密</InputLabel>
        <Select
          onChange={(e) => {
            setMethod(e.target.value as Method);
          }}
          label="散列/加密"
          value={method}
          size="small"
        >
          <MenuItem value="hash">SHA256散列</MenuItem>
          <MenuItem value="encrypt">AES加密</MenuItem>
        </Select>
      </FormControl>
      <Card sx={{ mb: 1 }}>
        <CardContent>
          <Typography variant="h5">输入</Typography>
          <TextField
            onChange={(e) => {
              setValue(e.target.value);
            }}
            fullWidth
            value={value}
            multiline
            minRows={6}
            maxRows={6}
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent sx={{ minHeight: 200, overflow: 'auto' }}>
          <Typography variant="h5">结果</Typography>
          {method === 'hash' ? <Hash text={value} /> : <Encrypt text={value} />}
        </CardContent>
      </Card>
    </Container>
  );
};

export default Sensitive;
