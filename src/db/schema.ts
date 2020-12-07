import { Schema } from 'mongoose';

export const AddressSchema = new Schema(
  {
    address: { type: String, required: false },
    zip: { type: String, required: false },
    city: { type: String, required: false },
    region: { type: String, required: false },
    country: { type: String, required: false },
    houseNumber: { type: Number, required: false },
    entry: { type: String, required: false },
    floor: { type: Number, required: false },
    flatNumber: { type: Number, required: false },
  },
  {
    _id: false,
  }
);
