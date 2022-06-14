import { saveAs } from 'file-saver';
import Scheduler from './scheduler';
import fetch from 'node-fetch';
import https from 'https';
import { JSDOM } from 'jsdom';

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

// 获取小说标题
const getTitle = (doc: Document) => {
  return doc.querySelector('.text-normal')?.textContent;
};

// 获取小说简介
const getIntro = (doc: Document) => {
  return doc.querySelector('.bg-secondary')?.textContent;
};

interface Chapter {
  title: string;
  url?: string;
}

// 获取所有章节名和阅读链接
const getChapterList = () => {
  const chapterListNode = document.querySelector('#chapterList');
  const childNodes = chapterListNode?.children;
  if (childNodes) {
    const chapters: Chapter[] = Array.from(childNodes).map((node) => {
      if (node.tagName.toLowerCase() === 'a') {
        return {
          title: node.getAttribute('data-title') || '',
          url: (node as HTMLAnchorElement).href,
        };
      }

      if (node.tagName.toLowerCase() === 'p') {
        const text = node.querySelector('span')?.textContent;
        return {
          title: text || '',
          url: '',
        };
      }

      return {
        title: '',
      };
    });

    return chapters;
  }
  return [];
};

// get方法请求地址，将内容转换成document
const getDocument = async (url: string) => {
  const response = await fetch(url, {
    agent: httpsAgent,
  });
  const body = await response.text();

  return new JSDOM(body).window.document;
};

// 获取某章节的内容
const getDocumentNovelContent = (doc: Document) => {
  const content = (doc.querySelector('.forum-content') as HTMLElement)?.innerText;

  return content || '';
};

// 根据章节链接获取内容
const getNovelContentByUrl = async (url: string) => {
  if (url === '') {
    return '';
  }
  const doc = await getDocument(url);
  const content = getDocumentNovelContent(doc);

  return content;
};

// txt下载
const fileSave = (text: string, title: string) => {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  saveAs(blob, `${title}.txt`);
};

const getNovelContent = (id: number) => {
  return new Promise(async (resolve) => {
    const chapterDocument = await getDocument(`https://www.esjzone.cc/detail/${id}.html`);
    const title = getTitle(chapterDocument);
    const intro = getIntro(chapterDocument);
    const chapterList = getChapterList();

    const childChapterList = chapterList.filter((item) => item.url != null);
    const scheduler = new Scheduler(
      childChapterList.map((item) => {
        return () => getNovelContentByUrl((item.url as string) || '');
      }),
      {
        maxCount: 5,
        maxTryCount: 1,
      }
    );

    scheduler.execute().then((contents) => {
      const text = `${title}\n${intro}\n\n${contents
        .map((content, index) => {
          return `${chapterList[index].title}\n${content}`;
        })
        .join('\n\n')}`;

      fileSave(text, title as string);

      resolve({
        title,
        text,
      });
    });
  });
};

export default getNovelContent;
