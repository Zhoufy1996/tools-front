import { IconButton, SxProps, TextField, Theme, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import RefreshIcon from '@mui/icons-material/Refresh';

interface EditInputProps {
  defaultValue: string;
  onOk: (v: string) => void;
  onCancel: () => void;
  sx?: SxProps<Theme>;
}

const EditInput = ({ defaultValue, onOk, onCancel, sx }: EditInputProps) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);
  return (
    <Box
      sx={{
        display: 'flex',
      }}
    >
      <TextField
        onChange={(e) => {
          setValue(e.target.value);
        }}
        size="small"
        value={value}
        sx={{
          flex: 1,
        }}
      />
      <IconButton size="small" onClick={() => onOk(value)} color="primary">
        <CheckIcon />
      </IconButton>
      <IconButton size="small" onClick={() => setValue('')} color="secondary">
        <RefreshIcon />
      </IconButton>
      <IconButton size="small" onClick={onCancel} color="error">
        <CancelIcon />
      </IconButton>
    </Box>
  );
};

export default EditInput;
