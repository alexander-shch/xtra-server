import CourseModel, { Course, ICourse } from './model';

export async function GetAllCourses(query: object = {}): Promise<Course[]> {
  return CourseModel.find(query);
}

export async function CreateCourse(data: ICourse): Promise<Course> {
  const newCourse = new CourseModel(data);
  return newCourse.save();
}

export async function GetSingleCourse(query: object) {
  return CourseModel.findOne(query);
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
