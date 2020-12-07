import CategoriesModel, { ICategory } from './model';

export async function GetAllCategories(
  query: object = {}
): Promise<ICategory[]> {
  return CategoriesModel.find(query);
}

export async function GetSingleCategory(query: object) {
  return CategoriesModel.findOne(query);
}

export async function CreateCategory(classData: ICategory) {
  const newClass = new CategoriesModel(classData);
  return newClass.save().then((d) => d.toJSON());
}

export async function DeleteCategory(id: string) {
  return CategoriesModel.findByIdAndDelete(id).then((_) => true);
}

export async function UpdateCategory(id: string, data: ICategory) {
  return CategoriesModel.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true, runValidators: true }
  ).exec();
}
