import mongoose, { Schema, Document } from 'mongoose';

interface IPayDuplicator extends Document {
  title: string;
  duplicate: number; // example: 1.2 - so it will be 120%, in lecturer obj we will have he's hourly salary - the duplicate will multiple it...
  vat: boolean; // to add or not to add the vat to the salary
  active: boolean;
}

export const PayDuplicatorSchema = new Schema<IPayDuplicator>({
  title: { type: String, required: true },
  duplicate: { type: Number, required: true },
  vat: { type: Boolean, required: true },
  active: { type: Boolean, required: false, default: true },
});

export interface PayDuplicator {
  _id: string;
  title: string;
  duplicate: number; // example: 1.2 - so it will be 120%, in lecturer obj we will have he's hourly salary - the duplicate will multiple it...
  vat: boolean; // to add or not to add the vat to the salary
  active: boolean;
}

export default mongoose.model<IPayDuplicator>('pay', PayDuplicatorSchema);
