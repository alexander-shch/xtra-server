import ClassAvailabilityModel, { IClassAvailability } from './model';
import { CreateDateRangeAndCheck } from './helper';

export async function GetAllClassAvailability(
  classId: string
): Promise<IClassAvailability[]> {
  return ClassAvailabilityModel.find({ classId })
    .select({
      classId: 0,
    })
    .lean();
}

export async function FindOneClassAvailability(
  _id: string
): Promise<IClassAvailability | null> {
  return ClassAvailabilityModel.findOne({ _id }).lean();
}

export async function Create(
  classId: string,
  { from, to, limiter = [] }: { from: string; to: string; limiter: string[] }
) {
  const { error, result = [] } = CreateDateRangeAndCheck(from, to, limiter);
  if (error) {
    return Promise.reject({ errors: error });
  }
  return ClassAvailabilityModel.insertMany(
    result.map((singleAvailability) => ({
      ...singleAvailability,
      classId,
    }))
  );
}

export async function DeleteAvailability(id: string): Promise<boolean> {
  return ClassAvailabilityModel.findByIdAndDelete(id).then(() => true);
}

export async function UpdateAvailability(
  id: string,
  data: IClassAvailability
): Promise<IClassAvailability | undefined> {
  return ClassAvailabilityModel.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true, runValidators: true }
  ).then((data) => data?.toJSON());
}
