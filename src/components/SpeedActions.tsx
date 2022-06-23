import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useRouter } from 'next/router';

const SpeedActions = () => {
  const router = useRouter();

  const navigate = (path: string) => {
    router.push(`/epic7/${path}`);
  };

  return (
    <SpeedDial
      ariaLabel="Speed Dial Actions"
      sx={{
        position: 'fixed',
        bottom: 40,
        right: 20,
        '.MuiFab-root': {
          width: 40,
          height: 40,
        },
      }}
      icon={<SpeedDialIcon />}
    >
      <SpeedDialAction
        onClick={() => {
          navigate('equipment');
        }}
        icon={<AddPhotoAlternateIcon />}
        tooltipTitle="equipment"
      />
    </SpeedDial>
  );
};

export default SpeedActions;
