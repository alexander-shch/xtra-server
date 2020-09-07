import CourseModel, { Course, ICourse } from './model';

export async function GetAllCourses(query: object = {}): Promise<Course[]> {
  return CourseModel.aggregate<Course>([
    {
      $match: query,
    },
    {
      $lookup: {
        from: 'classes',
        localField: 'class',
        foreignField: '_id',
        as: 'class',
      },
    },
    {
      $unwind: '$class',
    },
    {
      $project: {
        'class.__v': 0,
        __v: 0,
      },
    },
  ]).exec();
}

export async function GetSingleCourse(query: object) {
  return GetAllCourses(query).then((data) => {
    if (data.length > 0) {
      return data[0];
    }
    return undefined;
  });
}

export async function CreateClass(classData: ICourse) {
  const newClass = new CourseModel(classData);
  return newClass.save().then((d) => d.toJSON());
}

export async function DeleteClass(id: string) {
  return CourseModel.findByIdAndDelete(id).then((_) => true);
}

export async function UpdateCourse(id: string, data: ICourse) {
  return CourseModel.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true, runValidators: true }
  )
    .exec()
    .then((data) => GetSingleCourse({ _id: data?._id }));
}
