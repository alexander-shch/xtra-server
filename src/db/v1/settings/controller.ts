import Queries from '../../queries';
import SettingsModel, { ISetting } from './model';

export function CreateSetting(settingData: ISetting) {
  const newDoc = new SettingsModel(settingData);
  return newDoc.save();
}

export function CreateSettingMany(settingsDataList: ISetting[]) {
  return SettingsModel.insertMany(settingsDataList);
}

export function DeleteSettingById(settingId: string) {
  return SettingsModel.findOneAndDelete(Queries.ById(settingId));
}

export function UpdateSetting(settingId: string, data: ISetting) {
  return SettingsModel.findOneAndUpdate(
    Queries.ById(settingId),
    {
      $set: data,
    },
    {
      new: true,
      runValidators: true,
    }
  );
}
