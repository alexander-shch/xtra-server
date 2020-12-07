import Queries from '../../../queries';
import CourseModel, { ICourse } from './model';

export async function GetMultipleCourses(
  query: object = {},
  limit: number = 999
): Promise<ICourse[]> {
  if (limit) {
  }
  return CourseModel.aggregate<ICourse[]>([
    {
      $match: query,
    },
    {
      $lookup: {
        from: 'files',
        localField: 'files',
        foreignField: '_id',
        as: 'files',
      },
    },
    { $limit: limit },
  ]).exec();
}

export async function CreateCourse(data: ICourse): Promise<ICourse> {
  const newCourse = new CourseModel(data);
  return newCourse.save();
}

export async function GetSingleCourse(query: object) {
  return GetMultipleCourses(query, 1).then((data) => {
    if (data.length == 0) {
      return Promise.reject('Course was not found');
    }
    return data[0];
  });
}

export async function DeleteSingleCourse(query: object) {
  return CourseModel.findOneAndDelete(query).then(() => true);
}

export async function UpdateCourse(id: string, data: ICourse) {
  return CourseModel.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true, runValidators: true }
  );
}

export async function PushCourseFiles(id: string, fileId: string) {
  return CourseModel.findByIdAndUpdate(
    id,
    {
      $push: { files: fileId },
    },
    { new: true }
  ).then((course) => GetSingleCourse(Queries.ById(course?._id)));
}

export async function PullCourseFiles(id: string, fileId: string) {
  return CourseModel.findByIdAndUpdate(
    id,
    {
      $pull: { files: fileId },
    },
    { new: true }
  ).then((course) => GetSingleCourse(Queries.ById(course?._id)));
}
