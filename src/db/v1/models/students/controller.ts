import { Types } from 'mongoose';
import { GetNotes } from '../notes/controller';
import { INote } from '../notes/model';
import StudentModel, { IStudent } from './model';

export function GetAllStudents(query = {}): Promise<IStudent[]> {
  return StudentModel.aggregate([
    {
      $match: query,
    },
    {
      $lookup: {
        from: 'notes',
        let: { id: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ['$related', '$$id'],
              },
            },
          },
          {
            $lookup: {
              from: 'users',
              localField: 'user',
              foreignField: '_id',
              as: 'user',
            },
          },
          {
            $unwind: '$user',
          },
        ],
        as: 'notes',
      },
    },
    {
      $project: {
        'notes.related': 0,
        '*.__v': 0,
      },
    },
  ]).exec();
}

export function GetSingleStudent(query = {}): Promise<IStudent | undefined> {
  return GetAllStudents(query).then((data) => {
    if (data.length === 0) {
      return Promise.reject({ errors: 'Student not found' });
    }
    return data[0];
  });
}

export function DeleteSingleStudent(id: string): Promise<boolean> {
  return StudentModel.findByIdAndDelete(id).then((data) => !!data);
}

export function CreateSingleStudent(data: IStudent): Promise<IStudent> {
  const newStudents = new StudentModel(data);
  return newStudents.save();
}

export function GetStudentNotes(studentId: string): Promise<INote[]> {
  return GetNotes({ related: Types.ObjectId(studentId) });
}

export function UpdateSingleStudent(
  id: string,
  data: IStudent
): Promise<IStudent | undefined> {
  return StudentModel.findByIdAndUpdate(id, { $set: data }, { new: true }).then(
    (data) => data || undefined
  );
}
