import mongoose, { Schema, Document } from 'mongoose';
import { Validators } from '../../../validators';
import { PayDuplicator } from '../pay-duplicator/model';
import { Address } from '../../../../models';
import { AddressSchema } from '../../../schema';
import { FileDetails } from '../files/model';
import { Note } from '../notes/model';

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
  avatar: string | FileDetails;
  description: string;
  experience: string;
  teaching: string;
  notes: string;
  files: string[];
  internalNotes: string[] | Note[];
}

type ILecturerDOC = ILecturer & Document;

export const ILecturerSchema = new Schema<ILecturer>({
  name: { type: String, required: true },
  idNumber: { type: Number, required: true, unique: true },
  email: {
    type: String,
    trim: true,
    unique: true,
    validate: {
      validator: Validators.email,
    },
  },
  phone: { type: String, required: true, unique: true },
  address: { type: AddressSchema, required: false },
  hourlyRate: { type: Number, required: true },
  duplicator: { type: Schema.Types.ObjectId, required: true },
  active: { type: Boolean, required: false, default: true },
  details: { type: String, required: false },
  avatar: { type: Schema.Types.ObjectId, required: false },
  description: { type: String, required: false },
  experience: { type: String, required: false },
  teaching: { type: String, required: false },
  notes: { type: String, required: false },
  files: { type: [Schema.Types.ObjectId], required: false },
  internalNotes: { type: [Schema.Types.ObjectId], required: false },
});

export interface Lecturer extends ILecturer {
  _id: string;
  duplicator: PayDuplicator;
  notes: string;
  internalNotes: Note[];
  avatar: FileDetails;
}

export default mongoose.model<ILecturerDOC>('lecturer', ILecturerSchema);
