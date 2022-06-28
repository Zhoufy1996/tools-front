import { SpeedDial, SpeedDialIcon, SpeedDialAction, SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useRouter } from 'next/router';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

interface DialAction {
  key: string;
  title: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
}

const dialActions: DialAction[] = [
  {
    key: 'equipment',
    title: '装备',
    icon: AddPhotoAlternateIcon,
  },
  {
    key: 'character',
    title: '角色',
    icon: PersonAddIcon,
  },
];

const SpeedActions = () => {
  const router = useRouter();
  const navigate = (path: string) => {
    router.push(`/epic7/${path}`);
  };

  if (router.pathname.split('/')[1] === 'epic7') {
    const pathname = router.pathname.split('/')[2];
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
        {dialActions.map((item) => {
          return (
            <SpeedDialAction
              key={item.key}
              onClick={() => {
                navigate(item.key);
              }}
              icon={<item.icon color={pathname === item.key ? 'primary' : 'inherit'} />}
              tooltipTitle={item.title}
              tooltipOpen
            />
          );
        })}
      </SpeedDial>
    );
  }
  return null;
};

export default SpeedActions;
