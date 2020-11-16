import PayDuplicatorSchemaModel, { PayDuplicator } from './model';

export async function GetAllPayDuplicators(
  query: object = {}
): Promise<PayDuplicator[]> {
  return PayDuplicatorSchemaModel.find(query);
}

export async function GetSinglePayDuplicator(query: object = {}) {
  return PayDuplicatorSchemaModel.findOne(query);
}

export async function CreatePayDuplicator(payDuplicatorData: PayDuplicator) {
  const newClass = new PayDuplicatorSchemaModel(payDuplicatorData);
  return newClass.save().then((d) => d.toJSON());
}

export async function DeletePayDuplicator(id: string) {
  return PayDuplicatorSchemaModel.findByIdAndDelete(id).then((_) => true);
}

export async function UpdatePayDuplicator(id: string, data: PayDuplicator) {
  return PayDuplicatorSchemaModel.findByIdAndUpdate(
    id,
    { $set: data },
    {
      new: true,
      runValidators: true,
    }
  ).exec();
}
