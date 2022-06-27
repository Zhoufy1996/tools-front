import { Container } from '@mui/material';
import MobileButtonNavigation from '../MobileButtonNavigation';
import SpeedActions from '../SpeedActions';

const RootContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container
      sx={(theme) => ({
        p: 1,
        paddingBottom: '90px',
        [theme.breakpoints.up('sm')]: {
          paddingBottom: '40px',
        },
      })}
    >
      <MobileButtonNavigation />
      <SpeedActions />
      {children}
    </Container>
  );
};

export default RootContainer;
