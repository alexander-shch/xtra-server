import Queries from '../../queries';
import { Note } from '../notes/model';
import LecturerSchemaModel, { Lecturer } from './model';

/**
 * @export
 * @param {object} [query={}]
 * @return {*}  {Promise<Lecturer[]>}
 */
export async function GetAllLecturers(query: object = {}): Promise<Lecturer[]> {
  return LecturerSchemaModel.aggregate([
    {
      $match: query,
    },
    {
      $lookup: {
        from: 'notes',
        localField: 'notes',
        foreignField: '_id',
        as: 'notes',
      },
    },
    {
      $lookup: {
        from: 'notes',
        localField: 'internalNotes',
        foreignField: '_id',
        as: 'internalNotes',
      },
    },
    {
      $lookup: {
        from: 'files',
        localField: 'avatar',
        foreignField: '_id',
        as: 'avatar',
      },
    },
    {
      $unwind: {
        path: '$avatar',
        preserveNullAndEmptyArrays: true,
      },
    },
  ]).exec();
}

/**
 * @export
 * @param {object} [query={}]
 * @return {*}  {Promise<Lecturer>}
 */
export async function GetSingleLecturer(query: object = {}): Promise<Lecturer> {
  return GetAllLecturers(query).then((data) => data[0]);
}

/**
 * @export
 * @param {Lecturer} LecturerData
 * @return {*}  {Promise<Lecturer>}
 */
export async function CreateLecturer(
  LecturerData: Lecturer
): Promise<Lecturer> {
  const newClass = new LecturerSchemaModel(LecturerData);
  return newClass.save().then((d) => d.toJSON());
}

/**
 * @export
 * @param {string} id
 * @return {*}  {Promise<Boolean>}
 */
export async function DeleteLecturer(id: string): Promise<Boolean> {
  return LecturerSchemaModel.findByIdAndDelete(id).then((_) => true);
}

/**
 * @export
 * @param {string} id
 * @param {Partial<Lecturer>} data
 * @return {*}  {Promise<Lecturer>}
 */
export async function UpdateLecturer(
  id: string,
  data: Partial<Lecturer>
): Promise<Lecturer> {
  // remove fields that should not be updated with general update
  delete data.avatar;
  delete data.internalNotes;

  return LecturerSchemaModel.findByIdAndUpdate(
    id,
    {
      $set: data,
    },
    {
      new: true,
      runValidators: true,
    }
  )
    .exec()
    .then((data) => GetSingleLecturer({ _id: data?._id }));
}

/**
 * @export
 * @param {string} id
 * @param {Partial<Lecturer>} data
 * @return {*}  {Promise<Lecturer>}
 */
export async function UpdateLecturerAvatar(
  id: string,
  avatarObjectId: string
): Promise<Lecturer> {
  return LecturerSchemaModel.findByIdAndUpdate(
    id,
    {
      $set: { avatar: avatarObjectId },
    },
    {
      new: true,
      runValidators: true,
    }
  )
    .exec()
    .then((data) => GetSingleLecturer({ _id: data?._id }));
}

/**
 * @export
 * @param {string} lecturerId
 * @param {string} noteId
 * @return {*}
 */
export async function AddNote(lecturerId: string, noteId: string) {
  return LecturerSchemaModel.findByIdAndUpdate(lecturerId, {
    $push: { internalNotes: noteId },
  });
}

/**
 * @export
 * @param {string} lecturerId
 * @param {string} noteId
 * @return {*}
 */
export async function RemoveNote(lecturerId: string, noteId: string) {
  return LecturerSchemaModel.findByIdAndUpdate(lecturerId, {
    $pull: { internalNotes: noteId },
  });
}

export async function GetNotesByLecturerId(
  lecturerId: string
): Promise<Note[]> {
  return GetSingleLecturer(Queries.ById(lecturerId)).then(
    ({ internalNotes }) => internalNotes || []
  );
}
