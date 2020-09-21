import { isValidObjectId, Types } from 'mongoose';

function ByIds(data: string[]) {
  return {
    _id: {
      $in: data.map((dataLine) => Types.ObjectId(dataLine)),
    },
  };
}

function ById(id: string) {
  if (!isValidObjectId(id)) {
    throw new Error(`${id} is not a valid object id`);
  }
  const _id = Types.ObjectId(id);
  return { _id };
}

const Queries = {
  ById,
  ByIds,
};

export default Queries;
