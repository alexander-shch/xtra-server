import Queries from '../../../queries';
import SettingsModel, { ISetting } from './model';

export function createSetting(settingData: ISetting) {
  const newDoc = new SettingsModel(settingData);
  return newDoc.save();
}

export function createSettingMany(settingsDataList: ISetting[]) {
  return SettingsModel.insertMany(settingsDataList);
}

export function deleteSettingById(settingId: string) {
  return SettingsModel.findOneAndDelete(Queries.ById(settingId));
}

export function findSettings(query: object) {
  return SettingsModel.find(query);
}

export function updateSetting(settingId: string, data: ISetting) {
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
