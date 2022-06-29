import { SpeedDial, SpeedDialIcon, SpeedDialAction, SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useRouter } from 'next/router';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

interface DialAction {
  title: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
}

const dialActions: {
  [key: string]: { [key: string]: DialAction };
} = {
  epic7: {
    equipment: {
      title: '装备',
      icon: AddPhotoAlternateIcon,
    },

    character: {
      title: '角色',
      icon: PersonAddIcon,
    },
  },
  life: {
    memory: {
      title: '文字保存/读取',
      icon: TextSnippetIcon,
    },
  },
};

const SpeedActions = () => {
  const router = useRouter();
  const navigate = (path: string) => {
    router.push(`/epic7/${path}`);
  };

  const [local, module, pagename] = router.pathname.split('/');

  const actions = dialActions[module];

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
                navigate(key);
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
