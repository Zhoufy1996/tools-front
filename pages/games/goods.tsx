import { Box, Container, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { calcGoldAndBookMark } from 'src/utils/epic7';

const Goods = () => {
  const [value, setValue] = useState('');

  const { normalCount, mysteryCount, gold } = calcGoldAndBookMark(Number(value));

  return (
    <Container sx={{ p: 1 }}>
      <Box>
        <TextField
          type="number"
          size="small"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          label="钻石"
          sx={{ mb: 1 }}
        />
        <Typography>普通书签：{normalCount}</Typography>
        <Typography>神秘书签：{mysteryCount}</Typography>
        <Typography>金币数 ：{gold}</Typography>
      </Box>
    </Container>
  );
};

export default Goods;
