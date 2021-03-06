import { Box, Container, Link, Typography, Divider, List, ListItemText, Button } from '@mui/material';
import Head from 'next/head';
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
    <>
      <Head>
        <title>前端开发_三年经验_周飞宇</title>
      </Head>
      <Container ref={ref}>
        <Box>
          <Button
            onClick={() => {
              window.print();
            }}
            className="print-hidden"
          >
            导出
          </Button>
        </Box>
        <Box sx={{ display: 'flex', mb: 1, fontFamily: 'SIMHEI' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <Typography variant="h5" sx={{ textAlign: 'center', mb: 1 }}>
              周飞宇
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography>18158512843</Typography>
              <CustomDivider />
              <Typography>hellozfy1996@gmail.com</Typography>
              <CustomDivider />
              <Typography>统招本科</Typography>
              <CustomDivider />
              男
              <CustomDivider />
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography>前端开发</Typography>
              <CustomDivider />
              <Typography>3年工作经验</Typography>
              <CustomDivider />
              <Typography>在职</Typography>
              <CustomDivider />
              <Typography>
                <Link target="_blink" href="https://github.com/Zhoufy1996">
                  github
                </Link>
              </Typography>
              <CustomDivider />
              <Typography>
                <Link target="_blink" href="https://nobelium-ten-mu.vercel.app">
                  blog
                </Link>
              </Typography>
            </Box>
          </Box>
          {/* <Box sx={{ flexShrink: 0, flexBasis: 80, ml: 1, alignSelf: 'center' }}>
            <Image width={80} height={100} src={Photo} alt="周飞宇" />
          </Box> */}
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
                3. 了解<H>Nodejs</H>;了解<H>Chrome扩展开发</H>;
              </ListItemText>
              <ListItemText>
                4. 使用<H>Google / Stackoverflow / Github issue</H> 等解决问题
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
                <H>react + redux + ant design + fetch</H>；大屏使用<H>flexable</H>适配；产品在
                <H>全国数百家医院</H>上线使用。
              </ListItemText>
              <ListItemText>
                1. 对敏感信息进行<H>AES/RSA加密、SHA散列</H>处理，对用户行为进行审计分析，符合<H>等保三级</H>
                认证的应用安全要求
              </ListItemText>
              <ListItemText>
                2. 使用<H>puppeteer</H>实现对第三方表单系统的pdf导出功能,使用xlsx封装基于antd table的导出功能
              </ListItemText>
              <ListItemText>
                3. <H>模块减枝</H>功能解决因项目过大而导致的开发环境下打包、热重载过慢的问题，
                <H>减少开发编译时间约50%</H>
              </ListItemText>
              <ListItemText>
                4. 根据业务需求，对ant design进行二次封装，例如时间范围选择组件、人员搜索组件、表格组件等
              </ListItemText>
              <ListItemText>
                5. <H>远程</H>解决大量的现场问题：<H>缓存问题</H>、<H>排查bug</H>、<H>表单配置问题</H>等
              </ListItemText>
            </List>

            <List sx={{ pb: 0 }}>
              <ListItemText>
                二、云+护理管理集成平台 <H>PC端</H>（2022.04 - 至今）
              </ListItemText>
              <ListItemText>独立开发基于React的多系统集成平台,目前已接入5个系统，已上线使用</ListItemText>
              <ListItemText>
                1. 使用<H>SSO</H>解决多系统登陆问题
              </ListItemText>
              <ListItemText>
                2. 使用<H>iframe</H>做页面嵌入，保留嵌入的页面状态，定时销毁不活跃的iframe，<H>降低内存占用</H>
              </ListItemText>
            </List>

            <List sx={{ pb: 0 }}>
              <ListItemText>
                三、层级管理信息系统 <H>PC端</H>（2021.04 - 至今）
              </ListItemText>
              <ListItemText>独立开发基于React技术栈的层级管理信息系统，已在三家医院上线使用</ListItemText>
              <ListItemText>
                基于业务需求对ant design进行了二次封装，例如:权限组件、文件上传、护理单元选择框等
              </ListItemText>
            </List>
          </Box>
        </Box>
        <Box sx={{ pt: 1 }}>
          <Typography variant="h6">项目经验</Typography>
          <Box>
            <List sx={{ pb: 0 }}>
              <ListItemText>
                一、个人工具包 <H>手机端</H>（nextjs + nestjs）
              </ListItemText>
              <ListItemText
                sx={{
                  '.MuiTypography-root': {
                    display: 'flex',
                  },
                }}
              >
                <Link target="_blink" href="https://tools-front.vercel.app/">
                  在线网站
                </Link>
                <CustomDivider />
                <Link target="_blink" href="https://github.com/Zhoufy1996/tools-front">
                  github
                </Link>
              </ListItemText>
              <ListItemText>
                独立开发基于nextjs的<H>pwa</H>应用，后端部署在阿里云，前端部署在vercel
              </ListItemText>
              <ListItemText>
                基于<H>腾讯文字识别OCR</H>开发的epic7装备自动算分、角色名称识别等功能，使用<H>swr</H>请求数据，
                <H>compressorjs + b64toBlob</H>处理图片
              </ListItemText>
            </List>
            <List>
              <ListItemText>
                二、EsjZone小说下载插件 <H>chrome扩展</H>
              </ListItemText>
              <ListItemText>
                <Typography>
                  <Link target="_blink" href="https://github.com/Zhoufy1996/esjzone-downloader-extension">
                    github
                  </Link>
                </Typography>
              </ListItemText>
              <ListItemText>独立开发的EsjZone网站的轻小说下载器</ListItemText>
            </List>
          </Box>
        </Box>
        <Box sx={{ mb: 1 }}>
          <Typography variant="h6">教育经历</Typography>
          <Box sx={{ pt: 1 }}>
            <Typography component="span">中国计量大学（2015.09 - 2019.06） 本科</Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Resume;
