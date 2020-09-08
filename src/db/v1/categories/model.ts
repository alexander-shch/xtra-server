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
interface ICategory extends Document {
  title: string;
  active: boolean;
  courseDefaults: CourseDefaults;
}

const OptionSchema = new Schema<Option>({
  value: { type: String, required: true },
  title: { type: String, required: true },
});

const SessionSchema = new Schema<Session>({
  value: { type: String, required: true },
  title: { type: String, required: true },
});

const CourseDefaultsSchema = new Schema<CourseDefaults>({
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

export const CategorySchema = new Schema<ICategory>({
  title: { type: String, required: true },
  active: { type: Boolean, required: false, default: true },
  courseDefaults: { type: CourseDefaultsSchema, required: false },
});

export interface Category {
  _id: string;
  title: string;
  active: boolean;
  courseDefaults: CourseDefaults;
}

export default mongoose.model<ICategory>('categories', CategorySchema);
