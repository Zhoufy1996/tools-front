import { Button, ButtonProps, SxProps, Theme } from '@mui/material';
import { UploadFileOutlined } from '@mui/icons-material';
import { ChangeEvent } from 'react';

interface ImageUploadProps {
  children?: React.ReactNode;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  variant?: ButtonProps['variant'];
  sx?: SxProps<Theme>;
  multiple?: boolean;
}

const ImageUpload = ({
  children = null,
  onChange,
  variant = 'outlined',
  sx = {},
  multiple = false,
}: ImageUploadProps) => {
  return (
    <Button component="label" variant={variant} startIcon={<UploadFileOutlined />} sx={sx}>
      {children}
      <input type="file" multiple={multiple} accept=".png,.gif,.jpeg,.jpg" hidden onChange={onChange} />
    </Button>
  );
};

export default ImageUpload;
