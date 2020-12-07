import mongoose, { Schema, Document } from 'mongoose';

export interface IBuilding {
  name: string;
  active: boolean;
}

export type IBuildingDOC = IBuilding & Document;

export const BuildingSchema = new Schema({
  name: { type: String, required: true, unique: true },
  active: { type: Boolean, required: true },
});

export default mongoose.model<IBuildingDOC>('Buildings', BuildingSchema);
