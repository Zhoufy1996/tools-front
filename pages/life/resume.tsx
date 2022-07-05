import {
  Box,
  Container,
  Link,
  Typography,
  ListItemIcon,
  Divider,
  Avatar,
  List,
  ListItemText,
  Button,
  ListItem,
} from '@mui/material';
import Image from 'next/image';
import { ReactNode, useRef } from 'react';
import Photo from 'src/assets/images/photo.jpg';

const CustomDivider = () => {
  return <Divider orientation="vertical" flexItem sx={{ ml: 1, mr: 1 }} />;
};

const Highlight = ({ children }: { children: ReactNode }) => {
  return (
    <Typography component="span" sx={{ fontWeight: 'bold' }}>
      {children}
    </Typography>
  );
};

const H = Highlight;

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
          className="print-hidden"
        >
          导出
        </Button>
      </Box>
      <Box sx={{ display: 'flex', mb: 2, fontFamily: 'SIMHEI' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <Typography variant="h5" sx={{ textAlign: 'center', mb: 1 }}>
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

      <Box sx={{ mb: 1 }}>
        <Typography variant="h6">专业技能</Typography>
        <Box>
          <List>
            <ListItemText>
              1. 熟悉
              <H>HTML / CSS / JavaScript</H>
              等前端开发技术与工具;
            </ListItemText>
            <ListItemText>
              2. 熟悉<H>React</H>技术栈，了解<H>Vue</H>;
            </ListItemText>
            <ListItemText>
              3. 了解<H>Nodejs</H>;了解<H>chrome扩展开发</H>;
            </ListItemText>
            <ListItemText>
              4. 使用<H>Google / stackoverflow / Github issue</H> 等解决问题
            </ListItemText>
          </List>
        </Box>
      </Box>
      <Box sx={{ mb: 1 }}>
        <Typography variant="h6">工作经历</Typography>
        <Box sx={{ pt: 1 }}>
          <Typography component="span">杭州连帆科技有限公司（2019.07 - 至今）</Typography>
          <Typography component="span" sx={{ ml: 2 }}>
            护理管理事业部/前端开发
          </Typography>
        </Box>
        <Box>
          <List sx={{ pb: 0 }}>
            <Typography variant="body1">
              一、护理管理信息系统 <H>PC端 & 大屏</H>（2019.07 - 至今）
            </Typography>
            <ListItemText>
              协同开发基于 React技术栈的护理管理解决方案平台，采用C/S + B/S混合架构，前后端分离开发；PC端使用
              <H>react + redux + ant design + fetch</H>；大屏使用<H>flexable viewport</H>
              等适配；产品在
              <H>全国数百</H>家医院使用
            </ListItemText>
            <ListItemText>
              1. 对敏感信息进行<H>AES/RSA加密、SHA散列</H>处理
            </ListItemText>
            <ListItemText>
              2. 使用<H>puppeteer</H>实现服务端的pdf导出
            </ListItemText>
            <ListItemText>
              3. <H>模块减枝</H>功能解决因项目过大而导致的开发环境下打包、热重载过慢的问题，<H>减少开发编译时间约50%</H>
            </ListItemText>
            <ListItemText>4. 参与权限模块（新版）的设计与开发</ListItemText>
            <ListItemText>
              5. <H>远程</H>解决大量的现场问题：<H>缓存问题</H>、表单配置错误等
            </ListItemText>
          </List>

          <List sx={{ pb: 0 }}>
            <ListItemText>
              二、云+护理管理集成平台 <H>PC端</H>（2022.04 - 至今）
            </ListItemText>
            <ListItemText>独立开发基于React的多系统集成平台,目前已接入5个系统，已在医院上线使用</ListItemText>
            <ListItemText>
              1. 使用<H>SSO</H>解决多系统登陆问题
            </ListItemText>
            <ListItemText>
              2. 使用<H>iframe</H>做页面嵌入，保留iframe状态，定时销毁不活跃的iframe，<H>降低内存占用</H>
            </ListItemText>
          </List>

          <List sx={{ pb: 0 }}>
            <ListItemText>
              三、层级管理信息系统 <H>PC端</H>（2021.04 - 至今）
            </ListItemText>
            <ListItemText>独立开发基于React技术栈的层级管理信息系统，已在三家医院上线使用</ListItemText>
            <ListItemText>
              基于业务需求对ant design进行了二次封装，例如:权限判断组件、文件上传、护理单元选择框等
            </ListItemText>
          </List>
        </Box>
      </Box>
      <Box>
        <Typography variant="h6">项目经验</Typography>
        <Box>
          <List>
            <ListItemText>
              一、个人工具包 <H>手机端</H>（nextjs + nestjs）
            </ListItemText>
            <Link target="_blink" href="https://tools-front.vercel.app/">
              https://tools-front.vercel.app/
            </Link>
            <ListItemText>
              独立开发基于nextjs的<H>pwa</H>应用，后端部署在阿里云，前端部署在vercel
            </ListItemText>
            <ListItemText>
              基于<H>腾讯文字识别OCR</H>开发的epic7装备自动算分、角色名称识别等功能，使用<H>swr</H>请求数据，
              <H>compressorjs + b64toBlob</H>处理图片
            </ListItemText>
          </List>
        </Box>

        <Box>
          <List>
            <ListItemText>
              二、EsjZone小说下载插件 <H>chrome扩展</H>
            </ListItemText>
            <ListItemText>
              <Link target="_blink" href="https://github.com/Zhoufy1996/esjzone-downloader-extension">
                https://github.com/Zhoufy1996/esjzone-downloader-extension
              </Link>
            </ListItemText>
            <ListItemText>独立开发的EsjZone网站的轻小说下载器</ListItemText>
          </List>
        </Box>
      </Box>
    </Container>
  );
};

export default Resume;
