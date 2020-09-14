import mongoose, { Schema, Document } from 'mongoose';

export interface IFileDetails {
  name: string;
  size: number;
  mimetype: string;
}

type FileDetailsDOC = IFileDetails & Document;

const FileSchema = new Schema<IFileDetails>({
  name: { type: String, required: true },
  size: { type: Number, required: true },
  mimetype: { type: String, required: true },
});

export interface FileDetails extends IFileDetails {
  _id: string;
}

export default mongoose.model<FileDetailsDOC>('files', FileSchema);
