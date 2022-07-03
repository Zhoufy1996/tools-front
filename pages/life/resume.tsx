import { Box, Container, Link, Typography, Divider, Avatar, List, ListItemText, Button } from '@mui/material';
import Image from 'next/image';
import { useRef } from 'react';
import Photo from 'src/assets/images/photo.jpg';
import { saveFileAsPdf } from 'src/utils/pdf';

const CustomDivider = () => {
  return <Divider orientation="vertical" flexItem sx={{ ml: 1, mr: 1 }} />;
};

const Resume = () => {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <Container ref={ref}>
      <Box>
        <Button
          onClick={() => {
            // if (ref.current) {
            //   saveFileAsPdf(ref.current);
            // }
            window.print();
          }}
        >
          导出
        </Button>
      </Box>
      <Box sx={{ display: 'flex', mb: 2, fontFamily: 'SIMHEI' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <Typography variant="h4" sx={{ textAlign: 'center', mb: 1 }}>
            周飞宇
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Typography>18158512843</Typography>
            <CustomDivider />
            <Typography>hellozfy1996@gmail.com</Typography>
            <CustomDivider />
            <Typography>杭州</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Typography>
              github:
              <Link target="_blink" href="https://github.com/Zhoufy1996">
                https://github.com/Zhoufy1996
              </Link>
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Typography>
              blog:
              <Link target="_blink" href="https://nobelium-ten-mu.vercel.app">
                https://nobelium-ten-mu.vercel.app
              </Link>
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Typography>统招本科</Typography>
            <CustomDivider />
            <Typography>3年工作经验</Typography>
          </Box>
        </Box>
        <Box sx={{ flexShrink: 0, flexBasis: 80, ml: 1, alignSelf: 'center' }}>
          <Image width={80} height={100} src={Photo} alt="周飞宇" />
        </Box>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="h5">专业技能</Typography>
        <Box>
          <List>
            <ListItemText>1. 熟悉HTML, / CSS / JavaScript等前端开发技术;</ListItemText>
            <ListItemText>2. 熟悉React，了解Vue;</ListItemText>
            <ListItemText>3. 了解Nodejs;</ListItemText>
            <ListItemText>4. 使用Google / stackoverflow / CodeIf 等解决问题</ListItemText>
          </List>
        </Box>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5">工作经历</Typography>
        <Box>
          <List>
            <ListItemText>
              1. 熟悉HTML, / CSS / JavaScript等前端开发技术;得瑟得瑟得瑟得瑟得瑟大撒大撒大苏打阿斯顿
            </ListItemText>
            <ListItemText>2. 熟悉React，了解Vue;得瑟得瑟得瑟得瑟得瑟大撒大撒大苏打阿斯顿</ListItemText>
            <ListItemText>3. 了解Nodejs;得瑟得瑟得瑟得瑟得瑟大撒大撒大苏打阿斯顿</ListItemText>
            <ListItemText>
              4. 使用Google / stackoverflow / CodeIf 等解决问题得瑟得瑟得瑟得瑟得瑟大撒大撒大苏打阿斯顿
            </ListItemText>
          </List>
        </Box>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5">项目经验</Typography>
        {/* <Box>
          <List>
            <ListItemText>1. 熟悉HTML, / CSS / JavaScript等前端开发技术;</ListItemText>
            <ListItemText>2. 熟悉React，了解Vue;</ListItemText>
            <ListItemText>3. 了解Nodejs;</ListItemText>
            <ListItemText>4. 使用Google / stackoverflow / CodeIf 等解决问题</ListItemText>
          </List>
        </Box> */}
      </Box>
    </Container>
  );
};

export default Resume;
