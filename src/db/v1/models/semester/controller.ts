import SemesterModel, { ISemester } from './model';

export async function CreateSemester(data: ISemester) {
  const newSemester = new SemesterModel(data);
  return newSemester.save();
}
export async function GetSemester(
  query: object
): Promise<ISemester | undefined> {
  return SemesterModel.findOne(query).then((json) => json?.toJSON());
}
export async function GetAllSemesters(): Promise<ISemester[]> {
  return SemesterModel.find({});
}
export async function UpdateSemester(
  id: string,
  data: ISemester
): Promise<ISemester | undefined> {
  return SemesterModel.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true }
  ).then((json) => json?.toJSON());
}
export async function DeleteSemester(id: string): Promise<boolean> {
  return SemesterModel.findByIdAndDelete(id).then(() => true);
}
