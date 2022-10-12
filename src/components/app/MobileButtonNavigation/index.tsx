import { BottomNavigation, Paper, BottomNavigationAction } from '@mui/material';
import localforage from 'localforage';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const MobileButtonNavigation = () => {
  const router = useRouter();

  useEffect(() => {
    localforage.setItem('lastPathname', router.pathname);
  }, [router.pathname]);
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
      className="print-hidden"
    >
      <BottomNavigation
        showLabels
        value={`/${router.pathname.split('/')[1]}`}
        onChange={(event, newValue) => {
          router.push(newValue);
        }}
        sx={{
          height: 40,
        }}
      >
        <BottomNavigationAction value="/life" label="日常" />
        <BottomNavigationAction value="/games" label="游戏" />
      </BottomNavigation>
    </Paper>
  );
};

export default MobileButtonNavigation;
