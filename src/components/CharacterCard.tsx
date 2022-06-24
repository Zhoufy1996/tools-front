import { CardMedia, Card, CardContent, Typography, CardActions, Button, TextField } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { GeneralAccurateOCRResponse } from 'tencentcloud-sdk-nodejs/tencentcloud/services/ocr/v20181119/ocr_models';
import { getAttributes, getRecoinAttributes, isRecoin, transToText } from '../utils/equipment';
import { fetcher } from '../utils/fetcher';

interface EquipmentCardProps {
  imageBase64: string;
  name: string;
  uuid: string;
  handleEditData: (name: string, uuid: string) => void;
  handleDelete: (uuid: string) => void;
}

const CharacterCard = ({ imageBase64, name, uuid, handleEditData, handleDelete }: EquipmentCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(name);

  useEffect(() => {
    setEditName(name);
  }, [name]);

  const handleConfirm = () => {
    handleEditData(editName, uuid);
    setIsEditing(false);
  };

  return (
    <Card sx={{ width: '100%' }}>
      <CardMedia component="img" width="140" image={imageBase64} alt="图片" />
      <CardContent>
        {isEditing ? (
          <TextField
            value={editName}
            sx={{ width: 200 }}
            onChange={(e) => {
              setEditName(e.target.value);
            }}
          />
        ) : (
          <Typography variant="body2" color="text.secondary">
            {name}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        {isEditing ? (
          <Button size="small" onClick={handleConfirm}>
            完成编辑
          </Button>
        ) : (
          <Button
            size="small"
            onClick={() => {
              setIsEditing(true);
            }}
          >
            编辑
          </Button>
        )}
        <Button
          size="small"
          onClick={() => {
            handleDelete(uuid);
          }}
        >
          删除
        </Button>
      </CardActions>
    </Card>
  );
};

export default CharacterCard;
