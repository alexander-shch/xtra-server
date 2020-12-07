import mongoose, { Schema, Document } from 'mongoose';
import { Validators } from '../../../validators';
import { Address } from '../../../../models';
import { AddressSchema } from '../../../schema';
import { INote } from '../notes/model';
import { IFileDetails } from '../files/model';
import { IPayDuplicator } from '../pay-duplicator/model';

export interface ILecturer {
  _id?: string;
  name: string;
  idNumber: string;
  email: string;
  phone: string;
  address: Address;
  hourlyRate: number;
  duplicator: string; //duplicator id
  active: boolean;
  details: string; //text editor
  avatar: string;
  description: string;
  experience: string;
  teaching: string;
  notes: string;
  files: string[];
  internalNotes: string[];
}

type ILecturerDOC = ILecturer & Document;

export const ILecturerSchema = new Schema({
  name: { type: String, required: true },
  idNumber: { type: Number, required: true, unique: true },
  email: {
    type: String,
    trim: true,
    unique: true,
    validate: Validators.email,
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

export interface Lecturer {
  _id?: string;
  name: string;
  idNumber: string;
  email: string;
  phone: string;
  address: Address;
  hourlyRate: number;
  duplicator: IPayDuplicator; //duplicator id
  active: boolean;
  details: string; //text editor
  avatar: IFileDetails;
  description: string;
  experience: string;
  teaching: string;
  notes: string;
  files: string[];
  internalNotes: INote[];
}

export default mongoose.model<ILecturerDOC>('lecturer', ILecturerSchema);
