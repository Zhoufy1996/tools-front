import { BottomNavigation, Paper, BottomNavigationAction } from '@mui/material';
import { useRouter } from 'next/router';

const MobileButtonNavigation = () => {
  const router = useRouter();
  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 999,
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={`/${router.pathname.split('/')[1]}`}
        onChange={(event, newValue) => {
          router.push(newValue);
        }}
        sx={{
          height: 50,
        }}
      >
        <BottomNavigationAction value="/memory" label="记忆本" />
        <BottomNavigationAction value="/epic7" label="第七史诗工具" />
      </BottomNavigation>
    </Paper>
  );
};

export default MobileButtonNavigation;
