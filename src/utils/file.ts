import Compressor from 'compressorjs';
import { saveAs } from 'file-saver';

export const readFile = (file: File, compressor = true): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (compressor) {
      new Compressor(file, {
        quality: 0.6,

        // The compression process is asynchronous,
        // which means you have to access the `result` in the `success` hook function.
        success(result) {
          const reader = new FileReader();
          reader.readAsDataURL(result);
          reader.onload = () => {
            resolve(reader.result as string);
          };
          reader.onerror = (err) => {
            reject(err);
          };
        },
        error(err) {
          reject(err);
        },
      });
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = (err) => {
        reject(err);
      };
    }
  });
};

export const readFileAsText = <T>(file: File): Promise<T> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      let result;
      try {
        result = JSON.parse(reader.result as string);
      } catch (e) {
        result = reader.result;
      }
      resolve(result as T);
    };
    reader.onerror = (err) => {
      reject(err);
    };
  });
};

export const fileSave = (text: string, title: string) => {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' }) as any;
  saveAs(blob, `${title}.txt`);
};
