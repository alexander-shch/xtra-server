import { UploadedFile } from 'express-fileupload';
import FileModelSchema from './model';
import { deleteFile, moveFile } from '../../../services/files';

export async function Upload(file: UploadedFile) {
  return moveFile(file)
    .then((fileData) => {
      const fileSchema = new FileModelSchema(fileData);
      return fileSchema.save();
    })
    .then((doc) => doc.toJSON())
    .catch((err) => {
      console.error(`${__filename}: ${err}`);
      throw new Error(err);
    });
}

export async function Delete(query: object = {}, secure: boolean = false) {
  return FileModelSchema.findOneAndDelete(query)
    .then((doc) => deleteFile(doc?.name, secure))
    .catch((err) => {
      console.error(`${__filename}: ${err}`);
      throw new Error(err);
    });
}
