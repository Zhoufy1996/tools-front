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
  imageUrl: string;
  handleDelete: (uuid: string) => void;
  setGallerDefaultImageUrl: (uuid: string) => void;
}

const CharacterCard = ({ imageUrl, handleDelete, setGallerDefaultImageUrl }: EquipmentCardProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const [state, setState] = useLocalForage<CharacterRecord>(imageUrl, {
    imageUrl,
    name: '',
  });

  const { name } = state;

  const handleRead = useCallback(async () => {
    try {
      const data = await fetcher<GeneralAccurateOCRResponse['TextDetections']>('/api/ocr', {
        method: 'post',
        body: JSON.stringify({
          imageUrl,
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
  }, [imageUrl, setState]);

  useEffect(() => {
    if (!name && imageUrl) {
      handleRead();
    }
  }, [handleRead, name, imageUrl]);

  return (
    <Card sx={{ width: '100%' }}>
      <CardMedia
        onDoubleClick={() => {
          setGallerDefaultImageUrl(imageUrl);
        }}
        component="img"
        image={imageUrl}
        alt="图片"
      />
      <CardContent sx={{ minHeight: 70 }}>
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
          <Typography variant="h5" color="text.secondary" sx={{ wordBreak: 'break-all' }}>
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
          onOk={async (urls) => {
            setState((pre) => {
              return {
                ...pre,
                imageUrl: urls[0],
              };
            });
          }}
        />
        <Button
          size="small"
          color="error"
          onClick={() => {
            handleDelete(imageUrl);
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
