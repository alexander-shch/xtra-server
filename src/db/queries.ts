import { Types } from 'mongoose';

function ByIds(data: string[]) {
  return {
    _id: {
      $in: data.map((dataLine) => Types.ObjectId(dataLine)),
    },
  };
}

function ById(id: string) {
  const _id = Types.ObjectId(id);
  return { _id };
}

const Queries = {
  ById,
  ByIds,
};

export default Queries;
