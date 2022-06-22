import { CardMedia, Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { GeneralAccurateOCRResponse } from 'tencentcloud-sdk-nodejs/tencentcloud/services/ocr/v20181119/ocr_models';
import { getAttributes, getRecoinAttributes, isRecoin, transToText } from '../utils/equipment';
import { fetcher } from '../utils/fetcher';

interface EquipmentCardProps {
  imageBase64: string;
  parseString?: string;
  uuid: string;
  handleEditData: (parseString: string, uuid: string) => void;
}
const EquipmentCard = ({ imageBase64, parseString, uuid, handleEditData }: EquipmentCardProps) => {
  const handleRead = async () => {
    const data = await fetcher<GeneralAccurateOCRResponse['TextDetections']>('api/ocr', {
      method: 'post',
      body: JSON.stringify({
        imageBase64,
      }),
    });

    if (isRecoin(data)) {
      const recoinAttribute = getRecoinAttributes(data);
      const attribute = getAttributes(data);
      handleEditData(transToText(attribute), uuid);
    } else {
      const attribute = getAttributes(data);
      handleEditData(transToText(attribute), uuid);
    }
  };
  return (
    <Card sx={{ width: '100%' }}>
      <CardMedia component="img" width="140" image={imageBase64} alt="图片" />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {parseString}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={handleRead} size="small">
          识别
        </Button>
      </CardActions>
    </Card>
  );
};

export default EquipmentCard;
