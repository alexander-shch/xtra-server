import mongoose, { Document, Schema } from 'mongoose';

export interface ISemester {
  name: string;
  startDate: string;
  endDate: string;
  active: boolean;
}

type ISemesterDoc = ISemester & Document;

const SemesterSchema = new Schema<ISemester>({
  name: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  active: { type: Boolean, required: false, default: true },
});

export interface Semester extends ISemester {
  _id: string;
}

export default mongoose.model<ISemesterDoc>('semesters', SemesterSchema);
