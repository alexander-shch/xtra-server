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
        from: 'lecturers',
        localField: 'assignedLecturers',
        foreignField: '_id',
        as: 'assignedLecturers',
      },
    },
    {
      $unwind: { path: '$assignedLecturers', preserveNullAndEmptyArrays: true },
    },
    { $limit: limit },
  ]).exec();
}

export async function CreateCourse(data: ICourse): Promise<ICourse> {
  const newCourse = new CourseModel(data);
  return newCourse.save();
}

export async function GetSingleCourse(query: object) {
  return GetMultipleCourses(query, 1).then((data) => data[0]);
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
