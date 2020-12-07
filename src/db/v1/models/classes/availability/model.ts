import mongoose, { Schema, Document } from 'mongoose';
import moment from 'moment';

export interface IClassAvailability {
  _id?: string;
  classId: string;
  from: string;
  to: string;
}

export type IClassAvailabilityDOC = IClassAvailability & Document;

export const ClassAvailabilitySchema = new Schema({
  classId: { type: Schema.Types.ObjectId, required: true },
  from: {
    type: Date,
    required: false,
    default: moment().utc().toDate(),
    min: Number(moment().utc().toNow()),
  },
  to: { type: Date, required: true },
});

export default mongoose.model<IClassAvailabilityDOC>(
  'ClassAvailability',
  ClassAvailabilitySchema
);
