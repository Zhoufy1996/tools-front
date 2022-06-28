import { IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useCallback } from 'react';
import copy from 'copy-to-clipboard';
import { useSnackbar } from 'notistack';

interface CopyButtonProps {
  text: string;
}

const CopyButton = ({ text }: CopyButtonProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const handleCopy = useCallback(() => {
    copy(text);
    enqueueSnackbar('复制成功');
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
