import mongoose, { Schema, Document } from 'mongoose';

export interface TitlesForWebsite {
  title?: string;
  target?: string;
  requirements?: string;
  progress?: string;
  marketing?: string;
  meetingsCount?: string;
  meetingLength?: string;
}

export interface ICourse {
  title: string;
  category: string;
  target: string;
  requirements: string;
  progress: string;
  marketing: string;
  meetingsCount: string;
  meetingLength: string;
  minStudents: number;
  maxStudents: number;
}

type ICourseDOC = ICourse & Document;

export const TitlesForWebsite = new Schema<TitlesForWebsite>(
  {
    title: { type: String, required: false, default: '' },
    target: { type: String, required: false, default: '' },
    requirements: { type: String, required: false, default: '' },
    progress: { type: String, required: false, default: '' },
    marketing: { type: String, required: false, default: '' },
    meetingsCount: { type: String, required: false, default: '' },
    meetingLength: { type: String, required: false, default: '' },
  },
  {
    _id: false,
  }
);

export const CourseSchema = new Schema<ICourse>({
  title: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, required: false },
  target: { type: String, required: false, default: '' },
  requirements: { type: String, required: false, default: '' },
  progress: { type: String, required: false, default: '' },
  marketing: { type: String, required: false, default: '' },
  meetingsCount: { type: Number, required: false, default: 0 },
  meetingLength: { type: Number, required: false, default: 0 },
  minStudents: { type: Number, required: false, default: 1 },
  maxStudents: { type: Number, required: false, default: 1 },
  extTitles: { type: TitlesForWebsite, required: false, default: {} },
});

export interface Course extends ICourse {
  _id: string;
}

export default mongoose.model<ICourseDOC>('courses', CourseSchema);
