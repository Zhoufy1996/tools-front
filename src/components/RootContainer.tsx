import { Container } from '@mui/material';
import MobileButtonNavigation from './MobileButtonNavigation';

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
      {children}
    </Container>
  );
};

export default RootContainer;
