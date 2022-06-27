import {
  Button,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { usePopupState, bindTrigger, bindMenu } from 'material-ui-popup-state/hooks';

const ScoreCalcRule = () => {
  const popupState = usePopupState({ variant: 'popover', popupId: 'scoreCalcRule' });

  return (
    <>
      <Button sx={{ ml: 2 }} variant="contained" {...bindTrigger(popupState)}>
        算分规则
      </Button>
      <Menu {...bindMenu(popupState)}>
        <MenuItem onClick={popupState.close}>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>项目</TableCell>
                  <TableCell>计分规则</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>攻击力(%)</TableCell>
                  <TableCell>value * 1</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>防御力(%)</TableCell>
                  <TableCell>value * 1</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>生命值(%)</TableCell>
                  <TableCell>value * 1</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>效果命中(%)</TableCell>
                  <TableCell>value * 1</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>效果抗性(%)</TableCell>
                  <TableCell>value * 1</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>暴击率(%)</TableCell>
                  <TableCell>value * 1.6</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>暴击伤害(%)</TableCell>
                  <TableCell>value * 1.125</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>速度</TableCell>
                  <TableCell>value * 2</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>攻击力(白值)</TableCell>
                  <TableCell>value / 1200 * 100</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>防御力(白值)</TableCell>
                  <TableCell>value / 550 * 100</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>生命值(白值)</TableCell>
                  <TableCell>value / 5000 * 100</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </MenuItem>
      </Menu>
    </>
  );
};

export default ScoreCalcRule;
