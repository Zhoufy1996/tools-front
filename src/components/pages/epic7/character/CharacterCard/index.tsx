import { CardMedia, Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import useLocalForage from 'src/hooks/useLocalForage';
import { CharacterRecord } from 'src/types';
import { readImageFileAsDataURL } from 'src/utils/file';
import EditInput from './EditInput';
import ImageUpload from 'src/components/shared/ImageUpload';
import { fetcher } from 'src/utils/fetcher';
import { GeneralAccurateOCRResponse } from 'tencentcloud-sdk-nodejs/tencentcloud/services/ocr/v20181119/ocr_models';
import useObjectURL from 'src/hooks/useObjectURL';
import { usePopupState, bindMenu, bindTrigger } from 'material-ui-popup-state/hooks';
import PopoverButton from 'src/components/shared/PopoverButton';

interface EquipmentCardProps {
  uuid: string;
  handleDelete: (uuid: string) => void;
  setGallerDefaultUuid: (uuid: string) => void;
}

const CharacterCard = ({ uuid, handleDelete, setGallerDefaultUuid }: EquipmentCardProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const [state, setState] = useLocalForage<CharacterRecord>(uuid, {
    imageBase64: '',
    name: '',
  });

  const { name, imageBase64 } = state;

  const imgUrl = useObjectURL(imageBase64);

  const handleRead = useCallback(async () => {
    try {
      const data = await fetcher<GeneralAccurateOCRResponse['TextDetections']>('/api/ocr', {
        method: 'post',
        body: JSON.stringify({
          imageBase64,
        }),
      });
      setState((pre) => {
        return {
          ...pre,
          name: data[0].DetectedText,
        };
      });
    } catch (e) {
      console.log(e);
    }
  }, [imageBase64, setState]);

  useEffect(() => {
    if (!name && imageBase64) {
      handleRead();
    }
  }, [handleRead, name, imageBase64]);

  if (imgUrl === '') {
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
      <CardMedia
        onDoubleClick={() => {
          setGallerDefaultUuid(uuid);
        }}
        component="img"
        image={imgUrl}
        alt="图片"
      />
      <CardContent sx={{ height: 70 }}>
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
          <Typography variant="h5" color="text.secondary">
            {name || '自动识别中...'}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <PopoverButton
          text="编辑"
          popupId="characterName"
          items={[
            {
              text: '自动识别',
              key: 'auto',
              onClick: handleRead,
            },
            {
              text: '重命名',
              key: 'reset',
              onClick: () => {
                setIsEditing(true);
              },
            },
          ]}
        />
        <ImageUpload
          onChange={async (e) => {
            if (!e.target.files || !e.target.files[0]) {
              return;
            }
            const file = e.target.files[0];
            const base64 = await readImageFileAsDataURL(file);
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
