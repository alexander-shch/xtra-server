import INoteSchemaModel, { Note, INote } from './model';

export async function GetNotes(query: object = {}): Promise<Note[]> {
  return INoteSchemaModel.find(query).then((data) =>
    data.map((d) => d.toJSON())
  );
}

export async function GetNote(query: object = {}) {
  return INoteSchemaModel.findOne(query);
}

export async function CreateNote(LecturerData: INote): Promise<Note> {
  const newClass = new INoteSchemaModel(LecturerData);
  return newClass.save().then((d) => d.toJSON());
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
