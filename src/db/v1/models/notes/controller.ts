import { Types } from 'mongoose';
import INoteSchemaModel, { INote } from './model';

export async function GetNotes(query: object = {}): Promise<INote[]> {
  return INoteSchemaModel.aggregate([
    {
      $match: query,
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
      $unwind: { path: '$user', preserveNullAndEmptyArrays: true },
    },
    {
      $project: {
        related: 0,
      },
    },
  ]);
}

export async function GetNote(query: object = {}): Promise<INote> {
  return GetNotes(query).then((response) => {
    if (response.length) {
      return Promise.resolve(response[0]);
    }
    return Promise.reject({ errors: 'Not found' });
  });
}

export async function CreateNote(LecturerData: INote): Promise<INote> {
  const newClass = new INoteSchemaModel(LecturerData);
  return newClass.save().then((noteDate) => {
    return GetNote({ _id: Types.ObjectId(noteDate._id) });
  });
}

export async function DeleteNote(id: string): Promise<Boolean> {
  return INoteSchemaModel.findByIdAndDelete(id).then((d) => !!d);
}

export async function UpdateNote(
  id: string,
  data: INote
): Promise<INote | undefined> {
  return INoteSchemaModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  }).then((data) => data?.toJSON());
}
