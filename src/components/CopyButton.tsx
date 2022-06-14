import { Alert, IconButton, Snackbar } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useCallback, useState } from 'react';
import copy from 'copy-to-clipboard';
import { useSnackbar } from 'notistack';

interface CopyButtonProps {
  text: string;
}

const CopyButton = ({ text }: CopyButtonProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const handleCopy = useCallback(() => {
    copy(text);
    enqueueSnackbar('复制成功', {
      variant: 'success',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
      },
      autoHideDuration: 1000,
    });
  }, [text, enqueueSnackbar]);
  return (
    <>
      <IconButton onClick={handleCopy}>
        <ContentCopyIcon />
      </IconButton>
    </>
  );
};

export default CopyButton;
