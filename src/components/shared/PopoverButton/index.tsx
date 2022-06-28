import { Button, Menu, MenuItem, Divider } from '@mui/material';
import { usePopupState, bindMenu, bindTrigger } from 'material-ui-popup-state/hooks';
import { Fragment } from 'react';

interface PopoverButtonProps {
  popupId: string;
  text: string;
  items: {
    text: string;
    key: string;
    onClick: () => void;
  }[];
}

const PopoverButton = ({ popupId, text, items }: PopoverButtonProps) => {
  const popupState = usePopupState({ variant: 'popover', popupId });
  return (
    <>
      <Button sx={{ float: 'right' }} {...bindTrigger(popupState)}>
        {text}
      </Button>
      <Menu {...bindMenu(popupState)}>
        {items.map((item, index) => {
          return [
            index !== 0 && <Divider />,
            <MenuItem sx={{ p: 0, minHeight: 30 }} key={item.key}>
              <Button size="small" component="label" onClick={item.onClick}>
                {item.text}
              </Button>
            </MenuItem>,
          ];
        })}
      </Menu>
    </>
  );
};

export default PopoverButton;
