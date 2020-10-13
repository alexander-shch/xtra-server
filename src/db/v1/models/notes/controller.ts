import { Types } from 'mongoose';
import INoteSchemaModel, { Note, INote } from './model';

export async function GetNotes(query: object = {}): Promise<Note[]> {
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
      $unwind: '$user',
    },
  ]).exec();
}

export async function GetNote(query: object = {}): Promise<Note> {
  return GetNotes(query).then((response) => {
    if (response.length) {
      return Promise.resolve(response[0]);
    }
    return Promise.reject({ errors: 'Not found' });
  });
}

export async function CreateNote(LecturerData: INote): Promise<Note> {
  const newClass = new INoteSchemaModel(LecturerData);
  return newClass.save().then((noteDate) => {
    return GetNote({ _id: Types.ObjectId(noteDate._id) })
  });
}

export async function DeleteNote(id: string): Promise<Boolean> {
  return INoteSchemaModel.findByIdAndDelete(id).then((_) => true);
}

export async function UpdateNote(id: string, data: Note): Promise<Note> {
  return INoteSchemaModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  })
    .exec()
    .then((data) => data?.toJSON());
}
