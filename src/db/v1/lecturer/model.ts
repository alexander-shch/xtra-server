import mongoose, { Schema, Document } from 'mongoose';
import { Validators } from '../../validators';
import { PayDuplicator } from '../pay-duplicator/model';
import { Address } from '../../../models';
import { AddressSchema } from '../../schema';

interface Note {
  user: string; //must be aggregated with actual user,
  created: string;
  text: string;
}

interface ILecturer {
  name: string;
  idNumber: string;
  email: string;
  phone: string;
  address: Address;
  hourlyRate: number;
  duplicator: string | PayDuplicator; //duplicator id
  active: boolean;
  details: string; //text editor
  avatar: string;
  description: string;
  experience: string;
  teaching: string;
  notes: string[] | Note[];
  files: string[];
  internalNotes: string[] | Note[];
}

type ILecturerDOC = ILecturer & Document;

export const ILecturerSchema = new Schema<ILecturer>({
  name: { type: String, required: true },
  idNumber: { type: Number, required: true },
  email: {
    type: String,
    trim: true,
    unique: true,
    validate: {
      validator: Validators.email,
    },
  },
  phone: { type: Number, required: true },
  address: { type: AddressSchema, required: false },
  hourlyRate: { type: Number, required: true },
  duplicator: { type: Schema.Types.ObjectId, required: true },
  active: { type: Boolean, required: false, default: true },
  details: { type: String, required: false },
  avatar: { type: Schema.Types.ObjectId, required: false },
  description: { type: String, required: false },
  experience: { type: String, required: false },
  teaching: { type: String, required: false },
  notes: { type: [Schema.Types.ObjectId], required: false },
  files: { type: [Schema.Types.ObjectId], required: false },
  internalNotes: { type: [Schema.Types.ObjectId], required: false },
});

export interface Lecturer extends ILecturer {
  _id: string;
  duplicator: PayDuplicator;
  notes: Note[];
  internalNotes: Note[];
}

export default mongoose.model<ILecturerDOC>('lecturer', ILecturerSchema);
