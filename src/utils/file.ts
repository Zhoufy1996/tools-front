import Compressor from 'compressorjs';

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
