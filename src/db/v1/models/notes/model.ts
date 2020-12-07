import mongoose, { Schema, Document } from 'mongoose';

export interface INote {
  _id?: string;
  user: string; //must be aggregated with actual user,
  created?: string;
  text: string;
  related: string;
}

type INoteDOC = INote & Document;

export const INoteSchema = new Schema({
  user: { type: Schema.Types.ObjectId, required: true },
  created: { type: Date, required: true, default: new Date() },
  text: { type: String, required: true, default: '' },
  related: { type: Schema.Types.ObjectId, required: true },
});

export default mongoose.model<INoteDOC>('notes', INoteSchema);
