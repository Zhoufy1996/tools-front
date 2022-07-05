import { Typography } from '@mui/material';
import sha256 from 'crypto-js/sha256';

interface HashProps {
  text: string;
}

const Hash = ({ text }: HashProps) => {
  if (!text) {
    return null;
  }
  return <Typography sx={{ wordBreak: 'break-all' }}>{sha256(text).toString()}</Typography>;
};

export default Hash;
