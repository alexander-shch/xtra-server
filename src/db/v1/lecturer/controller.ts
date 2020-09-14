import LecturerSchemaModel, { Lecturer } from './model';

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
  ]).exec();
}

export async function GetSingleLecturer(query: object = {}) {
  return LecturerSchemaModel.findOne(query);
}

export async function CreateLecturer(
  LecturerData: Lecturer
): Promise<Lecturer> {
  const newClass = new LecturerSchemaModel(LecturerData);
  return newClass.save().then((d) => d.toJSON());
}

export async function DeleteLecturer(id: string): Promise<Boolean> {
  return LecturerSchemaModel.findByIdAndDelete(id).then((_) => true);
}

export async function UpdateLecturer(
  id: string,
  data: Lecturer
): Promise<Lecturer> {
  return LecturerSchemaModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  })
    .exec()
    .then((data) => data?.toJSON());
}

export async function AddNote(lecturerId: string, noteId: string) {
  return LecturerSchemaModel.findByIdAndUpdate(lecturerId, {
    $push: { notes: noteId },
  });
}

export async function RemoveNote(lecturerId: string, noteId: string) {
  return LecturerSchemaModel.findByIdAndUpdate(lecturerId, {
    $pull: { notes: noteId },
  });
}
