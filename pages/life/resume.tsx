import { Box, Container, Link, Typography, Divider, Avatar, List, ListItemText, Button, ListItem } from '@mui/material';
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
            <ListItemText>2. 熟悉React技术栈，了解Vue;</ListItemText>
            <ListItemText>3. 了解Nodejs;了解chrome扩展开发;</ListItemText>
            <ListItemText>4. 使用Google / stackoverflow / CodeIf 等解决问题</ListItemText>
          </List>
        </Box>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5">工作经历</Typography>
        <Box>
          <List>
            <ListItem>
              <ListItemText>杭州连帆科技有限公司（2019.07 - 至今）</ListItemText>
              <ListItemText>护理管理事业部/前端开发</ListItemText>
            </ListItem>
            <ListItemText>护理管理信息系统（2019.07 - 至今）</ListItemText>
            <ListItemText>{`PC端 & 大屏`}</ListItemText>
            <ListItemText>PC端：react + redux + ant design + fetch</ListItemText>
            <ListItemText>大屏：flexable viewport等适配</ListItemText>
            <ListItemText>安全问题：文件上传漏洞、敏感信息加密</ListItemText>
            <ListItemText>nodejs脚本 pdf导出</ListItemText>
            <ListItemText>module动态生成解决开发环境下打包、热重载过慢</ListItemText>
            <ListItemText>plopjs自动生成模板代码</ListItemText>
            <ListItemText>参与权限、菜单的设计</ListItemText>
            <ListItemText>封装excel导出</ListItemText>
            <ListItemText>解决大量的现场问题：缓存问题、表单配置问题等</ListItemText>
            <ListItemText>在数百家医院上线</ListItemText>
          </List>

          <List>
            <ListItemText>护理管理信息系统（2021.04 - 至今）</ListItemText>
            <ListItemText>{`PC端`}</ListItemText>
            <ListItemText>PC端：react + redux + ant design + fetch</ListItemText>
            <ListItemText>独立开发</ListItemText>
            <ListItemText>
              基于业务需求对ant design进行了二次封装，例如:权限判断组件、文件上传、护理单元选择框等
            </ListItemText>
            <ListItemText>已在三家医院上线</ListItemText>
          </List>
        </Box>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5">项目经验</Typography>
        <Box>
          <List>
            <ListItemText>EsjZone小说下载插件</ListItemText>
            <ListItemText>chrome扩展插件</ListItemText>
          </List>
        </Box>

        <Box>
          <List>
            <ListItemText>个人工具包</ListItemText>
            <ListItemText>nextjs + nestjs</ListItemText>
            <ListItemText>pwa应用</ListItemText>
            <ListItemText>indexDb 保存图片 + 腾讯云 文字识别</ListItemText>
          </List>
        </Box>
      </Box>
    </Container>
  );
};

export default Resume;
