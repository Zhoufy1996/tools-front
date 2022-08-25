import { CardMedia, Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { GeneralAccurateOCRResponse } from 'tencentcloud-sdk-nodejs/tencentcloud/services/ocr/v20181119/ocr_models';
import { getAttributes, getRecoinAttributes, isRecoin, transToText } from 'src/utils/epic7';
import { fetcher } from 'src/utils/fetcher';
import useLocalForage from 'src/hooks/useLocalForage';
import { EquipmentRecord } from 'src/types';

interface EquipmentCardProps {
  imageUrl: string;
  handleDelete: (uuid: string) => void;
}

const EquipmentCard = ({ imageUrl, handleDelete }: EquipmentCardProps) => {
  const [isReading, setIsReading] = useState(false);
  const [state, setState] = useLocalForage<EquipmentRecord>(imageUrl, {
    imageUrl,
    parseString: '',
  });
  const { parseString } = state;

  const handleRead = useCallback(async () => {
    try {
      setIsReading(true);
      const data = await fetcher<GeneralAccurateOCRResponse['TextDetections']>('/api/ocr', {
        method: 'post',
        body: JSON.stringify({
          imageUrl,
        }),
      });

      if (isRecoin(data)) {
        const recoinAttribute = getRecoinAttributes(data);
        const attribute = getAttributes(data);
        const text = `重铸前: ${transToText(attribute)}
重铸后: ${transToText(recoinAttribute)}`;
        setState({
          imageUrl,
          parseString: text,
        });
      } else {
        const attribute = getAttributes(data);
        const text = transToText(attribute);
        setState({
          imageUrl,
          parseString: text,
        });
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsReading(false);
    }
  }, [imageUrl, setState]);

  useEffect(() => {
    if (!parseString && imageUrl) {
      handleRead();
    }
  }, [handleRead, parseString, imageUrl]);

  return (
    <Card sx={{ width: '100%' }}>
      <CardMedia component="img" width="140" image={imageUrl} alt="图片" />
      <CardContent>
        {!isReading ? (
          <>
            {parseString?.split('\n').map((text, index) => {
              return (
                <Typography sx={{ wordBreak: 'break-all' }} key={index} variant="body2" color="text.secondary">
                  {text}
                </Typography>
              );
            })}
          </>
        ) : (
          '文字识别中...'
        )}
      </CardContent>
      <CardActions>
        <Button onClick={handleRead} size="small">
          识别
        </Button>
        <Button color="secondary" onClick={() => handleDelete(imageUrl)} size="small">
          移除
        </Button>
      </CardActions>
    </Card>
  );
};

export default EquipmentCard;
