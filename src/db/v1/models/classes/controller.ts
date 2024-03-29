import { isValidObjectId } from 'mongoose';
import Queries from '../../../queries';
import ClassesModel, { IClassRoom } from './model';

export async function GetAllClassRooms(
  query: object = {}
): Promise<IClassRoom[]> {
  return ClassesModel.aggregate<IClassRoom>([
    {
      $match: query,
    },
    {
      $lookup: {
        from: 'buildings',
        localField: 'building',
        foreignField: '_id',
        as: 'building',
      },
    },
    {
      $unwind: { path: '$building', preserveNullAndEmptyArrays: true },
    },
    {
      $lookup: {
        from: 'classavailabilities',
        localField: '_id',
        foreignField: 'classId',
        as: 'availability',
      },
    },
    {
      $project: {
        'availability.classId': 0,
        'availability.__v': 0,
        'building.__v': 0,
        __v: 0,
      },
    },
  ]).exec();
}

export async function GetSingleClassRoom(query: object) {
  return GetAllClassRooms(query).then((data) => {
    if (data.length > 0) {
      return data[0];
    }
    return undefined;
  });
}

export async function CreateClass(classData: IClassRoom) {
  const newClass = new ClassesModel(classData);
  return newClass.save().then((d) => d.toJSON());
}

export async function DeleteClass(id: string) {
  return ClassesModel.findByIdAndDelete(id).then((_) => true);
}

export async function UpdateClass(id: string, data: IClassRoom) {
  if (!isValidObjectId(id)) {
    return Promise.reject('Not valid class ID');
  }
  return ClassesModel.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true, runValidators: true }
  )
    .exec()
    .then(() => GetSingleClassRoom(Queries.ById(id)));
}
