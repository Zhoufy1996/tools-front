import { Button, Divider, Menu, MenuItem } from '@mui/material';
import { usePopupState, bindMenu, bindTrigger } from 'material-ui-popup-state/hooks';
import { ChangeEvent, useCallback } from 'react';

interface SyncDataProps {
  popupId: string;
  onExport: () => void;
  onImport: (file: File) => void;
}

const SyncData = ({ popupId, onExport, onImport }: SyncDataProps) => {
  const popupState = usePopupState({ variant: 'popover', popupId });

  const handleImport = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) {
        return;
      }
      const file = e.target.files[0];
      onImport(file);
    },
    [onImport]
  );

  return (
    <>
      <Button sx={{ float: 'right' }} {...bindTrigger(popupState)}>
        数据
      </Button>
      <Menu {...bindMenu(popupState)}>
        <MenuItem sx={{ p: 0, minHeight: 30 }}>
          <Button size="small" component="label" onClick={onExport}>
            导出
          </Button>
        </MenuItem>
        <Divider />
        <MenuItem sx={{ p: 0, minHeight: 30 }}>
          <Button size="small" component="label">
            导入
            <input type="file" accept=".txt" hidden onChange={handleImport} />
          </Button>
        </MenuItem>
      </Menu>
    </>
  );
};

export default SyncData;
