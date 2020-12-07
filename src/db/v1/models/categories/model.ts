import mongoose, { Schema, Document } from 'mongoose';

interface Option {
  value: string;
  title: string;
}
interface Session {
  count: Option;
  length: Option;
}
interface CourseDefaults {
  preliminaryKnowledge: Option;
  goals: Option;
  promotion: Option;
  marketing: string;
  session: Session;
  minStudents: number;
  maxStudents: number;
  price: number;
  studentPrice: number;
}
export interface ICategory {
  _id?: string;
  title: string;
  active: boolean;
  courseDefaults: CourseDefaults;
}

export type ICategoryDOC = ICategory & Document;

const OptionSchema = new Schema({
  value: { type: String, required: false },
  title: { type: String, required: false },
});

const SessionSchema = new Schema({
  count: { type: OptionSchema, required: false },
  length: { type: OptionSchema, required: false },
});

const CourseDefaultsSchema = new Schema({
  preliminaryKnowledge: { type: OptionSchema, required: false },
  goals: { type: OptionSchema, required: false },
  promotion: { type: OptionSchema, required: false },
  marketing: { type: String, required: false, default: '' },
  session: { type: SessionSchema, required: false },
  minStudents: { type: Number, required: false, default: 0 },
  maxStudents: { type: Number, required: false, default: 0 },
  price: { type: Number, required: false, default: 0 },
  studentPrice: { type: Number, required: false, default: 0 },
});

export const CategorySchema = new Schema({
  title: { type: String, required: true },
  active: { type: Boolean, required: false, default: true },
  courseDefaults: { type: CourseDefaultsSchema, required: false },
});

export default mongoose.model<ICategoryDOC>('categories', CategorySchema);
