import { UploadedFile } from 'express-fileupload';
import FileModelSchema from './model';
import { unlink, existsSync } from 'fs';
import path from 'path';

const filePath = `./uploads`;

export async function Upload(file: UploadedFile) {
  const { name, size, mimetype } = file;

  const time = Date.now();

  return file
    .mv(`${filePath}/${time}_${file.name}`)
    .then(() => {
      const fileSchema = new FileModelSchema({
        name: `${time}_${name}`,
        size,
        mimetype,
      });
      return fileSchema.save();
    })
    .then((doc) => doc.toJSON());
}

export async function Delete(query: object = {}) {
  return FileModelSchema.findOneAndDelete(query)
    .then((doc) => {
      if (!doc || !existsSync(path.join('uploads', doc?.name || ''))) {
        return Promise.resolve();
      }
      return new Promise((res, rej) =>
        unlink(path.join('uploads', doc?.name as string), (err) => {
          if (err) {
            rej(err);
          }
          return res();
        })
      );
    })
    .catch((e) => {
      console.error(e);
      throw new Error(e);
    });
}
