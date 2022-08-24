import { IconButton, SxProps, TextField, Theme, Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import RefreshIcon from '@mui/icons-material/Refresh';
import EditIcon from '@mui/icons-material/Edit';

interface EditInputProps {
  defaultValue: string;
  onOk: (v: string) => void;
}

const EditInput = ({ defaultValue, onOk }: EditInputProps) => {
  const [value, setValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);
  return isEditing ? (
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
      <IconButton
        size="small"
        onClick={() => {
          onOk(value);
          setIsEditing(false);
        }}
        color="primary"
      >
        <CheckIcon />
      </IconButton>
      <IconButton size="small" onClick={() => setValue('')} color="secondary">
        <RefreshIcon />
      </IconButton>
      <IconButton
        size="small"
        onClick={() => {
          setIsEditing(false);
        }}
        color="error"
      >
        <CancelIcon />
      </IconButton>
    </Box>
  ) : (
    <Box
      sx={{
        display: 'flex',
      }}
    >
      <Typography variant="body1" color="text.secondary" sx={{ wordBreak: 'break-all', minWidth: 200 }}>
        {value}
      </Typography>
      <IconButton size="small" onClick={() => setIsEditing(true)} color="secondary">
        <EditIcon />
      </IconButton>
    </Box>
  );
};

export default EditInput;
