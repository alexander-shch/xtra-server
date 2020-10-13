import { UploadedFile } from 'express-fileupload';
import FileModelSchema, { FileDetails } from './model';
import { deleteFile, moveFile } from '../../../services/files';
import Queries from '../../queries';

export async function Upload(file: UploadedFile, secure: boolean) {
  return moveFile(file, secure)
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

export async function Delete(query: object = {}, secure: boolean) {
  return FileModelSchema.findOneAndDelete(query)
    .then((doc) => deleteFile(doc?.name, secure))
    .catch((err) => {
      console.error(`${__filename}: ${err}`);
      throw new Error(err);
    });
}

export function GetFileList(query: object = {}) {
  return FileModelSchema.find(query);
}

export function GetFileById(fileId: string): Promise<FileDetails> {
  return FileModelSchema.findOne(Queries.ById(fileId)).then((fileData) => {
    if (!fileData) {
      return Promise.reject({ errors: 'File was not found' });
    }
    return fileData.toJSON();
  });
}
