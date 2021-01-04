export interface AccountingAdditional {
  type: string;  // ObjectId
  startDate: string;
  endDate: string;
  expireDateExists: boolean;
  cost: number;
  isStudent: boolean;
}

export interface Accounting {
  print: number;
  aids: number;
  parking: number;
  publicity: number;
  other: number;
  additional: AccountingAdditional[];
}

export interface LectureBonus {
  lecture: string[]; // ObjectId list
  bonus: number;
  date: string;
  notes: string;
}

export interface AssignedStudents {
  student: string; // ObjectId
  payment: string; // ObjectId
  cost: number;
}

export interface IGroup {
  _id?: string; // ObjectId
  name: string;
  course: string; // ObjectId
  minStudents: number;
  maxStudents: number;
  startDate: string;
  active: boolean;
  lecturers: string[]; // ObjectId list
  semester: string; // ObjectId
  coupon: string; // ObjectId
  signingAvailable: boolean;
  displayWeb: boolean;
  accounting: Accounting;
  lectureBonus: LectureBonus[];
}
