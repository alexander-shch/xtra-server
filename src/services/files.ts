import path from 'path';
import { existsSync, unlink } from 'fs';
import { UploadedFile } from 'express-fileupload';
import { IFileDetails } from '../db/v1/files/model';

function getPath(secure: boolean = false) {
  const securePath = 'files';
  const publicPath = 'uploads';
  return secure ? securePath : publicPath;
}

export function moveFile(
  file: UploadedFile,
  secure: boolean = false
): Promise<IFileDetails> {
  const time = Date.now();
  const { size, mimetype, name } = file;
  const finalName = `${time}_${name}`;
  return file.mv(`${getPath(secure)}/${finalName}`).then(() => ({
    size,
    mimetype,
    name: finalName,
    secure,
    created: new Date(time).toUTCString(),
  }));
}

export function deleteFile(
  fileName: string = '',
  secure: boolean = false
): Promise<void> {
  const filePathFinal = path.join(getPath(secure), fileName);
  if (!existsSync(filePathFinal)) {
    console.error(
      `Tried to delete file at "${filePathFinal}", file was not found`,
      'breaking operation none blocking fail'
    );
    return Promise.resolve();
  }
  return new Promise((res, rej) =>
    unlink(filePathFinal, (err) => {
      if (err) {
        rej(err);
      }
      return res();
    })
  );
}
