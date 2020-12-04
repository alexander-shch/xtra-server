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
  active: boolean;
  assignToClassComments: string;
  schedulingComments: string;
  extTitles: TitlesForWebsite;
  coupons: string;
}

type ICourseDOC = ICourse & Document;

export const TitlesForWebsite = new Schema<TitlesForWebsite>(
  {
    title: { type: String, required: false, default: '' },
    target: { type: String, required: false, default: '' },
    requirements: { type: String, required: false, default: '' },
    progress: { type: String, required: false, default: '' },
    meetingsCount: { type: String, required: false, default: '' },
    meetingLength: { type: String, required: false, default: '' },
  },
  {
    _id: false,
  }
);

export const CourseSchema = new Schema<ICourse>({
  title: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, required: true },
  active: { type: Boolean, required: false, default: true },
  target: { type: String, required: false, default: '' },
  requirements: { type: String, required: false, default: '' },
  progress: { type: String, required: false, default: '' },
  marketing: { type: String, required: false, default: '' },
  meetingsCount: { type: Number, required: false, default: 0 },
  meetingLength: { type: Number, required: false, default: 0 },
  minStudents: { type: Number, required: false, default: 1, min: 1 },
  maxStudents: { type: Number, required: false, default: 1, min: 1 },
  extTitles: { type: TitlesForWebsite, required: false, default: {} },
  assignToClassComments: { type: String, required: false, default: '' },
  schedulingComments: { type: String, required: false, default: '' },
  coupon: { type: Schema.Types.ObjectId, required: false, default: [] },
  assignedLecturers: { type: [Schema.Types.ObjectId], required: false },
  files: { type: [Schema.Types.ObjectId], required: false },
});

export default mongoose.model<ICourseDOC>('courses', CourseSchema);
