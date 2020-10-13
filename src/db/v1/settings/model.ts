import { Document, model, Schema } from 'mongoose';

export interface ISetting {
  name: string;
  description: string;
  value: string;
}

type ISettingDOC = ISetting & Document;

const SettingSchema = new Schema<ISetting>({
  name: { type: String, required: true },
  value: { type: String, required: true },
});

export default model<ISettingDOC>('settings', SettingSchema);
