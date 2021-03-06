import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';

interface MenuItem {
  title: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
}

export const menusData: Record<string, Record<string, MenuItem>> = {
  epic7: {
    equipment: {
      title: '装备',
      icon: AddPhotoAlternateIcon,
    },

    character: {
      title: '角色',
      icon: PersonAddIcon,
    },

    goods: {
      title: '书签',
      icon: BookmarkIcon,
    },
  },
  life: {
    memory: {
      title: '文字保存/读取',
      icon: TextSnippetIcon,
    },
    resume: {
      title: '简历',
      icon: PersonIcon,
    },
    // sensitive: {
    //   title: '加密/散列',
    //   icon: LockIcon,
    // },
  },
};
