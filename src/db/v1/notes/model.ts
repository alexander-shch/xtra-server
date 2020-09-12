import mongoose, { Schema, Document } from 'mongoose';

export interface INote {
  user: string; //must be aggregated with actual user,
  created?: string;
  text: string;
}

type INoteDOC = INote & Document;

export const INoteSchema = new Schema<INote>({
  user: { type: Schema.Types.ObjectId, required: true },
  created: { type: Date, required: true, default: new Date() },
  text: { type: String, required: true, default: '' },
});

export interface Note extends INote {
  _id: string;
  user: string; //must be aggregated with actual user,
  created: string;
  text: string;
}

export default mongoose.model<INoteDOC>('notes', INoteSchema);
