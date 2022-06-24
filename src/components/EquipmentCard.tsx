import { CardMedia, Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { GeneralAccurateOCRResponse } from 'tencentcloud-sdk-nodejs/tencentcloud/services/ocr/v20181119/ocr_models';
import { getAttributes, getRecoinAttributes, isRecoin, transToText } from '../utils/equipment';
import { fetcher } from '../utils/fetcher';

interface EquipmentCardProps {
  imageBase64: string;
  parseString?: string;
  uuid: string;
  handleEditData: (parseString: string, uuid: string) => void;
  handleDelete: (uuid: string) => void;
}

const EquipmentCard = ({ imageBase64, parseString, uuid, handleEditData, handleDelete }: EquipmentCardProps) => {
  const [isReading, setIsReading] = useState(false);
  const handleRead = useCallback(async () => {
    try {
      setIsReading(true);
      const data = await fetcher<GeneralAccurateOCRResponse['TextDetections']>('/api/ocr', {
        method: 'post',
        body: JSON.stringify({
          imageBase64,
        }),
      });

      if (isRecoin(data)) {
        const recoinAttribute = getRecoinAttributes(data);
        const attribute = getAttributes(data);
        const text = `重铸前: ${transToText(attribute)}
重铸后: ${transToText(recoinAttribute)}`;
        handleEditData(text, uuid);
      } else {
        const attribute = getAttributes(data);
        const text = transToText(attribute);
        handleEditData(text, uuid);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsReading(false);
    }
  }, [imageBase64, handleEditData, uuid]);

  useEffect(() => {
    if (!parseString) {
      handleRead();
    }
  }, [handleRead, parseString]);

  return (
    <Card sx={{ width: '100%' }}>
      <CardMedia component="img" width="140" image={imageBase64} alt="图片" />
      <CardContent>
        {!isReading ? (
          <>
            {parseString?.split('\n').map((text, index) => {
              return (
                <Typography key={index} variant="body2" color="text.secondary">
                  {text}
                </Typography>
              );
            })}
          </>
        ) : (
          '识别中'
        )}
      </CardContent>
      <CardActions>
        <Button onClick={handleRead} size="small">
          识别
        </Button>
        <Button color="secondary" onClick={() => handleDelete(uuid)} size="small">
          移除
        </Button>
      </CardActions>
    </Card>
  );
};

export default EquipmentCard;
