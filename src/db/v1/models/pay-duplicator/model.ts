import mongoose, { Schema, Document } from 'mongoose';

export interface IPayDuplicator extends Document {
  _id?: string;
  title: string;
  duplicate: number; // example: 1.2 - so it will be 120%, in lecturer obj we will have he's hourly salary - the duplicate will multiple it...
  vat: boolean; // to add or not to add the vat to the salary
  active: boolean;
}

export const PayDuplicatorSchema = new Schema({
  title: { type: String, required: true, unique: true },
  duplicate: { type: Number, required: true },
  vat: { type: Boolean, required: true },
  active: { type: Boolean, required: false, default: true },
});

export default mongoose.model<IPayDuplicator>('pays', PayDuplicatorSchema);
