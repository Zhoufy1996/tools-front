import html2Canvas from 'html2canvas';
import JsPDF from 'jspdf';

// 模糊 变形
export const saveFileAsPdf = async (dom: HTMLElement) => {
  let PDF = new JsPDF('portrait', 'pt', 'a4');
  var pageWidth = PDF.internal.pageSize.getWidth();
  var pageHeight = PDF.internal.pageSize.getHeight();

  const canvas = await html2Canvas(dom, {
    allowTaint: true,
    scale: 4,
    width: pageWidth,
  });

  document.body.appendChild(canvas);

  const contentWidth = canvas.width;
  const contentHeight = canvas.height;

  let position = 0;

  // 设置生成图片的宽高
  const imgCanvasWidth = pageWidth;
  const imgCanvasHeight = (pageWidth / contentWidth) * contentHeight;
  console.log(pageWidth, pageHeight);
  console.log(imgCanvasWidth, imgCanvasHeight);
  let pageData = canvas.toDataURL('image/jpeg', 1);

  let imageHeight = imgCanvasHeight;
  if (imageHeight < pageHeight) {
    PDF.addImage(pageData, 'JPEG', 0, 0, pageWidth, pageHeight);
  } else {
    // 当内容超过a4纸一页的情况下，需要增加一页
    while (imageHeight > 0) {
      PDF.addImage(pageData, 'JPEG', 0, position, pageWidth, pageHeight);
      imageHeight -= pageHeight;
      position -= pageHeight;
      // 避免添加空白页
      if (imageHeight > 0) {
        PDF.addPage();
      }
    }
  }
  // 调用save方法生成pdf文件
  PDF.save('导出pdf' + '.pdf');
};
