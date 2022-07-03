import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material';
import { useRouter } from 'next/router';
import { menusData } from 'src/utils/menus';

const SpeedActions = () => {
  const router = useRouter();
  const navigate = (module: string, path: string) => {
    router.push(`/${module}/${path}`);
  };

  const [local, module, pagename] = router.pathname.split('/');

  const actions = menusData[module];

  if (actions != null) {
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
        {Object.entries(actions).map(([key, action]) => {
          return (
            <SpeedDialAction
              key={key}
              onClick={() => {
                navigate(module, key);
              }}
              icon={<action.icon color={pagename === key ? 'primary' : 'inherit'} />}
              tooltipTitle={action.title}
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
