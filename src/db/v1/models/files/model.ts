import mongoose, { Schema, Document } from 'mongoose';

export interface IFileDetails {
  _id?: string;
  name: string;
  size: number;
  mimetype: string;
  secure: boolean;
  created: string;
}

type FileDetailsDOC = IFileDetails & Document;

const FileSchema = new Schema({
  name: { type: String, required: true },
  size: { type: Number, required: true },
  mimetype: { type: String, required: true },
  secure: { type: Boolean, required: false, default: false },
  created: { type: Date, required: false, default: new Date() },
});

export default mongoose.model<FileDetailsDOC>('files', FileSchema);
