import CategoriesModel, { Category } from './model';

export async function GetAllCategories(
  query: object = {}
): Promise<Category[]> {
  return CategoriesModel.find(query);
}

export async function GetSingleCategory(query: object) {
  return CategoriesModel.findOne(query);
}

export async function CreateCategory(classData: Category) {
  const newClass = new CategoriesModel(classData);
  return newClass.save().then((d) => d.toJSON());
}

export async function DeleteCategory(id: string) {
  return CategoriesModel.findByIdAndDelete(id).then((_) => true);
}

export async function UpdateCategory(id: string, data: Category) {
  return CategoriesModel.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true, runValidators: true }
  ).exec();
}
