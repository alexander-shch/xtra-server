import mongoose, { Document, Schema } from 'mongoose';

export interface IClassRoom {
  building: string;
  name: string;
  minStudents: number;
  maxStudents: number;
}

export type IClassRoomDOC = IClassRoom & Document;

export const ClassesSchema = new Schema({
  building: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true, unique: true },
  minStudents: { type: Number, required: false, default: 1 },
  maxStudents: { type: Number, required: true },
});

export default mongoose.model<IClassRoomDOC>('Classes', ClassesSchema);
