import Queries from '../../../queries';
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
        let: { internalNotes: '$internalNotes' },
        pipeline: [
          {
            $match: {
              $expr: {
                $in: ['$_id', '$$internalNotes'],
              },
            },
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
        ],
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
    {
      $lookup: {
        from: 'files',
        localField: 'files',
        foreignField: '_id',
        as: 'files',
      },
    },
    {
      $lookup: {
        from: 'pays',
        localField: 'duplicator',
        foreignField: '_id',
        as: 'duplicator',
      },
    },
    {
      $unwind: {
        path: '$duplicator',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        'internalNotes.user.password': 0,
        'internalNotes.user.role': 0,
        'internalNotes.user.__v': 0,
        'internalNotes.user.email': 0,
        'files.secure': 0,
        'files.__v': 0,
        'internalNotes.__v': 0,
        'avatar.__v': 0,
        __v: 0,
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
  return GetAllLecturers(query).then((data) => {
    if (data.length === 0) {
      return Promise.reject({ errors: 'Lecturer not found' });
    }
    return data[0];
  });
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

export async function PushLecturerFiles(lecturerId: string, noteId: string) {
  return LecturerSchemaModel.findByIdAndUpdate(
    lecturerId,
    {
      $push: { files: noteId },
    },
    { new: true }
  ).then((lecturer) => GetSingleLecturer(Queries.ById(lecturer?._id)));
}

export async function PullLecturerFiles(lecturerId: string, noteId: string) {
  return LecturerSchemaModel.findByIdAndUpdate(
    lecturerId,
    {
      $pull: { files: noteId },
    },
    { new: true }
  ).then((lecturer) => GetSingleLecturer(Queries.ById(lecturer?._id)));
}
