import SettingsDefaults from '../../../../settings/appSettings';
import {
  createSettingMany,
  findSettings,
} from '../../models/settings/controller';

export async function populateAppSettings(): Promise<void> {
  const settingsList = Object.values(SettingsDefaults);
  const settingNameList = settingsList.map(({ name }) => name);
  const queryResults = await findSettings({ name: { $in: settingNameList } });
  // If no setting were found we populate them all
  if (queryResults.length === 0) {
    console.log(
      `Populated ${settingsList.length} new settings "${settingsList
        .map(({ name }) => name)
        .join()}"`
    );
    return createSettingMany(settingsList).then(() => void 0);
  }
  const needToBePopulated = settingsList.filter(
    ({ name: needToBePopulatedName }) =>
      queryResults.every(({ name }) => name !== needToBePopulatedName)
  );
  // If some setting were found we filter out the existing and populate the rest
  if (needToBePopulated.length > 0) {
    console.log(
      `Populated ${
        needToBePopulated.length
      } new settings "${needToBePopulated.map(({ name }) => name).join()}"`
    );

    return createSettingMany(needToBePopulated).then(() => void 0);
  }

  console.log(`No settings were populated`);
  return Promise.resolve();
}
