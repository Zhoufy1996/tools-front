import { CardMedia, Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { useState } from 'react';
import useLocalForage from 'src/hooks/useLocalForage';
import { CharacterRecord } from 'src/types';
import { readFile } from 'src/utils/file';
import EditInput from './EditInput';
import ImageUpload from 'src/components/shared/ImageUpload';

interface EquipmentCardProps {
  uuid: string;
  handleDelete: (uuid: string) => void;
}

const CharacterCard = ({ uuid, handleDelete }: EquipmentCardProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const [state, setState] = useLocalForage<CharacterRecord>(uuid, {
    imageBase64: '',
    name: '',
  });

  const { name, imageBase64 } = state;

  if (imageBase64 == '') {
    return (
      <Card sx={{ width: '100%', height: 200 }}>
        <CardContent>
          <Typography>图片读取中...</Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ width: '100%' }}>
      <CardMedia component="img" width="140" image={imageBase64} alt="图片" />
      <CardContent>
        {isEditing ? (
          <EditInput
            defaultValue={name}
            onOk={(value: string) => {
              setState((pre) => {
                return {
                  ...pre,
                  name: value,
                };
              });
              setIsEditing(false);
            }}
            onCancel={() => {
              setIsEditing(false);
            }}
          />
        ) : (
          <Typography variant="body2" color="text.secondary">
            {name}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => {
            setIsEditing(true);
          }}
        >
          重命名
        </Button>
        <ImageUpload
          onChange={async (e) => {
            if (!e.target.files) {
              return;
            }
            const file = e.target.files[0];
            const base64 = await readFile(file);
            setState((pre) => {
              return {
                ...pre,
                imageBase64: base64,
              };
            });
          }}
          variant="text"
        />
        <Button
          size="small"
          color="error"
          onClick={() => {
            handleDelete(uuid);
          }}
          style={{ marginLeft: 'auto' }}
        >
          删除
        </Button>
      </CardActions>
    </Card>
  );
};

export default CharacterCard;
