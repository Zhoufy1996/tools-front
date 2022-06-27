import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useRouter } from 'next/router';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const SpeedActions = () => {
  const router = useRouter();

  const navigate = (path: string) => {
    router.push(`/epic7/${path}`);
  };

  if (router.pathname.split('/')[1] === 'epic7') {
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
        <SpeedDialAction
          onClick={() => {
            navigate('character');
          }}
          icon={<PersonAddIcon />}
          tooltipTitle="character"
        />
      </SpeedDial>
    );
  }
  return null;
};

export default SpeedActions;
