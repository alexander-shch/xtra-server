import mongoose, { Schema, Document } from 'mongoose';
import { IClassRoom } from '../classes/model';

export interface InfoForWebsite {
  courseName?: string;
  mainFirstTitle?: string;
  mainFirstText?: string;
  mainSecondTitle?: string;
  mainThirdText?: string;
  mainThirdTitle?: string;
  bottomFirstTitle?: string;
  bottomFirstText?: string;
  bottomSecondTitle?: string;
  bottomSecondText?: string;
  bottomThirdTitle?: string;
  bottomThirdText?: string;
  bottomFourthTitle?: string;
  bottomFourthText?: string;
  bottomFifthTitle?: string;
  bottomFifthText?: string;
}

export type SalaryType = 'hour' | 'day' | 'week' | 'month';

export interface Salary {
  type: SalaryType;
  rate: number;
}

export interface Lecture {
  _id: string;
  name: string;
  salary: Salary;
}

export interface Syllabus {
  name: string;
  fileURL: string;
}

export interface Category {
  name: string;
}

export interface Student {}

export interface ICourse extends Document {
  class: string;
  name: string;
  courseID: string;
  minStudents: number;
  maxStudents: number;
  category: string;
  status: boolean;
  notes: string[];
  notesForScheduleMeetings: string;
  infoForWebsite: InfoForWebsite;
  lecturers: string[];
  syllabus: Syllabus;
  students: string[];
}

export const InfoForWebsiteSchema = new Schema<InfoForWebsite>({
  courseName: { type: String, required: false, default: '' },
  mainFirstTitle: { type: String, required: false, default: '' },
  mainFirstText: { type: String, required: false, default: '' },
  mainSecondTitle: { type: String, required: false, default: '' },
  mainThirdText: { type: String, required: false, default: '' },
  mainThirdTitle: { type: String, required: false, default: '' },
  bottomFirstTitle: { type: String, required: false, default: '' },
  bottomFirstText: { type: String, required: false, default: '' },
  bottomSecondTitle: { type: String, required: false, default: '' },
  bottomSecondText: { type: String, required: false, default: '' },
  bottomThirdTitle: { type: String, required: false, default: '' },
  bottomThirdText: { type: String, required: false, default: '' },
  bottomFourthTitle: { type: String, required: false, default: '' },
  bottomFourthText: { type: String, required: false, default: '' },
  bottomFifthTitle: { type: String, required: false, default: '' },
  bottomFifthText: { type: String, required: false, default: '' },
});

export const SyllabusSchema = new Schema({
  name: { type: String, required: true },
  fileURL: { type: String, required: true },
});

export const CourseSchema = new Schema<ICourse>({
  class: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: false, default: '' },
  courseID: { type: String, required: true },
  minStudents: { type: Number, required: true },
  maxStudents: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, required: true },
  status: { type: Boolean, required: false, default: false },
  notes: { type: [String], required: false, default: [] },
  notesForScheduleMeetings: { type: [String], required: false, default: [] },
  infoForWebsite: {
    type: InfoForWebsiteSchema,
    required: false,
    default: {},
  },
  lecturers: { type: [Schema.Types.ObjectId], required: true },
  syllabus: {
    type: [SyllabusSchema],
    required: false,
    default: {},
  },
  students: { type: [Schema.Types.ObjectId], required: false, default: [] },
});

export interface Course {
  _id: string;
  class: IClassRoom;
  name: string;
  courseID: string;
  minStudents: number;
  maxStudents: number;
  category: Category;
  status: boolean;
  notes: string[];
  notesForScheduleMeetings: string[];
  infoForWebsite: InfoForWebsite;
  lecturers: Lecture[];
  syllabus: Syllabus;
  students: Student[];
}

export default mongoose.model<ICourse>('Courses', CourseSchema);
