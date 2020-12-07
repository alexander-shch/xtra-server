import { Document, model, Schema } from 'mongoose';

export interface IStudent {
  _id?: string;
  name: string;
  lastName: string;
  id: number;
  email: string;
  phone: number;
  advertising: boolean;
}

export type IStudentDOC = IStudent & Document;

const StudentSchema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  id: { type: Number, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  advertising: { type: Boolean, required: false, default: true },
});

export default model<IStudentDOC>('students', StudentSchema);
